import { Auth } from 'convex/dist/types/server/server'
import { DatabaseReader, mutation } from './_generated/server'
import { randomColor } from '../shared/colors'
export const getUser = async (db: DatabaseReader, auth: Auth) => {
  const identity = await auth.getUserIdentity()
  if (!identity) {
    throw new Error('Unauthenticated call')
  }
  const user = await db
    .query('users')
    .withIndex('by_token', (q) =>
      q.eq('tokenIdentifier', identity.tokenIdentifier)
    )
    .unique()

  if (!user) {
    throw new Error('Unauthenticated call')
  }
  return user
}

export default mutation(
  async ({ db, auth }, name: string, description: string) => {
    const user = await getUser(db, auth)
    const color = randomColor()
    const deck = { name, description, creator: user._id, color }
    await db.insert('decks', deck)
  }
)
