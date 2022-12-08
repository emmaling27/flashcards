import { query } from './_generated/server'
import { Document, Id } from './_generated/dataModel'

export default query(async ({ db }, deckId: Id<"decks">): Promise<Document<'decks'> | null> => {
  return await db.get(deckId);
})
