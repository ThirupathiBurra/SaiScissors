import { BUSINESS } from '@/lib/constants';

/**
 * Helper to encode text for WhatsApp URLs
 */
const encodeWhatsAppURL = (phone: string, text: string) => {
  // Strip non-numeric from phone
  const cleanPhone = phone.replace(/\D/g, '');
  return `https://wa.me/91${cleanPhone}?text=${encodeURIComponent(text)}`;
};

export const generateBookingConfirmation = (customerName: string, serviceName: string, date: string, time: string, phone: string) => {
  const text = `Hi ${customerName},\n\nYour booking at ${BUSINESS.name} is confirmed! ✨\n\n✂️ Service: ${serviceName}\n📅 Date: ${date}\n⏰ Time: ${time}\n\nWe look forward to seeing you. Let us know if you need to reschedule.\n\n📍 ${BUSINESS.address}`;
  return encodeWhatsAppURL(phone, text);
};

export const generateCancellationMessage = (customerName: string, serviceName: string, phone: string) => {
  const text = `Hi ${customerName},\n\nWe're sorry to inform you that your booking for ${serviceName} at ${BUSINESS.name} has been cancelled.\n\nPlease let us know if you'd like to reschedule for another time.\n\nThank you,\n${BUSINESS.name}`;
  return encodeWhatsAppURL(phone, text);
};

export const generateReminderMessage = (customerName: string, time: string, phone: string) => {
  const text = `Hi ${customerName},\n\nJust a quick reminder about your appointment at ${BUSINESS.name} today at ${time} 💈.\n\nSee you soon!`;
  return encodeWhatsAppURL(phone, text);
};

export const generateCompletionMessage = (customerName: string, serviceName: string, phone: string) => {
  const text = `Hi ${customerName},\n\nThank you for visiting ${BUSINESS.name} today for your ${serviceName}! We hope you loved the service.\n\nHave a great day ahead! ✨`;
  return encodeWhatsAppURL(phone, text);
};

export const generateThankYouMessage = (customerName: string, phone: string) => {
  const text = `Hi ${customerName},\n\nThank you for choosing ${BUSINESS.name}! We appreciate your business and hope to see you again soon.`;
  return encodeWhatsAppURL(phone, text);
};

export const generateReviewRequest = (customerName: string, phone: string) => {
  const text = `Hi ${customerName},\n\nWe hope you enjoyed your recent visit to ${BUSINESS.name}! If you have a minute, we'd love it if you could leave us a quick review. It really helps our business grow! 🌟\n\nThank you!`;
  return encodeWhatsAppURL(phone, text);
};
