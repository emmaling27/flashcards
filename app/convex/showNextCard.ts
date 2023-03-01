import { DatabaseReader, query } from './_generated/server'
import { Document, Id } from './_generated/dataModel'
import { getUser } from './addDeck';
import { GenericId } from 'convex/values';

export async function cardsInDeck(db: DatabaseReader, deckId: Id<'decks'>): Promise<GenericId<'cards'>[]> {
  let cards = await db.query('card_decks')
  .withIndex('by_deck', q => q.eq("deck", deckId)).collect();
  if (!cards) {
    cards = []
  }
  return cards.map(card_deck => card_deck.card);
}

const nextCardId = async (db: DatabaseReader, user: Document<'users'>, deckId: Id<'decks'>) => {
  const allCards = await cardsInDeck(db, deckId);
  // LEFT OUTER JOIN cards_due
  let minDue = null;
  let minDueCard = null;
  for (const cardId of allCards) {
    const cardDue = await db.query('cards_due')
      .withIndex('by_user_card', q => q.eq('user', user._id).eq('card', cardId))
      .first();
    if (cardDue === null) {
      return cardId;
    }
    if ((minDue === null || cardDue.due < minDue) && cardDue.due < Date.now()) {
      minDue = cardDue.due;
      minDueCard = cardId;
    }
  }
  return minDueCard;
};

export default query(async ({ db, auth }, deckId: Id<'decks'>) => {
  const user = await getUser(db, auth);
  const cardId = await nextCardId(db, user, deckId);
  if (cardId === null) {
    return null;
  } 
  return await db.get(cardId);
})
