import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { z } from 'zod';
import { db } from '~/server/db';
import { logger } from '~/server/lib/logger';
import { sendWelcomeEmail } from '~/server/services/email';

// Schema de validación para el registro
const registerSchema = z.object({
  name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    // Validar datos de entrada
    const validatedData = registerSchema.parse(body);
    
    logger.info('Iniciando proceso de registro', { 
      email: validatedData.email,
      name: validatedData.name 
    });
    
    // Verificar si el usuario ya existe
    const existingUser = await db.user.findUnique({
      where: { email: validatedData.email }
    });

    if (existingUser) {
      logger.warn('Intento de registro con email existente', { email: validatedData.email });
      return NextResponse.json(
        { 
          success: false, 
          error: 'Ya existe una cuenta con este email' 
        },
        { status: 400 }
      );
    }

    // Hashear la contraseña
    const hashedPassword = await bcrypt.hash(validatedData.password, 12);
    logger.info('Contraseña hasheada correctamente');

    // Crear el usuario
    const user = await db.user.create({
      data: {
        name: validatedData.name,
        email: validatedData.email,
        password: hashedPassword,
      },
    });

    logger.info('Usuario registrado exitosamente en la base de datos', { 
      userId: user.id, 
      email: user.email 
    });

    // Enviar email de bienvenida
    logger.info('Iniciando envío de email de bienvenida', { 
      userId: user.id,
      email: user.email 
    });
    
    try {
      logger.info('Llamando a sendWelcomeEmail...');
      const emailResult = await sendWelcomeEmail({
        name: user.name || 'Usuario',
        email: user.email!,
      });
      logger.info('Email de bienvenida enviado exitosamente', { 
        userId: user.id,
        messageId: emailResult?.id 
      });
    } catch (emailError) {
      logger.error('Error al enviar email de bienvenida', emailError as Error, { 
        userId: user.id,
        errorMessage: (emailError as Error).message,
        errorStack: (emailError as Error).stack
      });
      // No fallamos el registro si el email falla
    }

    return NextResponse.json({
      success: true,
      message: 'Usuario registrado exitosamente',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      }
    });

  } catch (error) {
    if (error instanceof z.ZodError) {
      logger.warn('Error de validación en registro', { errors: error.errors });
      return NextResponse.json({
        success: false,
        error: 'Datos inválidos',
        details: error.errors.map(e => ({
          field: e.path.join('.'),
          message: e.message
        }))
      }, { status: 400 });
    }

    logger.error('Error en registro de usuario', error as Error, {
      errorMessage: (error as Error).message,
      errorStack: (error as Error).stack
    });
    return NextResponse.json({
      success: false,
      error: 'Error interno del servidor'
    }, { status: 500 });
  }
} 