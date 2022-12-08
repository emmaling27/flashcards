import { query } from './_generated/server'
import { Id } from './_generated/dataModel'
import { DeckStats } from '../common';

export default query(async ({ db }, deckId: Id<"decks">): Promise<DeckStats | null> => {
    let numCards = (await db.query("card_decks").withIndex("by_deck", q => q.eq("deck", deckId)).collect()).length;
    return {numCards}
})
