"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { useBlockComponent } from "@/hooks/use-block-component";
import { cn } from "@/lib/utils";
import {
  HeaderData,
  ParagraphData,
  ListData,
  OrderedListItemMeta,
  ChecklistItemMeta,
  TableData,
  CodeData,
  EmbedData,
  ImageData,
} from "@/types/editorjs";

const components = {
  header: ({ text, level }: HeaderData) => {
    if (level === 1) {
      return (
        <h1 className="mt-2 scroll-m-20 text-4xl font-bold tracking-tight">
          {text}
        </h1>
      );
    }

    if (level === 2) {
      return (
        <h2 className="mt-10 scroll-m-20 border-b pb-1 text-3xl font-semibold tracking-tight first:mt-0">
          {text}
        </h2>
      );
    }

    if (level === 3) {
      return (
        <h3 className="mt-8 scroll-m-20 text-2xl font-semibold tracking-tight">
          {text}
        </h3>
      );
    }

    if (level === 4) {
      return (
        <h4 className="mt-8 scroll-m-20 text-xl font-semibold tracking-tight">
          {text}
        </h4>
      );
    }

    if (level === 5) {
      return (
        <h5 className="mt-8 scroll-m-20 text-lg font-semibold tracking-tight">
          {text}
        </h5>
      );
    }

    if (level === 6) {
      return (
        <h5 className="mt-8 scroll-m-20 text-base font-semibold tracking-tight">
          {text}
        </h5>
      );
    }

    return null;
  },
  paragraph: ({ text }: ParagraphData) => {
    return (
      <p
        className="leading-7 [&:not(:first-child)]:mt-6"
        dangerouslySetInnerHTML={{ __html: text }}
      >
        {text}
      </p>
    );
  },
  delemitor: () => {
    return <hr className="my-4 md:my-8" />;
  },
  list: ({ style, itemMeta, items }: ListData) => {
    if (style === "ordered") {
      const { start = 1 } = itemMeta as OrderedListItemMeta;

      return (
        <ol start={start} className="my-6 ml-6 list-decimal">
          {items.map((item, index) => {
            return (
              <li key={index} className="mt-2">
                {item.content}
              </li>
            );
          })}
        </ol>
      );
    }

    if (style === "unordered") {
      return (
        <ul className="my-6 ml-6 list-disc">
          {items.map((item, index) => (
            <li key={index} className="mt-2">
              {item.content}
            </li>
          ))}
        </ul>
      );
    }

    if (style === "checklist") {
      return (
        <div className="my-6 ml-6">
          {items.map((item, index) => {
            const { checked } = item.itemMeta as ChecklistItemMeta;
            return (
              <div key={index} className="mt-2 flex items-center space-x-2">
                <Checkbox checked={checked} disabled />
                <span>{item.content}</span>
              </div>
            );
          })}
        </div>
      );
    }

    return null;
  },
  table: ({ withHeadings, stretched, content }: TableData) => {
    if (content.length === 0) {
      return null;
    }

    const [headings, ...rows] = content;

    return (
      <div className="my-6 w-full overflow-y-auto">
        <table className={cn({ "w-full": stretched })}>
          {withHeadings && (
            <thead>
              <tr className="m-0 border-t p-0 even:bg-muted">
                {headings.map((cell, idx) => (
                  <th
                    key={idx}
                    className="border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right"
                  >
                    {cell}
                  </th>
                ))}
              </tr>
            </thead>
          )}
          <tbody>
            {(withHeadings ? rows : content).map((row, rowIndex) => (
              <tr key={rowIndex} className="m-0 border-t p-0 even:bg-muted">
                {row.map((cell, cellIndex) => (
                  <td
                    key={cellIndex}
                    className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right"
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  },
  code: ({ code }: CodeData) => {
    return (
      <pre className="mb-4 mt-6 overflow-x-auto rounded-lg border bg-black py-4">
        <code className="font-mono relative rounded border px-[0.3rem] py-[0.2rem] text-sm">
          {code}
        </code>
      </pre>
    );
  },
  embed: ({ service, source, embed, width, height, caption }: EmbedData) => {
    return (
      <figure className={`embed-block-service-${service}`}>
        {embed ? (
          <iframe
            title={service}
            src={embed}
            width={width}
            height={height}
            data-src={source}
          />
        ) : (
          <a href={source} target="_blank" rel="noreferer nofollower external">
            {source}
          </a>
        )}
        {caption && <figcaption>{caption}</figcaption>}
      </figure>
    );
  },
  image: ({
    file,
    caption,
    withBorder,
    withBackground,
    stretched,
  }: ImageData) => {
    return (
      <figure
        className={cn({
          border: withBorder,
          "bg-muted": withBackground,
          "w-full": stretched,
        })}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        {file.url && <img src={file.url} alt={caption} />}

        {/* eslint-disable-next-line @next/next/no-img-element */}
        {file.url && <img src={file.url} alt={caption} />}

        {caption && <figcaption>{caption}</figcaption>}
      </figure>
    );
  },
};

interface BlockContentProps {
  code: string;
}

const BlockContent = ({ code }: BlockContentProps) => {
  const BlockComponent = useBlockComponent(code);

  return (
    <div>
      <BlockComponent components={components} />
    </div>
  );
};

export default BlockContent;
