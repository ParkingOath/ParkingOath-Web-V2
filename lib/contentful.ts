import type { Document } from "@contentful/rich-text-types";
import type {
  Asset,
  AuthorFields,
  BlogPostFields,
  BlogPostEntry,
  EntriesResponse,
  Entry,
  Link,
  PageLandingFields,
  PageLandingEntry,
  RichImageFields,
  SeoFields,
} from "@/lib/contentful-types";

const space = process.env.CONTENTFUL_SPACE_ID;
const accessToken = process.env.CONTENTFUL_ACCESS_TOKEN;
const previewAccessToken = process.env.CONTENTFUL_PREVIEW_TOKEN;
const environment = process.env.CONTENTFUL_ENVIRONMENT || "master";
const previewEnabled = process.env.CONTENTFUL_PREVIEW === "true";

if (!space || !accessToken) {
  throw new Error(
    "Missing Contentful env vars. Set CONTENTFUL_SPACE_ID and CONTENTFUL_ACCESS_TOKEN."
  );
}

const host = previewEnabled ? "preview.contentful.com" : "cdn.contentful.com";
const apiBase = `https://${host}/spaces/${space}/environments/${environment}`;
const apiToken = previewEnabled ? previewAccessToken || accessToken : accessToken;

async function contentfulFetch<T>(
  path: string,
  params: Record<string, string | number | boolean | undefined>
) {
  const url = new URL(`${apiBase}/${path}`);
  url.searchParams.set("access_token", apiToken);
  Object.entries(params).forEach(([key, value]) => {
    if (value === undefined || value === null) return;
    url.searchParams.set(key, String(value));
  });

  const response = await fetch(url.toString());
  if (!response.ok) {
    throw new Error(`Contentful request failed: ${response.status}`);
  }
  return (await response.json()) as T;
}

const isLink = (value: any): value is Link =>
  Boolean(value?.sys?.type === "Link" && value?.sys?.id);

const isRichTextNode = (value: any): value is Document =>
  Boolean(value?.nodeType && Array.isArray(value?.content));

function resolveLinks<TFields>(response: EntriesResponse<TFields>) {
  const entryMap = new Map<string, Entry<any>>();
  const assetMap = new Map<string, Asset>();

  response.items.forEach((item) => entryMap.set(item.sys.id, item));
  response.includes?.Entry?.forEach((item) => entryMap.set(item.sys.id, item));
  response.includes?.Asset?.forEach((asset) => assetMap.set(asset.sys.id, asset));

  const resolvedEntryCache = new Map<string, Entry<any>>();
  const resolvedAssetCache = new Map<string, Asset>();

  const resolveAsset = (asset: Asset): Asset => {
    const cached = resolvedAssetCache.get(asset.sys.id);
    if (cached) return cached;
    resolvedAssetCache.set(asset.sys.id, asset);
    return asset;
  };

  const resolveValue = (value: any): any => {
    if (Array.isArray(value)) return value.map(resolveValue);
    if (isLink(value)) return resolveLink(value);
    if (isRichTextNode(value)) return resolveRichTextNode(value);
    return value;
  };

  const resolveEntry = (entry: Entry<any>): Entry<any> => {
    const cached = resolvedEntryCache.get(entry.sys.id);
    if (cached) return cached;
    const resolved: Entry<any> = {
      ...entry,
      fields: {},
    };
    resolvedEntryCache.set(entry.sys.id, resolved);
    Object.entries(entry.fields || {}).forEach(([key, value]) => {
      resolved.fields[key] = resolveValue(value);
    });
    return resolved;
  };

  const resolveLink = (link: Link) => {
    if (link.sys.linkType === "Asset") {
      const asset = assetMap.get(link.sys.id);
      return asset ? resolveAsset(asset) : null;
    }
    const entry = entryMap.get(link.sys.id);
    return entry ? resolveEntry(entry) : null;
  };

  const resolveRichTextNode = (node: any): any => {
    const resolvedNode = { ...node };
    if (resolvedNode?.data?.target && isLink(resolvedNode.data.target)) {
      resolvedNode.data = {
        ...resolvedNode.data,
        target: resolveLink(resolvedNode.data.target),
      };
    }
    if (Array.isArray(resolvedNode.content)) {
      resolvedNode.content = resolvedNode.content.map(resolveRichTextNode);
    }
    return resolvedNode;
  };

  return response.items.map((item) => resolveEntry(item));
}

export type {
  Asset,
  AuthorFields,
  BlogPostFields,
  BlogPostEntry,
  EntriesResponse,
  Entry,
  Link,
  PageLandingFields,
  PageLandingEntry,
  RichImageFields,
  SeoFields,
};

export async function getLandingPage() {
  const response = await contentfulFetch<EntriesResponse<PageLandingFields>>(
    "entries",
    {
      content_type: "pageLanding",
      limit: 1,
      include: 2,
    }
  );
  const items = resolveLinks(response);
  return items[0] ?? null;
}

export async function getBlogPosts() {
  const response = await contentfulFetch<EntriesResponse<BlogPostFields>>(
    "entries",
    {
      content_type: "pageBlogPost",
      order: "-fields.publishedDate",
      include: 2,
    }
  );
  return resolveLinks(response);
}

export async function getBlogPostBySlug(slug: string) {
  const response = await contentfulFetch<EntriesResponse<BlogPostFields>>(
    "entries",
    {
      content_type: "pageBlogPost",
      "fields.slug": slug,
      limit: 1,
      include: 2,
    }
  );
  const items = resolveLinks(response);
  return items[0] ?? null;
}

export function getAssetUrl(asset?: Asset | null) {
  const url = asset?.fields?.file?.url;
  if (!url) return null;
  return url.startsWith("//") ? `https:${url}` : url;
}

export function getAssetAlt(asset?: Asset | null) {
  return asset?.fields?.description || asset?.fields?.title || "";
}

export function richTextToPlainText(node?: Document | null) {
  if (!node) return "";

  const walk = (value: any): string => {
    if (!value) return "";
    if (value.nodeType === "text") return value.value || "";
    if (Array.isArray(value.content)) {
      return value.content.map(walk).join(" ");
    }
    return "";
  };

  return walk(node).replace(/\s+/g, " ").trim();
}

export function estimateReadTime(content?: Document | null) {
  const text = richTextToPlainText(content);
  if (!text) return null;
  const words = text.split(" ").filter(Boolean).length;
  const minutes = Math.max(1, Math.round(words / 200));
  return `${minutes} min read`;
}
