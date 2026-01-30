import { Container } from "@/components/Container";
import { H1, H3 } from "@/components/Headers";
import { Text } from "@/components/Text";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { blogPosts } from "./blog-data";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";

export default function BlogPage() {
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
                        {blogPosts.map((post) => (
                            <article key={post.id} className="flex flex-col items-start justify-between rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-900/5 transition-all hover:shadow-md hover:ring-slate-900/10">
                                <div className="flex items-center gap-x-4 text-xs">
                                    <time dateTime={post.date} className="text-slate-500">
                                        {post.date}
                                    </time>
                                    <span className="relative z-10 rounded-full bg-slate-50 px-3 py-1.5 font-medium text-slate-600 hover:bg-slate-100">
                                        {post.category}
                                    </span>
                                </div>
                                <div className="group relative mt-4">
                                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-600 text-white">
                                        <post.icon className="h-6 w-6" aria-hidden="true" />
                                    </div>
                                    <H3 className="text-lg font-semibold leading-6 text-slate-900 group-hover:text-slate-600">
                                        <Link href={`/blog/${post.id}`}>
                                            <span className="absolute inset-0" />
                                            {post.title}
                                        </Link>
                                    </H3>
                                    <Text className="mt-5 line-clamp-3 text-sm leading-6 text-slate-600">
                                        {post.excerpt}
                                    </Text>
                                </div>
                                <div className="relative mt-8 flex w-full items-center justify-between gap-x-4">
                                    <div className="flex items-center gap-x-2">
                                        <div className="h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center font-bold text-xs text-slate-500">
                                            {post.author.charAt(0)}
                                        </div>
                                        <div className="text-sm leading-6">
                                            <p className="font-semibold text-slate-900">
                                                <span className="absolute inset-0" />
                                                {post.author}
                                            </p>
                                            <p className="text-slate-500">{post.readTime}</p>
                                        </div>
                                    </div>
                                    <Link href="#" className="flex items-center text-sm font-semibold text-blue-600 hover:text-blue-500">
                                        Read more <FaArrowRight className="ml-1 h-3 w-3" />
                                    </Link>
                                </div>
                            </article>
                        ))}
                    </div>

                    <div className="mt-16 flex justify-center">
                        <div className="relative isolate overflow-hidden bg-slate-900 px-6 py-24 text-center shadow-2xl rounded-3xl sm:px-16 w-full">
                            <h2 className="mx-auto max-w-2xl text-3xl font-bold tracking-tight text-white sm:text-4xl">
                                Join our parking revolution today.
                            </h2>
                            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-slate-300">
                                Get exclusive updates and early access to our new features.
                            </p>
                            <div className="mt-10 flex items-center justify-center gap-x-6">
                                <a
                                    href="#"
                                    className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-slate-900 shadow-sm hover:bg-slate-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                                >
                                    Get started
                                </a>
                                <a href="#" className="text-sm font-semibold leading-6 text-white">
                                    Learn more <span aria-hidden="true">→</span>
                                </a>
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
