import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface FormValidationProps {
  email: string;
  password: string;
  onValidationChange: (isValid: boolean) => void;
}

export const FormValidation: React.FC<FormValidationProps> = ({
  email,
  password,
  onValidationChange,
}) => {
  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
  }>({});

  useEffect(() => {
    const newErrors: { email?: string; password?: string } = {};

    // Validación de email
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Por favor, introduce un email válido";
    }

    // Validación de contraseña
    if (password && password.length < 6) {
      newErrors.password = "La contraseña debe tener al menos 6 caracteres";
    }

    setErrors(newErrors);
    onValidationChange(Object.keys(newErrors).length === 0 && email.length > 0 && password.length > 0);
  }, [email, password, onValidationChange]);

  if (Object.keys(errors).length === 0) return null;

  return (
    <div className="space-y-2">
      {errors.email && (
        <div className="flex items-center space-x-2 text-red-500 text-sm">
          <div className="w-1.5 h-1.5 bg-red-500 rounded-full"></div>
          <span>{errors.email}</span>
        </div>
      )}
      {errors.password && (
        <div className="flex items-center space-x-2 text-red-500 text-sm">
          <div className="w-1.5 h-1.5 bg-red-500 rounded-full"></div>
          <span>{errors.password}</span>
        </div>
      )}
    </div>
  );
}; 