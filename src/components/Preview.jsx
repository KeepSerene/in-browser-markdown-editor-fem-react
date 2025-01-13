import { useDocsContext } from "./DocsProvider";

function Preview() {
  const { activeDoc, isPreviewOpen } = useDocsContext();

  const isOnMdScrAndBelow = window.matchMedia("(width < 768px)").matches;

  const parseMarkdown = (markdown) => {
    if (!markdown) return "";

    // Function to escape HTML characters
    const escapeHtml = (str) => {
      return str
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
    };

    // Extract code blocks and replace them with placeholders
    const codeBlocks = [];
    let codeBlockCounter = 0;

    markdown = markdown.replace(/```([\s\S]*?)```/g, (match, code) => {
      const placeholder = `___CODE_BLOCK_${codeBlockCounter}___`;
      codeBlocks.push(escapeHtml(code.trim()));
      codeBlockCounter++;

      return placeholder;
    });

    // Handle inline code the same way
    const inlineCodes = [];
    let inlineCodeCounter = 0;

    markdown = markdown.replace(/`([^`]+)`/g, (match, code) => {
      const placeholder = `___INLINE_CODE_${inlineCodeCounter}___`;
      inlineCodes.push(escapeHtml(code.trim()));
      inlineCodeCounter++;
      return placeholder;
    });

    // Process lists - collect all list items first
    let listMode = null;
    const processLists = (text) => {
      const lines = text.split("\n");
      const processedLines = [];
      let currentList = [];
      let counter = 1;

      for (let line of lines) {
        const orderedMatch = line.match(/^\s*(\d+)\.\s(.*)$/);
        const unorderedMatch = line.match(/^\s*[-*]\s(.*)$/);

        if (orderedMatch) {
          if (listMode !== "ol") {
            if (currentList.length > 0) {
              processedLines.push(
                listMode === "ul"
                  ? `<ul class="list-disc my-2">${currentList.join("")}</ul>`
                  : `<ol class="list-decimal my-2">${currentList.join("")}</ol>`
              );
              currentList = [];
            }

            listMode = "ol";
          }

          currentList.push(`<li class="ml-6">${orderedMatch[2]}</li>`);
          counter++;
        } else if (unorderedMatch) {
          if (listMode !== "ul") {
            if (currentList.length > 0) {
              processedLines.push(
                listMode === "ul"
                  ? `<ul class="list-disc my-2">${currentList.join("")}</ul>`
                  : `<ol class="list-decimal my-2">${currentList.join("")}</ol>`
              );
              currentList = [];
            }

            listMode = "ul";
          }

          currentList.push(`<li class="ml-6">${unorderedMatch[1]}</li>`);
        } else {
          if (currentList.length > 0) {
            processedLines.push(
              listMode === "ul"
                ? `<ul class="list-disc my-2">${currentList.join("")}</ul>`
                : `<ol class="list-decimal my-2">${currentList.join("")}</ol>`
            );
            currentList = [];
            listMode = null;
          }

          processedLines.push(line);
        }
      }

      if (currentList.length > 0) {
        processedLines.push(
          listMode === "ul"
            ? `<ul class="list-disc my-2">${currentList.join("")}</ul>`
            : `<ol class="list-decimal my-2">${currentList.join("")}</ol>`
        );
      }

      return processedLines.join("\n");
    };

    // Process the markdown
    let html = processLists(markdown)
      // Headers
      .replace(
        /^# (.*$)/gm,
        '<h1 class="dark:text-dark-text-primary text-light-text-primary text-h1 font-bold my-6">$1</h1>'
      )
      .replace(
        /^## (.*$)/gm,
        '<h2 class="dark:text-dark-text-primary text-light-text-primary text-h2 font-md my-5">$1</h2>'
      )
      .replace(
        /^### (.*$)/gm,
        '<h3 class="dark:text-dark-text-primary text-light-text-primary text-h3 font-bold my-4">$1</h3>'
      )
      .replace(
        /^#### (.*$)/gm,
        '<h4 class="dark:text-dark-text-primary text-light-text-primary text-h4 font-bold my-3">$1</h4>'
      )
      .replace(
        /^##### (.*$)/gm,
        '<h5 class="dark:text-dark-text-primary text-light-text-primary text-h5 font-bold my-2">$1</h5>'
      )
      .replace(
        /^###### (.*$)/gm,
        '<h6 class="text-primary text-h6 font-bold my-1">$1</h6>'
      )
      // Bold
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      // Italic
      .replace(/\*(.*?)\*/g, "<em>$1</em>")
      // Blockquotes
      .replace(
        /^\> (.*$)/gm,
        '<blockquote class="dark:bg-dark-bg-highlight bg-light-bg-highlight dark:text-dark-text-primary text-light-text-primary font-bold border-l-4 border-primary rounded-md p-6 my-4">$1</blockquote>'
      )
      // Links
      .replace(
        /\[(.*?)\]\((.*?)\)/g,
        '<a href="$2" target="_blank" class="text-primary underline decoration-solid transition-colors hover:opacity-70">$1</a>'
      )
      // Paragraphs
      .replace(/^(?!<[hbuol]).+$/gm, "<p class='my-2'>$&</p>");

    // Replace code block placeholders with actual HTML
    codeBlocks.forEach((code, index) => {
      html = html.replace(
        `___CODE_BLOCK_${index}___`,
        `<pre class="dark:bg-dark-bg-highlight bg-light-bg-highlight dark:text-dark-text-primary text-light-text-primary font-robotoMono rounded-md p-6 my-4 overflow-x-auto"><code>${code}</code></pre>`
      );
    });

    // Replace inline code placeholders with actual HTML
    inlineCodes.forEach((code, index) => {
      html = html.replace(
        `___INLINE_CODE_${index}___`,
        `<code class="dark:bg-dark-bg-highlight bg-light-bg-highlight dark:text-dark-text-primary text-light-text-primary font-robotoMono rounded px-2 py-1">${code}</code>`
      );
    });

    return html;
  };

  return (
    // Subtract header height
    <div
      className={`${
        isPreviewOpen ? "w-full" : !isOnMdScrAndBelow && "md:w-1/2"
      } h-[calc(100vh-78.4px)] dark:bg-dark-bg-primary bg-light-bg-primary dark:text-dark-text-secondary text-light-text-secondary absolute top-0 right-0 transition-[width] duration-200`}
    >
      <h3 className="dark:bg-dark-bg-secondary bg-light-bg-secondary font-md uppercase tracking-sm leading-4 p-3 px-4">
        Preview
      </h3>

      {/* Subtract h3-height */}
      <div className="w-full h-[calc(100%-40px)] overflow-y-auto">
        <article
          dangerouslySetInnerHTML={{
            __html: parseMarkdown(activeDoc?.content),
          }}
          className="w-full h-full dark:bg-dark-bg-primary bg-light-bg-primary p-2 px-4"
        ></article>
      </div>
    </div>
  );
}

export default Preview;
