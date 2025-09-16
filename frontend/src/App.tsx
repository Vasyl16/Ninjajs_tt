import { AppProvider } from './providers/AppProvider';
import { AppRoutes } from './routes/AppRouter';

import './styles/app.css';

function App() {
  return (
    <AppProvider>
      <AppRoutes />
    </AppProvider>
  );
}

export default App;
