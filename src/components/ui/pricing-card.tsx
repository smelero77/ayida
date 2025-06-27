import { Check, Info } from "lucide-react";
import DecorativeGraphic from "./decorative-graphic";
import type { PricingCardProps, OptionalAddOn } from "@/types/pricing";

const PricingCard = ({ plan }: PricingCardProps) => {
  const hasInfoIcon = (feature: string) => {
    return feature.includes("pages") || feature.includes("Data retention") || feature.includes("Team performance") || feature.includes("Enhanced API") || feature.includes("Audit Logs") || feature.includes("Password security");
  };

  const getButtonStyles = () => {
    if (plan.isEnterprise) {
      return `${plan.buttonColor} text-white font-semibold py-3 sm:py-4 px-4 sm:px-6 rounded-full transition-all duration-300 text-sm sm:text-base lg:text-lg shadow-[0_4px_14px_0_rgba(20,184,166,0.25)] hover:shadow-[0_6px_20px_rgba(20,184,166,0.4)] transform hover:-translate-y-0.5 touch-target`;
    } else {
      return `${plan.buttonColor} text-white font-semibold py-3 sm:py-4 px-4 sm:px-6 rounded-full transition-all duration-300 text-sm sm:text-base lg:text-lg shadow-[0_4px_14px_0_rgba(239,68,68,0.25)] hover:shadow-[0_6px_20px_rgba(239,68,68,0.4)] transform hover:-translate-y-0.5 relative overflow-hidden touch-target`;
    }
  };

  const getOptionalAddOns = () => {
    switch (plan.id) {
      case "pro":
        return [
          { label: "Users:", value: "Not available", hasInfo: false },
          { label: "Pages:", value: "Not available", hasInfo: false },
          { label: "Social and web monitoring:", value: "Custom", hasInfo: true }
        ];
      case "business":
        return [
          { label: "Users:", value: "Free and unlimited", hasInfo: false },
          { label: "Pages:", value: "$15/mo", hasInfo: true },
          { label: "Social and web monitoring:", value: "Custom", hasInfo: true }
        ];
      case "enterprise":
        return [
          { label: "Users:", value: "Free and unlimited", hasInfo: false },
          { label: "Pages:", value: "Custom", hasInfo: true },
          { label: "Social and web monitoring:", value: "Custom", hasInfo: true }
        ];
      default:
        return [];
    }
  };

  return (
    <div className="relative w-full h-full flex flex-col">
      {/* Decorative Graphic */}
      <div className="absolute -top-6 sm:-top-8 left-1/2 transform -translate-x-1/2 z-10">
        <DecorativeGraphic planId={plan.id} />
      </div>
      
      {/* Card */}
      <div className="bg-white border border-gray-200 rounded-2xl sm:rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_12px_40px_rgb(0,0,0,0.08)] transition-all duration-300 relative overflow-hidden antialiased flex flex-col h-full">
        
        {/* Main Card Content */}
        <div className="p-4 sm:p-6 lg:p-8 pt-12 sm:pt-16 pb-0 flex-1 flex flex-col">
          {/* Plan Name */}
          <div className="text-center mb-4 sm:mb-6 lg:mb-8">
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 antialiased">{plan.name}</h3>
          </div>

          {/* Price */}
          <div className="text-center mb-2 sm:mb-3">
            {plan.isEnterprise ? (
              <div className="text-sm sm:text-base lg:text-lg text-gray-600 font-medium antialiased">{plan.price}</div>
            ) : (
              <div className="flex items-baseline justify-center">
                <span className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 antialiased">{plan.price}</span>
                <span className="text-base sm:text-lg lg:text-xl text-gray-500 ml-1 font-medium antialiased">{plan.period}</span>
              </div>
            )}
          </div>

          {/* Billing Cycle */}
          {plan.billing && (
            <div className="text-center mb-4 sm:mb-6 lg:mb-8">
              <p className="text-xs sm:text-sm text-gray-400 antialiased font-normal">{plan.billing}</p>
            </div>
          )}

          {/* CTA Button */}
          <div className="mb-4 sm:mb-6 lg:mb-8">
            <button className={`w-full ${getButtonStyles()}`}>
              {!plan.isEnterprise && (
                <div className="absolute inset-x-0 bottom-0 h-1 bg-red-600/30 rounded-b-full"></div>
              )}
              {plan.buttonText}
            </button>
          </div>

          {/* Usage Limits Box */}
          <div className={`${plan.limitsBg} rounded-xl sm:rounded-2xl p-3 sm:p-4 lg:p-6 mb-4 sm:mb-6 lg:mb-8 relative`} style={{
            boxShadow: 'inset 0 1px 2px rgba(0, 0, 0, 0.05)',
            border: '1px solid rgba(0, 0, 0, 0.05)'
          }}>
            <div className="absolute inset-x-0 top-0 h-px bg-black/10"></div>
            <div className="space-y-2 sm:space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs sm:text-sm lg:text-base text-gray-700 font-medium antialiased">{plan.users}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs sm:text-sm lg:text-base text-gray-700 font-medium antialiased">{plan.pages}</span>
                {hasInfoIcon(plan.pages) && (
                  <div className="bg-gray-100 rounded-full p-1 shadow-sm border border-gray-200">
                    <Info className="w-3 h-3 text-gray-500" />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Features List */}
          <div className="space-y-2 sm:space-y-3 lg:space-y-4 mb-4 sm:mb-6 lg:mb-8 flex-1">
            {plan.features.map((feature, index) => (
              <div key={index} className="flex items-start space-x-2 sm:space-x-3">
                {feature.startsWith("←") ? (
                  <div className="flex-shrink-0 w-4 h-4 sm:w-5 sm:h-5"></div>
                ) : (
                  <Check className="flex-shrink-0 w-4 h-4 sm:w-5 sm:h-5 text-green-500 mt-0.5" />
                )}
                <div className="flex items-center justify-between w-full">
                  <span className={`${
                    feature.startsWith("←") 
                      ? "text-xs sm:text-sm text-gray-400 font-normal block mb-1 antialiased" 
                      : "text-xs sm:text-sm lg:text-base text-gray-700 font-medium antialiased"
                  }`}>
                    {feature}
                  </span>
                  {hasInfoIcon(feature) && !feature.startsWith("←") && (
                    <div className="bg-gray-100 rounded-full p-1 ml-2 shadow-sm border border-gray-200">
                      <Info className="w-3 h-3 text-gray-500" />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Optional Add-ons Section - Full width at bottom */}
        <div className={`${plan.limitsBg} p-3 sm:p-4 lg:p-6 rounded-b-2xl sm:rounded-b-3xl relative flex-shrink-0`} style={{
          boxShadow: 'inset 0 1px 2px rgba(0, 0, 0, 0.05)',
          border: '1px solid rgba(0, 0, 0, 0.05)',
          borderTop: 'none'
        }}>
          <div className="absolute inset-x-0 top-0 h-px bg-black/10"></div>
          
          {/* Section Title */}
          <div className="mb-2 sm:mb-3 lg:mb-4">
            <h4 className="text-rose-500 font-medium italic text-xs sm:text-sm antialiased">
              Optional add-ons
            </h4>
          </div>
          
          {/* Add-ons List */}
          <div className="space-y-1 sm:space-y-2 lg:space-y-3">
            {getOptionalAddOns().map((addon, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-xs sm:text-sm text-gray-700 antialiased">
                  <span className="font-bold">{addon.label}</span> {addon.value}
                </span>
                {addon.hasInfo && (
                  <div className="bg-gray-100 rounded-full p-1 shadow-sm border border-gray-200">
                    <Info className="w-3 h-3 text-gray-500" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingCard; 