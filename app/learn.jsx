const { useState, useMemo } = React;

// ──────────────────────────────────────────────
// Shared components
// ──────────────────────────────────────────────

const Logo = () => (
  <span className="logo" aria-hidden="true">
    <svg viewBox="0 0 128 128" width="32" height="32">
      <circle cx="64" cy="64" r="60" fill="#FF474A"></circle>
      <path d="M 30 90 L 30 38 L 45 38 L 64 62 L 83 38 L 98 38 L 98 90 L 84 90 L 84 60 L 64 84 L 44 60 L 44 90 Z" fill="#FFFFFF"></path>
    </svg>
  </span>
);

const Announce = () => (
  <div className="banner" role="region" aria-label="Promo">
    <p>Free shipping on orders over $99 — <a href="#">Shop Now →</a></p>
  </div>
);

const Nav = ({ active = "Learn" }) => (
  <nav className="nav">
    <div className="nav__inner">
      <a className="nav__logo" href="index.html" aria-label="Morpheus home">
        <img src="assets/m7-logo-nav.svg" alt="" />
        <span className="nav__wordmark">Morpheus</span>
      </a>
      <ul className="nav__menu">
        {["Train", "Recover", "Coaches", "Learn", "Support"].map((l) => (
          <li key={l}>
            <a href={l === "Learn" ? "learn.html" : "#"} className={`nav__link${active === l ? " is-active" : ""}`}>{l}</a>
          </li>
        ))}
      </ul>
      <a href="#" className="nav__cta">Shop Now</a>
    </div>
  </nav>
);

const Footer = () => (
  <footer className="footer">
    <div className="container">
      <div className="footer-grid">
        <div className="footer-brand">
          <span className="wordmark">Morpheus</span>
          <p>Train with your body, not against it. Morpheus turns HRV, sleep, and workout load into one daily verdict: push, maintain, or rest.</p>
          <div className="store-row">
            <a className="store-btn" href="#">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M3 20.5V3.5a1 1 0 0 1 1.5-.87l13.5 7.5a1 1 0 0 1 0 1.74L4.5 21.37A1 1 0 0 1 3 20.5z"/></svg>
              <span><span className="small">GET IT ON</span><span className="big">Google Play</span></span>
            </a>
            <a className="store-btn" href="#">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/></svg>
              <span><span className="small">Download on the</span><span className="big">App Store</span></span>
            </a>
          </div>
        </div>
        <div>
          <h5>Product</h5>
          <ul>
            <li><a href="#">How to Train</a></li>
            <li><a href="#">Coaches</a></li>
            <li><a href="learn.html">Learn</a></li>
            <li><a href="#">FAQs</a></li>
          </ul>
        </div>
        <div>
          <h5>Company</h5>
          <ul>
            <li><a href="#">About us</a></li>
            <li><a href="#">Careers</a></li>
            <li><a href="#">Press</a></li>
            <li><a href="#">Support</a></li>
          </ul>
        </div>
        <div>
          <h5>Stay in the loop</h5>
          <ul>
            <li><a href="#">Weekly digest</a></li>
            <li><a href="#">Research brief</a></li>
            <li><a href="#">Contact coaches</a></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© 2026 Morpheus Lab. All rights reserved.</span>
        <div className="right">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
          <div className="social">
            <a href="#" aria-label="Instagram"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="18" cy="6" r="1" fill="currentColor"/></svg></a>
            <a href="#" aria-label="Facebook"><svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M13 22v-8h3l1-4h-4V7.5c0-1.1.3-2 2-2h2V2h-3c-3.3 0-5 2-5 5v3H6v4h3v8h4z"/></svg></a>
            <a href="#" aria-label="X"><svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h3l-7.5 8.6L22 22h-7l-5-6.5L4 22H1l8-9.2L1 2h7l4.5 6L18 2z"/></svg></a>
          </div>
        </div>
      </div>
    </div>
  </footer>
);

const ChatFab = () => (
  <button className="chat-fab" aria-label="Help & chat">
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
  </button>
);

// ──────────────────────────────────────────────
// Landing components
// ──────────────────────────────────────────────

