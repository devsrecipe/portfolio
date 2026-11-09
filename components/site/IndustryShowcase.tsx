"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { IndustryIcon } from "@/components/site/IndustryIcon";
import { ShowcaseVisual } from "@/components/site/ShowcaseVisual";
import { cn } from "@/lib/utils";
import type { ShowcaseCategory, SiteContent } from "@/types";

gsap.registerPlugin(ScrollTrigger);

type Data = SiteContent["home"]["showcase"];

/** Scroll distance per business on desktop, in viewport heights. */
const STEP_VH = 90;

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * "One business at a time" story.
 *
 * Desktop (and motion allowed): a sticky stage that scrolling moves through,
 * one category per step. Each step holds (layers drift at different speeds)
 * then hands over (text and visual leave upward, the next rises in). The page
 * scrolls on normally after the last one: no snapping, no scroll locking.
 *
 * Phones and reduced motion: a native swipe carousel with category chips.
 */
export function IndustryShowcase({ data }: { data: Data }) {
  return (
    <>
      <PinnedStory data={data} />
      <SwipeStory data={data} />
    </>
  );
}

function CategoryIcon({ category, className }: { category: ShowcaseCategory; className?: string }) {
  return category.slug ? (
    <IndustryIcon slug={category.slug} className={className} />
  ) : (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden className={className}>
      <rect x="3" y="3" width="7" height="7" rx="2" />
      <rect x="14" y="3" width="7" height="7" rx="2" />
      <rect x="3" y="14" width="7" height="7" rx="2" />
      <path d="M17.5 14v7M14 17.5h7" />
    </svg>
  );
}

/** Name, promise, problems and fixes. `data-t` marks the blocks that animate in turn. */
function CategoryText({
  category,
  data,
  index,
  total,
  withExample,
}: {
  category: ShowcaseCategory;
  data: Data;
  index: number;
  total: number;
  withExample?: boolean;
}) {
  return (
    <div className="relative z-10">
      <p data-t className="flex items-center gap-3">
        <span className="grid size-10 place-items-center rounded-xl bg-primary-soft text-primary">
          <CategoryIcon category={category} className="size-5" />
        </span>
        <span className="font-mono text-xs text-muted">
          {pad(index + 1)} / {pad(total)}
        </span>
      </p>
      <h3
        data-t
        className="mt-5 font-display text-[clamp(2.1rem,3.4vw,3.5rem)] font-bold leading-[1.02] tracking-[-0.04em] [@media(max-height:820px)]:mt-3 [@media(max-height:820px)]:text-[clamp(2rem,2.8vw,2.75rem)]"
      >
        {category.name}
      </h3>
      <p data-t className="mt-3 max-w-md text-lg leading-snug text-ink/80 xl:text-xl [@media(max-height:820px)]:text-base">
        {category.headline}
      </p>

      <div data-t className="mt-7 [@media(max-height:820px)]:mt-4">
        <p className="font-mono text-[0.68rem] uppercase tracking-[0.14em] text-muted">{data.problemsLabel}</p>
        <ul className="mt-3 space-y-2 [@media(max-height:820px)]:space-y-1.5">
          {category.problems.map((problem) => (
            <li key={problem} className="flex gap-3 text-[0.95rem] leading-snug text-muted [@media(max-height:820px)]:text-sm">
              <span aria-hidden className="mt-[0.6em] h-px w-3 shrink-0 bg-primary" />
              {problem}
            </li>
          ))}
        </ul>
      </div>

      <div data-t className="mt-6 [@media(max-height:820px)]:mt-4">
        <p className="font-mono text-[0.68rem] uppercase tracking-[0.14em] text-muted">{data.fixesLabel}</p>
        <ul className="mt-3 space-y-2 [@media(max-height:820px)]:space-y-1.5">
          {category.fixes.map((fix) => (
            <li key={fix} className="flex gap-3 text-[0.95rem] font-medium leading-snug [@media(max-height:820px)]:text-sm">
              <span aria-hidden className="mt-0.5 grid size-[1.15rem] shrink-0 place-items-center rounded-full bg-success-soft text-[0.6rem] text-success">
                ✓
              </span>
              {fix}
            </li>
          ))}
        </ul>
      </div>

      {withExample ? (
        <p className="mt-6 border-l-2 border-primary pl-4 text-[0.95rem] leading-relaxed text-muted">
          <span className="block font-mono text-[0.65rem] uppercase tracking-[0.14em] text-primary">{data.exampleLabel}</span>
          {category.example}
        </p>
      ) : null}

      <p data-t className="mt-7 [@media(max-height:820px)]:mt-4">
        <Link href={category.link.href} className="link-underline text-sm font-semibold text-primary">
          {category.link.label} →
        </Link>
      </p>
    </div>
  );
}

