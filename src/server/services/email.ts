import { Resend } from 'resend';
import { env } from '~/env';
import { logger } from '~/server/lib/logger';

// Inicializar el cliente de Resend
const resend = new Resend(env.RESEND_API_KEY);

export interface EmailData {
  to: string | string[];
  subject: string;
  html: string;
  text?: string;
  from?: string;
}

export interface WelcomeEmailData {
  name: string;
  email: string;
}

export interface PasswordResetEmailData {
  name: string;
  email: string;
  resetToken: string;
  resetUrl: string;
}

export interface NotificationEmailData {
  name: string;
  email: string;
  title: string;
  message: string;
  actionUrl?: string;
  actionText?: string;
}

/**
 * Envía un email usando Resend
 */
export async function sendEmail(emailData: EmailData) {
  try {
    logger.info('Iniciando envío de email con Resend', {
      to: emailData.to,
      subject: emailData.subject,
      from: emailData.from || env.RESEND_FROM_EMAIL,
      hasApiKey: !!env.RESEND_API_KEY,
      apiKeyLength: env.RESEND_API_KEY?.length || 0,
    });

    const { data, error } = await resend.emails.send({
      from: emailData.from || env.RESEND_FROM_EMAIL,
      to: emailData.to,
      subject: emailData.subject,
      html: emailData.html,
      text: emailData.text,
    });

    if (error) {
      logger.error('Error al enviar email con Resend', error, {
        to: emailData.to,
        subject: emailData.subject,
        errorMessage: error.message,
      });
      throw new Error(`Error al enviar email: ${error.message}`);
    }

    logger.info('Email enviado exitosamente', {
      messageId: data?.id,
      to: emailData.to,
      subject: emailData.subject,
    });

    return data;
  } catch (error) {
    logger.error('Error inesperado al enviar email', error as Error, {
      to: emailData.to,
      subject: emailData.subject,
      errorMessage: (error as Error).message,
      errorStack: (error as Error).stack,
    });
    throw error;
  }
}

/**
 * Envía email de bienvenida a nuevos usuarios
 */
export async function sendWelcomeEmail({ name, email }: WelcomeEmailData) {
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>¡Bienvenido a zétika.app!</title>
    </head>
    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="text-align: center; margin-bottom: 30px;">
        <h1 style="color: #ff415a; margin-bottom: 10px;">¡Bienvenido a zétika.app!</h1>
        <p style="font-size: 18px; color: #666;">La plataforma más avanzada para encontrar y gestionar subvenciones</p>
      </div>
      
      <div style="background: #f8f9fa; padding: 30px; border-radius: 10px; margin-bottom: 30px;">
        <h2 style="color: #333; margin-bottom: 20px;">¡Hola ${name}!</h2>
        <p>Nos alegra darte la bienvenida a zétika.app. Tu cuenta ha sido creada exitosamente.</p>
        
        <div style="margin: 30px 0;">
          <h3 style="color: #ff415a; margin-bottom: 15px;">¿Qué puedes hacer ahora?</h3>
          <ul style="text-align: left; padding-left: 20px;">
            <li>Explorar convocatorias de subvenciones</li>
            <li>Configurar alertas personalizadas</li>
            <li>Gestionar tu perfil y preferencias</li>
            <li>Acceder a herramientas avanzadas de búsqueda</li>
          </ul>
        </div>
        
        <div style="text-align: center; margin: 30px 0;">
          <a href="${env.NEXTAUTH_URL}/dashboard" 
             style="background: linear-gradient(135deg, #ff5c72 0%, #ff415a 100%); 
                    color: white; 
                    padding: 15px 30px; 
                    text-decoration: none; 
                    border-radius: 25px; 
                    display: inline-block; 
                    font-weight: bold;">
            Ir al Dashboard
          </a>
        </div>
      </div>
      
      <div style="text-align: center; color: #666; font-size: 14px;">
        <p>Si tienes alguna pregunta, no dudes en contactarnos en <a href="mailto:info@ayidaportal.com" style="color: #ff415a;">info@ayidaportal.com</a></p>
        <p>© ${new Date().getFullYear()} zétika.app. Todos los derechos reservados.</p>
      </div>
    </body>
    </html>
  `;

  const text = `
    ¡Bienvenido a zétika.app!
    
    Hola ${name},
    
    Nos alegra darte la bienvenida a zétika.app. Tu cuenta ha sido creada exitosamente.
    
    ¿Qué puedes hacer ahora?
    - Explorar convocatorias de subvenciones
    - Configurar alertas personalizadas
    - Gestionar tu perfil y preferencias
    - Acceder a herramientas avanzadas de búsqueda
    
    Accede a tu dashboard: ${env.NEXTAUTH_URL}/dashboard
    
    Si tienes alguna pregunta, contacta con nosotros en info@ayidaportal.com
    
    © ${new Date().getFullYear()} zétika.app. Todos los derechos reservados.
  `;

  return sendEmail({
    to: email,
    subject: '¡Bienvenido a zétika.app!',
    html,
    text,
  });
}

/**
 * Envía email de restablecimiento de contraseña
 */
export async function sendPasswordResetEmail({ name, email, resetToken, resetUrl }: PasswordResetEmailData) {
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Restablecer Contraseña - zétika.app</title>
    </head>
    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="text-align: center; margin-bottom: 30px;">
        <h1 style="color: #ff415a; margin-bottom: 10px;">Restablecer Contraseña</h1>
        <p style="font-size: 18px; color: #666;">zétika.app</p>
      </div>
      
      <div style="background: #f8f9fa; padding: 30px; border-radius: 10px; margin-bottom: 30px;">
        <h2 style="color: #333; margin-bottom: 20px;">¡Hola ${name}!</h2>
        <p>Has solicitado restablecer tu contraseña en zétika.app.</p>
        
        <div style="margin: 30px 0;">
          <p>Haz clic en el botón de abajo para crear una nueva contraseña:</p>
        </div>
        
        <div style="text-align: center; margin: 30px 0;">
          <a href="${resetUrl}?token=${resetToken}" 
             style="background: linear-gradient(135deg, #ff5c72 0%, #ff415a 100%); 
                    color: white; 
                    padding: 15px 30px; 
                    text-decoration: none; 
                    border-radius: 25px; 
                    display: inline-block; 
                    font-weight: bold;">
            Restablecer Contraseña
          </a>
        </div>
        
        <div style="margin: 30px 0; padding: 20px; background: #fff; border-left: 4px solid #ff415a; border-radius: 5px;">
          <p style="margin: 0; color: #666; font-size: 14px;">
            <strong>Importante:</strong> Este enlace expirará en 1 hora por seguridad. 
            Si no solicitaste este cambio, puedes ignorar este email.
          </p>
        </div>
      </div>
      
      <div style="text-align: center; color: #666; font-size: 14px;">
        <p>Si tienes problemas, contacta con nosotros en <a href="mailto:info@ayidaportal.com" style="color: #ff415a;">info@ayidaportal.com</a></p>
        <p>© ${new Date().getFullYear()} zétika.app. Todos los derechos reservados.</p>
      </div>
    </body>
    </html>
  `;

  const text = `
    Restablecer Contraseña - zétika.app
    
    ¡Hola ${name}!
    
    Has solicitado restablecer tu contraseña en zétika.app.
    
    Haz clic en el siguiente enlace para crear una nueva contraseña:
    ${resetUrl}?token=${resetToken}
    
    Importante: Este enlace expirará en 1 hora por seguridad. 
    Si no solicitaste este cambio, puedes ignorar este email.
    
    Si tienes problemas, contacta con nosotros en info@ayidaportal.com
    
    © ${new Date().getFullYear()} zétika.app. Todos los derechos reservados.
  `;

  return sendEmail({
    to: email,
    subject: 'Restablecer Contraseña - zétika.app',
    html,
    text,
  });
}

