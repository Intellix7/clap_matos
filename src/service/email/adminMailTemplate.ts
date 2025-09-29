export default function adminMailTemplate(name: string, gameName: string) {
  return `
    <div>
      <h1>Rappel d'emprunt de jeu</h1>
      <p>${name} devait rendre le jeu ${gameName} et ne l'a pas fait.</p>
      <p>Il faut le relancer pour récupérer le jeu.</p>
    </div>
  `;
}
