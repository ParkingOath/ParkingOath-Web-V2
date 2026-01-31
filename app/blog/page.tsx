import { Container } from "@/components/Container";
import { H1, H3 } from "@/components/Headers";
import { Text } from "@/components/Text";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import Link from "next/link";
import Image from "next/image";
import { FaArrowRight } from "react-icons/fa";
import ctaGraphic from "@/assets/blog/cta_graphic.png";
import {
    getBlogPosts,
    getAssetAlt,
    getAssetUrl,
    estimateReadTime,
} from "@/lib/contentful";

export const revalidate = 60;

export default async function BlogPage() {
    const posts = await getBlogPosts();

    return (
        <div className="min-h-screen bg-slate-50">
            <Navbar />
            <main className="py-20 sm:py-32">
                <Container>
                    <div className="mx-auto max-w-2xl text-center">
                        <H1 className="mb-4">Parking Insights & News</H1>
                        <Text size="lg" tone="muted" className="mt-6">
                            Stay up to date with the latest trends, tips, and technology in the world of parking.
                        </Text>
                    </div>

                    <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-12 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                        {posts.map((post) => {
                            const imageUrl = getAssetUrl(post.fields.featuredImage);
                            const imageAlt = getAssetAlt(post.fields.featuredImage);
                            const readTime = estimateReadTime(post.fields.content);
                            const publishedDate = new Date(post.fields.publishedDate);
                            const dateLabel = new Intl.DateTimeFormat("en-US", {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                            }).format(publishedDate);

                            return (
                                <article key={post.sys.id} className="flex flex-col items-start justify-between rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-900/5 transition-all hover:shadow-md hover:ring-slate-900/10">
                                    <div className="flex items-center gap-x-4 text-xs">
                                        <time dateTime={post.fields.publishedDate} className="text-slate-500">
                                            {dateLabel}
                                        </time>
                                        <span className="relative z-10 rounded-full bg-blue-50 px-3 py-1.5 font-medium text-blue-600 ring-1 ring-inset ring-blue-700/10 hover:bg-blue-100">
                                            Blog
                                        </span>
                                    </div>
                                    <div className="group relative mt-6 flex-grow">
                                        <div className="relative mb-5 h-16 w-16 overflow-hidden rounded-xl bg-slate-100 shadow-sm ring-1 ring-slate-200">
                                            {imageUrl ? (
                                                <Image src={imageUrl} alt={imageAlt} fill className="object-cover" />
                                            ) : (
                                                <div className="flex h-full w-full items-center justify-center bg-blue-600 text-white text-xs font-semibold">
                                                    PO
                                                </div>
                                            )}
                                        </div>
                                        <H3 className="text-xl font-bold leading-7 text-slate-900 group-hover:text-blue-600 transition-colors">
                                            <Link href={`/blog/${post.fields.slug}`}>
                                                <span className="absolute inset-0" />
                                                {post.fields.title}
                                            </Link>
                                        </H3>
                                        <Text className="mt-4 line-clamp-3 text-sm leading-6 text-slate-600">
                                            {post.fields.shortDescription ?? ""}
                                        </Text>
                                    </div>
                                    <div className="relative mt-8 flex w-full items-center justify-between gap-x-4 border-t border-slate-100 pt-6">
                                        <div className="flex items-center gap-x-3">
                                            <div className="relative h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center font-bold text-xs text-slate-500 overflow-hidden ring-1 ring-slate-200">
                                                {post.fields.author?.fields?.avatar ? (
                                                    <Image
                                                        src={getAssetUrl(post.fields.author.fields.avatar) || ""}
                                                        alt={post.fields.author.fields.name || ""}
                                                        fill
                                                        className="object-cover"
                                                    />
                                                ) : (
                                                    post.fields.author?.fields?.name?.charAt(0) ?? "P"
                                                )}
                                            </div>
                                            <div className="text-sm leading-tight">
                                                <p className="font-semibold text-slate-900">
                                                    {post.fields.author?.fields?.name ?? "Parking Oath"}
                                                </p>
                                                {readTime ? <p className="text-xs text-slate-500 mt-0.5">{readTime}</p> : null}
                                            </div>
                                        </div>
                                        <Link href={`/blog/${post.fields.slug}`} className="flex items-center text-sm font-semibold text-blue-600 hover:text-blue-500 transition-colors">
                                            Read more <FaArrowRight className="ml-1.5 h-3 w-3" />
                                        </Link>
                                    </div>
                                </article>
                            );
                        })}
                    </div>

                    <div className="mt-12 flex justify-center">
                        <div className="relative isolate overflow-hidden bg-slate-900 px-6 py-16 shadow-2xl rounded-3xl sm:px-12 w-full lg:flex lg:items-center lg:gap-x-12 lg:text-left">
                            <div className="relative h-48 w-full lg:h-auto lg:w-2/5 lg:shrink-0 flex items-center justify-center">
                                <Image
                                    src={ctaGraphic}
                                    alt="Parking revolution community"
                                    className="w-full max-w-[280px] object-contain"
                                    priority
                                />
                            </div>
                            <div className="mt-8 lg:mt-0 lg:flex-auto">
                                <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                                    Join our parking revolution today.
                                </h2>
                                <p className="mt-4 text-lg leading-8 text-slate-300">
                                    Get exclusive updates and early access to our new features.
                                </p>
                                <div className="mt-8 flex items-center justify-center lg:justify-start gap-x-6">
                                    <Link
                                        href="/"
                                        className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-slate-900 shadow-sm hover:bg-slate-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                                    >
                                        Get started
                                    </Link>
                                    <Link href="/" className="text-sm font-semibold leading-6 text-white">
                                        Learn more <span aria-hidden="true">→</span>
                                    </Link>
                                </div>
                            </div>
                            <svg
                                viewBox="0 0 1024 1024"
                                className="absolute left-1/2 top-1/2 -z-10 h-[64rem] w-[64rem] -translate-x-1/2 [mask-image:radial-gradient(closest-side,white,transparent)]"
                                aria-hidden="true"
                            >
                                <circle cx={512} cy={512} r={512} fill="url(#gradient)" fillOpacity="0.7" />
                                <defs>
                                    <radialGradient id="gradient">
                                        <stop stopColor="#3b82f6" />
                                        <stop offset={1} stopColor="#1d4ed8" />
                                    </radialGradient>
                                </defs>
                            </svg>
                        </div>
                    </div>

                </Container>
            </main>
            <Footer />
        </div>
    );
}
