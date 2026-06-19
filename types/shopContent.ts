export interface ShopContent {
  id?: string;
  // Hero CMS
  heroTitle: string;
  heroSubtitle: string;
  
  // Contact Info
  phone: string;
  whatsapp: string;
  instagram: string;
  address: string;
  
  // Hours
  openingTime: string;
  closingTime: string;
  
  // Notices & Footers
  footerText: string;
  notice?: string;
  socialLinks?: {
    facebook?: string;
    twitter?: string;
    youtube?: string;
  };
  
  // SEO CMS
  metaTitle: string;
  metaDescription: string;
  keywords: string;
  ogImage?: string;
}
