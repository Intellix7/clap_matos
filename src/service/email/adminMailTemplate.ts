export default function adminMailTemplate(name: string, gamesName: string[]) {
  return `
    <div>
      <h1>Rappel d'emprunt de jeu</h1>
      <p>${name} devait rendre les jeux ${gamesName.join(', ')} et ne l'a pas fait.</p>
      <p>Il faut le relancer pour récupérer les jeux.</p>
    </div>
  `;
}
