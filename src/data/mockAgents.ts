import { Agent } from "@/types/agent";

export const mockAgents: Agent[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    phone: "+212 6XX XXX XXX",
    avatar: "/placeholder.svg",
    image: "/placeholder.svg",
    location: "Casablanca",
    type: "agent",
    company: "Immobilier Premium",
    companyLogo: "/placeholder.svg",
    verified: true,
    rating: 4.8,
    totalReviews: 124,
    activeProperties: 15,
    completedLives: 45,
    scheduledLives: 10,
    soldProperties: 89,
    description: "Expert en immobilier de luxe",
    specialties: ["Villas", "Appartements de luxe", "Riads"],
    social: {
      facebook: "https://facebook.com/johndoe",
      instagram: "https://instagram.com/johndoe",
      linkedin: "https://linkedin.com/in/johndoe"
    }
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    phone: "+212 6YY YYY YYY",
    avatar: "/placeholder2.svg",
    location: "Marrakech",
    type: "promoter",
    company: "Projets Innovants",
    verified: true,
    rating: 4.5,
    totalReviews: 98,
    activeProperties: 10,
    completedLives: 30,
    soldProperties: 50
  },
  {
    id: "3",
    name: "Alice Johnson",
    email: "alice@example.com",
    phone: "+212 6ZZ ZZZ ZZZ",
    avatar: "/placeholder3.svg",
    location: "Rabat",
    type: "agent",
    company: "Rabat Realty",
    verified: false,
    rating: 4.0,
    totalReviews: 60,
    activeProperties: 5,
    completedLives: 20,
    soldProperties: 30
  },
  {
    id: "4",
    name: "Bob Brown",
    email: "bob@example.com",
    phone: "+212 6AA AAA AAA",
    avatar: "/placeholder4.svg",
    location: "Tangier",
    type: "promoter",
    company: "Tangier Developments",
    verified: true,
    rating: 4.7,
    totalReviews: 75,
    activeProperties: 8,
    completedLives: 25,
    soldProperties: 40
  }
];