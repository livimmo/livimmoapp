export interface Message {
  id: number;
  text: string;
  isBot: boolean;
  timestamp: Date;
  actions?: {
    type: "contact" | "call" | "whatsapp";
    label: string;
    action: () => void;
  }[];
}

export interface AIChatProps {
  property: Property;
  onClose: () => void;
}