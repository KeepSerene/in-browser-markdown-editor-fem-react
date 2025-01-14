import { useAppContext } from "./AppContextProvider";

function Sidebar() {
  const {
    docs,
    isDarkTheme,
    setIsDarkTheme,
    isSidebarOpen,
    setIsSidebarOpen,
    createNewDoc,
    setActiveDoc,
  } = useAppContext();

  return (
    <aside
      className={`w-[250px] h-screen bg-dark-bg-secondary text-dark-text-secondary p-4 shadow-lg flex flex-col gap-6 absolute left-0 top-0 z-20 transition-transform duration-200 ${
        isSidebarOpen ? "translate-x-0" : "-translate-x-[250px]"
      }`}
    >
      {/* Close sidebar button */}
      <button
        type="button"
        onClick={() => setIsSidebarOpen(false)}
        aria-label="Click to close the sidebar"
        className="self-end transition-colors hover:text-primary focus-within:text-primary"
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
            d="M6 18 18 6M6 6l12 12"
          />
        </svg>
      </button>

      <h2 className="font-md uppercase tracking-sm leading-4">My documents</h2>

      {/* Add new doc button */}
      <button type="button" onClick={createNewDoc} className="btn">
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
            d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
          />
        </svg>

        <span className="capitalize">New document</span>
      </button>

      {/* Docs */}
      <ul className="flex-1 overflow-y-auto grid content-start gap-4">
        {docs.map((doc, index) => (
          <li
            key={index}
            tabIndex={0}
            onClick={() => setActiveDoc(doc)}
            className="rounded-md p-1 cursor-pointer flex items-center gap-2 group"
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
                d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
              />
            </svg>

            <div className="flex flex-col">
              <span className="text-sm">{doc.createdAt}</span>

              <span className="text-dark-text-primary break-all transition-colors group-hover:text-primary group-focus-within:text-primary">
                {doc.name}
              </span>
            </div>
          </li>
        ))}
      </ul>

      {/* Theme switcher slider */}
      <div className="self-center">
        {/* Toggle container */}
        <div
          role="radiogroup"
          aria-label="Theme selection"
          className="cursor-pointer flex items-center gap-3"
        >
          {/* Radio for light theme option */}
          <label htmlFor="light-theme" className="cursor-pointer">
            {/* Sun icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              aria-hidden="true"
              className={`size-6 ${
                isDarkTheme
                  ? "text-dark-text-secondary hover:text-primary"
                  : "text-primary"
              } transition-colors`}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
              />
            </svg>

            <input
              type="radio"
              id="light-theme"
              value="light"
              checked={!isDarkTheme}
              onChange={() => setIsDarkTheme(false)}
              aria-label="Light theme"
              className="sr-only"
            />
          </label>

          {/* Toggle track */}
          <button
            type="button"
            onClick={() => setIsDarkTheme(!isDarkTheme)}
            role="switch"
            aria-checked={isDarkTheme}
            aria-label="Toggle theme"
            className={`w-[60px] h-[30px] ${
              isDarkTheme ? "bg-primary" : "bg-dark-bg-highlight"
            } rounded-[15px] focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2
          dark:focus:ring-offset-dark-bg-secondary relative transition-colors`}
          >
            {/* Sliding knob */}
            <span
              aria-hidden="true"
              className={`w-[22px] h-[22px] ${
                isDarkTheme ? "bg-dark-text-primary" : "bg-dark-text-secondary"
              } rounded-full shadow-md absolute top-[4px] left-0 transition-transform duration-200 ${
                isDarkTheme ? "translate-x-[34px]" : "translate-x-[4px]"
              }`}
            ></span>
          </button>

          {/* Radio for dark theme option */}
          <label htmlFor="dark-theme" className="cursor-pointer">
            {/* Moon icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              aria-hidden="true"
              className={`size-6 ${
                isDarkTheme
                  ? "text-primary"
                  : "text-dark-text-secondary hover:text-primary"
              } transition-colors`}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"
              />
            </svg>

            <input
              type="radio"
              id="dark-theme"
              value="dark"
              checked={isDarkTheme}
              onChange={() => setIsDarkTheme(true)}
              aria-label="Dark theme"
              className="sr-only"
            />
          </label>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
