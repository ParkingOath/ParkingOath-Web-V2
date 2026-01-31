import { Container } from "@/components/Container";
import { H1, H4 } from "@/components/Headers";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import Link from "next/link";
import Image from "next/image";
import { FaArrowLeft, FaCalendar, FaClock, FaUser } from "react-icons/fa";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
    estimateReadTime,
    getAssetAlt,
    getAssetUrl,
    getBlogPostBySlug,
    getBlogPosts,
    richTextToPlainText,
    type Asset,
    type RichImageFields,
} from "@/lib/contentful";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS, INLINES } from "@contentful/rich-text-types";

export const revalidate = 60;

export async function generateStaticParams() {
    const posts = await getBlogPosts();
    return posts.map((post) => ({
        slug: post.fields.slug,
    }));
}

const createDescription = (text: string) => {
    if (!text) return "";
    if (text.length <= 160) return text;
    return `${text.slice(0, 157).trim()}...`;
};

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}): Promise<Metadata> {
    const { slug } = await params;
    const post = await getBlogPostBySlug(slug);
    if (!post) return {};

    const seo = post.fields.seoFields?.fields;
    const title = seo?.pageTitle ?? post.fields.title;
    const description =
        seo?.pageDescription ??
        post.fields.shortDescription ??
        createDescription(richTextToPlainText(post.fields.content));

    const canonical = seo?.canonicalUrl;
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
    const fallbackUrl = siteUrl ? `${siteUrl}/blog/${post.fields.slug}` : undefined;
    const url = canonical || fallbackUrl;

    const shareImages = seo?.shareImages?.length
        ? seo.shareImages
        : [post.fields.featuredImage];
    const images = shareImages
        .map((asset: Asset) => {
            const src = getAssetUrl(asset);
            return src ? { url: src, alt: getAssetAlt(asset) } : null;
        })
        .filter(Boolean) as { url: string; alt?: string }[];

    const robots = {
        index: !(seo?.noindex ?? false),
        follow: !(seo?.nofollow ?? false),
    };

    return {
        title,
        description,
        alternates: url ? { canonical: url } : undefined,
        robots,
        openGraph: {
            type: "article",
            title,
            description,
            url,
            images,
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
            images: images.map((img) => img.url),
        },
    };
}

