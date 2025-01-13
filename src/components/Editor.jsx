import { useDocsContext } from "./DocsProvider";

function Editor() {
  const { activeDoc, updateDocContent } = useDocsContext();

  return (
    // Subtract header height
    <div className="w-full md:w-1/2 h-[calc(100vh-78.4px)] dark:bg-dark-bg-primary bg-light-bg-primary dark:text-dark-text-secondary text-light-text-secondary border-r dark:border-dark-text-secondary border-light-text-secondary absolute left-0 top-0">
      <h3 className="dark:bg-dark-bg-secondary bg-light-bg-secondary font-md uppercase tracking-sm leading-4 p-3 px-4">
        Markdown
      </h3>

      {/* Subtract h3-height */}
      <div className="w-full h-[calc(100%-40px)] overflow-y-clip">
        <textarea
          value={activeDoc?.content || ""}
          onChange={(event) => updateDocContent(event.target.content.trim())}
          aria-label="Edit your document"
          className="w-full h-full font-robotoMono dark:bg-dark-bg-primary bg-light-bg-primary p-2 px-4 resize-none focus:outline-none"
        />
      </div>
    </div>
  );
}

export default Editor;
