import { getPayload } from 'payload'
import { User } from '@/payload-types'
import config from '@/payload.config'

export async function getUserFromDb(email: string, hashedPassword: string): Promise<User | null> {
  const payload = await getPayload({ config })
  try {
    // Search for user by email
    const result = await payload.find({
      collection: 'users',
      where: {
        email: {
          equals: email,
        },
      },
    })

    const user = result.totalDocs > 0 ? result.docs[0] : null

    // If user not found or password doesn't match, return null
    if (!user) {
      console.log('User not found')
      return null
    }
    // Check if the provided hashed password matches the user's password

    if (user.password !== hashedPassword) {
      console.log('Password does not match')
      throw new Error('Invalid credentials')
      return null
    }

    // Return the user object if authenticated
    return user
  } catch (err) {
    console.error('Error fetching user from Payload:', err)
    return null
  }
}
