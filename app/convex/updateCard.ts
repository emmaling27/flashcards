import { mutation } from './_generated/server'
import { getUser } from './addDeck'
import { Document } from './_generated/dataModel'

export default mutation(
  async (
    { db, auth },
    card: Document<'cards'>,
  ) => {
    const user = await getUser(db, auth);
    await db.patch(card._id, {
      front: card.front,
      back: card.back,
      color: card.color,
    });
  }
)
