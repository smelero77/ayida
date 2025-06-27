# Configuración de Resend en zétika.app

## ¿Qué es Resend?

Resend es un servicio de envío de emails moderno y confiable que permite enviar emails transaccionales y de marketing desde aplicaciones web. Es especialmente útil para:

- Emails de bienvenida
- Restablecimiento de contraseñas
- Notificaciones del sistema
- Alertas personalizadas
- Comunicaciones de marketing

## Configuración Inicial

### 1. Crear cuenta en Resend

1. Ve a [resend.com](https://resend.com)
2. Crea una cuenta gratuita
3. Verifica tu dominio de email (opcional pero recomendado)

### 2. Obtener API Key

1. En el dashboard de Resend, ve a la sección "API Keys"
2. Crea una nueva API key
3. Copia la clave (comienza con `re_`)

### 3. Configurar variables de entorno

Añade las siguientes variables a tu archivo `.env`:

```env
# Resend Configuration
RESEND_API_KEY=re_tu_api_key_aqui
RESEND_FROM_EMAIL=noreply@tudominio.com
```

**Nota:** Para el `RESEND_FROM_EMAIL`, puedes usar:
- Un email verificado en Resend
- Un dominio verificado (ej: `noreply@tudominio.com`)
- El email por defecto de Resend para pruebas

## Servicios Disponibles

### 1. Email de Bienvenida

```typescript
import { sendWelcomeEmail } from '~/server/services/email';

await sendWelcomeEmail({
  name: 'Juan Pérez',
  email: 'juan@ejemplo.com'
});
```

### 2. Restablecimiento de Contraseña

```typescript
import { sendPasswordResetEmail } from '~/server/services/email';

await sendPasswordResetEmail({
  name: 'Juan Pérez',
  email: 'juan@ejemplo.com',
  resetToken: 'token_generado',
  resetUrl: 'https://tuapp.com/reset-password'
});
```

### 3. Notificaciones Personalizadas

```typescript
import { sendNotificationEmail } from '~/server/services/email';

await sendNotificationEmail({
  name: 'Juan Pérez',
  email: 'juan@ejemplo.com',
  title: 'Nueva Convocatoria Disponible',
  message: 'Se ha publicado una nueva convocatoria que coincide con tus criterios.',
  actionUrl: 'https://tuapp.com/convocatorias/123',
  actionText: 'Ver Convocatoria'
});
```

### 4. Email Personalizado

```typescript
import { sendEmail } from '~/server/services/email';

await sendEmail({
  to: 'usuario@ejemplo.com',
  subject: 'Asunto del Email',
  html: '<h1>Contenido HTML</h1>',
  text: 'Contenido en texto plano'
});
```

## Pruebas

### 1. Componente de Prueba

Puedes usar el componente `EmailTest` para probar la configuración:

```tsx
import { EmailTest } from '@/components/ui/email-test';

// En cualquier página
<EmailTest />
```

### 2. API Endpoint de Prueba

```bash
POST /api/email/test
Content-Type: application/json

{
  "email": "tu@email.com"
}
```

### 3. Función de Prueba Directa

```typescript
import { testEmailService } from '~/server/services/email';

const result = await testEmailService();
console.log(result);
```

## Integración con NextAuth

Para integrar con NextAuth para emails de verificación y restablecimiento de contraseña:

### 1. Configurar NextAuth

```typescript
// src/server/auth/config.ts
import { sendPasswordResetEmail, sendWelcomeEmail } from '~/server/services/email';

export const authConfig = {
  // ... otras configuraciones
  events: {
    createUser: async ({ user }) => {
      await sendWelcomeEmail({
        name: user.name || 'Usuario',
        email: user.email!
      });
    },
  },
  // ... resto de configuración
};
```

### 2. Página de Restablecimiento de Contraseña

```typescript
// src/app/reset-password/page.tsx
import { sendPasswordResetEmail } from '~/server/services/email';

// En el handler del formulario
const resetToken = crypto.randomUUID();
await sendPasswordResetEmail({
  name: user.name,
  email: user.email,
  resetToken,
  resetUrl: `${process.env.NEXTAUTH_URL}/reset-password`
});
```

## Monitoreo y Logs

Todos los emails enviados se registran automáticamente usando el sistema de logging de la aplicación:

- **Éxitos**: Se registran con el ID del mensaje
- **Errores**: Se registran con detalles del error
- **Métricas**: Se pueden añadir métricas personalizadas

## Límites y Costos

### Plan Gratuito
- 3,000 emails/mes
- 100 emails/día
- Soporte por email

### Plan Pro ($20/mes)
- 50,000 emails/mes
- 1,000 emails/día
- Soporte prioritario
- Dominios personalizados

## Mejores Prácticas

1. **Siempre incluye versión en texto plano** para compatibilidad
2. **Usa templates consistentes** para mantener la marca
3. **Prueba en diferentes clientes de email** antes de producción
4. **Configura SPF, DKIM y DMARC** para mejor entregabilidad
5. **Monitorea las tasas de apertura y clics** para optimizar
6. **Respetar las leyes de privacidad** (GDPR, CAN-SPAM, etc.)

## Troubleshooting

### Error: "Invalid API Key"
- Verifica que la API key sea correcta
- Asegúrate de que no tenga espacios extra

### Error: "Unauthorized"
- Verifica que el dominio esté verificado en Resend
- Usa un email verificado como remitente

### Emails no llegan
- Revisa la carpeta de spam
- Verifica la configuración de DNS
- Revisa los logs de Resend en el dashboard

### Rate Limiting
- Respeta los límites del plan
- Implementa colas para emails masivos
- Usa delays entre envíos si es necesario

## Recursos Adicionales

- [Documentación oficial de Resend](https://resend.com/docs)
- [Guía de mejores prácticas](https://resend.com/docs/best-practices)
- [API Reference](https://resend.com/docs/api-reference)
- [Soporte](https://resend.com/support) 