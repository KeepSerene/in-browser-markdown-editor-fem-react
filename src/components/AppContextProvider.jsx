// React imports
import { createContext, useContext, useEffect, useState } from "react";

// Data import
import documents from "/data/documents.json";

const AppContext = createContext();

export default function AppContextProvider({ children }) {
  const [isDarkTheme, setIsDarkTheme] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [docs, setDocs] = useState([]);
  const [activeDoc, setActiveDoc] = useState(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isDelModalOpen, setIsDelModalOpen] = useState(false);

  // ============ THEME ==============

  // Set theme on mount
  useEffect(() => {
    const userTheme = localStorage.getItem("mdEditorTheme");
    const isSysThemeDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    // First check localStorage, then fall back to system preference
    if (userTheme) {
      setIsDarkTheme(userTheme === "dark");
    } else {
      setIsDarkTheme(isSysThemeDark);
      localStorage.setItem("mdEditorTheme", isSysThemeDark ? "dark" : "light");
    }
  }, []);

  // Set preferred theme
  useEffect(() => {
    if (isDarkTheme !== null) {
      const rootEl = document.documentElement;

      if (isDarkTheme) {
        rootEl.classList.add("dark");
        localStorage.setItem("mdEditorTheme", "dark");
      } else {
        rootEl.classList.remove("dark");
        localStorage.setItem("mdEditorTheme", "light");
      }
    }
  }, [isDarkTheme]);

  // ============== DOCS ================

  // Read operation: Initialize docs from localStorage or default data
  useEffect(() => {
    const storedDocs = localStorage.getItem("mdDocs");

    if (storedDocs) {
      setDocs(JSON.parse(storedDocs));
    } else {
      setDocs(documents);
      localStorage.setItem("mdDocs", JSON.stringify(documents));
    }
  }, []);

  // Set an active doc whenever "docs" changes
  useEffect(() => {
    if (docs.length > 0 && !activeDoc) {
      setActiveDoc(docs[0]);
    }
  }, [docs]);

  // Create operation
  const createNewDoc = () => {
    const newDoc = {
      id: Date.now(),
      name: "untitled-document.md",
      createdAt: new Date().toLocaleDateString("en-US", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }),
      content: "# Create your new markdown here!",
    };

    const updatedDocs = [...docs, newDoc];
    setDocs(updatedDocs);
    setActiveDoc(newDoc);
    localStorage.setItem("mdDocs", JSON.stringify(updatedDocs));
  };

  // Update operations
  const updateDocName = (newName) => {
    if (!activeDoc) return null;

    const updatedDoc = { ...activeDoc, name: newName };
    const updatedDocs = docs.map((doc) =>
      doc.id === activeDoc.id ? updatedDoc : doc
    );

    setDocs(updatedDocs);
    setActiveDoc(updatedDoc);
  };

  const updateDocContent = (newContent) => {
    if (!activeDoc) return null;

    const updatedDoc = { ...activeDoc, content: newContent };
    const updatedDocs = docs.map((doc) =>
      doc.id === activeDoc.id ? updatedDoc : doc
    );

    setDocs(updatedDocs);
    setActiveDoc(updatedDoc);
  };

  // Delete operation
  const deleteDoc = () => {
    const updatedDocs = docs.filter((doc) => doc.id !== activeDoc.id);
    setDocs(updatedDocs);
    setActiveDoc(updatedDocs[0] || null);
    localStorage.setItem("mdDocs", JSON.stringify(updatedDocs));
  };

  // Save changes
  const saveChanges = () => {
    localStorage.setItem("mdDocs", JSON.stringify(docs));
  };

  return (
    <AppContext.Provider
      value={{
        isDarkTheme,
        setIsDarkTheme,
        isSidebarOpen,
        setIsSidebarOpen,
        docs,
        activeDoc,
        setActiveDoc,
        isPreviewOpen,
        setIsPreviewOpen,
        createNewDoc,
        updateDocName,
        updateDocContent,
        deleteDoc,
        saveChanges,
        isDelModalOpen,
        setIsDelModalOpen,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export const useAppContext = () => useContext(AppContext);
