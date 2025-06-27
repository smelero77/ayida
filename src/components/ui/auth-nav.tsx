import Link from "next/link";
import { Logo } from "./logo";
import { ArrowLeft } from "lucide-react";

interface AuthNavProps {
  showBackButton?: boolean;
  backUrl?: string;
}

export const AuthNav: React.FC<AuthNavProps> = ({ 
  showBackButton = true, 
  backUrl = "/" 
}) => {
  return (
    <div className="absolute top-0 left-0 right-0 z-20 p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          {showBackButton && (
            <Link
              href={backUrl}
              className="flex items-center space-x-2 text-white/80 hover:text-white transition-colors duration-200"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm font-medium">Volver</span>
            </Link>
          )}
        </div>
        
        <Link href="/" className="flex items-center">
          <Logo width={120} height={35} />
        </Link>
      </div>
    </div>
  );
}; 