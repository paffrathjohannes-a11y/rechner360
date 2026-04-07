import {
  Calculator, Wallet, Landmark, Home, HeartPulse, Baby, ShieldCheck,
  Percent, Building, TrendingDown, TrendingUp, Banknote, MapPin,
  Milestone, HardHat, Users, Scale, Flame, Receipt, Briefcase, ArrowUpRight,
} from 'lucide-react';

export const iconMap: Record<string, typeof Calculator> = {
  calculator: Calculator,
  wallet: Wallet,
  landmark: Landmark,
  home: Home,
  'heart-pulse': HeartPulse,
  baby: Baby,
  'shield-check': ShieldCheck,
  percent: Percent,
  building: Building,
  'trending-down': TrendingDown,
  banknote: Banknote,
  'hard-hat': HardHat,
  users: Users,
  scale: Scale,
  flame: Flame,
  'trending-up': TrendingUp,
  'map-pin': MapPin,
  milestone: Milestone,
  receipt: Receipt,
  briefcase: Briefcase,
  'arrow-up-right': ArrowUpRight,
};

export const colorMap: Record<string, { bg: string; icon: string; border: string }> = {
  primary: {
    bg: 'bg-primary-50 dark:bg-primary-900/20',
    icon: 'text-primary-600 dark:text-primary-400',
    border: 'hover:border-primary-300 dark:hover:border-primary-700',
  },
  accent: {
    bg: 'bg-accent-50 dark:bg-accent-900/20',
    icon: 'text-accent-600 dark:text-accent-400',
    border: 'hover:border-accent-300 dark:hover:border-accent-700',
  },
};

export function getIcon(name: string) {
  return iconMap[name] || Calculator;
}

export function getColors(color: string) {
  return colorMap[color] || colorMap.primary;
}
