export interface ShopSettings {
  id?: string;
  shopName: string;
  phone: string;
  address: string;
  instagramUrl?: string;
  whatsappUrl?: string;
  isOpen: boolean;
  openHours: {
    day: string;
    open: string;
    close: string;
    isClosed: boolean;
  }[];
  storeNotice?: string;
}
