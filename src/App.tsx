import ModernLandingPage from './components/ModernLandingPage'
import { ErrorBoundary } from './components/ErrorBoundary'
import './App.css'

function App() {
  return (
    <ErrorBoundary>
      <ModernLandingPage />
    </ErrorBoundary>
  )
}

export default App
