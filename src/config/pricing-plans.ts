import type { PricingPlan } from "@/types/pricing";

export const pricingPlans: PricingPlan[] = [
  {
    id: "pro",
    name: "Pro",
    price: "$99",
    period: "/mo",
    billing: "when billed monthly",
    buttonText: "Get a demo",
    buttonColor: "bg-red-500 hover:bg-red-600",
    limitsBg: "bg-pink-50",
    users: "1 user",
    pages: "10 pages",
    features: [
      "Social media engagement inbox",
      "Content publishing and scheduling", 
      "Analytics reports",
      "Competitor analysis reports",
      "1-1 Onboarding and training",
      "Data retention: 7 months"
    ],
    isEnterprise: false
  },
  {
    id: "business", 
    name: "Business",
    price: "$199",
    period: "/mo",
    billing: "when billed monthly",
    buttonText: "Get a demo",
    buttonColor: "bg-red-500 hover:bg-red-600",
    limitsBg: "bg-pink-50",
    users: "Unlimited users",
    pages: "15 pages",
    features: [
      "← Everything in Pro, plus:",
      "Data retention: 13 months",
      "Assignment and approval workflows",
      "Team performance reports",
      "Multilevel user roles"
    ],
    isEnterprise: false
  },
  {
    id: "enterprise",
    name: "Enterprise", 
    price: "Contact sales for pricing",
    period: "",
    billing: "",
    buttonText: "Talk to us",
    buttonColor: "bg-teal-500 hover:bg-teal-600",
    limitsBg: "bg-teal-50",
    users: "Unlimited users",
    pages: "Custom pages",
    features: [
      "Data retention: 25 months",
      "Dedicated account manager",
      "Enhanced API", 
      "Audit Logs",
      "Password security policy",
      "Custom contract and invoicing"
    ],
    isEnterprise: true
  }
];

export const pricingBenefits = [
  "No credit card required",
  "14-day free trial",
  "Cancel anytime"
];

export const annualDiscount = "save up to 20%"; 