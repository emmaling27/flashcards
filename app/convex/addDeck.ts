import { mutation } from './_generated/server'

export default mutation(async ({ db, auth }, name: string, description: string) => {
    const identity = await auth.getUserIdentity();
    if (!identity) {
      throw new Error("Unauthenticated call to mutation");
    }
    const user = await db
      .query("users")
      .withIndex("by_token", q =>
        q.eq("tokenIdentifier", identity.tokenIdentifier)
      )
      .unique();

    if (!user) {
      throw new Error("Unauthenticated call to mutation");
    }
  const deck = { name, description, creator: user._id }
  await db.insert('decks', deck)
})
