import { useAppContext } from "./AppContextProvider";

function Editor() {
  const { activeDoc, updateDocContent } = useAppContext();

  return (
    // Subtract header height
    <div className="w-full md:w-1/2 h-[calc(100vh-78.4px)] bg-light-bg-primary dark:bg-dark-bg-primary text-light-text-secondary dark:text-dark-text-secondary border-r border-light-text-secondary dark:border-dark-text-secondary absolute left-0 top-0">
      <h3 className="bg-light-bg-secondary dark:bg-dark-bg-secondary font-md uppercase tracking-sm leading-4 p-3 px-4">
        Markdown
      </h3>

      {/* Subtract h3-height */}
      <div className="w-full h-[calc(100%-40px)] overflow-y-clip">
        <textarea
          value={activeDoc?.content ?? ""}
          onChange={(event) => updateDocContent(event.target.value)}
          aria-label="Edit your document"
          className="w-full h-full font-robotoMono bg-light-bg-primary dark:bg-dark-bg-primary p-2 px-4 resize-none focus:outline-none"
        />
      </div>
    </div>
  );
}

export default Editor;
