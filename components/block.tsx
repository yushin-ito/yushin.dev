"use client";

import { OutputBlockData } from "@editorjs/editorjs";

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
  DelimitorData,
} from "@/types/editorjs";

const components = {
  header: ({ id, data }: OutputBlockData<string, HeaderData>) => {
    if (data.level === 1) {
      return (
        <h1
          id={id}
          className="mt-2 scroll-m-20 text-4xl font-bold tracking-tight"
        >
          {data.text}
        </h1>
      );
    }

    if (data.level === 2) {
      return (
        <h2
          id={id}
          className="mt-10 scroll-m-20 border-b pb-1 text-3xl font-semibold tracking-tight first:mt-0"
        >
          {data.text}
        </h2>
      );
    }

    if (data.level === 3) {
      return (
        <h3
          id={id}
          className="mt-8 scroll-m-20 text-2xl font-semibold tracking-tight"
        >
          {data.text}
        </h3>
      );
    }

    if (data.level === 4) {
      return (
        <h4
          id={id}
          className="mt-8 scroll-m-20 text-xl font-semibold tracking-tight"
        >
          {data.text}
        </h4>
      );
    }

    if (data.level === 5) {
      return (
        <h5
          id={id}
          className="mt-8 scroll-m-20 text-lg font-semibold tracking-tight"
        >
          {data.text}
        </h5>
      );
    }

    if (data.level === 6) {
      return (
        <h5
          id={id}
          className="mt-8 scroll-m-20 text-base font-semibold tracking-tight"
        >
          {data.text}
        </h5>
      );
    }

    return null;
  },
  paragraph: ({ id, data }: OutputBlockData<string, ParagraphData>) => {
    return (
      <p
        id={id}
        className="leading-7 [&:not(:first-child)]:mt-6"
        dangerouslySetInnerHTML={{ __html: data.text }}
      />
    );
  },
  delemitor: ({ id }: OutputBlockData<string, DelimitorData>) => {
    return <hr id={id} className="my-4 md:my-8" />;
  },
  list: ({ id, data }: OutputBlockData<string, ListData>) => {
    if (data.style === "ordered") {
      const { start = 1, counterType = "numeric" } =
        (data.itemMeta as OrderedListItemMeta) || {};

      return (
        <ol
          id={id}
          start={start}
          className={cn(
            "my-6 ml-6",
            counterType === "numeric" ? "list-decimal" : `list-[${counterType}]`
          )}
        >
          {data.items.map((item, index) => {
            return (
              <li key={index} className="mt-2">
                {item.content}
              </li>
            );
          })}
        </ol>
      );
    }

    if (data.style === "unordered") {
      return (
        <ul id={id} className="my-6 ml-6 list-disc">
          {data.items.map((item, index) => (
            <li key={index} className="mt-2">
              {item.content}
            </li>
          ))}
        </ul>
      );
    }

    if (data.style === "checklist") {
      return (
        <div id={id} className="my-6 ml-6">
          {data.items.map((item, index) => {
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
  table: ({ id, data }: OutputBlockData<string, TableData>) => {
    if (data.content.length === 0) {
      return null;
    }

    const [headings, ...rows] = data.content;

    return (
      <div id={id} className="my-6 w-full overflow-y-auto">
        <table className={cn({ "w-full": data.stretched })}>
          {data.withHeadings && (
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
            {(data.withHeadings ? rows : data.content).map((row, rowIndex) => (
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
  code: ({ id, data }: OutputBlockData<string, CodeData>) => {
    return (
      <pre
        id={id}
        className="mb-4 mt-6 overflow-x-auto rounded-lg border bg-black py-4"
      >
        <code className="font-mono relative rounded border px-[0.3rem] py-[0.2rem] text-sm">
          {data.code}
        </code>
      </pre>
    );
  },
  embed: ({ id, data }: OutputBlockData<string, EmbedData>) => {
    return (
      <figure id={id} className={`embed-block-service-${data.service}`}>
        {data.embed ? (
          <iframe
            title={data.service}
            src={data.embed}
            width={data.width}
            height={data.height}
            data-src={data.source}
          />
        ) : (
          <a
            href={data.source}
            target="_blank"
            rel="noreferer nofollower external"
          >
            {data.source}
          </a>
        )}
        {data.caption && <figcaption>{data.caption}</figcaption>}
      </figure>
    );
  },
  image: ({ id, data }: OutputBlockData<string, ImageData>) => {
    return (
      <figure
        id={id}
        className={cn({
          border: data.withBorder,
          "bg-muted": data.withBackground,
          "w-full": data.stretched,
        })}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        {data.file.url && <img src={data.file.url} alt={data.caption} />}

        {data.caption && <figcaption>{data.caption}</figcaption>}
      </figure>
    );
  },
};

interface BlockProps {
  data: OutputBlockData[];
}

const Block = ({ data }: BlockProps) => {
  const BlockComponent = useBlockComponent(data);

  return (
    <div>
      <BlockComponent components={components} />
    </div>
  );
};

export default Block;
