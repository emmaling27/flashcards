import { Id } from './_generated/dataModel';
import { mutation } from './_generated/server'
import { getUser } from './addDeck'

export default mutation(async ({ db, auth }, cardId: Id<'cards'>, deckId: Id<'decks'>) => {
  const _user = await getUser(db, auth);
  const currentCardDeck = await db.query('card_decks').withIndex('by_deck', q => q.eq('deck', deckId).eq('card', cardId)).first();
  if (currentCardDeck !== null) {
    console.log('card is already in deck. skipping');
    return;
  }
  await db.insert('card_decks', {
    deck: deckId,
    card: cardId,
  });
})
