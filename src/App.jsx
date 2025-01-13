// Context provider import
import DocsProvider from "./components/DocsProvider";

// Component import
import AppContent from "./components/AppContent";

// Repo link: https://github.com/nablanco/browser-markdown-editor

// Live site link https://nablanco.github.io/browser-markdown-editor/

// Fix => Editor, Uncontrolled component to controlled component warning, files can be saved without the ".md" extension, light theme doesn't work

function App() {
  return (
    <DocsProvider>
      <AppContent />
    </DocsProvider>
  );
}

export default App;
