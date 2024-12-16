export const getRandomTags = () => {
  const allTags = ["Coup de fusil", "Nouveauté", "Exclusivité", "Neuf", "Solde"];
  const numberOfTags = Math.floor(Math.random() * 2) + 1; // 1 ou 2 tags
  const shuffled = [...allTags].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, numberOfTags);
};