"use client";
import { useState } from "react";

const categories = ["All", "Sustainability", "Lifestyle", "DIY & Home", "Fashion", "Wellness"];

const posts = [
  {
    id: 1,
    title: "10 Simple Swaps for a More Sustainable Home",
    excerpt: "Small changes in your daily routine can have a massive impact on your carbon footprint. Here are ten easy swaps to get started.",
    img: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80",
    category: "Lifestyle",
    author: "Aria Patel",
    date: "Jun 12, 2025",
    readTime: "5 min read",
    featured: true,
  },
  {
    id: 2,
    title: "What Does 'Fair Trade' Actually Mean?",
    excerpt: "The label is everywhere — but do you know what it really guarantees? We break it down in plain language.",
    img: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=600&q=80",
    category: "Sustainability",
    author: "Remi Chen",
    date: "May 28, 2025",
    readTime: "7 min read",
    featured: false,
  },
  {
    id: 3,
    title: "How to Build a Capsule Wardrobe with Ethical Pieces",
    excerpt: "A thoughtfully curated capsule wardrobe reduces waste and saves money. We'll show you how to build one with conscious brands.",
    img: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=600&q=80",
    category: "Fashion",
    author: "Sana Mirza",
    date: "May 15, 2025",
    readTime: "6 min read",
    featured: false,
  },
  {
    id: 4,
    title: "DIY Beeswax Wraps: The Ultimate Cling Film Alternative",
    excerpt: "Plastic cling film is one of the most wasteful kitchen products. Make your own reusable beeswax wraps with this step-by-step guide.",
    img: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=600&q=80",
    category: "DIY & Home",
    author: "Dev Sharma",
    date: "Apr 30, 2025",
    readTime: "4 min read",
    featured: false,
  },
  {
    id: 5,
    title: "The Hidden Cost of Fast Fashion (And What to Do Instead)",
    excerpt: "We unpack the environmental and human cost of cheap clothing — and offer a better path forward for conscious shoppers.",
    img: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=600&q=80",
    category: "Fashion",
    author: "Aria Patel",
    date: "Apr 18, 2025",
    readTime: "8 min read",
    featured: false,
  },
  {
    id: 6,
    title: "5 Wellness Rituals That Are Better for the Planet Too",
    excerpt: "Your self-care routine doesn't have to cost the earth — literally. These eco-friendly swaps feel just as good and do much less harm.",
    img: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=600&q=80",
    category: "Wellness",
    author: "Sana Mirza",
    date: "Apr 5, 2025",
    readTime: "5 min read",
    featured: false,
  },
  {
    id: 7,
    title: "How We Choose Our Artisan Partners",
    excerpt: "Behind every EcoHaven product is a maker with a story. Here's exactly how we find and vet the artisans we partner with.",
    img: "https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?w=600&q=80",
    category: "Sustainability",
    author: "Remi Chen",
    date: "Mar 22, 2025",
    readTime: "6 min read",
    featured: false,
  },
];

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");

  const featured = posts.find(p => p.featured);
  const filtered = posts
    .filter(p => !p.featured)
    .filter(p => activeCategory === "All" || p.category === activeCategory)
    .filter(p =>
      !search || p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.excerpt.toLowerCase().includes(search.toLowerCase())
    );

  return (
    <>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'Segoe UI', sans-serif; background: #fafaf8; color: #2d2d2d; }

        /* NAV */
        .bl-nav {
          display: flex; align-items: center; justify-content: space-between;
          padding: 0 80px; height: 60px; background: #fff;
          border-bottom: 1px solid #ebebeb; position: sticky; top: 0; z-index: 100;
        }
        .bl-logo { font-size: 20px; font-weight: 800; color: #2d4a2d; text-decoration: none; }
        .bl-logo span { color: #7aad6a; }
        .bl-links { display: flex; gap: 28px; list-style: none; }
        .bl-links a { font-size: 13px; font-weight: 500; color: #555; text-decoration: none; padding-bottom: 2px; }
        .bl-links a:hover { color: #2d4a2d; }
        .bl-links a.active { color: #2d4a2d; border-bottom: 2px solid #2d4a2d; font-weight: 700; }
        .bl-nav-search {
          display: flex; align-items: center; gap: 8px;
          background: #f5f5f3; border-radius: 20px; padding: 6px 14px;
        }
        .bl-nav-search input { border: none; background: transparent; font-size: 12px; outline: none; width: 150px; color: #555; }
        .bl-nav-search input::placeholder { color: #bbb; }

        /* PAGE HEADER */
        .bl-header { background: #f7f5f0; padding: 60px 80px 48px; text-align: center; }
        .bl-tag { font-size: 10px; font-weight: 700; letter-spacing: 2px; color: #4a7c59; margin-bottom: 12px; text-transform: uppercase; }
        .bl-title { font-size: 36px; font-weight: 900; color: #1a1a1a; margin-bottom: 12px; }
        .bl-sub { font-size: 14px; color: #888; max-width: 480px; margin: 0 auto; line-height: 1.7; }

        /* CATEGORY FILTER */
        .bl-cats {
          display: flex; justify-content: center; flex-wrap: wrap; gap: 8px;
          padding: 28px 80px 0;
        }
        .bl-cat-btn {
          background: #fff; border: 1px solid #e0e0e0; color: #666;
          padding: 7px 18px; border-radius: 20px; font-size: 12px;
          font-weight: 600; cursor: pointer; transition: all 0.15s;
        }
        .bl-cat-btn:hover { border-color: #2d4a2d; color: #2d4a2d; }
        .bl-cat-btn.active { background: #2d4a2d; color: #fff; border-color: #2d4a2d; }

        /* FEATURED */
        .bl-featured {
          max-width: 1100px; margin: 48px auto 0; padding: 0 40px;
        }
        .bl-featured-card {
          display: flex; gap: 40px; background: #fff; border-radius: 14px;
          overflow: hidden; cursor: pointer; transition: box-shadow 0.2s;
        }
        .bl-featured-card:hover { box-shadow: 0 8px 32px rgba(0,0,0,0.1); }
        .bl-featured-img { width: 480px; height: 300px; object-fit: cover; flex-shrink: 0; }
        .bl-featured-body { padding: 36px 32px 36px 0; display: flex; flex-direction: column; justify-content: center; }
        .bl-featured-tag {
          display: inline-block; font-size: 10px; font-weight: 700; letter-spacing: 1.5px;
          color: #4a7c59; background: #e8f4ec; padding: 3px 10px; border-radius: 12px;
          margin-bottom: 14px; text-transform: uppercase;
        }
        .bl-featured-title { font-size: 22px; font-weight: 800; color: #1a1a1a; line-height: 1.3; margin-bottom: 12px; }
        .bl-featured-excerpt { font-size: 13px; color: #777; line-height: 1.75; margin-bottom: 20px; }
        .bl-meta { display: flex; align-items: center; gap: 14px; font-size: 12px; color: #aaa; }
        .bl-meta-dot { width: 3px; height: 3px; background: #ddd; border-radius: 50%; }
        .bl-read-more {
          margin-top: 20px; display: inline-flex; align-items: center; gap: 6px;
          font-size: 13px; font-weight: 700; color: #2d4a2d;
          background: none; border: none; cursor: pointer; padding: 0;
        }
        .bl-read-more:hover { text-decoration: underline; }

        /* POSTS GRID */
        .bl-grid-section { max-width: 1100px; margin: 48px auto; padding: 0 40px 60px; }
        .bl-grid-title { font-size: 18px; font-weight: 800; color: #1a1a1a; margin-bottom: 28px; }
        .bl-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
        .bl-card {
          background: #fff; border-radius: 12px; overflow: hidden;
          cursor: pointer; transition: box-shadow 0.2s;
        }
        .bl-card:hover { box-shadow: 0 6px 24px rgba(0,0,0,0.09); }
        .bl-card-img { width: 100%; height: 180px; object-fit: cover; display: block; transition: transform 0.3s; }
        .bl-card:hover .bl-card-img { transform: scale(1.03); }
        .bl-card-body { padding: 16px 18px 20px; }
        .bl-card-cat {
          display: inline-block; font-size: 10px; font-weight: 700; letter-spacing: 1px;
          color: #4a7c59; background: #e8f4ec; padding: 2px 8px; border-radius: 10px;
          margin-bottom: 10px; text-transform: uppercase;
        }
        .bl-card-title { font-size: 15px; font-weight: 700; color: #1a1a1a; line-height: 1.4; margin-bottom: 8px; }
        .bl-card-excerpt { font-size: 12px; color: #888; line-height: 1.7; margin-bottom: 14px; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
        .bl-card-meta { display: flex; align-items: center; gap: 10px; font-size: 11px; color: #bbb; }

        /* NEWSLETTER */
        .bl-newsletter {
          background: linear-gradient(135deg, #2d4a2d 0%, #4a7c59 100%);
          padding: 60px 80px; text-align: center;
        }
        .bl-nl-title { font-size: 26px; font-weight: 800; color: #fff; margin-bottom: 10px; }
        .bl-nl-sub { font-size: 13px; color: rgba(255,255,255,0.75); margin-bottom: 28px; }
        .bl-nl-form { display: flex; gap: 0; max-width: 400px; margin: 0 auto; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 16px rgba(0,0,0,0.2); }
        .bl-nl-input { flex: 1; border: none; padding: 13px 18px; font-size: 13px; outline: none; }
        .bl-nl-btn { background: #1a2e1a; color: #fff; border: none; padding: 13px 20px; font-size: 13px; font-weight: 700; cursor: pointer; white-space: nowrap; }
        .bl-nl-btn:hover { background: #0f1f0f; }

        /* NO RESULTS */
        .bl-empty { text-align: center; padding: 60px; color: #bbb; font-size: 14px; }

        @media (max-width: 900px) {
          .bl-nav { padding: 0 20px; }
          .bl-links { display: none; }
          .bl-header { padding: 48px 24px 36px; }
          .bl-cats { padding: 20px 24px 0; }
          .bl-featured { padding: 0 16px; }
          .bl-featured-card { flex-direction: column; }
          .bl-featured-img { width: 100%; height: 200px; }
          .bl-featured-body { padding: 20px; }
          .bl-grid-section { padding: 0 16px 48px; }
          .bl-grid { grid-template-columns: 1fr; }
          .bl-newsletter { padding: 48px 24px; }
        }
      `}</style>

      {/* NAV */}
      <nav className="bl-nav">
        <a href="/" className="bl-logo">Eco<span>Haven</span></a>
        <ul className="bl-links">
          <li><a href="/">Home</a></li>
          <li><a href="/shop">Shop</a></li>
          <li><a href="/blog" className="active">Blog</a></li>
          <li><a href="/about">About</a></li>
        </ul>
        <div className="bl-nav-search">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#aaa" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
          <input
            type="text"
            placeholder="Search articles..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
      </nav>

      {/* PAGE HEADER */}
      <div className="bl-header">
        <p className="bl-tag">The EcoHaven Journal</p>
        <h1 className="bl-title">Stories for Conscious Living</h1>
        <p className="bl-sub">Tips, insights, and inspiration for a more sustainable, intentional life.</p>
      </div>

      {/* CATEGORY FILTER */}
      <div className="bl-cats">
        {categories.map(cat => (
          <button
            key={cat}
            className={`bl-cat-btn${activeCategory === cat ? " active" : ""}`}
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* FEATURED POST */}
      {featured && activeCategory === "All" && !search && (
        <div className="bl-featured">
          <div className="bl-featured-card">
            <img className="bl-featured-img" src={featured.img} alt={featured.title} />
            <div className="bl-featured-body">
              <span className="bl-featured-tag">✦ Featured</span>
              <h2 className="bl-featured-title">{featured.title}</h2>
              <p className="bl-featured-excerpt">{featured.excerpt}</p>
              <div className="bl-meta">
                <span>{featured.author}</span>
                <span className="bl-meta-dot" />
                <span>{featured.date}</span>
                <span className="bl-meta-dot" />
                <span>{featured.readTime}</span>
              </div>
              <button className="bl-read-more">Read Article →</button>
            </div>
          </div>
        </div>
      )}

      {/* POSTS GRID */}
      <div className="bl-grid-section">
        <h2 className="bl-grid-title">
          {activeCategory === "All" ? "Latest Articles" : activeCategory}
          {search && ` — results for "${search}"`}
        </h2>
        {filtered.length === 0 ? (
          <div className="bl-empty">No articles found. Try a different search or category.</div>
        ) : (
          <div className="bl-grid">
            {filtered.map(post => (
              <div key={post.id} className="bl-card">
                <img className="bl-card-img" src={post.img} alt={post.title} />
                <div className="bl-card-body">
                  <span className="bl-card-cat">{post.category}</span>
                  <h3 className="bl-card-title">{post.title}</h3>
                  <p className="bl-card-excerpt">{post.excerpt}</p>
                  <div className="bl-card-meta">
                    <span>{post.author}</span>
                    <span>·</span>
                    <span>{post.date}</span>
                    <span>·</span>
                    <span>{post.readTime}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* NEWSLETTER */}
      <div className="bl-newsletter">
        <h2 className="bl-nl-title">Get the latest articles in your inbox</h2>
        <p className="bl-nl-sub">Join 3,000+ subscribers. No spam. Unsubscribe anytime.</p>
        <div className="bl-nl-form">
          <input className="bl-nl-input" type="email" placeholder="Your email address" />
          <button className="bl-nl-btn">Subscribe</button>
        </div>
      </div>
    </>
  );
}