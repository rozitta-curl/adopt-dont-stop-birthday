export type PaymentType = "once" | "monthly";

export interface DonationFormData {
  amount: number;
  customAmount?: string;
  email: string;
  paymentType: PaymentType;
}

export interface OrderData {
  email: string;
  amount: number;
  paymentType: PaymentType;
}

export interface LiqpayPaymentParams {
  amount: number;
  description: string;
  orderId: string;
  resultUrl: string;
  serverUrl: string;
  userEmail: string;
  paymentType: PaymentType;
}

export interface LiqpayPaymentResponse {
  data: string;
  signature: string;
  checkoutUrl: string;
}

export interface LiqpayCallbackData {
  data: string;
  signature: string;
}

export interface EmailTemplateData {
  recipientEmail: string;
  recipientName?: string;
  donationAmount: number;
  orderId: string;
}

export interface TimelineItem {
  year: string;
  title?: string;
  description: string;
}

export interface StoryCard {
  id: number;
  name: string;
  description: string;
  imageAlt: string;
}

export interface AnimalCard {
  id: number;
  name: string;
  age?: string;
  imageAlt: string;
}

export interface WhatsNextCard {
  id: number;
  title: string;
  description: string;
}
