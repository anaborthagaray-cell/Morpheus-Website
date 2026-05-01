const { useState, useEffect } = React;

// ──────────────────────────────────────────────
// Article detail page
// ──────────────────────────────────────────────

const ArticleHero = ({ article }) => (
  <section className="article-hero">
    <Nav active="Learn" />
    <div className="article-hero-inner">
      <div className="crumbs">
        <a href="Learn.html">Morpheus 101</a>
        <span>/</span>
        <a href="Learn.html">{article.tag.charAt(0) + article.tag.slice(1).toLowerCase()} &amp; Recovery</a>
        <span>/</span>
        <span>{article.title}</span>
      </div>
      <span className={`tag tag-hero ${article.tagClass}`}>{article.tag}</span>
      <h1>{article.title}</h1>
      <p className="dek">{article.excerpt}</p>
    </div>
  </section>
);

const ArticleMeta = ({ article }) => (
  <div className="article-meta">
    <div className="container">
      <div className="article-meta-row">
        <div className="article-author">
          <div className="avatar" style={{ backgroundImage: `url(${article.avatar})` }}></div>
          <div>
            <div className="name">{article.author}</div>
            <div className="byline">{article.authorHandle}</div>
          </div>
        </div>
        <div className="article-meta-right">
          <div className="article-dateline">{article.date}</div>
          <div className="article-readtime">
            Read time
            <span className="value">{article.readTime}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const AsideActions = () => {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  return (
    <aside className="article-aside-right">
      <button className={`aside-btn ${liked ? "toggled" : ""}`} onClick={() => setLiked(!liked)} aria-label="Like">
        <svg width="14" height="14" viewBox="0 0 24 24" fill={liked ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 1 0-7.8 7.8l1 1.1L12 21l7.8-7.5 1-1.1a5.5 5.5 0 0 0 0-7.8z"/></svg>
      </button>
      <button className={`aside-btn ${saved ? "toggled" : ""}`} onClick={() => setSaved(!saved)} aria-label="Save">
        <svg width="14" height="14" viewBox="0 0 24 24" fill={saved ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m19 21-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>
      </button>
      <button className="aside-btn" aria-label="Share">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="m8.6 13.5 6.8 4"/><path d="m15.4 6.5-6.8 4"/></svg>
      </button>
      <button className="aside-btn" aria-label="Copy link">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-1 1"/><path d="M14 11a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7l1-1"/></svg>
      </button>
    </aside>
  );
};

const TOC_ITEMS = [
  { id: "body-adapts",    label: "How the body adapts to stress" },
  { id: "problem",        label: "The problem with recovery" },
  { id: "recovery-score", label: "The Morpheus recovery score" },
  { id: "balance-stress", label: "Using Morpheus to balance stress and recovery" },
];

const TOC = () => {
  const [active, setActive] = useState(TOC_ITEMS[0].id);
  useEffect(() => {
    const handler = () => {
      let current = TOC_ITEMS[0].id;
      for (const t of TOC_ITEMS) {
        const el = document.getElementById(t.id);
        if (el && el.getBoundingClientRect().top < 200) current = t.id;
      }
      setActive(current);
    };
    window.addEventListener("scroll", handler, { passive: true });
    handler();
    return () => window.removeEventListener("scroll", handler);
  }, []);
  return (
    <aside className="article-aside-left">
      <h5 className="toc-title">On this page</h5>
      <ul className="toc">
        {TOC_ITEMS.map((t) => (
          <li key={t.id}>
            <a href={`#${t.id}`} className={active === t.id ? "active" : ""}>{t.label}</a>
          </li>
        ))}
      </ul>
    </aside>
  );
};

const Prose = () => (
  <article className="prose">
    <p className="article-lede">
      Recovery has become a buzzword in fitness over the last few years, but what does it really mean? Does having a higher recovery score mean you can train hard and a lower recovery score means you should stay at home? Is the best way to recover faster to just rest and get more sleep? To get to the bottom of what recovery is and how Morpheus works, we have to go back to two things we talked about in yesterday's lesson: stress and energy.
    </p>

    <h2 id="body-adapts">How the body adapts to stress (and why it's so important)</h2>
    <p>
      At the very heart of fitness (and survival itself) is the concept of adaptability. In simplest terms, adaptation is the process the body goes through to become more fit to handle the demands of its environment. In the wild, this also means it's better equipped to survive. This is how training works.
    </p>
    <p>
      By lifting weights, doing cardiovascular conditioning, practicing a skill, playing a sport, etc., you are creating a specific environment that your body has to adapt to. You lift heavy weights, it gets stronger.
    </p>

    <figure className="article-figure">
      <div className="fig-media">
        <div className="img" style={{ backgroundImage: "url(https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=1400&auto=format&fit=crop)" }}></div>
      </div>
      <figcaption>Stress is the spark. Recovery is where the work actually happens.</figcaption>
    </figure>

    <p>
      You run long distances, it gets more efficient. You practice a specific lift or movement, your technique gets better. This is nothing more than the body's adaptive mechanisms at work. There are two parts to this process: stress and recovery. When you're training, you're putting your body under stress.
    </p>
    <p>
      This means your stress-response system is working hard to crank up energy production. The more force and power your muscles produce, the more energy they need. Once the workout is over, that's when recovery begins.
    </p>
    <p>
      The most important thing to understand about recovery is that just like stress, it's all about energy. In this case, the body needs energy to repair and rebuild stressed muscle tissue.
    </p>
    <p>
      To add new mitochondria (the power plants of our cells). To create and reinforce the neural pathways that improve our technique and skill. This use of energy is what we call recovery. In other words, recovery is the process of using energy to adapt to the stress of our environment. When it comes to fitness, it's this process that turns the workouts we do into improvements in strength, power, hypertrophy, body comp, skill, and performance.
    </p>

    <blockquote>
      Recovery is the process of using energy to adapt to the stress of our environment. It's this process that turns the workouts we do into improvements in strength, power, hypertrophy, body comp, skill, and performance.
      <cite>— Joel Jamieson, founder of Morpheus</cite>
    </blockquote>

    <h2 id="problem">The problem with recovery</h2>
    <p>
      Your body is constantly going through periods where it's put under stress, followed by time where it can recover from that stress. This is what we call a stress-recovery cycle.
    </p>
    <p>
      In a perfect world, you'd have all the energy you need to fully recover and adapt to each period of stress. You'd make constant improvements in your fitness. You'd never feel tired, run down, or lack the motivation to get off the couch. You'd never get sick.
    </p>
    <p>
      The problem is that we don't live in that perfect world. In the real world, our bodies can only produce a fixed amount of energy each day no matter how much we eat or sleep. The mental stress of life can add up quickly. We can convince ourselves that we need to do one high intensity workout after another. It can be all too easy to put our body under more mental and physical stress than it has the energy to adapt to. When this happens, we put ourselves into a recovery debt.
    </p>

    <figure className="article-figure">
      <div className="fig-media">
        <div className="img" style={{ backgroundImage: "url(https://images.unsplash.com/photo-1571731956672-f2b94d7dd0cb?w=1400&auto=format&fit=crop)" }}></div>
      </div>
      <figcaption>Recovery debt creeps in long before you feel it.</figcaption>
    </figure>

    <div className="stat-callout">
      <div className="stat-cell">
        <div className="label">Hard sessions per week</div>
        <div className="num">3–4<span className="unit"> max</span></div>
        <div className="trend">Evidence-based ceiling</div>
      </div>
      <div className="stat-cell">
        <div className="label">Hours of sleep needed</div>
        <div className="num">7.5<span className="unit"> hrs/night</span></div>
        <div className="trend neg">For full HRV recovery</div>
      </div>
      <div className="stat-cell">
        <div className="label">Days of recovery debt</div>
        <div className="num">2–3<span className="unit"> days</span></div>
        <div className="trend neg">Before noticeable decline</div>
      </div>
    </div>

    <p>
      If a recovery debt is small, it most often leads to frustrating plateaus where you're putting in the work, but not seeing any improvement. Unfortunately, this is where a lot of people in fitness get stuck. Over time, if the balance between stress and recovery isn't fixed, the body will fight back. You'll start to feel more fatigued all the time. You'll be less motivated to go to the gym and more likely to get injured if you do. You'll crave foods you know you shouldn't eat. Sound familiar? Almost everyone that's trained hard has experienced this at one time or another.
    </p>
    <p>
      Fortunately, there's an easy way to prevent all this…
    </p>

    <h2 id="recovery-score">The Morpheus recovery score</h2>
    <p>
      A lot of people have been led to believe that a low recovery score on an app means their body can't train hard or perform well. They're often confused when they get a low score even though they feel fine — or surprised when they choose to train hard anyway and hit a PR.
    </p>
    <p>
      The reason isn't that the score is wrong. A recovery score is not a predictor of what your body is capable of, or how well it will perform on a given day. The most accurate way to read it — particularly the one Morpheus gives you — is as a gauge of the balance between energy you've spent on stress vs. recovery over the last few days.
    </p>

    <h2 id="balance-stress">Using Morpheus to balance stress and recovery</h2>
    <p>
      Getting yourself into a recovery debt doesn't happen in a single day, or even a week — it creeps up on you without you realizing it. When you keep adding stress on top of stress, without allowing enough time and energy for recovery, that's when bad things happen and you pay the price.
    </p>

    <h2>What this means for you</h2>
    <p>
      When your recovery score is consistently low, it's a sign your body has been spending more time and energy dealing with stress than recovering from it. Because it's during recovery that gains in fitness are actually made, that also means you're leaving results on the table.
    </p>
    <p>
      Using the Morpheus recovery score to guide your training (and your daily lifestyle) is the key to long-term gains in health, fitness, and performance. The rest of this section will teach you how to measure your recovery each day and use Morpheus to improve it.
    </p>
  </article>
);

const ArticleEnd = ({ article }) => (
  <div className="article-end">
    <div className="author-card">
      <div className="avatar" style={{ backgroundImage: `url(${article.avatar})` }}></div>
      <div>
        <div className="name">{article.author}</div>
        <div className="role">{article.authorHandle}</div>
        <div className="bio">Strength and conditioning coach to elite combat athletes for over two decades. Writes about HRV, recovery, and the energy systems that determine real-world performance.</div>
      </div>
    </div>
  </div>
);

const Related = () => {
  const related = window.ARTICLES.filter((a) => !a.featured).slice(0, 3);
  return (
    <section className="related light">
      <div className="related-inner">
        <div className="section-head">
          <div>
            <h2 className="section-title">Keep reading</h2>
            <p className="section-sub">Articles on adjacent themes our editors think pair well.</p>
          </div>
          <a href="Learn.html" className="section-link">Back to Learn
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
          </a>
        </div>
        <div className="grid three">
          {related.map((a) => <Card key={a.id} article={a} />)}
        </div>
      </div>
    </section>
  );
};

const ArticlePage = () => {
  const id = new URLSearchParams(window.location.search).get("id");
  const article = (id && window.ARTICLES.find((a) => a.id === id)) || window.ARTICLES.find((a) => a.featured) || window.ARTICLES[0];
  return (
    <>
      <Announce />
      <ArticleHero article={article} />
      <section className="light">
        <ArticleMeta article={article} />
        <div className="article-wrap">
          <TOC />
          <div className="article-main">
            <Prose />
            <ArticleEnd article={article} />
          </div>
          <AsideActions />
        </div>
      </section>
      <Related />
      <Footer />
      <ChatFab />
    </>
  );
};

Object.assign(window, { ArticlePage });
