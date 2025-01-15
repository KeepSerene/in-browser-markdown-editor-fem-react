// Context provider import
import AppContextProvider from "./components/AppContextProvider";

// Component import
import AppContent from "./components/AppContent";

function App() {
  return (
    <AppContextProvider>
      <AppContent />
    </AppContextProvider>
  );
}

export default App;
