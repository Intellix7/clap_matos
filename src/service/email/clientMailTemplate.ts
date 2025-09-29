export default function clientMailTemplate(name: string, gameName: string) {
  return `
    <div>
      <h1>Bonjour ${name},</h1>
      <p>Vous devez rendre le ${gameName} dans moins de 24 heures.</p>
    </div>
  `;
}
