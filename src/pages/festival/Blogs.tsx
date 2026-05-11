import BlogCard from "@/components/festival/BlogCard";
import { blogs } from "@/components/festival/data";

export default function Blogs() {
  const featured = blogs[0];
  const rest = blogs.slice(1);
  return (
    <div className="py-16 md:py-24">
      <div className="fest-container">
        <span className="section-kicker">Journal</span>
        <h1 className="section-title mt-3">
          Stories from the <span className="text-gold italic">mehfil</span>
        </h1>
        <p className="mt-3 max-w-2xl text-[hsl(35_12%_75%)]">
          Long-form essays, interviews aur dispatches from across India's cultural frontline.
        </p>

        {/* Featured */}
        <article className="fest-card mt-10 grid md:grid-cols-2 overflow-hidden">
          <div className="img-zoom aspect-[16/10] md:aspect-auto">
            <img src={featured.image} alt={featured.title} className="w-full h-full object-cover" />
          </div>
          <div className="p-8 md:p-10 flex flex-col justify-center">
            <span className="tag crimson w-fit">Featured</span>
            <h2 className="font-display text-2xl md:text-3xl font-semibold mt-4 leading-tight">
              {featured.title}
            </h2>
            <p className="mt-3 text-[hsl(35_12%_75%)]">{featured.excerpt}</p>
            <div className="mt-5 text-sm text-[hsl(35_12%_70%)]">
              By {featured.author} &middot; {featured.readMins} min read
            </div>
            <a href="#" className="btn-outline-gold mt-6 w-fit">Read full essay</a>
          </div>
        </article>

        <div className="mt-12 grid md:grid-cols-3 gap-6">
          {rest.concat(blogs).map((b, i) => <BlogCard key={`${b.id}-${i}`} b={b} />)}
        </div>
      </div>
    </div>
  );
}
