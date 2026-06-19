import type { CategoryId } from "./categories";
import posts from "./blog-posts.json";

export interface Article {
  slug: string;
  title: { es: string; en: string };
  excerpt: { es: string; en: string };
  body: { es: string; en: string }; // Markdown
  category: CategoryId;
  tags: string[];
  minRead: number;
  date: string;
  featured?: boolean;
  author: string;
  metaDescription?: string;
}

interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  categoryOriginal: string;
  tags: string[];
  date: string;
  metaDescription: string;
  minRead: number;
}

const AUTHOR = "José Miguel";

// El blog se alimenta de Recursos/blog_mongohacker.xlsx.
// Regenera blog-posts.json con: npm run import:blog
// El contenido solo está en español; el sitio muestra el mismo texto en EN.
export const articles: Article[] = (posts as BlogPost[])
  .slice()
  .sort((a, b) => b.date.localeCompare(a.date))
  .map((p, i) => ({
    slug: p.slug,
    title: { es: p.title, en: p.title },
    excerpt: { es: p.excerpt, en: p.excerpt },
    body: { es: p.content, en: p.content },
    category: p.category as CategoryId,
    tags: p.tags,
    minRead: p.minRead,
    date: p.date,
    featured: i < 2, // los 2 más recientes se destacan en portada y blog
    author: AUTHOR,
    metaDescription: p.metaDescription,
  }));

export const articleBySlug = (slug: string) => articles.find((a) => a.slug === slug);
