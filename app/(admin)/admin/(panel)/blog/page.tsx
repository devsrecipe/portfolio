import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/admin/PageHeader";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { adminPosts } from "@/content/admin";

export const metadata: Metadata = { title: "Blog" };

export default function AdminBlogPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="Blog"
        actions={
          <ButtonLink href="/admin/blog/new" size="sm">
            New blog post
          </ButtonLink>
        }
      />
      <Card className="overflow-x-auto">
        <table className="w-full min-w-[36rem] text-left">
          <caption className="sr-only">Blog posts</caption>
          <thead className="text-sm text-muted">
            <tr className="border-b border-border">
              <th scope="col" className="px-5 py-4 font-medium">
                Title
              </th>
              <th scope="col" className="px-3 py-4 font-medium">
                Category
              </th>
              <th scope="col" className="px-3 py-4 font-medium">
                Status
              </th>
              <th scope="col" className="px-5 py-4 font-medium">
                Updated
              </th>
            </tr>
          </thead>
          <tbody>
            {adminPosts.map((post) => (
              <tr
                key={post.id}
                className="border-b border-border last:border-0 hover:bg-surface-2"
              >
                <th scope="row" className="px-5 py-4 text-left font-semibold">
                  <Link href={`/admin/blog/${post.id}`} className="hover:text-primary">
                    {post.title}
                  </Link>
                </th>
                <td className="px-3 py-4">{post.category}</td>
                <td className="px-3 py-4">
                  <Badge variant={post.status === "Published" ? "success" : "neutral"}>
                    {post.status}
                  </Badge>
                </td>
                <td className="px-5 py-4 text-muted">{post.updated}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
