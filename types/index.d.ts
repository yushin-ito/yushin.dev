import Icons from "@/components/icons";

export interface SiteConfig {
  name: string;
  description: string;
  domain: string;
  url: string;
  links: {
    x: string;
    github: string;
    instagram: string;
  };
}

export interface NavConfig {
  contents: NavItem[];
  dashboard: NavItem[];
}

export interface NavItem {
  label: string;
  href: string;
  external?: boolean;
  icon?: keyof typeof Icons;
}