/* ---------------------------------------------------------------- desktop */

function PinnedStory({ data }: { data: Data }) {
  const categories = data.categories;
  const n = categories.length;
  const total = 2 * n - 1; // a hold (1) per business plus a hand-over (1) between each pair
  const wrap = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const fills = useRef<(HTMLSpanElement | null)[]>([]);
  const activeRef = useRef(0);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add(
      "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
      () => {
        const slides = gsap.utils.toArray<HTMLElement>("[data-slide]", stage.current);
        const layer = (s: ReturnType<typeof gsap.utils.selector>, name: string) => s(`[data-layer="${name}"]`);
        // Random start positions for the "assemble" pieces, fixed once so scrubbing back and forth is stable.
        const scatter = new Map<Element, gsap.TweenVars>();

        slides.forEach((slide) => {
          const s = gsap.utils.selector(slide);
          gsap.set(slide, { autoAlpha: 1 });
          gsap.set(s("[data-t]"), { y: 50, autoAlpha: 0 });
          gsap.set(layer(s, "main"), { y: 140, scale: 0.92, rotate: 3, autoAlpha: 0 });
          gsap.set(layer(s, "float-a"), { y: 240, autoAlpha: 0 });
          gsap.set(layer(s, "float-b"), { y: 320, autoAlpha: 0 });
          gsap.set(layer(s, "glow"), { scale: 0.6, autoAlpha: 0 });
          gsap.set(s("[data-num]"), { y: 120, autoAlpha: 0 });
          gsap.set(s('[data-anim="grow"]'), { scaleX: 0, transformOrigin: "0% 50%" });
          gsap.set(s('[data-anim="pop"]'), { scale: 0.3, autoAlpha: 0 });
          s('[data-anim="assemble"]').forEach((el) => {
            const from = {
              x: gsap.utils.random(-140, 140),
              y: gsap.utils.random(-100, 100),
              rotate: gsap.utils.random(-35, 35),
              autoAlpha: 0,
            };
            scatter.set(el, from);
            gsap.set(el, from);
          });
        });

        const once = { immediateRender: false };

        const enter = (slide: HTMLElement, tl: gsap.core.Timeline, at: number) => {
          const s = gsap.utils.selector(slide);
          tl.fromTo(layer(s, "glow"), { scale: 0.6, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, duration: 0.7, ease: "power2.out", ...once }, at)
            .fromTo(s("[data-num]"), { y: 120, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.7, ease: "power2.out", ...once }, at)
            .fromTo(
              layer(s, "main"),
              { y: 140, scale: 0.92, rotate: 3, autoAlpha: 0 },
              { y: 0, scale: 1, rotate: 0, autoAlpha: 1, duration: 0.6, ease: "power3.out", ...once },
              at,
            )
            .fromTo(layer(s, "float-a"), { y: 240, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.55, ease: "power3.out", ...once }, at + 0.1)
            .fromTo(layer(s, "float-b"), { y: 320, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.5, ease: "power3.out", ...once }, at + 0.15)
            .fromTo(s("[data-t]"), { y: 50, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.45, stagger: 0.05, ease: "power3.out", ...once }, at + 0.1)
            .fromTo(s('[data-anim="grow"]'), { scaleX: 0 }, { scaleX: 1, duration: 0.45, stagger: 0.05, ease: "power3.out", ...once }, at + 0.3)
            .fromTo(
              s('[data-anim="pop"]'),
              { scale: 0.3, autoAlpha: 0 },
              { scale: 1, autoAlpha: 1, duration: 0.35, stagger: 0.012, ease: "back.out(2)", ...once },
              at + 0.3,
            );
          s('[data-anim="assemble"]').forEach((el, k) => {
            tl.fromTo(el, { ...scatter.get(el) }, { x: 0, y: 0, rotate: 0, autoAlpha: 1, duration: 0.55, ease: "power3.out", ...once }, at + 0.2 + k * 0.05);
          });
        };

        const leave = (slide: HTMLElement, tl: gsap.core.Timeline, at: number) => {
          const s = gsap.utils.selector(slide);
          tl.fromTo(s("[data-t]"), { y: 0, autoAlpha: 1 }, { y: -50, autoAlpha: 0, duration: 0.4, stagger: 0.03, ease: "power2.in", ...once }, at)
            .fromTo(
              layer(s, "main"),
              { y: 0, scale: 1, rotate: 0, autoAlpha: 1 },
              { y: -120, scale: 0.94, rotate: -3, autoAlpha: 0, duration: 0.55, ease: "power2.in", ...once },
              at,
            )
            .fromTo(layer(s, "float-a"), { y: 0, autoAlpha: 1 }, { y: -220, autoAlpha: 0, duration: 0.5, ease: "power2.in", ...once }, at)
            .fromTo(layer(s, "float-b"), { y: 0, autoAlpha: 1 }, { y: -300, autoAlpha: 0, duration: 0.5, ease: "power2.in", ...once }, at)
            .fromTo(layer(s, "glow"), { scale: 1, autoAlpha: 1 }, { scale: 0.6, autoAlpha: 0, duration: 0.5, ...once }, at)
            .fromTo(s("[data-num]"), { y: 0, autoAlpha: 1 }, { y: -100, autoAlpha: 0, duration: 0.5, ease: "power2.in", ...once }, at);
        };

        // Layered drift while a business is on screen: the further forward, the faster it moves.
        const drift = (slide: HTMLElement, tl: gsap.core.Timeline, at: number) => {
          const s = gsap.utils.selector(slide);
          const depth: [string, number][] = [
            ['[data-num] > [data-drift]', 30],
            ['[data-layer="glow"] > [data-drift]', 40],
            ['[data-layer="main"] > [data-drift]', 22],
            ['[data-layer="float-a"] > [data-drift]', 55],
            ['[data-layer="float-b"] > [data-drift]', 80],
          ];
          depth.forEach(([target, amount]) => {
            tl.fromTo(s(target), { y: amount }, { y: -amount, duration: 1, ease: "none" }, at);
          });
        };

        // First business plays once as the section arrives (or instantly if we are already past it).
        const intro = gsap.timeline({ paused: true });
        enter(slides[0], intro, 0);
        const box = wrap.current!.getBoundingClientRect();
        let introTrigger: ScrollTrigger | undefined;
        if (box.top < window.innerHeight * 0.75) intro.progress(1);
        else
          introTrigger = ScrollTrigger.create({
            trigger: wrap.current,
            start: "top 75%",
            once: true,
            onEnter: () => intro.timeScale(0.8).play(),
          });

        const sync = (time: number) => {
          let index = 0;
          for (let i = 0; i < n; i++) if (time >= 2 * i - 0.35) index = i;
          fills.current.forEach((fill, i) => {
            const length = i < n - 1 ? 2 : 1;
            const p = gsap.utils.clamp(0, 1, (time - 2 * i) / length);
            if (fill) fill.style.transform = `scaleX(${p})`;
          });
          if (index !== activeRef.current) {
            activeRef.current = index;
            setActive(index);
          }
        };

        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: wrap.current,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.6,
            onUpdate: (self) => sync(self.progress * total),
          },
        });
        slides.forEach((slide, i) => {
          const holdStart = 2 * i;
          drift(slide, tl, holdStart);
          if (i < n - 1) {
            leave(slide, tl, holdStart + 1);
            enter(slides[i + 1], tl, holdStart + 1.35);
          }
        });
        tl.set({}, {}, total); // keep the timeline exactly `total` long

        return () => {
          introTrigger?.kill();
          intro.kill();
        };
      },
      stage,
    );
    return () => mm.revert();
  }, [n, total]);

  /** Scroll to the moment a business is fully on screen. */
  function jump(i: number) {
    const el = wrap.current;
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY;
    const distance = el.offsetHeight - window.innerHeight;
    window.scrollTo({ top: top + ((2 * i + 0.05) / total) * distance, behavior: "smooth" });
  }

  return (
    <div
      ref={wrap}
      className="relative hidden lg:block motion-reduce:lg:hidden"
      style={{ height: `${n * STEP_VH + 100}vh` }}
    >
      <div ref={stage} className="sticky top-0 h-screen overflow-hidden">
        <div className="container-x flex h-full flex-col pb-8 pt-24 [@media(max-height:820px)]:pt-20">
          <nav aria-label={data.navLabel}>
            <ol className="grid gap-3" style={{ gridTemplateColumns: `repeat(${n}, minmax(0, 1fr))` }}>
              {categories.map((category, i) => (
                <li key={category.id}>
                  <button
                    type="button"
                    onClick={() => jump(i)}
                    aria-current={i === active ? "step" : undefined}
                    className="group block w-full text-left"
                  >
                    <span className="block h-0.5 overflow-hidden rounded-full bg-border">
                      <span
                        ref={(el) => {
                          fills.current[i] = el;
                        }}
                        className="block h-full origin-left scale-x-0 bg-primary"
                      />
                    </span>
                    <span className="mt-2.5 flex items-baseline gap-1.5 text-xs font-medium">
                      <span className="font-mono text-[0.65rem] text-muted">{pad(i + 1)}</span>
                      <span
                        className={cn(
                          "truncate transition-colors duration-500",
                          i === active ? "text-ink" : "text-muted group-hover:text-ink",
                        )}
                      >
                        {category.nav}
                      </span>
                    </span>
                  </button>
                </li>
              ))}
            </ol>
          </nav>

          <div className="relative mt-8 min-h-0 flex-1 [@media(max-height:820px)]:mt-5">
            {categories.map((category, i) => (
              <div
                key={category.id}
                data-slide=""
                inert={i !== active}
                className={cn(
                  "absolute inset-0 grid grid-cols-[minmax(0,5fr)_minmax(0,7fr)] items-center gap-14 xl:gap-24",
                  i > 0 && "invisible",
                )}
              >
                {/* Big outlined number, the slowest layer. */}
                <div data-num="" aria-hidden className="pointer-events-none absolute -bottom-10 right-0 select-none">
                  <span
                    data-drift=""
                    className="block font-display text-[clamp(10rem,18vw,17rem)] font-bold leading-none tracking-[-0.06em] text-transparent [-webkit-text-stroke:1.5px_var(--color-border)]"
                  >
                    {pad(i + 1)}
                  </span>
                </div>

                <CategoryText category={category} data={data} index={i} total={n} />

                <div className="relative z-10">
                  <div style={{ maxWidth: "min(34rem, calc((100vh - 18rem) * 1.2))" }} className="mx-auto">
                    <ShowcaseVisual category={category} />
                  </div>
                  <p data-t className="mx-auto mt-6 max-w-lg text-[0.95rem] leading-relaxed text-muted [@media(max-height:820px)]:mt-3 [@media(max-height:820px)]:text-sm">
                    <span className="mr-2 font-mono text-[0.65rem] uppercase tracking-[0.14em] text-primary">
                      {data.exampleLabel}
                    </span>
                    {category.example}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------ phones and reduced motion */

function SwipeStory({ data }: { data: Data }) {
  const categories = data.categories;
  const scroller = useRef<HTMLDivElement>(null);
  const chips = useRef<(HTMLButtonElement | null)[]>([]);
  const [active, setActive] = useState(0);

  // The card that is mostly in view is the active one.
  useEffect(() => {
    const root = scroller.current;
    if (!root) return;
    const cards = Array.from(root.querySelectorAll<HTMLElement>("[data-card]"));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(Number((entry.target as HTMLElement).dataset.card));
        });
      },
      { root, threshold: 0.6 },
    );
    cards.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, []);

  // Keep the active chip visible in its own row (horizontal only, never moves the page).
  useEffect(() => {
    const chip = chips.current[active];
    const row = chip?.parentElement;
    if (!chip || !row) return;
    row.scrollTo({ left: chip.offsetLeft - row.offsetLeft - 16, behavior: "smooth" });
  }, [active]);

  function go(i: number) {
    const root = scroller.current;
    const card = root?.querySelector<HTMLElement>(`[data-card="${i}"]`);
    if (root && card) root.scrollTo({ left: card.offsetLeft - root.offsetLeft - parseFloat(getComputedStyle(root).paddingLeft), behavior: "smooth" });
  }

  return (
    <div className="lg:hidden motion-reduce:lg:block">
      <div
        aria-label={data.navLabel}
        className="flex gap-2 overflow-x-auto px-(--gutter) pb-1 [scrollbar-width:none] lg:container-x"
      >
        {categories.map((category, i) => (
          <button
            key={category.id}
            ref={(el) => {
              chips.current[i] = el;
            }}
            type="button"
            onClick={() => go(i)}
            aria-current={i === active ? "true" : undefined}
            className={cn(
              "shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition-colors duration-300",
              i === active ? "border-ink bg-ink text-ground" : "border-border text-muted hover:text-ink",
            )}
          >
            {category.nav}
          </button>
        ))}
      </div>

      <div
        ref={scroller}
        className="mt-6 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-(--gutter) px-(--gutter) pb-4 [scrollbar-width:none]"
      >
        {categories.map((category, i) => (
          <article
            key={category.id}
            data-card={i}
            aria-label={category.name}
            className="w-[min(88%,34rem)] shrink-0 snap-start rounded-[1.75rem] border border-border bg-surface p-5 sm:p-7 lg:grid lg:w-[min(86%,64rem)] lg:grid-cols-2 lg:items-center lg:gap-12 lg:p-10"
          >
            <div className="mb-8 lg:order-2 lg:mb-0">
              <ShowcaseVisual category={category} />
            </div>
            <CategoryText category={category} data={data} index={i} total={categories.length} withExample />
          </article>
        ))}
      </div>

      <p className="container-x mt-2 font-mono text-[0.68rem] uppercase tracking-[0.14em] text-muted">
        {data.swipeHint} →
      </p>
    </div>
  );
}
