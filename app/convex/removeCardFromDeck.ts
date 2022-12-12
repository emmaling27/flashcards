import { Id } from './_generated/dataModel';
import { mutation } from './_generated/server'
import { getUser } from './addDeck'

export default mutation(async ({ db, auth }, cardId: Id<'cards'>, deckId: Id<'decks'>) => {
  const _user = await getUser(db, auth);
  const currentCardDeck = await db.query('card_decks')
    .withIndex('by_deck', q => q.eq('deck', deckId).eq('card', cardId))
    .unique();
  if (currentCardDeck == null) {
    console.log('card is not in deck. skipping');
    return;
  }
  return await db.delete(currentCardDeck._id);
})
