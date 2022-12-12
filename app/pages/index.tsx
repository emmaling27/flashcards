import { FormEvent, useEffect, useState } from 'react'
import { Id } from '../convex/_generated/dataModel'
import { useMutation } from '../convex/_generated/react'
import DeckPicker from '../components/DeckPicker'

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
      <h1>Flashcard Decks</h1>
      <DeckPicker />
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
