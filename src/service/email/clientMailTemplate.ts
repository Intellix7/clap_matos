export default function clientMailTemplate(name: string, gamesName: string[]) {
  return `
    <div>
      <h1>Bonjour ${name},</h1>
      <p>Vous devez rendre les jeux ${gamesName.join(', ')} dans moins de 24 heures.</p>
    </div>
  `;
}
