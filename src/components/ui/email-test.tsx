"use client";

import { useState } from 'react';
import { Button } from './button';
import { Input } from './input';
import { Label } from './label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './card';
import { Alert, AlertDescription } from './alert';
import { Mail, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { toastMessages } from '@/lib/toast';

export function EmailTest() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<{
    success: boolean;
    message?: string;
    error?: string;
    details?: string;
    messageId?: string;
  } | null>(null);

  const handleTestEmail = async () => {
    if (!email) return;

    // Validar que no sea un email de ejemplo
    if (email.includes('example.com') || email.includes('test.com')) {
      setResult({
        success: false,
        error: 'Por favor usa un email real',
        details: 'Resend no permite emails de ejemplo como example.com o test.com',
      });
      return;
    }

    setIsLoading(true);
    setResult(null);

    try {
      const response = await fetch('/api/email/test', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      setResult(data);
    } catch (error) {
      setResult({
        success: false,
        error: toastMessages.general.connectionError,
        details: (error as Error).message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Mail className="w-5 h-5" />
          Prueba del Servicio de Email
        </CardTitle>
        <CardDescription>
          Prueba la configuración de Resend enviando un email de prueba. 
          <strong>Importante:</strong> Usa un email real (no example.com o test.com)
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email de prueba</Label>
          <Input
            id="email"
            type="email"
            placeholder="tu@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isLoading}
          />
        </div>

        <Button
          onClick={handleTestEmail}
          disabled={!email || isLoading}
          className="w-full"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Enviando...
            </>
          ) : (
            <>
              <Mail className="w-4 h-4 mr-2" />
              Enviar Email de Prueba
            </>
          )}
        </Button>

        {result && (
          <Alert className={result.success ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'}>
            {result.success ? (
              <CheckCircle className="h-4 w-4 text-green-600" />
            ) : (
              <AlertCircle className="h-4 w-4 text-red-600" />
            )}
            <AlertDescription className={result.success ? 'text-green-800' : 'text-red-800'}>
              {result.success ? (
                <div>
                  <p className="font-medium">{result.message}</p>
                  {result.messageId && (
                    <p className="text-sm mt-1">ID del mensaje: {result.messageId}</p>
                  )}
                </div>
              ) : (
                <div>
                  <p className="font-medium">{result.error}</p>
                  {result.details && (
                    <p className="text-sm mt-1">{result.details}</p>
                  )}
                </div>
              )}
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
} 