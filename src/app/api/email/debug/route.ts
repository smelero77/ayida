import { NextResponse } from 'next/server';
import { env } from '~/env';
import { logger } from '~/server/lib/logger';
import { sendEmail } from '~/server/services/email';

export async function GET() {
  try {
    logger.info('Iniciando debug completo del servicio de email');
    
    // Verificar variables de entorno
    const envCheck = {
      hasResendApiKey: !!env.RESEND_API_KEY,
      hasResendFromEmail: !!env.RESEND_FROM_EMAIL,
      resendApiKeyLength: env.RESEND_API_KEY?.length || 0,
      resendFromEmail: env.RESEND_FROM_EMAIL,
      nodeEnv: env.NODE_ENV,
      hasNextAuthUrl: !!env.NEXTAUTH_URL,
      nextAuthUrl: env.NEXTAUTH_URL,
    };

    logger.info('Verificación de variables de entorno', envCheck);

    // Verificar formato de la API key
    const isApiKeyValid = env.RESEND_API_KEY?.startsWith('re_');
    
    // Verificar formato del email
    const isEmailValid = env.RESEND_FROM_EMAIL?.includes('@');

    const validationResults = {
      apiKeyFormat: isApiKeyValid,
      emailFormat: isEmailValid,
      allRequiredVarsPresent: envCheck.hasResendApiKey && envCheck.hasResendFromEmail,
    };

    logger.info('Resultados de validación', validationResults);

    // Probar envío de email si las variables están configuradas
    let emailTestResult = null;
    if (validationResults.allRequiredVarsPresent) {
      try {
        logger.info('Probando envío de email de prueba...');
        const testResult = await sendEmail({
          to: env.RESEND_FROM_EMAIL,
          subject: 'Test Debug - zétika.app',
          html: '<h1>Test Debug</h1><p>Este es un email de prueba para debug.</p>',
          text: 'Test Debug\n\nEste es un email de prueba para debug.',
        });
        
        emailTestResult = {
          success: true,
          messageId: testResult?.id,
        };
        logger.info('Email de prueba enviado exitosamente', { messageId: testResult?.id });
      } catch (emailError) {
        emailTestResult = {
          success: false,
          error: (emailError as Error).message,
        };
        logger.error('Error al enviar email de prueba', emailError as Error);
      }
    }

    return NextResponse.json({
      success: true,
      envCheck,
      validationResults,
      emailTestResult,
      message: 'Debug completado. Revisa los logs para más detalles.',
    });

  } catch (error) {
    logger.error('Error en debug del servicio de email', error as Error);
    return NextResponse.json({
      success: false,
      error: 'Error al realizar debug',
      details: (error as Error).message,
    }, { status: 500 });
  }
} 