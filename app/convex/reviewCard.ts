import { mutation } from './_generated/server'
import { getUser } from './addDeck';
import { Id } from './_generated/dataModel';
import { Difficulty} from '../common';

const DELAY_BEFORE_REVIEW = 1;
const BASE_INTERVAL = 5;
const BASE_EASE = 10;

export default mutation(async ({ db, auth }, card: Id<"cards">, difficulty: Difficulty) => {
    const user = await getUser(db, auth);
    let card_data = await db.query("cards_due").withIndex("by_user_card", q => q.eq("user", user._id).eq("card", card)).first();
    if (card_data) {
        if (difficulty === "Easy") {
            card_data.ease += 20;
            card_data.interval = (card_data.interval + DELAY_BEFORE_REVIEW) * card_data.ease / 100;
            card_data.interval *= 1.3; // could make this configurable in the future
        } else if (difficulty === "Good") {
            card_data.interval = (card_data.interval + DELAY_BEFORE_REVIEW) / 2 * card_data.ease / 100;
        } else if (difficulty === "Hard") {
            card_data.ease = Math.max(130, card_data.ease - 20);
            card_data.interval = Math.max(
                1,
                card_data.interval + DELAY_BEFORE_REVIEW / 4
            );
        }
        card_data.due = Date.now() + card_data.interval * 60 * 60 * 1000
        await db.patch(card_data._id, card_data)
    } else {
        db.insert("cards_due", {card, user: user._id, ease: 10, due: Date.now() + (60 * 60 * 24 * DELAY_BEFORE_REVIEW), interval: BASE_INTERVAL})
    }
  })