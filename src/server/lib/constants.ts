/**
 * URL base para la API del Sistema Nacional de Publicidad de Subvenciones (SNPSAP).
 */
export const SNPSAP_API_BASE_URL = 'https://www.infosubvenciones.es/bdnstrans/api';

/**
 * URL de ingesta de logs para tu Source de Better Stack.
 * Esta URL es específica para tu cuenta.
 */

export const BETTERSTACK_INGEST_URL = 'https://s1349735.eu-nbg-2.betterstackdata.com';

/**
 * Rutas de la aplicación
 */
export const ROUTES = {
  HOME: '/',
  DASHBOARD: '/dashboard',
  SIGNIN: '/signin',
  SIGNUP: '/signup',
  PROFILE: '/profile',
} as const;

/**
 * Nombres de las secciones de la página principal
 */
export const SECTIONS = {
  INICIO: 'inicio',
  BENEFICIOS: 'beneficios',
  TESTIMONIOS: 'testimonios',
  COMO_FUNCIONA: 'como-funciona',
} as const;

/**
 * Configuración de la navegación principal
 */
export const NAVIGATION = [
  { name: 'Inicio', link: `#${SECTIONS.INICIO}` },
  { name: 'Beneficios', link: `#${SECTIONS.BENEFICIOS}` },
  { name: 'Testimonios', link: `#${SECTIONS.TESTIMONIOS}` },
  { name: 'Cómo funciona', link: `#${SECTIONS.COMO_FUNCIONA}` },
] as const;

/**
 * Configuración de los beneficios
 */
export const BENEFITS = [
  { icon: '⚡', title: 'Búsqueda instantánea', desc: 'Resultados al momento gracias a nuestros filtros inteligentes.' },
  { icon: '🔍', title: 'Filtros avanzados', desc: 'Filtra por sector, comunidad y fecha para máxima precisión.' },
  { icon: '🔔', title: 'Alertas personalizadas', desc: 'Recibe notificaciones cuando aparezcan subvenciones para ti.' },
] as const;

/**
 * Configuración de los testimonios
 */
export const TESTIMONIALS = [
  { name: 'Laura Gómez, EcoStart', text: 'Encontramos la subvención clave en minutos. ¡Imprescindible!' },
  { name: 'Carlos Pérez, TechWave', text: 'Las alertas me salvaron de perder plazos. Súper útil.' },
] as const;

/**
 * Configuración de los pasos de funcionamiento
 */
export const STEPS = [
  { step: '1', title: 'Regístrate', desc: 'Crea tu cuenta en segundos.' },
  { step: '2', title: 'Explora', desc: 'Filtra y encuentra subvenciones a tu medida.' },
  { step: '3', title: 'Solicita', desc: 'Envía tu solicitud con un solo clic.' },
] as const; 