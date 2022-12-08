import { Auth } from 'convex/dist/types/server/server'
import { Id } from './_generated/dataModel'
import { DatabaseReader, mutation } from './_generated/server'
import { getUser } from './addDeck'

export default mutation(
  async (
    { db, auth },
    deckId: Id<'decks'>,
    front: string,
    back: string,
    color: string
  ) => {
    const user = await getUser(db, auth)
    const cardId = await db.insert('cards', {
      front,
      back,
      color,
      creator: user._id,
    })
    await db.insert('card_decks', {
      deck: deckId,
      card: cardId,
    })
  }
)
