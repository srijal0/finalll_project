import { Metadata } from "next";

export const metadata: Metadata = { title: "About Us — EcoHaven" };

export default function AboutPage() {
  const team = [
    { name: "Aria Patel", role: "Founder & CEO", img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&q=80", bio: "Passionate about sustainable living since 2015." },
    { name: "Remi Chen", role: "Head of Sourcing", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&q=80", bio: "Travels the world to find ethical artisans." },
    { name: "Sana Mirza", role: "Creative Director", img: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=300&q=80", bio: "Designs with nature as her inspiration." },
    { name: "Dev Sharma", role: "Community Lead", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&q=80", bio: "Building a global community of conscious consumers." },
  ];

  const values = [
    { icon: "🌱", title: "Sustainably Sourced", desc: "Every product is carefully vetted for its environmental impact — from raw material to your doorstep." },
    { icon: "🤝", title: "Fair Trade", desc: "We partner only with artisans and makers who pay fair wages and maintain safe working conditions." },
    { icon: "♻️", title: "Zero Waste Packaging", desc: "All our packaging is recyclable, compostable, or reusable. No single-use plastics, ever." },
    { icon: "🌍", title: "1% For The Planet", desc: "We donate 1% of every sale to verified environmental nonprofits around the world." },
    { icon: "💚", title: "Certified Organic", desc: "Our clothing and bedding lines carry certified organic material labels wherever possible." },
    { icon: "📦", title: "Carbon Neutral Shipping", desc: "We offset every shipment's carbon footprint through verified reforestation programs." },
  ];

  const stats = [
    { value: "12,000+", label: "Happy Customers" },
    { value: "300+", label: "Eco Products" },
    { value: "42", label: "Artisan Partners" },
    { value: "1%", label: "Revenue to Planet" },
  ];

  return (
    <>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'Segoe UI', sans-serif; background: #fff; color: #2d2d2d; }

        /* NAV */
        .ab-nav {
          display: flex; align-items: center; justify-content: space-between;
          padding: 0 80px; height: 60px; background: #fff;
          border-bottom: 1px solid #ebebeb; position: sticky; top: 0; z-index: 100;
        }
        .ab-logo { font-size: 20px; font-weight: 800; color: #2d4a2d; text-decoration: none; }
        .ab-logo span { color: #7aad6a; }
        .ab-links { display: flex; gap: 28px; list-style: none; }
        .ab-links a { font-size: 13px; font-weight: 500; color: #555; text-decoration: none; padding-bottom: 2px; }
        .ab-links a:hover { color: #2d4a2d; }
        .ab-links a.active { color: #2d4a2d; border-bottom: 2px solid #2d4a2d; font-weight: 700; }
        .ab-shop-btn {
          background: #2d4a2d; color: #fff; border: none;
          padding: 9px 20px; border-radius: 6px; font-size: 12px;
          font-weight: 600; cursor: pointer; text-decoration: none;
          display: inline-block;
        }

        /* HERO */
        .ab-hero {
          background: #f7f5f0;
          padding: 80px 80px 60px;
          display: flex; align-items: center; gap: 60px;
        }
        .ab-hero-text { flex: 1; }
        .ab-tag {
          display: inline-block; font-size: 10px; font-weight: 700;
          letter-spacing: 2px; color: #4a7c59; border: 1px solid #4a7c59;
          padding: 3px 10px; border-radius: 2px; margin-bottom: 18px;
        }
        .ab-hero-title { font-size: 40px; font-weight: 900; line-height: 1.15; color: #1a1a1a; margin-bottom: 18px; }
        .ab-hero-title span { color: #4a7c59; }
        .ab-hero-desc { font-size: 14px; color: #666; line-height: 1.8; max-width: 440px; margin-bottom: 28px; }
        .ab-hero-cta {
          background: #2d4a2d; color: #fff; border: none;
          padding: 12px 28px; border-radius: 6px; font-size: 13px;
          font-weight: 600; cursor: pointer;
        }
        .ab-hero-img { width: 420px; height: 320px; object-fit: cover; border-radius: 12px; flex-shrink: 0; }

        /* STATS */
        .ab-stats {
          display: grid; grid-template-columns: repeat(4, 1fr);
          background: #2d4a2d; padding: 0;
        }
        .ab-stat {
          text-align: center; padding: 36px 20px;
          border-right: 1px solid rgba(255,255,255,0.15);
        }
        .ab-stat:last-child { border-right: none; }
        .ab-stat-val { font-size: 32px; font-weight: 900; color: #fff; margin-bottom: 6px; }
        .ab-stat-label { font-size: 12px; color: rgba(255,255,255,0.7); font-weight: 500; letter-spacing: 0.5px; }

        /* STORY */
        .ab-story { max-width: 860px; margin: 0 auto; padding: 72px 40px; text-align: center; }
        .ab-section-tag {
          font-size: 10px; font-weight: 700; letter-spacing: 2px;
          color: #4a7c59; text-transform: uppercase; margin-bottom: 12px;
        }
        .ab-section-title { font-size: 28px; font-weight: 800; color: #1a1a1a; margin-bottom: 20px; }
        .ab-story-text { font-size: 14px; color: #666; line-height: 1.9; }

        /* VALUES */
        .ab-values { background: #f7f5f0; padding: 72px 80px; }
        .ab-values-header { text-align: center; margin-bottom: 48px; }
        .ab-values-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
        .ab-value-card {
          background: #fff; border-radius: 12px;
          padding: 28px 24px; transition: box-shadow 0.2s;
        }
        .ab-value-card:hover { box-shadow: 0 6px 24px rgba(0,0,0,0.07); }
        .ab-value-icon { font-size: 30px; margin-bottom: 14px; }
        .ab-value-title { font-size: 15px; font-weight: 700; color: #1a1a1a; margin-bottom: 8px; }
        .ab-value-desc { font-size: 13px; color: #777; line-height: 1.7; }

        /* TEAM */
        .ab-team { padding: 72px 80px; }
        .ab-team-header { text-align: center; margin-bottom: 48px; }
        .ab-team-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px; }
        .ab-team-card { text-align: center; }
        .ab-team-img {
          width: 100%; aspect-ratio: 1; object-fit: cover;
          border-radius: 12px; margin-bottom: 14px;
          transition: transform 0.3s;
        }
        .ab-team-card:hover .ab-team-img { transform: scale(1.02); }
        .ab-team-name { font-size: 15px; font-weight: 700; color: #1a1a1a; margin-bottom: 3px; }
        .ab-team-role { font-size: 12px; color: #4a7c59; font-weight: 600; margin-bottom: 6px; }
        .ab-team-bio { font-size: 12px; color: #999; line-height: 1.6; }

        /* CTA BANNER */
        .ab-cta {
          background: linear-gradient(135deg, #2d4a2d 0%, #4a7c59 100%);
          padding: 60px 80px; text-align: center;
        }
        .ab-cta-title { font-size: 28px; font-weight: 800; color: #fff; margin-bottom: 12px; }
        .ab-cta-sub { font-size: 14px; color: rgba(255,255,255,0.75); margin-bottom: 28px; }
        .ab-cta-btn {
          background: #fff; color: #2d4a2d; border: none;
          padding: 13px 32px; border-radius: 6px; font-size: 13px;
          font-weight: 700; cursor: pointer; transition: transform 0.15s;
          text-decoration: none; display: inline-block;
        }
        .ab-cta-btn:hover { transform: scale(1.03); }

        @media (max-width: 900px) {
          .ab-nav { padding: 0 20px; }
          .ab-links { display: none; }
          .ab-hero { flex-direction: column; padding: 48px 24px; gap: 32px; }
          .ab-hero-img { width: 100%; height: 220px; }
          .ab-hero-title { font-size: 28px; }
          .ab-stats { grid-template-columns: repeat(2, 1fr); }
          .ab-values { padding: 48px 24px; }
          .ab-values-grid { grid-template-columns: 1fr 1fr; }
          .ab-team { padding: 48px 24px; }
          .ab-team-grid { grid-template-columns: repeat(2, 1fr); }
          .ab-story { padding: 48px 24px; }
          .ab-cta { padding: 48px 24px; }
        }
      `}</style>

      {/* NAVBAR */}
      <nav className="ab-nav">
        <a href="/" className="ab-logo">Eco<span>Haven</span></a>
        <ul className="ab-links">
          <li><a href="/">Home</a></li>
          <li><a href="/shop">Shop</a></li>
          <li><a href="/blog">Blog</a></li>
          <li><a href="/about" className="active">About</a></li>
        </ul>
        <a href="/shop" className="ab-shop-btn">Shop Now</a>
      </nav>

      {/* HERO */}
      <section className="ab-hero">
        <div className="ab-hero-text">
          <span className="ab-tag">OUR STORY</span>
          <h1 className="ab-hero-title">Living well,<br />living <span>consciously.</span></h1>
          <p className="ab-hero-desc">
            EcoHaven was born from a simple belief: that beautiful, high-quality products and
            environmental responsibility are not opposites. Since 2019, we've been curating a
            collection that proves it — one sustainable product at a time.
          </p>
          <a href="/shop" className="ab-hero-cta" style={{ display: "inline-block", textDecoration: "none" }}>
            Explore Our Collection
          </a>
        </div>
        <img
          className="ab-hero-img"
          src="/images/image1.png"
          alt="EcoHaven story"
        />
      </section>

      {/* STATS */}
      <div className="ab-stats">
        {stats.map((s, i) => (
          <div key={i} className="ab-stat">
            <div className="ab-stat-val">{s.value}</div>
            <div className="ab-stat-label">{s.label}</div>
          </div>
        ))}
      </div>

      {/* STORY */}
      <section className="ab-story">
        <p className="ab-section-tag">Why We Exist</p>
        <h2 className="ab-section-title">More than a store — a movement</h2>
        <p className="ab-story-text">
          We started EcoHaven after realising how hard it was to find everyday products that didn't
          compromise on quality or the planet. Fast fashion, single-use plastics, and exploitative
          supply chains had become the norm — and we wanted to offer an alternative. Today, every
          product in our collection is hand-selected, ethically produced, and designed to last.
          We believe that every purchase is a vote for the kind of world we want to live in.
        </p>
      </section>

      {/* VALUES */}
      <section className="ab-values">
        <div className="ab-values-header">
          <p className="ab-section-tag">What We Stand For</p>
          <h2 className="ab-section-title">Our commitments to you & the planet</h2>
        </div>
        <div className="ab-values-grid">
          {values.map((v, i) => (
            <div key={i} className="ab-value-card">
              <div className="ab-value-icon">{v.icon}</div>
              <h3 className="ab-value-title">{v.title}</h3>
              <p className="ab-value-desc">{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* TEAM */}
      <section className="ab-team">
        <div className="ab-team-header">
          <p className="ab-section-tag">The People Behind EcoHaven</p>
          <h2 className="ab-section-title">Meet our team</h2>
        </div>
        <div className="ab-team-grid">
          {team.map((m, i) => (
            <div key={i} className="ab-team-card">
              <img className="ab-team-img" src={m.img} alt={m.name} />
              <div className="ab-team-name">{m.name}</div>
              <div className="ab-team-role">{m.role}</div>
              <div className="ab-team-bio">{m.bio}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="ab-cta">
        <h2 className="ab-cta-title">Ready to shop consciously?</h2>
        <p className="ab-cta-sub">Join 12,000+ customers who choose quality over quantity.</p>
        <a href="/shop" className="ab-cta-btn">Shop the Collection</a>
      </section>
    </>
  );
}