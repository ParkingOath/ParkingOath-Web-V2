import type { Document } from "@contentful/rich-text-types";

export type SysLink = {
  type: "Link";
  linkType: "Entry" | "Asset";
  id: string;
};

export type SysContentType = {
  sys?: {
    id?: string;
  };
};

export type SysEntry = {
  id: string;
  type: "Entry";
  contentType?: SysContentType;
};

export type SysAsset = {
  id: string;
  type: "Asset";
};

export type Entry<TFields> = {
  sys: SysEntry;
  fields: TFields;
};

export type Asset = {
  sys: SysAsset;
  fields: {
    title?: string;
    description?: string;
    file?: {
      url?: string;
      contentType?: string;
      details?: {
        size?: number;
        image?: {
          width?: number;
          height?: number;
        };
      };
    };
  };
};

export type Link = { sys: SysLink };

export type EntriesResponse<TFields> = {
  items: Entry<TFields>[];
  includes?: {
    Entry?: Entry<any>[];
    Asset?: Asset[];
  };
};

export type AuthorFields = {
  name?: string;
  avatar?: Asset;
};

export type SeoFields = {
  pageTitle?: string;
  pageDescription?: string;
  canonicalUrl?: string;
  nofollow?: boolean;
  noindex?: boolean;
  shareImages?: Asset[];
};

export type RichImageFields = {
  image?: Asset;
  caption?: string;
  fullWidth?: boolean;
};

export type BlogPostFields = {
  internalName: string;
  seoFields?: Entry<SeoFields>;
  slug: string;
  author?: Entry<AuthorFields>;
  publishedDate: string;
  title: string;
  shortDescription?: string;
  featuredImage: Asset;
  content: Document;
  relatedBlogPosts?: Entry<BlogPostFields>[];
};

export type BlogPostEntry = Entry<BlogPostFields>;

export type PageLandingFields = {
  internalName: string;
  seoFields?: Entry<SeoFields>;
  featuredBlogPost?: Entry<BlogPostFields>;
};

export type PageLandingEntry = Entry<PageLandingFields>;
