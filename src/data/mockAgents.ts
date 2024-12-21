import { Agent } from "@/types/agent";

export const mockAgents: Agent[] = [
  {
    id: 1,
    name: "Sarah Martin",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2",
    company: "Immobilier Premium",
    companyLogo: "https://example.com/premium-logo.png",
    location: "Casablanca",
    type: "agent",
    rating: 4.8,
    totalReviews: 156,
    activeProperties: 12,
    completedLives: 45,
    scheduledLives: 3,
    soldProperties: 89,
    specialties: ["Résidentiel", "Luxe", "Villas"],
    verified: true,
    contact: {
      phone: "+212 6 12 34 56 78",
      email: "sarah.martin@premium.ma",
      social: {
        linkedin: "https://linkedin.com/in/sarah-martin",
        instagram: "https://instagram.com/sarahmartin",
        facebook: "https://facebook.com/sarahmartinimmo"
      }
    },
    description: "Spécialiste de l'immobilier de luxe à Casablanca avec plus de 10 ans d'expérience."
  },
  {
    id: 2,
    name: "Hicham Berrada",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
    company: "Lamap",
    companyLogo: "/lovable-uploads/2c5cdac7-efc4-4b21-af73-7e198de56621.png",
    location: "Rabat",
    type: "agent",
    rating: 4.6,
    totalReviews: 89,
    activeProperties: 25,
    completedLives: 30,
    scheduledLives: 5,
    soldProperties: 167,
    specialties: ["Résidentiel", "Commercial", "Projets Neufs"],
    verified: true,
    contact: {
      phone: "+212 6 23 45 67 89",
      email: "h.berrada@lamap.ma",
      social: {
        linkedin: "https://linkedin.com/in/hicham-berrada",
        facebook: "https://facebook.com/lamapimmo",
        instagram: "https://instagram.com/lamapimmobilier"
      }
    },
    description: "Expert immobilier chez Lamap, spécialisé dans l'accompagnement personnalisé pour vos projets immobiliers."
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
    specialties: ["Riads", "Villas", "Propriétés de Luxe"],
    verified: true,
    contact: {
      phone: "+212 6 34 56 78 90",
      email: "yasmine.idrissi@gmail.com",
      social: {
        instagram: "https://instagram.com/yasmine.immo",
        facebook: "https://facebook.com/yasmineidrissiimmo"
      }
    },
    description: "Experte en riads et propriétés de prestige à Marrakech depuis 15 ans. Ma connaissance approfondie de la médina et des quartiers prisés de Marrakech, combinée à mon réseau exclusif, me permet d'offrir un service sur mesure à une clientèle internationale exigeante. Spécialisée dans les transactions de luxe et la rénovation de riads historiques."
  },
  {
    id: 4,
    name: "Karim Benjelloun",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e",
    company: "KB Immobilier",
    location: "Tanger",
    type: "agent",
    rating: 4.7,
    totalReviews: 178,
    activeProperties: 15,
    completedLives: 38,
    scheduledLives: 6,
    soldProperties: 95,
    specialties: ["Vue Mer", "Appartements", "Investissement"],
    verified: true,
    contact: {
      phone: "+212 6 45 67 89 01",
      email: "karim@kbimmobilier.ma",
      social: {
        linkedin: "https://linkedin.com/in/karimbenjelloun",
        instagram: "https://instagram.com/kb.immobilier"
      }
    },
    description: "Expert immobilier spécialisé dans les biens avec vue mer à Tanger. Fort de 8 ans d'expérience, je conseille particulièrement les investisseurs et les acquéreurs à la recherche de propriétés à fort potentiel. Ma connaissance du marché local et mon réseau étendu me permettent d'identifier les meilleures opportunités pour mes clients."
  },
  {
    id: 5,
    name: "Sofia El Mansouri",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956",
    company: "Mansouri Développement",
    location: "Casablanca",
    type: "promoter",
    rating: 4.8,
    totalReviews: 142,
    activeProperties: 30,
    completedLives: 25,
    scheduledLives: 8,
    soldProperties: 245,
    specialties: ["Résidentiel Haut Standing", "Bureaux", "Retail"],
    verified: true,
    contact: {
      phone: "+212 6 56 78 90 12",
      email: "sofia@mansouri-dev.ma",
      social: {
        linkedin: "https://linkedin.com/in/sofiaelmansouri",
        facebook: "https://facebook.com/mansouridev",
        instagram: "https://instagram.com/mansouri_development"
      }
    },
    description: "À la tête de Mansouri Développement, nous concevons et réalisons des projets immobiliers innovants qui redéfinissent les standards du secteur. Notre société est reconnue pour ses réalisations architecturales audacieuses et son engagement envers le développement durable. Nous avons livré plus de 20 projets majeurs à Casablanca, totalisant plus de 2000 unités résidentielles et 50,000 m² de surfaces commerciales."
  }
];
