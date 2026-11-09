import type { z } from "zod";
import type {
  faqItemSchema,
  industrySchema,
  jobSchema,
  postSchema,
  showcaseCategorySchema,
  storySchema,
  teamMemberSchema,
} from "@/content/schema";

/* Types come from the content schema, so they always match site-content.json. */

export type Industry = z.infer<typeof industrySchema>;
export type Story = z.infer<typeof storySchema>;
export type StoryStatus = Story["status"];
export type Post = z.infer<typeof postSchema>;
export type Job = z.infer<typeof jobSchema>;
export type FaqItem = z.infer<typeof faqItemSchema>;
export type TeamMember = z.infer<typeof teamMemberSchema>;
export type ShowcaseCategory = z.infer<typeof showcaseCategorySchema>;
export type { SiteContent } from "@/content/schema";
