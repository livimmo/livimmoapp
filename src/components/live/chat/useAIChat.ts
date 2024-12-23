import { useState, useEffect } from "react";
import { Message } from "./types";
import { Property } from "@/types/property";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

export const useAIChat = (property: Property, onClose: () => void) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    setMessages([
      {
        id: 1,
        text: `Bonjour ! Je suis votre assistant virtuel pour la visite de ${property.title}. Je peux vous donner des informations sur le prix, la localisation, les caractéristiques du bien ou vous mettre en relation avec un agent. Que souhaitez-vous savoir ?`,
        isBot: true,
        timestamp: new Date(),
      },
    ]);
  }, [property.title]);

  const handleContactAgent = async () => {
    const { data: agent } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', property.agent_id)
      .single();

    if (agent?.phone) {
      window.location.href = `tel:${agent.phone}`;
    }
  };

  const handleWhatsAppAgent = async () => {
    const { data: agent } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', property.agent_id)
      .single();

    if (agent?.phone) {
      const formattedPhone = agent.phone.replace(/\s+/g, '');
      const message = encodeURIComponent(`Bonjour, je suis intéressé(e) par le bien "${property.title}"`);
      window.location.href = `https://wa.me/${formattedPhone}?text=${message}`;
    }
  };

  const generateAgentResponse = async () => {
    const { data: agent } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', property.agent_id)
      .single();

    return {
      id: Date.now(),
      text: `Bien sûr ! Voici les coordonnées de ${agent?.full_name} :\n\nTéléphone : ${agent?.phone}\n\nVous pouvez le contacter directement ou utiliser les boutons ci-dessous.`,
      isBot: true,
      timestamp: new Date(),
      actions: [
        {
          type: "call",
          label: "Appeler maintenant",
          action: handleContactAgent,
        },
        {
          type: "whatsapp",
          label: "Envoyer un WhatsApp",
          action: handleWhatsAppAgent,
        },
      ],
    };
  };

  const generateAIResponse = async (userMessage: string) => {
    setIsTyping(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));

    let response = "";
    const lowercaseMessage = userMessage.toLowerCase();

    if (
      lowercaseMessage.includes("agent") ||
      lowercaseMessage.includes("contact") ||
      lowercaseMessage.includes("parler") ||
      lowercaseMessage.includes("appeler")
    ) {
      setIsTyping(false);
      return generateAgentResponse();
    }

    if (lowercaseMessage.includes("prix")) {
      response = `Le prix de ce bien est de ${property.price.toLocaleString()} DH. Souhaitez-vous être mis en relation avec l'agent pour plus d'informations ?`;
    } else if (lowercaseMessage.includes("localisation") || lowercaseMessage.includes("adresse")) {
      response = `Ce bien est situé à ${property.location}. C'est un quartier très prisé avec de nombreux commerces et services à proximité.`;
    } else if (lowercaseMessage.includes("surface") || lowercaseMessage.includes("taille")) {
      response = `La surface habitable est de ${property.surface}m². Le bien dispose de ${property.rooms} pièces et ${property.bathrooms} salles de bain.`;
    } else {
      response = "Je peux vous donner des informations sur le prix, la localisation, la surface, ou vous mettre en contact avec l'agent. Que souhaitez-vous savoir ?";
    }

    setIsTyping(false);
    return {
      id: Date.now(),
      text: response,
      isBot: true,
      timestamp: new Date(),
    };
  };

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now(),
      text: input,
      isBot: false,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    const aiResponse = await generateAIResponse(input);
    setMessages((prev) => [...prev, aiResponse]);
  };

  return {
    messages,
    input,
    setInput,
    isTyping,
    handleSendMessage,
  };
};