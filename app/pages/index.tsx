import { FormEvent, useEffect, useState } from 'react'
import { useMutation, useQuery } from '../convex/_generated/react'

export default function App() {
  const [_userId, setUserId] = useState<Id<'users'> | null>(null)
  const storeUser = useMutation('storeUser')
  // Call the `storeUser` mutation function to store
  // the current user in the `users` table and return the `Id` value.
  useEffect(() => {
    // Store the user in the database.
    // Recall that `storeUser` gets the user information via the `auth`
    // object on the server. You don't need to pass anything manually here.
    async function createUser() {
      const id = await storeUser()
      setUserId(id)
    }
    createUser().catch(console.error)
    return () => setUserId(null)
  }, [storeUser])
  const decks = useQuery('listDecks') || []

  const [newDeckName, setNewDeckName] = useState('')
  const [newDeckDescription, setNewDeckDescription] = useState('')
  const addDeck = useMutation('addDeck')

  async function handleAddDeck(event: FormEvent) {
    event.preventDefault()
    setNewDeckName('')
    setNewDeckDescription('')
    await addDeck(newDeckName, newDeckDescription)
  }
  return (
    <main>
      <h1>Flashcards</h1>
      <ul>
        {decks.map((deck) => (
          <li key={deck._id.toString()}>
            <span>{deck.name}</span>
            <span>{deck.description}</span>
            <span>{new Date(deck._creationTime).toLocaleTimeString()}</span>
          </li>
        ))}
      </ul>
      <form onSubmit={handleAddDeck}>
        <input
          value={newDeckName}
          onChange={(event) => setNewDeckName(event.target.value)}
          placeholder="Name"
        />
        <input
          value={newDeckDescription}
          onChange={(event) => setNewDeckDescription(event.target.value)}
          placeholder="Description"
        />
        <input type="submit" value="Add deck" disabled={!newDeckName} />
      </form>
    </main>
  )
}
