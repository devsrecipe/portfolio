import type { Metadata } from "next";
import { BlogEditor } from "@/components/admin/BlogEditor";
import { adminPosts } from "@/content/admin";
import { posts } from "@/content/posts";

export const metadata: Metadata = { title: "Blog editor" };

export function generateStaticParams() {
  return [{ id: "new" }, ...adminPosts.map((p) => ({ id: p.id }))];
}

const placeholderBody =
  "[Opening paragraph that answers the question in the title directly. Buyers who search a question want the answer first.]\n\n## [Section heading]\n\n[Body text written in the editor. Headings, lists, images and links come from the toolbar above.]";

export default async function BlogEditorPage({ params }: PageProps<"/admin/blog/[id]">) {
  const { id } = await params;
  const post = posts.find((p) => p.slug === id);

  return (
    <BlogEditor
      key={id}
      title={post?.title ?? ""}
      slug={post?.slug ?? "new-post"}
      category={post?.category ?? ""}
      body={placeholderBody}
      searchTitle={post ? `${post.searchTitle} | Devs Recipe` : ""}
      searchDescription={
        post
          ? "[The two sentences Google shows under the title. Too long here, so the counter turns amber and asks you to shorten it. Aim for 160 characters or fewer so nothing is cut off.]"
          : ""
      }
    />
  );
}
