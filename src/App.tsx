import { AppProvider, useApp } from './store/AppContext';
import Header from './components/Header';
import Home from './pages/Home';
import ProjectSetup from './pages/ProjectSetup';
import TrendSelection from './pages/TrendSelection';
import GamePage from './pages/GamePage';
import ResultsPage from './pages/ResultsPage';
import EmailPage from './pages/EmailPage';

function Router() {
  const { state } = useApp();

  switch (state.step) {
    case 'home':    return <Home />;
    case 'setup':   return <ProjectSetup />;
    case 'trends':  return <TrendSelection />;
    case 'game':    return <GamePage />;
    case 'results': return <ResultsPage />;
    case 'email':   return <EmailPage />;
    default:        return <Home />;
  }
}

export default function App() {
  return (
    <AppProvider>
      <Header />
      <Router />
    </AppProvider>
  );
}
