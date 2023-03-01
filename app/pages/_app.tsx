import '../styles/globals.css'
import type { AppProps } from 'next/app'
import convexConfig from '../convex.json'

import { ConvexReactClient } from 'convex/react'
import { ConvexProviderWithAuth0 } from 'convex/react-auth0'
import { useAuth0 } from '@auth0/auth0-react'
import { Button } from '@mui/material'
import { useRouter } from 'next/router'
const address = process.env.NEXT_PUBLIC_CONVEX_URL
const convex = new ConvexReactClient(address)
const authInfo = convexConfig.authInfo[0]

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter()
  return (
    <div>
      {' '}
      <Button
        className="faq-button"
        variant="outlined"
        onClick={() => router.push('/faq')}
      >
        faq
      </Button>
      <ConvexProviderWithAuth0
        client={convex}
        authInfo={authInfo}
        loggedOut={<Login />}
      >
        <div className="text-center">
          <span>
            <Logout />
          </span>
        </div>
        <Component {...pageProps} />
      </ConvexProviderWithAuth0>
    </div>
  )
}

export function Login() {
  const { isLoading, loginWithRedirect } = useAuth0()
  if (isLoading) {
    return <button className="btn btn-primary">Loading...</button>
  }
  return (
    <main className="py-4">
      <h1 className="text-center">Flashcards</h1>
      <div className="text-center">
        <span>
          <Button variant="text" onClick={loginWithRedirect}>
            Log in
          </Button>
        </span>
      </div>
    </main>
  )
}

function Logout() {
  const { logout, user } = useAuth0()
  return (
    <Button
      style={{ position: 'absolute', top: 10, right: 10 }}
      variant="text"
      onClick={() => logout({ returnTo: window.location.origin })}
    >
      Log out
    </Button>
  )
}

export default MyApp
