"use client";

import { useState, useEffect } from "react";
import { Eye, EyeOff, Mail, Lock, ArrowLeft } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Logo } from "@/components/ui/logo";
import { FormValidation } from "@/components/ui/form-validation";
import { AuthNav } from "@/components/ui/auth-nav";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useShowToast, toastMessages } from "@/lib/toast";

export default function SignInPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const showToast = useShowToast();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) return;
    
    setIsLoading(true);

    try {
      const result = await signIn("credentials", {
        email,
        password,
        callbackUrl: "/es/dashboards/analytics",
      });

      if (result?.error) {
        showToast.error(toastMessages.auth.loginInvalidCredentials);
      } else {
        showToast.success(toastMessages.auth.loginSuccess);
        // NextAuth se encargará de la redirección automáticamente
      }
    } catch (error) {
      console.error("Error en login:", error);
      showToast.error(toastMessages.auth.loginConnectionError);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsGoogleLoading(true);
    try {
      await signIn("google", { callbackUrl: "/es/dashboards/analytics" });
    } catch (error) {
      console.error("Error signing in with Google:", error);
      showToast.error(toastMessages.auth.googleSignInError);
      setIsGoogleLoading(false);
    }
  };

  const validateForm = () => {
    const isEmailValid = email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const isPasswordValid = password && password.length >= 6;
    
    setIsFormValid(Boolean(isEmailValid && isPasswordValid));
  };

  // Validar formulario cuando cambien los campos
  useEffect(() => {
    validateForm();
  }, [email, password]);

  if (!mounted) {
    return null;
  }

  return (
    <div className="flex flex-1 w-full min-h-screen">
      {/* Lado izquierdo - Información */}
      <div className="hidden lg:flex lg:w-[45%] relative overflow-hidden" style={{ background: 'linear-gradient(228deg, #6ef6dd, #1ee5c1)' }}>
        {/* Navegación */}
        <div className="absolute top-0 left-0 right-0 z-20 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link
                href="/es"
                className="flex items-center space-x-2 text-white/80 hover:text-white transition-colors duration-200"
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="text-sm font-medium">Volver</span>
              </Link>
            </div>
          </div>
        </div>
        
        {/* Animación de fondo */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-white/5 to-transparent animate-pulse"></div>
        
        {/* Contenido del lado izquierdo */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full w-full text-center">
          <h1
            className={`transition-all duration-1000 ease-out ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-12'}`}
            style={{
              transitionDelay: '200ms',
              fontFamily: 'Inter, sans-serif',
              fontSize: '38px',
              fontWeight: 700,
              lineHeight: '45px',
              color: '#fff',
            }}
          >
            Accede a tu cuenta<br />
            y gestiona tus subvenciones<br />
            de forma inteligente
          </h1>
          <div
            className={`transition-all duration-1000 ease-out ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
            style={{
              transitionDelay: '600ms',
              marginTop: '48px',
              fontFamily: 'Inter, sans-serif',
              fontSize: '28px',
              fontWeight: 700,
              color: '#fff',
              letterSpacing: '0.5px',
              opacity: 0.95,
            }}
          >
            zétika.app
          </div>
        </div>
      </div>

      {/* Lado derecho - Formulario */}
      <div className="flex-1 lg:w-[55%] bg-white flex items-center justify-center p-8">
        <div 
          className={`w-full max-w-sm transition-all duration-1000 ease-out ${
            mounted 
              ? 'opacity-100 translate-x-0' 
              : 'opacity-0 translate-x-12'
          }`}
          style={{ transitionDelay: '300ms' }}
        >
          {/* Logo y título */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-6">
              <Logo width={100} height={100} />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              ¡Bienvenido de vuelta!
            </h2>
            <p className="text-gray-600 text-sm">
              Inicia sesión en tu cuenta
            </p>
          </div>

          {/* Formulario */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="email" className="text-sm font-medium text-gray-700 block mb-3">
                Correo electrónico
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  id="email"
                  type="email"
                  placeholder="Tu email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 h-11 rounded-full border-gray-200 focus:border-gray-200 focus:ring-0 focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="text-sm font-medium text-gray-700 block mb-3">
                Contraseña
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Tu contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 pr-10 h-11 rounded-full border-gray-200 focus:border-gray-200 focus:ring-0 focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Validación del formulario */}
            <FormValidation
              email={email}
              password={password}
              onValidationChange={setIsFormValid}
            />

            <div className="flex items-center justify-between">
              <Link
                href="/forgot-password"
                className="text-sm text-[rgb(255,65,90)] hover:text-[rgb(255,65,90)]/70 font-medium transition-colors"
              >
                ¿Olvidaste tu contraseña?
              </Link>
            </div>

            {/* Botón de login */}
            <button
              type="submit"
              disabled={!isFormValid || isLoading}
              className="w-full h-11 rounded-full bg-gradient-to-r from-[#ff5c72] to-[#ff415a] text-white font-medium hover:from-[#ff415a] hover:to-[#ff5c72] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Iniciando sesión...</span>
                </div>
              ) : (
                "Iniciar sesión"
              )}
            </button>

            {/* Separador */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">O continúa con</span>
              </div>
            </div>

            {/* Botón de Google */}
            <div className="flex justify-center">
              <button
                type="button"
                onClick={handleGoogleSignIn}
                disabled={isGoogleLoading}
                className="flex items-center justify-center w-full max-w-[45%] px-6 py-3 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-full hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isGoogleLoading ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
                    <span>Conectando...</span>
                  </div>
                ) : (
                  <>
                    <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                      <path
                        fill="#4285F4"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      />
                      <path
                        fill="#EA4335"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      />
                    </svg>
                    Google
                  </>
                )}
              </button>
            </div>

            <div className="text-center">
              <p className="text-gray-600 text-sm">
                ¿No tienes una cuenta?{" "}
                <Link
                  href="/es/signup"
                  className="text-[rgb(255,65,90)] hover:text-[rgb(255,65,90)]/70 font-semibold transition-colors"
                >
                  Regístrate aquí
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
} 