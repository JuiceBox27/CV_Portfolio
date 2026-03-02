import { LanguageProvider } from './context/LanguageContext';
import { Portfolio } from './components/Portfolio';

export default function App() {
  return (
    <LanguageProvider>
      <Portfolio />
    </LanguageProvider>
  );
}