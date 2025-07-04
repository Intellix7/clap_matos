import bcrypt from 'bcrypt'

export default function saltAndHashPassword(password: string): string {
  const saltRounds = 10

  return bcrypt.hashSync(password, saltRounds)
}
