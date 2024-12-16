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
    followUpQuestions: [
      { id: 11, text: "Y a-t-il des possibilités de négociation ?", category: "prix" },
      { id: 12, text: "Quels sont les frais annexes ?", category: "prix" }
    ]
  },
  {
    id: 2,
    text: "Quelles sont les caractéristiques principales ?",
    category: "caracteristiques",
    followUpQuestions: [
      { id: 21, text: "Combien y a-t-il de chambres ?", category: "chambres" },
      { id: 22, text: "Quelle est la surface habitable ?", category: "surface" }
    ]
  },
  {
    id: 3,
    text: "Comment puis-je visiter ce bien ?",
    category: "visites",
    followUpQuestions: [
      { id: 31, text: "Quand sont les prochaines visites disponibles ?", category: "visites" },
      { id: 32, text: "Puis-je avoir une visite privée ?", category: "visites" }
    ]
  }
];

export const welcomeMessage = {
  id: 0,
  user: "Bot",
  message: "Bonjour ! Je suis là pour vous aider. Voici quelques questions fréquentes :",
  timestamp: new Date(),
  isBot: true,
};