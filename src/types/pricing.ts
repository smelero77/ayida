export interface PricingPlan {
  id: string;
  name: string;
  price: string;
  period: string;
  billing: string;
  buttonText: string;
  buttonColor: string;
  limitsBg: string;
  users: string;
  pages: string;
  features: string[];
  isEnterprise: boolean;
}

export interface OptionalAddOn {
  label: string;
  value: string;
  hasInfo: boolean;
}

export interface PricingCardProps {
  plan: PricingPlan;
}

export interface DecorativeGraphicProps {
  planId: string;
} 