const Hero = ({ query, setQuery, active, setActive }) => (
  <section className="hero">
    <Nav active="Learn" />
    <div className="container">
      <div className="hero-inner">
        <h1>What would you like to <em>learn</em> today?</h1>
        <form className="search" onSubmit={(e) => e.preventDefault()}>
          <svg className="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
          <input
            className="search-input"
            placeholder="Enter your search term here.."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </form>
        <div className="filters">
          {window.CATEGORIES.map((c) => (
            <button key={c.key} className={`chip ${active === c.key ? "active" : ""}`} onClick={() => setActive(c.key)}>
              {c.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  </section>
);

const Featured = ({ article }) => (
  <section className="light featured-wrap">
    <div className="container">
      <a className="featured-card" href={`Article.html?id=${article.id}`}>
        <div className="featured-media">
          <span className="featured-flag">FEATURED</span>
          <div className="img" style={{ backgroundImage: `url(${article.image})` }}></div>
        </div>
        <div className="featured-body">
          <div className="featured-content">
            <div className="featured-spacer"></div>
            <div className="featured-reading-info">
              <div className="meta-row">
                <span className={`tag ${article.tagClass}`}>{article.tag}</span>
                <span className="sep-dot"></span>
                <span>{article.date}</span>
                <span className="sep-dot"></span>
                <span>{article.readTime} read</span>
              </div>
              <div className="featured-text">
                <h3 className="featured-title">{article.title}</h3>
                <p className="featured-excerpt">{article.excerpt}</p>
              </div>
            </div>
          </div>
          <div className="author">
            <div className="author-avatar" style={{ backgroundImage: `url(${article.avatar})` }}></div>
            <div className="author-info">
              <div className="author-name">{article.author}</div>
              <div className="author-meta">{article.authorHandle}</div>
            </div>
          </div>
        </div>
      </a>
    </div>
  </section>
);

const Card = ({ article }) => (
  <a className="card" href={`Article.html?id=${article.id}`}>
    <div className="card-media">
      <div className="img" style={{ backgroundImage: `url(${article.image})` }}></div>
    </div>
    <div className="card-content">
      <div className="card-meta">
        <span className={`tag ${article.tagClass}`}>{article.tag}</span>
        <span className="sep-dot"></span>
        <span>{article.readTime}</span>
      </div>
      <h4 className="card-title">{article.title}</h4>
      <p className="card-excerpt">{article.excerpt}</p>
      <div className="card-footer">
        <div className="avatar-xs" style={{ backgroundImage: `url(${article.avatar})` }}></div>
        <span>{article.author}</span>
        <span style={{ marginLeft: "auto" }}>{article.date}</span>
      </div>
    </div>
  </a>
);

const Popular = ({ articles }) => (
  <section className="light"><div className="container section">
    <div className="section-head">
      <div>
        <h2 className="section-title">Popular this week</h2>
        <p className="section-sub">Most-read across the Morpheus community.</p>
      </div>
      <a href="#" className="section-link">Browse all
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
      </a>
    </div>
    <div className="grid">
      {articles.slice(0, 4).map((a) => <Card key={a.id} article={a} />)}
    </div>
  </div></section>
);


const Recent = ({ articles }) => (
  <section className="light"><div className="container section">
    <div className="section-head">
      <div>
        <h2 className="section-title">Recent articles</h2>
        <p className="section-sub">Everything published in the last 30 days.</p>
      </div>
      <a href="#" className="section-link">All archives
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
      </a>
    </div>
    <div className="list">
      {articles.slice(5, 11).map((a) => (
        <a key={a.id} className="list-item" href={`Article.html?id=${a.id}`}>
          <div className="list-media">
            <div className="img" style={{ backgroundImage: `url(${a.image})` }}></div>
          </div>
          <div className="list-body">
            <div className="meta">
              <span className={`tag ${a.tagClass}`}>{a.tag}</span>
              <span className="sep-dot"></span>
              <span>{a.readTime}</span>
            </div>
            <h4 className="title">{a.title}</h4>
            <p className="excerpt">{a.excerpt}</p>
          </div>
        </a>
      ))}
    </div>
  </div></section>
);


// ──────────────────────────────────────────────
// Learn page root
// ──────────────────────────────────────────────

const LearnPage = () => {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState("all");

  const articles = window.ARTICLES;
  const filtered = useMemo(() => {
    let r = articles;
    if (active !== "all") r = r.filter((a) => a.tagClass === active);
    if (query.trim()) {
      const q = query.toLowerCase();
      r = r.filter((a) => a.title.toLowerCase().includes(q) || a.excerpt.toLowerCase().includes(q) || a.author.toLowerCase().includes(q));
    }
    return r;
  }, [articles, active, query]);

  const featured = articles.find((a) => a.featured) || articles[0];
  const pool = filtered.length ? filtered : articles;

  return (
    <>
      <Announce />
      <Hero query={query} setQuery={setQuery} active={active} setActive={setActive} />
      <Featured article={featured} />
      <Popular articles={pool.filter((a) => a.id !== featured.id)} />
      <Recent articles={pool} />
      <Footer />
      <ChatFab />
    </>
  );
};

Object.assign(window, { Logo, Announce, Nav, Footer, ChatFab, Card, Featured, LearnPage });
