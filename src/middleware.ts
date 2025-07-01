import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// Lista de idiomas soportados
const locales = ['es', 'en']

// Función para obtener el idioma preferido del navegador
function getLocale(request: NextRequest): string {
  const acceptLanguage = request.headers.get('accept-language')
  if (acceptLanguage) {
    const preferredLocale = acceptLanguage
      .split(',')
      .map(lang => lang.split(';')[0]?.trim() ?? '')
      .find(lang => locales.includes(lang))
    if (preferredLocale) return preferredLocale
  }
  return 'es' // Idioma por defecto
}

// Función para verificar si la ruta ya tiene un locale
function pathnameHasLocale(pathname: string): boolean {
  return locales.some(locale => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`)
}

export function middleware(request: NextRequest) {
  // Normalizamos la ruta para evitar diferencias «/» vs «» al final
  const originalUrl = request.nextUrl
  const pathname = originalUrl.pathname.replace(/\/$/, "") || "/" // "/en/" -> "/en"

  // Si la ruta ya incluye un locale, continuamos sin redirigir
  if (pathnameHasLocale(pathname)) {
    return NextResponse.next()
  }

  // Detectamos el locale preferido
  const locale = getLocale(request)

  // Construimos la URL destino
  const targetPath = pathname === "/" ? `/${locale}` : `/${locale}${pathname}`

  // Evitamos redirigir a la misma URL (previene bucles)
  if (targetPath === pathname) {
    return NextResponse.next()
  }

  return NextResponse.redirect(new URL(targetPath, request.url))
}

export const config = {
  matcher: [
    // Excluir archivos estáticos y rutas de API
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|images|docs).*)',
  ],
}
