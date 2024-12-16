export interface BotQuestion {
  id: number;
  text: string;
  category: string;
  followUpQuestions?: BotQuestion[];
}

export const botQuestions: BotQuestion[] = [
  {
    id: 1,
    text: "Quel est le prix du bien ?",
    category: "prix",
  },
  {
    id: 2,
    text: "Quelles sont les caractéristiques principales ?",
    category: "caracteristiques",
    followUpQuestions: [
      { id: 21, text: "Combien y a-t-il de chambres ?", category: "chambres" },
      { id: 22, text: "Quelle est la surface habitable ?", category: "surface" },
    ],
  },
  {
    id: 3,
    text: "Y a-t-il des visites disponibles ?",
    category: "visites",
  },
  {
    id: 4,
    text: "Quels sont les services à proximité ?",
    category: "services",
    followUpQuestions: [
      { id: 41, text: "Y a-t-il des écoles à proximité ?", category: "ecoles" },
      { id: 42, text: "Y a-t-il des commerces proches ?", category: "commerces" },
    ],
  },
];

export const welcomeMessage = {
  id: 0,
  user: "Bot",
  message: "Bonjour ! Je suis là pour vous aider. Voici quelques questions fréquentes :",
  timestamp: new Date(),
  isBot: true,
};