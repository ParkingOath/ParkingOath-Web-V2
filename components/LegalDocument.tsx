import * as React from "react";
import Link from "next/link";

import { H2, H4 } from "./Headers";
import { Text } from "./Text";

export type LegalRun = { t: string; b?: boolean; i?: boolean; href?: string };

export type LegalBlock =
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "p"; runs: LegalRun[] }
  | { type: "lead"; runs: LegalRun[] }
  | { type: "ul"; items: LegalRun[][] }
  | { type: "ol"; items: LegalRun[][] }
  | { type: "note"; blocks: LegalBlock[] }
  | { type: "callout"; blocks: LegalBlock[] }
  | { type: "table"; header: LegalRun[][]; rows: LegalRun[][][] };

const slug = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

function Runs({ runs }: { runs: LegalRun[] }) {
  return (
    <>
      {runs.map((run, index) => {
        let node: React.ReactNode = run.t;
        if (run.i) node = <em>{node}</em>;
        if (run.b) node = <strong className="font-semibold text-slate-900">{node}</strong>;
        if (run.href) {
          const external = /^https?:/.test(run.href);
          node = external ? (
            <a
              href={run.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#2534C9] underline underline-offset-2"
            >
              {node}
            </a>
          ) : (
            <Link href={run.href} className="text-[#2534C9] underline underline-offset-2">
              {node}
            </Link>
          );
        }
        return <React.Fragment key={index}>{node}</React.Fragment>;
      })}
    </>
  );
}

function Block({ block }: { block: LegalBlock }) {
  switch (block.type) {
    case "h2":
      return (
        <H2 id={slug(block.text)} className="scroll-mt-28 pt-8 text-2xl sm:text-3xl lg:text-3xl">
          {block.text}
        </H2>
      );
    case "h3":
      return (
        <H4 id={slug(block.text)} className="scroll-mt-28 pt-4 text-lg sm:text-xl lg:text-xl">
          {block.text}
        </H4>
      );
    case "lead":
      return (
        <Text className="italic text-slate-600">
          <Runs runs={block.runs} />
        </Text>
      );
    case "p":
      return (
        <Text>
          <Runs runs={block.runs} />
        </Text>
      );
    case "ul":
    case "ol": {
      const ListTag = block.type === "ul" ? "ul" : "ol";
      return (
        <ListTag
          className={`space-y-2 pl-6 text-base leading-7 text-[#334155] sm:text-lg ${
            block.type === "ul" ? "list-disc" : "list-decimal"
          }`}
        >
          {block.items.map((item, index) => (
            <li key={index}>
              <Runs runs={item} />
            </li>
          ))}
        </ListTag>
      );
    }
    case "note":
      return (
        <div className="space-y-3 border-l-4 border-slate-300 pl-4 text-slate-600">
          {block.blocks.map((child, index) => (
            <Block key={index} block={child} />
          ))}
        </div>
      );
    case "callout":
      return (
        <div className="space-y-3 rounded-2xl border border-slate-200 bg-white p-6">
          {block.blocks.map((child, index) => (
            <Block key={index} block={child} />
          ))}
        </div>
      );
    case "table":
      return (
        <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
          <table className="w-full min-w-[480px] text-left text-sm text-[#334155] sm:text-base">
            <thead className="bg-slate-100">
              <tr>
                {block.header.map((cell, index) => (
                  <th key={index} className="px-4 py-3 font-semibold text-slate-900">
                    <Runs runs={cell} />
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, rowIndex) => (
                <tr key={rowIndex} className="border-t border-slate-200 align-top">
                  {row.map((cell, cellIndex) => (
                    <td key={cellIndex} className="px-4 py-3">
                      <Runs runs={cell} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
  }
}

export function LegalDocument({ blocks }: { blocks: LegalBlock[] }) {
  return (
    <div className="space-y-5 break-words">
      {blocks.map((block, index) => (
        <Block key={index} block={block} />
      ))}
    </div>
  );
}

export function LegalContents({ blocks }: { blocks: LegalBlock[] }) {
  const sections = blocks.filter((block): block is { type: "h2"; text: string } => block.type === "h2");
  if (sections.length < 2) return null;
  return (
    <nav aria-label="Contents" className="rounded-2xl border border-slate-200 bg-white p-6">
      <Text size="sm" className="font-semibold text-slate-900">
        Contents
      </Text>
      <ul className="mt-3 space-y-2 text-sm text-[#2534C9] sm:text-base">
        {sections.map((section) => (
          <li key={section.text}>
            <a href={`#${slug(section.text)}`} className="underline underline-offset-2">
              {section.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
