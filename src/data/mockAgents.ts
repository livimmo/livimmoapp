import { Agent } from "@/types/agent";

export const mockAgents: Agent[] = [
  {
    id: 1,
    name: "Sarah Martin",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2",
    company: "Immobilier Premium",
    location: "Casablanca",
    type: "agent",
    rating: 4.8,
    totalReviews: 156,
    activeProperties: 12,
    completedLives: 45,
    scheduledLives: 3,
    soldProperties: 89,
    specialties: ["Résidentiel", "Luxe"],
    verified: true,
    contact: {
      phone: "+212 6 12 34 56 78",
      email: "sarah.martin@premium.ma",
      social: {
        linkedin: "https://linkedin.com/in/sarah-martin",
        instagram: "https://instagram.com/sarahmartin"
      }
    },
    description: "Spécialiste de l'immobilier de luxe à Casablanca avec plus de 10 ans d'expérience."
  },
  {
    id: 2,
    name: "Mohammed Alami",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
    company: "Groupe Alami Immobilier",
    location: "Rabat",
    type: "promoter",
    rating: 4.6,
    totalReviews: 89,
    activeProperties: 25,
    completedLives: 30,
    scheduledLives: 5,
    soldProperties: 67,
    specialties: ["Résidentiel", "Commercial"],
    verified: true,
    contact: {
      phone: "+212 6 23 45 67 89",
      email: "m.alami@alami-immo.ma",
      social: {
        linkedin: "https://linkedin.com/in/mohammed-alami",
        facebook: "https://facebook.com/alamiimmo"
      }
    },
    description: "Promoteur immobilier de référence à Rabat, spécialisé dans les projets résidentiels et commerciaux."
  },
  {
    id: 3,
    name: "Yasmine Idrissi",
    avatar: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e",
    location: "Marrakech",
    type: "agent",
    rating: 4.9,
    totalReviews: 203,
    activeProperties: 8,
    completedLives: 62,
    scheduledLives: 4,
    soldProperties: 124,
    specialties: ["Riads", "Villas"],
    verified: true,
    contact: {
      phone: "+212 6 34 56 78 90",
      email: "yasmine.idrissi@gmail.com",
      social: {
        instagram: "https://instagram.com/yasmine.immo"
      }
    },
    description: "Experte en riads et propriétés de prestige à Marrakech. Je vous accompagne dans vos projets immobiliers d'exception."
  }
];