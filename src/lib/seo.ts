import { createClient } from "@supabase/supabase-js";
import type { Metadata } from "next";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export async function getPageMetadata(page: string): Promise<Metadata> {
  try {
    const supabase = createClient(supabaseUrl, supabaseKey);
    const { data } = await supabase
      .from("seo_settings")
      .select("*")
      .eq("page", page)
      .single();

    if (!data) return {};

    const metadata: Metadata = {};
    if (data.title) metadata.title = data.title;
    if (data.description) metadata.description = data.description;
    if (data.keywords) metadata.keywords = data.keywords;
    if (data.robots) metadata.robots = data.robots;
    if (data.canonical_url) {
      metadata.alternates = { canonical: data.canonical_url };
    }

    const og: Record<string, unknown> = {};
    if (data.og_title) og.title = data.og_title;
    if (data.og_description) og.description = data.og_description;
    if (data.og_image) og.images = [data.og_image];
    if (Object.keys(og).length > 0) {
      metadata.openGraph = og as Metadata["openGraph"];
    }

    return metadata;
  } catch {
    return {};
  }
}
