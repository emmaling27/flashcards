import { defineSchema, defineTable, s } from 'convex/schema'

export default defineSchema({
  messages: defineTable({
    author: s.string(),
    body: s.string(),
  }),
  users: defineTable({
    name: s.string(),
    tokenIdentifier: s.string(),
  }).index("by_token", ["tokenIdentifier"]),
  decks: defineTable({
    name: s.string(),
    description: s.string(),
    creator: s.id("users")
  }),
  cards: defineTable({
    front: s.string(),
    back: s.string(),
    creator: s.id("users")
  }),
  card_decks: defineTable({
    deck: s.id("decks"),
    card: s.id("cards"),
  }),
  cards_due: defineTable({
    card: s.id("cards"),
    user: s.id("users"),
    due: s.number()
  }),
  history: defineTable({
    user: s.id("users"),
    card: s.id("cards"),
    difficulty: s.string(),
  })
})
