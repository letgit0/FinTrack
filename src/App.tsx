import { BrowserRouter as Router, Routes , Route} from 'react-router-dom';
import { Auth } from './pages/auth';
import { Dashboard } from './pages/dashboard';

function App() {
  return (
    <Router>
    <div className="p-4 bg-amber-50">
      <Routes>
        <Route path="/" element={ <Dashboard /> } />
        <Route path="/auth" element={ <Auth /> } />
      </Routes>
    </div>
    </Router>
  )
}

export default App