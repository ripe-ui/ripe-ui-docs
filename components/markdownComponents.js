import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import jsx from "react-syntax-highlighter/dist/cjs/languages/prism/jsx";
import typescript from "react-syntax-highlighter/dist/cjs/languages/prism/typescript";
import bash from "react-syntax-highlighter/dist/cjs/languages/prism/bash";
import { dracula } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { Sandpack } from "@codesandbox/sandpack-react";

SyntaxHighlighter.registerLanguage("jsx", jsx);
SyntaxHighlighter.registerLanguage("typescript", typescript);
SyntaxHighlighter.registerLanguage("bash", bash);
const syntaxTheme = dracula;

export const MarkdownComponents = {
  code({ node, inline, className, ...props }) {
    const hasLang = /language-(\w+)/.exec(className || "");
    const hasMeta = node?.data?.meta;
    const code = props?.children[props.children.length - 1].replace(/\n$/, "");

    const applyHighlights = (applyHighlights) => {
      if (hasMeta) {
        const RE = /{([\d,-]+)}/;
        const metadata = node.data.meta?.replace(/\s/g, "");
        const strlineNumbers = RE?.test(metadata) ? RE?.exec(metadata)[1] : "0";
        const highlightLines = rangeParser(strlineNumbers);
        const highlight = highlightLines;
        const data = highlight.includes(applyHighlights) ? "highlight" : null;
        return { data };
      } else {
        return {};
      }
    };

    return hasLang ? (
      hasLang[1] == "ripe" ? (
        <Sandpack
          theme="dark"
          template="react"
          customSetup={{
            dependencies: {
              "@ripe-ui/react": "latest",
            },
          }}
          files={{
            "/App.js": code,
          }}
        />
      ) : (
        <SyntaxHighlighter
          style={syntaxTheme}
          language={hasLang[1]}
          PreTag="div"
          className="codeStyle"
          showLineNumbers={true}
          wrapLines={hasMeta}
          useInlineStyles={true}
          lineProps={applyHighlights}
        >
          {code}
        </SyntaxHighlighter>
      )
    ) : (
      <code className={className} {...props} />
    );
  },
};
