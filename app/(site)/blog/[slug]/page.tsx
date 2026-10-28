import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { CTASection } from "@/components/site/CTASection";
import { getPost, getPosts } from "@/lib/content";
import { buildMetadata, postArticleLd } from "@/lib/seo";

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return {};
  return buildMetadata({
    title: post.searchTitle,
    description: post.summary.slice(0, 160),
    path: `/blog/${post.slug}`,
    type: "article",
  });
}

export default async function PostPage({ params }: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  return (
    <>
      <JsonLd data={postArticleLd(post)} />
      <article className="container-x max-w-3xl py-16">
        <Breadcrumbs
          crumbs={[
            { name: "Home", path: "/" },
            { name: "Blog", path: "/blog" },
            { name: post.title, path: `/blog/${post.slug}` },
          ]}
        />
        <header className="mt-8">
          <p className="text-sm text-muted">
            [{post.category}] · <time dateTime={post.dateIso}>[{post.date}]</time>
          </p>
          <h1 className="mt-3 text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl">
            {post.title}
          </h1>
        </header>
        <div className="mt-10 space-y-5 text-lg leading-relaxed">
          {post.body.map((section, i) => (
            <section key={i}>
              {section.heading ? (
                <h2 className="mb-3 mt-8 text-2xl font-bold">{section.heading}</h2>
              ) : null}
              <p>{section.text}</p>
            </section>
          ))}
        </div>
      </article>
      <CTASection
        title="Facing the same problem?"
        text="Tell us how you work today. We will tell you honestly what software can fix."
      />
    </>
  );
}
