import { NextResponse } from 'next/server';
import { testEmailService } from '~/server/services/email';
import { logger } from '~/server/lib/logger';

export async function POST(req: Request) {
  try {
    const { email } = await req.json();
    
    if (!email) {
      return NextResponse.json(
        { error: 'Email es requerido' },
        { status: 400 }
      );
    }

    logger.info('Iniciando prueba del servicio de email', { email });
    
    const result = await testEmailService();
    
    if (result.success) {
      logger.info('Prueba del servicio de email exitosa', { messageId: result.messageId });
      return NextResponse.json({
        success: true,
        message: 'Email de prueba enviado correctamente',
        messageId: result.messageId,
      });
    } else {
      logger.error('Prueba del servicio de email falló', new Error(result.error));
      return NextResponse.json(
        { 
          success: false, 
          error: 'Error al enviar email de prueba',
          details: result.error 
        },
        { status: 500 }
      );
    }
  } catch (error) {
    logger.error('Error inesperado en endpoint de prueba de email', error as Error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Error interno del servidor',
        details: (error as Error).message 
      },
      { status: 500 }
    );
  }
} 