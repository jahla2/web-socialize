import { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "motion/react";
import {
  ArrowUpRight,
  BarChart3,
  CalendarDays,
  Check,
  Facebook,
  Instagram,
  Linkedin,
  Music2,
  Sparkles,
  UploadCloud,
  WandSparkles,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

const brandSignals = [
  { label: "Logo", className: "chip-logo" },
  { label: "Colors", className: "chip-colors" },
  { label: "Typography", className: "chip-type" },
  { label: "Tone", className: "chip-tone" },
  { label: "Audience", className: "chip-audience" },
];

const posts = [
  {
    platform: "Instagram",
    icon: Instagram,
    title: "Launch day, but make it unmistakably you.",
    meta: "Today · 9:00 AM",
    className: "post-one",
  },
  {
    platform: "Facebook",
    icon: Facebook,
    title: "A sharper story for the people already listening.",
    meta: "Today · 1:30 PM",
    className: "post-two",
  },
  {
    platform: "LinkedIn",
    icon: Linkedin,
    title: "Turn one product update into a point of view.",
    meta: "Tomorrow · 8:45 AM",
    className: "post-three",
  },
  {
    platform: "TikTok",
    icon: Music2,
    title: "Hook, visual, caption — shaped for the feed.",
    meta: "Tomorrow · 6:15 PM",
    className: "post-four",
  },
];

const calendarRows = [
  ["", "IG", "", "LI", ""],
  ["FB", "", "TT", "", "IG"],
  ["", "LI", "", "FB", ""],
];

function App() {
  const root = useRef(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return undefined;

    const lenis = new Lenis({
      duration: 1.05,
      smoothWheel: true,
      wheelMultiplier: 0.9,
    });

    const update = (time) => lenis.raf(time * 1000);
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(update);
      lenis.destroy();
    };
  }, [prefersReducedMotion]);

  useEffect(() => {
    if (prefersReducedMotion || !root.current) return undefined;

    const ctx = gsap.context(() => {
      gsap.from(".nav-shell", {
        y: -28,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      });

      gsap
        .timeline({
          scrollTrigger: {
            trigger: ".hero",
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        })
        .to(".hero-copy", { y: -100, opacity: 0, scale: 0.94 }, 0)
        .to(".hero-orb", { scale: 1.28, opacity: 0.22 }, 0);

      const brand = gsap.timeline({
        scrollTrigger: {
          trigger: ".brand-story",
          start: "top top",
          end: "+=1900",
          pin: true,
          scrub: 1,
          anticipatePin: 1,
        },
      });

      brand
        .fromTo(
          ".brand-doc",
          { y: 180, scale: 0.8, opacity: 0, rotate: -4 },
          { y: 0, scale: 1, opacity: 1, rotate: 0, duration: 1.2, ease: "power3.out" }
        )
        .fromTo(
          ".scan-line",
          { yPercent: -20, opacity: 0 },
          { yPercent: 760, opacity: 1, duration: 1.4, ease: "none" },
          0.45
        )
        .to(
          ".brand-doc",
          { x: "-30vw", scale: 0.72, opacity: 0.55, duration: 1.05, ease: "power2.inOut" },
          1.4
        )
        .fromTo(
          ".ai-core",
          { scale: 0.35, opacity: 0, rotate: -18 },
          { scale: 1, opacity: 1, rotate: 0, duration: 1, ease: "back.out(1.5)" },
          1.5
        )
        .fromTo(
          ".brand-chip",
          { scale: 0.2, opacity: 0 },
          { scale: 1, opacity: 1, stagger: 0.12, duration: 0.7, ease: "back.out(1.8)" },
          2.05
        )
        .fromTo(
          ".brand-copy .eyebrow, .brand-copy h2, .brand-copy p",
          { y: 26, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.12, duration: 0.8 },
          2.2
        );

      const generation = gsap.timeline({
        scrollTrigger: {
          trigger: ".generation-story",
          start: "top top",
          end: "+=1800",
          pin: true,
          scrub: 1,
          anticipatePin: 1,
        },
      });

      generation
        .fromTo(
          ".generation-copy",
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.9 }
        )
        .fromTo(
          ".prompt-card",
          { scale: 0.88, opacity: 0, y: 80 },
          { scale: 1, opacity: 1, y: 0, duration: 1 },
          0.2
        )
        .fromTo(
          ".agent-node",
          { scale: 0.3, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.8, ease: "back.out(1.7)" },
          0.75
        )
        .fromTo(
          ".content-post",
          { x: 0, y: 0, scale: 0.46, opacity: 0 },
          { x: 0, y: 0, scale: 1, opacity: 1, stagger: 0.18, duration: 1, ease: "power3.out" },
          1.15
        )
        .to(".prompt-card", { opacity: 0.42, scale: 0.9, duration: 0.7 }, 1.75);

      const calendar = gsap.timeline({
        scrollTrigger: {
          trigger: ".calendar-story",
          start: "top top",
          end: "+=1500",
          pin: true,
          scrub: 1,
          anticipatePin: 1,
        },
      });

      calendar
        .fromTo(
          ".calendar-panel",
          { y: 90, opacity: 0, scale: 0.93 },
          { y: 0, opacity: 1, scale: 1, duration: 1 }
        )
        .fromTo(
          ".calendar-card",
          { y: -160, opacity: 0, scale: 0.7 },
          { y: 0, opacity: 1, scale: 1, stagger: 0.2, duration: 1.15, ease: "power3.out" },
          0.7
        )
        .fromTo(
          ".publish-check",
          { scale: 0, opacity: 0 },
          { scale: 1, opacity: 1, stagger: 0.12, duration: 0.6, ease: "back.out(2)" },
          1.8
        );

      gsap.fromTo(
        ".analytics-card",
        { y: 80, opacity: 0, scale: 0.94 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1,
          stagger: 0.14,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".analytics",
            start: "top 72%",
          },
        }
      );

      gsap.fromTo(
        ".chart-line",
        { strokeDashoffset: 780 },
        {
          strokeDashoffset: 0,
          duration: 2.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".analytics",
            start: "top 64%",
          },
        }
      );
    }, root);

    const refresh = window.setTimeout(() => ScrollTrigger.refresh(), 120);

    return () => {
      window.clearTimeout(refresh);
      ctx.revert();
    };
  }, [prefersReducedMotion]);

  return (
    <main ref={root} className="site-shell">
      <header className="nav-wrap">
        <div className="nav-shell">
          <a className="brand" href="#top" aria-label="Socia-lize home">
            <span className="brand-mark">
              <Sparkles size={16} strokeWidth={2.4} />
            </span>
            <span>Socia-lize</span>
          </a>
          <nav className="nav-links" aria-label="Primary navigation">
            <a href="#story">How it works</a>
            <a href="#calendar">Calendar</a>
            <a href="#insights">Insights</a>
          </nav>
          <motion.a
            className="nav-cta"
            href="#start"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.97 }}
          >
            Start creating
            <ArrowUpRight size={16} />
          </motion.a>
        </div>
      </header>

      <section id="top" className="hero">
        <div className="hero-grid" />
        <div className="hero-orb" aria-hidden="true" />
        <div className="hero-copy">
          <div className="hero-pill">
            <span className="pulse-dot" />
            Your AI social media team
          </div>
          <h1>
            One brand.
            <span>Every story.</span>
          </h1>
          <p>
            Socia-lize learns your identity, turns ideas into platform-ready content,
            and keeps your calendar moving without losing your voice.
          </p>
          <div className="hero-actions">
            <motion.a
              href="#story"
              className="primary-button"
              whileHover={{ y: -3, scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
            >
              See the story
              <ArrowUpRight size={18} />
            </motion.a>
            <span className="scroll-hint">Scroll to direct the experience</span>
          </div>
        </div>

        <div className="hero-floating-card hero-card-a" aria-hidden="true">
          <Instagram size={18} />
          <div>
            <b>Instagram</b>
            <span>Ready to publish</span>
          </div>
          <span className="tiny-check"><Check size={12} /></span>
        </div>
        <div className="hero-floating-card hero-card-b" aria-hidden="true">
          <WandSparkles size={18} />
          <div>
            <b>Brand voice</b>
            <span>Matched · 96%</span>
          </div>
        </div>
      </section>

      <section id="story" className="story brand-story">
        <div className="story-inner">
          <div className="brand-copy story-copy">
            <span className="eyebrow">01 · Understand</span>
            <h2>Give us your brand. We learn the signal behind it.</h2>
            <p>
              Upload guidelines, logos, references, and context. The agent separates
              the pieces that make the brand recognizable before it writes a word.
            </p>
          </div>

          <div className="brand-stage" aria-label="Animated brand ingestion illustration">
            <div className="brand-doc">
              <div className="doc-top">
                <div className="doc-icon"><UploadCloud size={18} /></div>
                <div>
                  <b>Brand-guidelines.pdf</b>
                  <span>24 pages · 18.4 MB</span>
                </div>
              </div>
              <div className="doc-preview">
                <div className="doc-logo">S</div>
                <div className="doc-lines">
                  <span />
                  <span />
                  <span />
                </div>
                <div className="doc-swatches">
                  <i />
                  <i />
                  <i />
                  <i />
                </div>
                <div className="scan-line" />
              </div>
              <div className="doc-status">
                <span>Analyzing brand system</span>
                <span>78%</span>
              </div>
            </div>

            <div className="ai-core">
              <div className="core-halo" />
              <Sparkles size={30} />
              <span>Brand intelligence</span>
            </div>

            {brandSignals.map((signal) => (
              <div key={signal.label} className={"brand-chip " + signal.className}>
                <span className="chip-dot" />
                {signal.label}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="story generation-story">
        <div className="generation-layout">
          <div className="generation-copy story-copy">
            <span className="eyebrow">02 · Create</span>
            <h2>One thought becomes a campaign built for every feed.</h2>
            <p>
              The same campaign idea branches into platform-specific hooks, formats,
              captions, and visual directions while keeping the brand consistent.
            </p>
          </div>

          <div className="generation-stage">
            <div className="prompt-card">
              <span className="prompt-label">Campaign prompt</span>
              <p>Promote our new product launch this week.</p>
              <span className="prompt-action"><Sparkles size={15} /> Generate campaign</span>
            </div>

            <div className="agent-node">
              <Sparkles size={26} />
              <span>AI</span>
            </div>

            <div className="post-stack">
              {posts.map((post) => {
                const Icon = post.icon;
                return (
                  <article key={post.platform} className={"content-post " + post.className}>
                    <div className="post-top">
                      <span className="platform-icon"><Icon size={16} /></span>
                      <span>{post.platform}</span>
                      <span className="post-ready">Ready</span>
                    </div>
                    <div className="post-visual">
                      <span className="visual-glow" />
                      <span className="visual-title">Make the launch feel like your brand.</span>
                    </div>
                    <h3>{post.title}</h3>
                    <p>{post.meta}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section id="calendar" className="story calendar-story">
        <div className="calendar-layout">
          <div className="calendar-copy story-copy">
            <span className="eyebrow">03 · Schedule</span>
            <h2>Your campaign lands on the calendar before it becomes chaos.</h2>
            <p>
              Move posts visually, keep each platform in context, and turn planning
              into a living schedule your team can actually understand.
            </p>
          </div>

          <div className="calendar-panel">
            <div className="calendar-header">
              <div>
                <span>Content calendar</span>
                <h3>September 2026</h3>
              </div>
              <div className="calendar-stat">
                <CalendarDays size={16} />
                18 scheduled
              </div>
            </div>

            <div className="week-head">
              {["Mon", "Tue", "Wed", "Thu", "Fri"].map((day) => <span key={day}>{day}</span>)}
            </div>

            <div className="calendar-grid">
              {calendarRows.flatMap((row, rowIndex) =>
                row.map((item, colIndex) => (
                  <div className="calendar-cell" key={rowIndex + "-" + colIndex}>
                    <small>{rowIndex * 5 + colIndex + 7}</small>
                    {item && (
                      <div className={"calendar-card calendar-card-" + ((rowIndex + colIndex) % 3)}>
                        <span>{item}</span>
                        <i />
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>

            <div className="publish-row">
              {[
                ["Instagram", Instagram],
                ["Facebook", Facebook],
                ["LinkedIn", Linkedin],
                ["TikTok", Music2],
              ].map(([name, Icon]) => (
                <div className="publish-item" key={name}>
                  <Icon size={15} />
                  <span>{name}</span>
                  <i className="publish-check"><Check size={11} /></i>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="insights" className="analytics">
        <div className="section-heading">
          <span className="eyebrow">04 · Learn</span>
          <h2>The loop gets smarter after every post.</h2>
          <p>
            Performance comes back into the agent so your next campaign starts with
            more context than the last one.
          </p>
        </div>

        <div className="analytics-grid">
          <article className="analytics-card chart-card">
            <div className="metric-top">
              <span>Engagement trend</span>
              <span className="metric-up">+38.4%</span>
            </div>
            <svg viewBox="0 0 700 260" role="img" aria-label="Engagement trend rising">
              <defs>
                <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#7c5cff" stopOpacity=".32" />
                  <stop offset="100%" stopColor="#7c5cff" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path
                d="M10 225 C95 215 120 190 170 194 C230 198 242 142 310 150 C380 160 400 104 465 110 C540 117 570 52 690 35 L690 250 L10 250 Z"
                fill="url(#areaGradient)"
              />
              <path
                className="chart-line"
                d="M10 225 C95 215 120 190 170 194 C230 198 242 142 310 150 C380 160 400 104 465 110 C540 117 570 52 690 35"
                fill="none"
                stroke="currentColor"
                strokeWidth="4"
                strokeLinecap="round"
                pathLength="780"
              />
            </svg>
            <div className="chart-footer">
              <span>Campaign 01</span>
              <span>Campaign 08</span>
            </div>
          </article>

          <article className="analytics-card insight-card">
            <div className="insight-icon"><BarChart3 size={21} /></div>
            <span className="metric-label">Agent insight</span>
            <h3>Shorter hooks are winning with your audience.</h3>
            <p>Next campaign will prioritize 6–9 word opening lines for social captions.</p>
            <div className="learning-chip"><Sparkles size={14} /> Saved to brand memory</div>
          </article>

          <article className="analytics-card score-card">
            <div>
              <span className="metric-label">Brand consistency</span>
              <strong>94%</strong>
            </div>
            <div className="score-ring">
              <span>94</span>
            </div>
            <p>Visual language, tone, and messaging stayed aligned across four platforms.</p>
          </article>
        </div>
      </section>

      <section id="start" className="final-cta">
        <div className="cta-glow" aria-hidden="true" />
        <div className="cta-content">
          <span className="eyebrow">Ready when you are</span>
          <h2>Your social media, finally moving as one system.</h2>
          <p>
            Brand context in. Campaigns, visuals, scheduling, publishing, and learning out.
          </p>
          <motion.a
            className="primary-button cta-button"
            href="mailto:hello@socia-lize.ai"
            whileHover={{ y: -4, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Start creating
            <ArrowUpRight size={18} />
          </motion.a>
        </div>
      </section>

      <footer>
        <a className="brand" href="#top">
          <span className="brand-mark"><Sparkles size={14} /></span>
          Socia-lize
        </a>
        <span>AI social media operating system.</span>
        <span>© 2026</span>
      </footer>
    </main>
  );
}

export default App;
