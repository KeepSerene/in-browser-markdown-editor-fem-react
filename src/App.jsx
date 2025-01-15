// Context provider import
import AppContextProvider from "./components/AppContextProvider";

// Component import
import AppContent from "./components/AppContent";

// Live site link https://nablanco.github.io/browser-markdown-editor/

function App() {
  return (
    <AppContextProvider>
      <AppContent />
    </AppContextProvider>
  );
}

export default App;
