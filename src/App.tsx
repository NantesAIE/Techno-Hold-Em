import { AppProvider, useApp } from './store/AppContext';
import { LanguageProvider } from './i18n';
import Header from './components/Header';
import Landing from './pages/Landing';
import IntroTechnoVision from './pages/IntroTechnoVision';
import TrendSelection from './pages/TrendSelection';
import GamePage from './pages/GamePage';
import ResultsPage from './pages/ResultsPage';
import ResultShare from './pages/ResultShare';
import { decodeSharePayload } from './utils/sharePayload';

function Router() {
  const { state } = useApp();

  switch (state.step) {
    case 'landing':  return <Landing />;
    case 'home':     return <IntroTechnoVision />;
    case 'trends':   return <TrendSelection />;
    case 'game':     return <GamePage />;
    case 'results':  return <ResultsPage />;
    default:         return <Landing />;
  }
}

export default function App() {
  // When the app is opened via QR code, the URL contains ?data=...
  // In that case bypass the normal flow and render the mobile share page.
  const params = new URLSearchParams(window.location.search);
  const sharedData = params.get('data');

  if (sharedData) {
    // Peek at the payload lang without full validation — ResultShare will re-decode
    const peekLang = decodeSharePayload(sharedData)?.lg ?? 'fr';
    return (
      <LanguageProvider initialLang={peekLang}>
        <ResultShare encodedData={sharedData} />
      </LanguageProvider>
    );
  }

  return (
    <LanguageProvider>
      <AppProvider>
        <Header />
        <Router />
      </AppProvider>
    </LanguageProvider>
  );
}
