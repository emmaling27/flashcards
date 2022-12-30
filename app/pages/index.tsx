import { FormEvent, useEffect, useState } from 'react'
import { Id } from '../convex/_generated/dataModel'
import { useMutation } from '../convex/_generated/react'
import DeckPicker from '../components/DeckPicker'

const MAX_DECK_NAME_LENGTH = 25
const MAX_DECK_DESCRIPTION_LENGTH = 80

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

  const validDeckName = () => newDeckName.length <= MAX_DECK_NAME_LENGTH
  const validDeckDescription = () =>
    newDeckDescription.length <= MAX_DECK_DESCRIPTION_LENGTH

  return (
    <main>
      <h1>Flashcard Decks</h1>
      <DeckPicker />
      <form onSubmit={handleAddDeck}>
        <div className="input">
          <input
            value={newDeckName}
            onChange={(event) => setNewDeckName(event.target.value)}
            placeholder="Name"
          />{' '}
          {!validDeckName() && (
            <p className="input-error">
              Deck name must be no more than {MAX_DECK_NAME_LENGTH} characters.
            </p>
          )}
        </div>
        <div className="input">
          <input
            value={newDeckDescription}
            onChange={(event) => setNewDeckDescription(event.target.value)}
            placeholder="Description"
          />
          {!validDeckDescription() && (
            <p className="input-error">
              Deck description must be no more than{' '}
              {MAX_DECK_DESCRIPTION_LENGTH} characters.
            </p>
          )}
        </div>
        <input
          type="submit"
          value="Add deck"
          disabled={!newDeckName || !validDeckName() || !validDeckDescription()}
        />
      </form>
    </main>
  )
}
