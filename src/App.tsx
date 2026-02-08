import { Analytics } from '@vercel/analytics/react'
import PurchaseDecisionQuiz from './components/PurchaseDecisionQuiz'

function App() {
  return (
    <>
      <PurchaseDecisionQuiz />
      <Analytics />
    </>
  )
}

export default App
