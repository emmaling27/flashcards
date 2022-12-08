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
  })
})
