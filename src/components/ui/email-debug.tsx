"use client";

import { useState } from 'react';
import { Button } from './button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './card';
import { Alert, AlertDescription } from './alert';
import { CheckCircle, AlertCircle, Loader2, Settings, Mail } from 'lucide-react';
import { toastMessages } from '@/lib/toast';

export function EmailDebug() {
  const [isLoading, setIsLoading] = useState(false);
  const [debugResult, setDebugResult] = useState<any>(null);

  const handleDebug = async () => {
    setIsLoading(true);
    setDebugResult(null);

    try {
      const response = await fetch('/api/email/debug');
      const data = await response.json();
      setDebugResult(data);
    } catch (error) {
      setDebugResult({
        success: false,
        error: toastMessages.general.connectionError,
        details: (error as Error).message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Settings className="w-5 h-5" />
          Debug del Servicio de Email
        </CardTitle>
        <CardDescription>
          Verifica la configuración de Resend y prueba el envío de emails
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button
          onClick={handleDebug}
          disabled={isLoading}
          className="w-full"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Ejecutando Debug...
            </>
          ) : (
            <>
              <Settings className="w-4 h-4 mr-2" />
              Ejecutar Debug Completo
            </>
          )}
        </Button>

        {debugResult && (
          <div className="space-y-4">
            {/* Variables de Entorno */}
            <div>
              <h3 className="font-medium mb-2">Variables de Entorno:</h3>
              <div className="bg-gray-50 p-3 rounded-lg text-sm space-y-1">
                <div><strong>RESEND_API_KEY:</strong> {debugResult.envCheck?.hasResendApiKey ? '✅ Configurada' : '❌ No configurada'} ({debugResult.envCheck?.resendApiKeyLength} caracteres)</div>
                <div><strong>RESEND_FROM_EMAIL:</strong> {debugResult.envCheck?.hasResendFromEmail ? '✅ Configurada' : '❌ No configurada'} ({debugResult.envCheck?.resendFromEmail})</div>
                <div><strong>NEXTAUTH_URL:</strong> {debugResult.envCheck?.hasNextAuthUrl ? '✅ Configurada' : '❌ No configurada'} ({debugResult.envCheck?.nextAuthUrl})</div>
                <div><strong>NODE_ENV:</strong> {debugResult.envCheck?.nodeEnv}</div>
              </div>
            </div>

            {/* Validación */}
            <div>
              <h3 className="font-medium mb-2">Validación:</h3>
              <div className="bg-gray-50 p-3 rounded-lg text-sm space-y-1">
                <div><strong>Formato API Key:</strong> {debugResult.validationResults?.apiKeyFormat ? '✅ Válido' : '❌ Inválido'}</div>
                <div><strong>Formato Email:</strong> {debugResult.validationResults?.emailFormat ? '✅ Válido' : '❌ Inválido'}</div>
                <div><strong>Todas las variables:</strong> {debugResult.validationResults?.allRequiredVarsPresent ? '✅ Presentes' : '❌ Faltan variables'}</div>
              </div>
            </div>

            {/* Prueba de Email */}
            {debugResult.emailTestResult && (
              <div>
                <h3 className="font-medium mb-2">Prueba de Email:</h3>
                <Alert className={debugResult.emailTestResult.success ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'}>
                  {debugResult.emailTestResult.success ? (
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  ) : (
                    <AlertCircle className="h-4 w-4 text-red-600" />
                  )}
                  <AlertDescription className={debugResult.emailTestResult.success ? 'text-green-800' : 'text-red-800'}>
                    {debugResult.emailTestResult.success ? (
                      <div>
                        <p className="font-medium">✅ Email enviado correctamente</p>
                        {debugResult.emailTestResult.messageId && (
                          <p className="text-sm mt-1">ID del mensaje: {debugResult.emailTestResult.messageId}</p>
                        )}
                      </div>
                    ) : (
                      <div>
                        <p className="font-medium">❌ Error al enviar email</p>
                        <p className="text-sm mt-1">{debugResult.emailTestResult.error}</p>
                      </div>
                    )}
                  </AlertDescription>
                </Alert>
              </div>
            )}

            {/* Resumen */}
            <Alert className={debugResult.success ? 'border-blue-200 bg-blue-50' : 'border-red-200 bg-red-50'}>
              <Mail className="h-4 w-4 text-blue-600" />
              <AlertDescription className="text-blue-800">
                <p className="font-medium">Resumen del Debug:</p>
                <p className="text-sm mt-1">{debugResult.message}</p>
              </AlertDescription>
            </Alert>
          </div>
        )}
      </CardContent>
    </Card>
  );
} 