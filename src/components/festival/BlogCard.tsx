import { ArrowUpRight, Clock } from "lucide-react";

export type Blog = {
  id: string;
  title: string;
  excerpt: string;
  author: string;
  readMins: number;
  category: string;
  image: string;
};

export default function BlogCard({ b }: { b: Blog }) {
  return (
    <article className="fest-card group">
      <div className="img-zoom aspect-[16/10] relative">
        <img src={b.image} alt={b.title} loading="lazy" className="w-full h-full object-cover" />
        <span className="absolute top-3 left-3 tag">{b.category}</span>
      </div>
      <div className="p-5">
        <div className="flex items-center gap-3 text-xs text-[hsl(35_12%_70%)]">
          <span>{b.author}</span>
          <span className="w-1 h-1 rounded-full bg-[hsl(35_12%_50%)]" />
          <span className="inline-flex items-center gap-1"><Clock size={12} /> {b.readMins} min read</span>
        </div>
        <h3 className="font-display text-lg md:text-xl font-semibold mt-2 leading-snug group-hover:text-[hsl(38_96%_58%)] transition-colors">
          {b.title}
        </h3>
        <p className="text-sm text-[hsl(35_12%_70%)] mt-2 line-clamp-2">{b.excerpt}</p>
        <a href="#" className="inline-flex items-center gap-1 mt-4 text-sm font-semibold text-[hsl(38_96%_58%)]">
          Read story <ArrowUpRight size={16} />
        </a>
      </div>
    </article>
  );
}
