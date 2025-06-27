"use client";

import PricingCard from "./pricing-card";
import { Check } from "lucide-react";
import { Switch } from "./switch";
import { useState } from "react";
import { pricingPlans, pricingBenefits, annualDiscount } from "@/config/pricing-plans";

const PricingSection = () => {
  const [isAnnual, setIsAnnual] = useState(false);

  return (
    <section className="min-h-screen bg-gradient-to-b from-yellow-50/30 to-white py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 font-rubik antialiased">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center max-w-4xl mx-auto mb-12 sm:mb-16 lg:mb-20">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 mb-4 sm:mb-6 lg:mb-8 antialiased leading-tight">
            Grow faster with the right plan
          </h1>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-700 leading-relaxed antialiased mb-8 sm:mb-12 lg:mb-16 max-w-3xl mx-auto px-4 sm:px-6">
            Our pricing plans include everything social media marketers need to publish, engage, analyze, listen, and monitor competitors.
          </p>
          
          {/* Bottom Section with Benefits and Toggle */}
          <div className="flex flex-col lg:flex-row items-center justify-between max-w-5xl mx-auto gap-6 lg:gap-0">
            {/* Benefits List */}
            <div className="flex flex-wrap items-center justify-center gap-x-3 sm:gap-x-4 lg:gap-x-8 gap-y-2 sm:gap-y-3 order-2 lg:order-1">
              {pricingBenefits.map((benefit, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <Check className="w-4 h-4 sm:w-5 sm:h-5 text-gray-800 flex-shrink-0" />
                  <span className="text-xs sm:text-sm lg:text-base text-gray-700 font-medium">{benefit}</span>
                </div>
              ))}
            </div>
            
            {/* Billing Toggle */}
            <div className="flex items-center space-x-3 sm:space-x-4 relative order-1 lg:order-2">
              <span className={`text-xs sm:text-sm lg:text-base text-gray-700 font-medium ${!isAnnual ? 'text-gray-900' : 'text-gray-500'}`}>
                Monthly
              </span>
              <Switch 
                checked={isAnnual} 
                onCheckedChange={setIsAnnual}
                className="data-[state=checked]:bg-teal-500"
              />
              <div className="relative">
                <span className={`text-xs sm:text-sm lg:text-base text-gray-700 font-medium ${isAnnual ? 'text-gray-900' : 'text-gray-500'}`}>
                  Annually
                </span>
                {/* Save Badge */}
                <div className="absolute -top-6 sm:-top-8 left-1/2 transform -translate-x-1/2">
                  <div className="relative">
                    <span className="text-teal-600 font-semibold text-xs sm:text-sm whitespace-nowrap">
                      {annualDiscount}
                    </span>
                    <svg 
                      className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-3 h-2 sm:w-4 sm:h-3 text-teal-600" 
                      viewBox="0 0 16 12" 
                      fill="currentColor"
                    >
                      <path d="M2 2C6 6 10 6 14 2" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round"/>
                      <path d="M12 0L14 2L12 4" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10 max-w-6xl mx-auto">
          {pricingPlans.map((plan) => (
            <div key={plan.id} className="flex">
              <PricingCard plan={plan} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection; 