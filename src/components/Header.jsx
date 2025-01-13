import { useDocsContext } from "./DocsProvider";

function Header() {
  const {
    setIsSidebarOpen,
    activeDoc,
    updateDocName,
    saveChanges,
    setIsDelModalOpen,
  } = useDocsContext();

  return (
    <div className="bg-dark-bg-highlight">
      <header
        id="header"
        className="wrapper text-dark-text-secondary flex justify-between items-center"
      >
        <div className="flex items-center gap-4 md:gap-6">
          {/* Hamburger menu button */}
          <button
            type="button"
            onClick={() => setIsSidebarOpen(true)}
            aria-label="Click to open the sidebar"
            className="hover:text-primary focus-visible:text-primary"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </button>

          {/* Logo */}
          <a
            href="#header"
            className="hidden lg:block text-dark-text-primary text-md font-bold uppercase tracking-lg leading-4"
          >
            Markdown
          </a>

          {/* Divider */}
          <div className="hidden lg:block self-stretch w-[1px] bg-dark-text-secondary opacity-30" />

          {/* Doc tab */}
          <div className="flex items-center gap-2 md:gap-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
              />
            </svg>

            <div className="flex flex-col justify-center">
              <label
                htmlFor="doc-title"
                className="hidden md:block text-sm capitalize"
              >
                Document name
              </label>

              <input
                type="text"
                id="doc-title"
                value={activeDoc?.name || ""}
                onChange={(event) => updateDocName(event.target.value.trim())}
                size={Math.max(activeDoc?.name.length || "".length, 1)} // Ensure size = 1 for empty values
                className="bg-transparent border-0 outline-none focus-within:border-b focus-within:border-primary"
              />
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-4 md:gap-6">
          <button
            type="button"
            onClick={() => setIsDelModalOpen(true)}
            aria-label="Click to delete the document"
            className="transition-colors hover:text-primary focus-visible:text-primary"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
              />
            </svg>
          </button>

          <button
            type="button"
            onClick={saveChanges}
            aria-label="Click to save changes"
            className="btn"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.5 3.75V16.5L12 14.25 7.5 16.5V3.75m9 0H18A2.25 2.25 0 0 1 20.25 6v12A2.25 2.25 0 0 1 18 20.25H6A2.25 2.25 0 0 1 3.75 18V6A2.25 2.25 0 0 1 6 3.75h1.5m9 0h-9"
              />
            </svg>

            <span className="hidden md:block capitalize">Save changes</span>
          </button>
        </div>
      </header>
    </div>
  );
}

export default Header;
