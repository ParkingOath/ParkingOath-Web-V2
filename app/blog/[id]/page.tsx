import { Container } from "@/components/Container";
import { H1, H3, H4 } from "@/components/Headers";
import { Text } from "@/components/Text";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { blogPosts } from "../blog-data";
import Link from "next/link";
import Image from "next/image";
import { FaArrowLeft, FaCalendar, FaClock, FaUser } from "react-icons/fa";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
    return blogPosts.map((post) => ({
        id: post.id,
    }));
}

export default async function BlogPostPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    // Next.js 15+ allows async access to params, so we await it
    const { id } = await params;
    const post = blogPosts.find((p) => p.id === id);

    if (!post) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col">
            <Navbar />
            <main className="flex-grow py-12 sm:py-20">
                <Container className="max-w-4xl">
                    <div className="mb-8">
                        <Link href="/blog" className="inline-flex items-center text-sm font-semibold text-blue-600 hover:text-blue-500 transition-colors">
                            <FaArrowLeft className="mr-2" /> Back to Blog
                        </Link>
                    </div>

                    <article className="rounded-3xl bg-white overflow-hidden shadow-sm ring-1 ring-slate-900/5">
                        {/* Hero Image */}
                        <div className="relative h-64 sm:h-96 w-full">
                            <Image
                                src={post.image}
                                alt={post.title}
                                fill
                                className="object-cover"
                                priority
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
                        </div>

                        <div className="p-8 sm:p-12">
                            <header className="mb-10 text-center">
                                <div className="mb-4 flex items-center justify-center gap-x-2 text-sm text-slate-500">
                                    <span className="flex items-center gap-1"><FaCalendar className="text-blue-500" /> {post.date}</span>
                                    <span>•</span>
                                    <span className="flex items-center gap-1"><FaClock className="text-blue-500" /> {post.readTime}</span>
                                    <span>•</span>
                                    <span className="inline-flex items-center rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">{post.category}</span>
                                </div>
                                <H1 className="mb-6 text-3xl sm:text-4xl lg:text-5xl">{post.title}</H1>
                                <div className="flex items-center justify-center gap-x-2 text-sm font-semibold text-slate-900">
                                    <div className="h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center font-bold text-xs text-slate-500">
                                        <FaUser />
                                    </div>
                                    {post.author}
                                </div>
                            </header>

                            <div className="mx-auto max-w-prose">
                                <Text className="mb-10 text-lg leading-8 text-slate-600">
                                    {post.excerpt}
                                </Text>

                                {/* Sections */}
                                <div className="space-y-12">
                                    {post.sections.map((section, index) => (
                                        <div key={index} className="relative pl-12 sm:pl-16">
                                            <div className="absolute left-0 top-1 flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-lg font-bold text-white shadow-md sm:h-12 sm:w-12 sm:text-xl">
                                                {index + 1}
                                            </div>
                                            <H3 className="mb-4 text-2xl font-semibold text-slate-900">{section.title}</H3>
                                            <Text className="text-slate-600 leading-7">
                                                {section.content}
                                            </Text>
                                        </div>
                                    ))}
                                </div>
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
