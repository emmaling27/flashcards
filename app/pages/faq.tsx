export default function App() {
  return (
    <div className="faq">
      <h1>Flashcards FAQ</h1>
      <h2>What is this app for?</h2>
      <p>
        Learning! We've implemented a spaced repetition algorithm that optimizes
        learning based on your feedback. Ever crammed for a test and then
        immediately forgotten all the material after it's over? The key to being
        able to retrieve information from your long-term memory is to practice{' '}
        <a href="https://en.wikipedia.org/wiki/Spaced_repetition">
          spaced repetition
        </a>
        . In <i>spaced repetition</i>, you test yourself on concepts at
        increasing intervals of time so that you have to struggle to remember
        them. That's what makes you learn!
      </p>
      <h2>How do I use this app?</h2>
      <p>
        You can create your own decks or browse existing decks. You can
        contribute cards to any deck, and you can add cards to multiple decks.
        Cards have a front and back, similar to old-fashioned flashcards. The
        card flips when you hover your mouse on it. After reviewing the card,
        you'll have to submit feedback on whether the card was too easy, just
        right, or too hard. Our spaced repetition algorithm will use this
        feedback to calculate the optimal time to show you the card again.
        (We'll resurface easy cards after longer periods of time and harder
        cards more frequently).
      </p>
      <h2>How did you build this awesome app?</h2>
      <p>
        We built this in only a day using{' '}
        <a href="https://www.convex.dev">Convex</a>, a super easy-to-use
        backend-as-a-service. Check out the source code on{' '}
        <a href="https://github.com/emmaling27/flashcards">GitHub</a>! Feel free
        to report bugs and contribute there.
      </p>
      <h2>What features are on the roadmap?</h2>
      <ul>
        <li>Permissions for viewing and editing decks and cards</li>
        <li>Email notifications</li>
        <li>One place to review all cards you've seen outside of decks</li>
      </ul>
    </div>
  )
}
