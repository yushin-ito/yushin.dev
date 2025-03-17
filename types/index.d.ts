import Icons from "@/components/icons";

export interface SiteConfig {
  name: string;
  description: string;
  domain: string;
  url: string;
  links: {
    x: string;
    github: string;
    discord: string;
  };
}

export interface NavConfig {
  content: NavItem[];
  dashboard: NavItem[];
}

export interface NavItem {
  label: string;
  href: string;
  icon?: keyof typeof Icons;
}
