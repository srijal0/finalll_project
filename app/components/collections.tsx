export default function Collections() {
  const categories = [
    {
      label: "Clothing",
      sub: "Ethical fabrics for every day",
      img: "/images/image7.png",
      size: "large",
      eco: false,
    },
    {
      label: "Bedding",
      sub: "",
      img: "/images/image3.png",
      size: "small",
      eco: false,
    },
    {
      label: "Accessories",
      sub: "",
      img: "/images/image8.png",
      size: "small",
      eco: false,
    },
    {
      label: "Eco Friendly",
      sub: "Sustainably sourced",
      img: "/images/image7.png",
      size: "medium",
      eco: true,
    },
    {
      label: "Home Goods",
      sub: "",
      img: "/images/image4.png",
      size: "medium",
      eco: false,
    },
    {
      label: "Furniture",
      sub: "",
      img: "/images/image.png",
      size: "wide",
      eco: false,
    },
  ];

  return (
    <>
      <style>{`
        .collections {
          padding: 60px 80px;
          background: #fff;
        }
        .collections-title {
          text-align: center;
          font-size: 22px;
          font-weight: 700;
          color: #1a1a1a;
          margin-bottom: 32px;
        }
        .collections-grid {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr;
          grid-template-rows: 140px 140px 150px;
          gap: 12px;
        }
        .col-card {
          position: relative;
          border-radius: 8px;
          overflow: hidden;
          cursor: pointer;
        }
        .col-card:hover .col-img { transform: scale(1.04); }
        .col-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.35s ease;
        }
        .col-card.large { grid-row: span 2; }
        .col-card.wide  { grid-column: span 2; }
        .col-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.45) 0%, transparent 55%);
        }
        .col-label {
          position: absolute;
          bottom: 12px;
          left: 14px;
          color: #fff;
          font-size: 14px;
          font-weight: 700;
          text-shadow: 0 1px 4px rgba(0,0,0,0.4);
          line-height: 1.3;
        }
        .col-sub {
          display: block;
          font-size: 11px;
          font-weight: 400;
          opacity: 0.9;
          margin-top: 2px;
        }
        .eco-overlay {
          position: absolute;
          inset: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background: rgba(74, 124, 89, 0.82);
          color: #fff;
          text-align: center;
          gap: 4px;
        }
        .eco-icon { font-size: 26px; }
        .eco-name { font-size: 13px; font-weight: 700; }
        .eco-sub  { font-size: 11px; opacity: 0.9; }

        @media (max-width: 900px) {
          .collections { padding: 40px 24px; }
          .collections-grid {
            grid-template-columns: 1fr 1fr;
            grid-template-rows: auto;
          }
          .col-card.large { grid-row: span 1; height: 180px; }
          .col-card.wide  { grid-column: span 2; height: 140px; }
          .col-card.small { height: 130px; }
          .col-card.medium { height: 160px; }
        }
      `}</style>

      <section className="collections">
        <h2 className="collections-title">Why choose us?</h2>
        <div className="collections-grid">
          {categories.map((cat, i) => (
            <div key={i} className={`col-card ${cat.size}`}>
              <img className="col-img" src={cat.img} alt={cat.label} />
              {cat.eco ? (
                <div className="eco-overlay">
                  <span className="eco-icon">🌿</span>
                  <span className="eco-name">{cat.label}</span>
                  <span className="eco-sub">{cat.sub}</span>
                </div>
              ) : (
                <>
                  <div className="col-overlay" />
                  <div className="col-label">
                    {cat.label}
                    {cat.sub && <span className="col-sub">{cat.sub}</span>}
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </section>
    </>
  );
}