export default async function BlogPostPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const post = await getBlogPostBySlug(slug);
    if (!post) {
        notFound();
    }

    const imageUrl = getAssetUrl(post.fields.featuredImage);
    const imageAlt = getAssetAlt(post.fields.featuredImage);
    const readTime = estimateReadTime(post.fields.content);
    const publishedDate = new Date(post.fields.publishedDate);
    const dateLabel = new Intl.DateTimeFormat("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    }).format(publishedDate);
    const authorName = post.fields.author?.fields?.name ?? "Parking Oath";
    const authorAvatarUrl = getAssetUrl(post.fields.author?.fields?.avatar);

    const richText = documentToReactComponents(post.fields.content, {
        renderNode: {
            [BLOCKS.PARAGRAPH]: (_, children) => (
                <p className="text-slate-600 leading-7 mb-6">{children}</p>
            ),
            [BLOCKS.HEADING_1]: (_, children) => (
                <h1 className="text-3xl font-bold text-slate-900 mt-12 mb-6">{children}</h1>
            ),
            [BLOCKS.HEADING_2]: (_, children) => (
                <h2 className="text-2xl font-bold text-slate-900 mt-10 mb-5">{children}</h2>
            ),
            [BLOCKS.HEADING_3]: (_, children) => (
                <h3 className="text-xl font-bold text-slate-900 mt-8 mb-4">{children}</h3>
            ),
            [BLOCKS.HEADING_4]: (_, children) => (
                <h4 className="text-lg font-bold text-slate-900 mt-6 mb-4">{children}</h4>
            ),
            [BLOCKS.UL_LIST]: (_, children) => (
                <ul className="list-disc pl-6 space-y-2 text-slate-600 mb-6">{children}</ul>
            ),
            [BLOCKS.OL_LIST]: (_, children) => (
                <ol className="list-decimal pl-6 space-y-2 text-slate-600 mb-6">{children}</ol>
            ),
            [BLOCKS.LIST_ITEM]: (_, children) => <li className="leading-7">{children}</li>,
            [BLOCKS.TABLE]: (_, children) => (
                <div className="my-8 overflow-x-auto">
                    <table className="w-full text-left text-sm text-slate-600 border-collapse">
                        {children}
                    </table>
                </div>
            ),
            [BLOCKS.TABLE_ROW]: (_, children) => <tr className="border-b border-slate-100">{children}</tr>,
            [BLOCKS.TABLE_CELL]: (_, children) => (
                <td className="py-2 pr-4 align-top">{children}</td>
            ),
            [BLOCKS.TABLE_HEADER_CELL]: (_, children) => (
                <th className="py-2 pr-4 align-top font-semibold text-slate-900">{children}</th>
            ),
            [BLOCKS.QUOTE]: (_, children) => (
                <blockquote className="border-l-4 border-blue-600 pl-4 italic text-slate-600 my-6">
                    {children}
                </blockquote>
            ),
            [BLOCKS.HR]: () => <hr className="my-8 border-slate-100" />,
            [BLOCKS.EMBEDDED_ENTRY]: (node) => {
                const entry = node.data.target as { fields?: RichImageFields; sys?: { contentType?: { sys?: { id?: string } } } };
                if (entry?.sys?.contentType?.sys?.id !== "componentRichImage") return null;
                const image = entry.fields?.image;
                const imageSrc = getAssetUrl(image);
                if (!imageSrc) return null;
                const caption = entry.fields?.caption;
                const fullWidth = entry.fields?.fullWidth;
                return (
                    <figure className={fullWidth ? "my-8 -mx-8 sm:-mx-12" : "my-8"}>
                        <div className={`relative ${fullWidth ? "h-72 sm:h-96" : "h-64"} w-full overflow-hidden rounded-2xl`}>
                            <Image src={imageSrc} alt={getAssetAlt(image)} fill className="object-cover" />
                        </div>
                        {caption ? (
                            <figcaption className="mt-3 text-sm text-slate-500 text-center">
                                {caption}
                            </figcaption>
                        ) : null}
                    </figure>
                );
            },
            [BLOCKS.EMBEDDED_ASSET]: (node) => {
                const asset = node.data.target;
                const assetUrl = getAssetUrl(asset);
                if (!assetUrl) return null;
                return (
                    <div className="my-8">
                        <div className="relative h-64 w-full overflow-hidden rounded-2xl">
                            <Image src={assetUrl} alt={getAssetAlt(asset)} fill className="object-cover" />
                        </div>
                    </div>
                );
            },
            [INLINES.HYPERLINK]: (node, children) => (
                <a href={node.data.uri} className="text-blue-600 underline underline-offset-4 hover:text-blue-500">
                    {children}
                </a>
            ),
            [INLINES.ENTRY_HYPERLINK]: (node, children) => {
                const entry = node.data.target as { fields?: { slug?: string } };
                const slug = entry?.fields?.slug;
                return slug ? (
                    <Link href={`/blog/${slug}`} className="text-blue-600 underline underline-offset-4 hover:text-blue-500">
                        {children}
                    </Link>
                ) : (
                    <span>{children}</span>
                );
            },
        },
    });

    const metaItems = [
        <span key="date" className="flex items-center gap-1"><FaCalendar className="text-blue-500" /> {dateLabel}</span>,
        ...(readTime ? [<span key="read" className="flex items-center gap-1"><FaClock className="text-blue-500" /> {readTime}</span>] : []),
        <span key="category" className="inline-flex items-center rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">Blog</span>,
    ];

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col">
            <Navbar />
            <main className="flex-grow py-20 sm:py-32">
                <Container className="max-w-4xl">
                    <div className="mb-8">
                        <Link href="/blog" className="inline-flex items-center text-sm font-semibold text-blue-600 hover:text-blue-500 transition-colors">
                            <FaArrowLeft className="mr-2" /> Back to Blog
                        </Link>
                    </div>

                    <article className="rounded-3xl bg-white overflow-hidden shadow-sm ring-1 ring-slate-900/5">
                        {/* Hero Image */}
                        <div className="relative h-64 sm:h-96 w-full">
                            {imageUrl ? (
                                <Image
                                    src={imageUrl}
                                    alt={imageAlt}
                                    fill
                                    className="object-cover"
                                    priority
                                />
                            ) : null}
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
                        </div>

                        <div className="p-8 sm:p-12">
                            <header className="mb-10 text-center">
                                <div className="mb-4 flex items-center justify-center gap-x-2 text-sm text-slate-500">
                                    {metaItems.map((item, index) => (
                                        <span key={index} className="flex items-center gap-x-2">
                                            {item}
                                            {index < metaItems.length - 1 ? <span>•</span> : null}
                                        </span>
                                    ))}
                                </div>
                                <H1 className="mb-6 text-3xl sm:text-4xl lg:text-5xl">{post.fields.title}</H1>
                                <div className="flex items-center justify-center gap-x-2 text-sm font-semibold text-slate-900">
                                    <div className="relative h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center font-bold text-xs text-slate-500 overflow-hidden ring-1 ring-slate-200">
                                        {authorAvatarUrl ? (
                                            <Image src={authorAvatarUrl} alt={authorName} fill className="object-cover" />
                                        ) : (
                                            <FaUser />
                                        )}
                                    </div>
                                    {authorName}
                                </div>
                            </header>

                            <div className="mx-auto max-w-3xl">
                                {post.fields.shortDescription ? (
                                    <p className="mb-10 text-lg leading-8 text-slate-600">
                                        {post.fields.shortDescription}
                                    </p>
                                ) : null}

                                <div>{richText}</div>
                            </div>

                            <hr className="my-10 border-slate-100" />

                            <div className="flex justify-between items-center sm:flex-row flex-col gap-4">
                                <H4>Share this article</H4>
                                <div className="flex gap-2">
                                    <button className="rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-200 transition-colors">Twitter</button>
                                    <button className="rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-200 transition-colors">LinkedIn</button>
                                    <button className="rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-200 transition-colors">Email</button>
                                </div>
                            </div>
                        </div>
                    </article>

                </Container>
            </main>
            <Footer />
        </div>
    );
}
