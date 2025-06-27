import { ChevronDown, Zap, Users, BarChart3, MessageSquare, Building2, Briefcase, User, ShoppingCart, BookOpen, Video, Play, HelpCircle } from 'lucide-react';

interface NavItemProps {
  title: string;
  href?: string;
  hasDropdown?: boolean;
  dropdownItems?: { 
    title: string; 
    href: string; 
    description?: string; 
    icon?: string;
    image?: string;
  }[];
  isActive?: boolean;
  megaMenuImage?: {
    src: string;
    alt: string;
    title: string;
    description: string;
    buttonText?: string;
    buttonHref?: string;
  };
}

const NavItem = ({ title, href, hasDropdown, dropdownItems, isActive, megaMenuImage }: NavItemProps) => {
  const getIcon = (iconName?: string) => {
    const iconMap = {
      'social-media': Zap,
      'content': MessageSquare,
      'analytics': BarChart3,
      'community': Users,
      'enterprise': Building2,
      'agency': Briefcase,
      'creator': User,
      'ecommerce': ShoppingCart,
      'blog': BookOpen,
      'case-studies': BarChart3,
      'webinars': Video,
      'help': HelpCircle
    };
    
    const IconComponent = iconName ? iconMap[iconName as keyof typeof iconMap] : Zap;
    return IconComponent || Zap;
  };

  return (
    <div className="relative group">
      <a
        href={href || '#'}
        className={`
          flex items-center gap-1 px-4 py-2 text-base font-semibold transition-all duration-300
          relative group/link font-rubik
          ${isActive ? 'text-[rgb(255,65,90)]' : 'text-[rgb(0,22,46)] hover:text-[rgb(255,65,90)] group-hover:text-[rgb(255,65,90)]'}
        `}
      >
        {title}
        {hasDropdown && (
          <ChevronDown 
            size={18} 
            strokeWidth={3}
            className={`transition-all duration-300 ${
              isActive 
                ? 'rotate-180 text-[rgb(255,65,90)]' 
                : 'text-[rgb(0,22,46)] group-hover:rotate-180 group-hover:text-[rgb(255,65,90)]'
            }`}
          />
        )}
      </a>

      {hasDropdown && dropdownItems && (
        <div className={`absolute top-full left-0 mt-6 ${megaMenuImage ? 'w-[700px]' : 'w-80'} bg-white rounded-lg shadow-2xl border border-gray-100 z-50 
                        opacity-0 invisible group-hover:opacity-100 group-hover:visible 
                        transform translate-y-2 group-hover:translate-y-0 
                        transition-all duration-300 ease-out`}>
          <div className={`${megaMenuImage ? 'flex' : ''} p-0`}>
            <div className={`${megaMenuImage ? 'flex-1 border-r border-gray-100' : ''} p-8`}>
              <div className="space-y-1">
                {dropdownItems.map((item, index) => {
                  const IconComponent = getIcon(item.icon);
                  return (
                    <a
                      key={index}
                      href={item.href}
                      className="flex items-start py-3 hover:bg-gray-50 rounded-lg transition-colors duration-200 group/item"
                    >
                      <div className="mr-4 mt-0.5">
                        <div className="w-10 h-10 bg-teal-50 rounded-lg flex items-center justify-center 
                                        group-hover/item:bg-teal-100 transition-all duration-200">
                          <IconComponent size={18} className="text-teal-600" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-base text-gray-900 group-hover/item:text-teal-600 transition-colors duration-200">
                          {item.title}
                        </div>
                        {item.description && (
                          <div className="text-sm text-gray-500 mt-1 leading-relaxed">
                            {item.description}
                          </div>
                        )}
                      </div>
                    </a>
                  );
                })}
              </div>
            </div>

            {megaMenuImage && (
              <div className="w-80 p-8 bg-gradient-to-br from-yellow-100 via-yellow-200 to-yellow-300">
                <div className="relative">
                  <div className="relative overflow-hidden rounded-2xl mb-6">
                    <img 
                      src={megaMenuImage.src} 
                      alt={megaMenuImage.alt}
                      className="w-full h-56 object-cover"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="flex space-x-4">
                        <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center shadow-lg">
                          <span className="text-white font-bold">f</span>
                        </div>
                        <div className="w-12 h-12 bg-pink-500 rounded-full flex items-center justify-center shadow-lg">
                          <span className="text-white font-bold">@</span>
                        </div>
                        <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center shadow-lg">
                          <span className="text-white font-bold">♪</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <h3 className="font-bold text-2xl text-gray-900 mb-2 leading-tight">
                      {megaMenuImage.title}
                    </h3>
                    <p className="text-sm text-gray-700 mb-4 leading-relaxed">
                      {megaMenuImage.description}
                    </p>
                    {megaMenuImage.buttonText && (
                      <a 
                        href={megaMenuImage.buttonHref || '#'}
                        className="inline-flex items-center gap-2 bg-white text-gray-900 px-6 py-3 rounded-full text-sm font-medium hover:bg-gray-50 transition-all duration-200 shadow-md hover:shadow-lg"
                      >
                        {megaMenuImage.buttonText}
                      </a>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default NavItem; 