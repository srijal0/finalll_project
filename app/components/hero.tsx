"use client";
import { useState, useEffect } from "react";

const slides = [
  {
    badge: "NEW ARRIVALS",
    title: "Ethical Essentials for a Conscious Home",
    desc: "Discover our curated collection of sustainable home goods, handcrafted jewelry, and eco-friendly accessories designed to last a lifetime.",
    img: "/images/image1.png",
  },
  {
    badge: "BEST SELLERS",
    title: "Sustainable Living Starts Here",
    desc: "Shop our most loved products — crafted with care, made to endure, and gentle on the planet.",
    img: "/images/image2.png",
  },
  {
    badge: "ECO FRIENDLY",
    title: "Good for You. Good for Earth.",
    desc: "Every product is thoughtfully sourced to reduce your footprint without compromising on quality or style.",
    img: "/images/image3.png",
  },
];

export default function Hero() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setCurrent((c) => (c + 1) % slides.length), 4000);
    return () => clearInterval(t);
  }, []);

  const s = slides[current];

  return (
    <>
      <style>{`
        .hero {
          display: flex;
          align-items: center;
          gap: 48px;
          padding: 60px 80px;
          background: #f7f5f0;
          min-height: 340px;
          overflow: hidden;
        }
        .hero-text { flex: 1; }
        .hero-badge {
          display: inline-block;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 2px;
          color: #4a7c59;
          border: 1px solid #4a7c59;
          padding: 3px 10px;
          border-radius: 2px;
          margin-bottom: 18px;
        }
        .hero-title {
          font-size: 34px;
          font-weight: 800;
          line-height: 1.2;
          color: #1a1a1a;
          margin-bottom: 14px;
          max-width: 400px;
        }
        .hero-desc {
          font-size: 13px;
          color: #666;
          line-height: 1.75;
          max-width: 360px;
          margin-bottom: 28px;
        }
        .hero-actions { display: flex; gap: 14px; align-items: center; }
        .hero-btn-primary {
          background: #2d4a2d;
          color: #fff;
          border: none;
          padding: 11px 24px;
          border-radius: 4px;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.2s;
        }
        .hero-btn-primary:hover { background: #3a5e3a; }
        .hero-btn-link {
          background: none;
          border: none;
          color: #2d4a2d;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          text-decoration: underline;
          text-underline-offset: 3px;
        }
        .hero-dots { display: flex; gap: 7px; margin-top: 24px; }
        .hero-dot {
          width: 8px; height: 8px;
          border-radius: 50%;
          background: #ccc;
          border: none;
          cursor: pointer;
          transition: background 0.2s, transform 0.2s;
          padding: 0;
        }
        .hero-dot.active {
          background: #4a7c59;
          transform: scale(1.2);
        }
        .hero-image-wrap { flex-shrink: 0; }
        .hero-img {
          width: 320px;
          height: 260px;
          object-fit: cover;
          border-radius: 10px;
          display: block;
          transition: opacity 0.4s;
        }

        @media (max-width: 900px) {
          .hero { flex-direction: column; padding: 40px 24px; gap: 28px; }
          .hero-img { width: 100%; height: 220px; }
          .hero-title { font-size: 26px; }
        }
      `}</style>

      <section className="hero">
        <div className="hero-text">
          <span className="hero-badge">{s.badge}</span>
          <h1 className="hero-title">{s.title}</h1>
          <p className="hero-desc">{s.desc}</p>
          <div className="hero-actions">
            <button className="hero-btn-primary">Shop Collection</button>
            <button className="hero-btn-link">View</button>
          </div>
          <div className="hero-dots">
            {slides.map((_, i) => (
              <button
                key={i}
                className={`hero-dot${i === current ? " active" : ""}`}
                onClick={() => setCurrent(i)}
                aria-label={`Slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
        <div className="hero-image-wrap">
          <img className="hero-img" src={s.img} alt={s.title} />
        </div>
      </section>
    </>
  );
}