/**
 * Envía email de notificación personalizada
 */
export async function sendNotificationEmail({ name, email, title, message, actionUrl, actionText }: NotificationEmailData) {
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${title} - zétika.app</title>
    </head>
    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="text-align: center; margin-bottom: 30px;">
        <h1 style="color: #ff415a; margin-bottom: 10px;">${title}</h1>
        <p style="font-size: 18px; color: #666;">zétika.app</p>
      </div>
      
      <div style="background: #f8f9fa; padding: 30px; border-radius: 10px; margin-bottom: 30px;">
        <h2 style="color: #333; margin-bottom: 20px;">¡Hola ${name}!</h2>
        <div style="margin: 30px 0;">
          ${message}
        </div>
        
        ${actionUrl && actionText ? `
          <div style="text-align: center; margin: 30px 0;">
            <a href="${actionUrl}" 
               style="background: linear-gradient(135deg, #ff5c72 0%, #ff415a 100%); 
                      color: white; 
                      padding: 15px 30px; 
                      text-decoration: none; 
                      border-radius: 25px; 
                      display: inline-block; 
                      font-weight: bold;">
              ${actionText}
            </a>
          </div>
        ` : ''}
      </div>
      
      <div style="text-align: center; color: #666; font-size: 14px;">
        <p>Si tienes alguna pregunta, contacta con nosotros en <a href="mailto:info@ayidaportal.com" style="color: #ff415a;">info@ayidaportal.com</a></p>
        <p>© ${new Date().getFullYear()} zétika.app. Todos los derechos reservados.</p>
      </div>
    </body>
    </html>
  `;

  const text = `
    ${title} - zétika.app
    
    ¡Hola ${name}!
    
    ${message}
    
    ${actionUrl && actionText ? `${actionText}: ${actionUrl}` : ''}
    
    Si tienes alguna pregunta, contacta con nosotros en info@ayidaportal.com
    
    © ${new Date().getFullYear()} zétika.app. Todos los derechos reservados.
  `;

  return sendEmail({
    to: email,
    subject: `${title} - zétika.app`,
    html,
    text,
  });
}

/**
 * Verifica que el servicio de email esté configurado correctamente
 */
export async function testEmailService() {
  try {
    const testEmail = 'test@example.com';
    const result = await sendEmail({
      to: testEmail,
      subject: 'Test Email - zétika.app',
      html: '<h1>Test Email</h1><p>Este es un email de prueba.</p>',
      text: 'Test Email\n\nEste es un email de prueba.',
    });
    
    logger.info('Servicio de email configurado correctamente', { messageId: result?.id });
    return { success: true, messageId: result?.id };
  } catch (error) {
    logger.error('Error al probar el servicio de email', error as Error);
    return { success: false, error: (error as Error).message };
  }
} 