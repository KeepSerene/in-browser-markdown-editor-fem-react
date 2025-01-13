// Context provider import
import DocsProvider from "./components/DocsProvider";

// Component import
import AppContent from "./components/AppContent";

// Repo link: https://github.com/nablanco/browser-markdown-editor

// Live site link https://nablanco.github.io/browser-markdown-editor/

function App() {
  return (
    <DocsProvider>
      <AppContent />
    </DocsProvider>
  );
}

export default App;
