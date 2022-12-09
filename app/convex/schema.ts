import { defineSchema, defineTable, s } from 'convex/schema'

export default defineSchema({
  messages: defineTable({
    author: s.string(),
    body: s.string(),
  }),
  users: defineTable({
    name: s.string(),
    tokenIdentifier: s.string(),
  }).index('by_token', ['tokenIdentifier']),
  decks: defineTable({
    name: s.string(),
    description: s.string(),
    creator: s.id('users'),
    color: s.string(),
  }),
  cards: defineTable({
    front: s.string(),
    back: s.string(),
    color: s.string(),
    creator: s.id('users'),
  }),
  card_decks: defineTable({
    deck: s.id('decks'),
    card: s.id('cards'),
  }).index('by_deck', ['deck', 'card']),
  cards_due: defineTable({
    card: s.id('cards'),
    user: s.id('users'),
    ease: s.number(),
    due: s.number(),
    interval: s.number(),
  }).index('by_user_card', ['user', 'card']),
})
