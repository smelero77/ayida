
"use client";

import { Check } from 'lucide-react';
import { Button } from './ui/button';

const Pricing = () => {
  const plans = [
    {
      name: 'Hobby',
      price: '99',
      period: '/month',
      description: 'Get Hobby',
      features: [
        'Access to basic analytics reports',
        'Up to 10,000 data points per month',
        'Email support',
        'Community forum access',
        'Cancel anytime'
      ],
      buttonText: 'Get Hobby',
      popular: false
    },
    {
      name: 'Starter',
      price: '299',
      period: '/month',
      description: 'Get Starter',
      features: [
        'Advanced analytics dashboard',
        'Customizable reports and charts',
        'Real-time data tracking',
        'Integration with third-party tools',
        'Everything in Hobby Plan'
      ],
      buttonText: 'Get Starter',
      popular: true
    },
    {
      name: 'Pro',
      price: '1490',
      period: '/month',
      description: 'Get Pro',
      features: [
        'Unlimited data storage',
        'Customizable dashboards',
        'Advanced data segmentation',
        'Real-time data processing',
        'AI-powered insights and recommendations',
        'Everything in Hobby Plan',
        'Everything in Pro Plan'
      ],
      buttonText: 'Get Pro',
      popular: false
    }
  ];

  return (
    <section id="pricing" className="py-24 bg-black">
      <div className="container mx-auto px-4 lg:px-6">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Simple pricing for advanced people
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Our pricing is designed for advanced people who need more features and more flexibility.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative bg-gray-900/50 border border-gray-800 rounded-xl p-8 ${
                plan.popular ? 'ring-2 ring-white/20' : ''
              }`}
            >
              {/* Popular badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-white text-black px-4 py-1 rounded-full text-sm font-semibold">
                    Featured
                  </div>
                </div>
              )}

              {/* Plan name */}
              <h3 className="text-xl font-semibold text-white mb-2">{plan.name}</h3>

              {/* Price */}
              <div className="mb-6">
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-white">$</span>
                  <span className="text-4xl font-bold text-white">{plan.price}</span>
                  <span className="text-gray-400">{plan.period}</span>
                </div>
              </div>

              {/* CTA Button */}
              <Button
                className={`w-full mb-8 ${
                  plan.popular
                    ? 'bg-white text-black hover:bg-gray-200'
                    : 'bg-gray-800 text-white hover:bg-gray-700 border border-gray-700'
                }`}
              >
                {plan.buttonText}
              </Button>

              {/* Features */}
              <div className="space-y-4">
                {plan.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-green-500" />
                    </div>
                    <span className="text-gray-300 text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
