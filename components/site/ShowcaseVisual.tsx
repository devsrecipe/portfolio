import type { ReactNode } from "react";
import { LogoMark } from "@/components/brand/Logo";
import { IndustryIcon } from "@/components/site/IndustryIcon";
import { cn } from "@/lib/utils";
import type { SiteContent } from "@/types";

type Category = SiteContent["home"]["showcase"]["categories"][number];
type Visual = Category["visual"];
type Item = Visual["items"][number];

/*
 * Mini UI illustrations for the showcase, one per business.
 *
 * Layers (moved at different speeds by IndustryShowcase for depth):
 *   data-layer="glow" | "main" | "float-a" | "float-b", each with a data-drift child.
 * Elements that animate in on their own:
 *   data-anim="grow"     scales in from the left (bars, buttons)
 *   data-anim="pop"      scales up (dates, stamps, numbers)
 *   data-anim="assemble" flies in from a scattered position (Others)
 * Without JavaScript or with reduced motion everything simply shows finished.
 * Sizes use container queries (@container), so the same visual works in the
 * desktop stage and in a phone card.
 */

const stateText: Record<NonNullable<Item["state"]>, string> = {
  done: "text-success",
  alert: "text-primary",
  active: "text-ink",
  muted: "text-muted line-through",
};

function Dot({ state }: { state?: Item["state"] }) {
  return (
    <span
      aria-hidden
      className={cn(
        "size-1.5 shrink-0 rounded-full",
        state === "done" && "bg-success",
        state === "alert" && "bg-primary",
        state === "active" && "bg-accent",
        (!state || state === "muted") && "bg-border",
      )}
    />
  );
}

function Header({ title }: { title: string }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <p className="truncate text-[0.72rem] font-semibold @md:text-sm">{title}</p>
      <span className="flex shrink-0 items-center gap-1.5 font-mono text-[0.6rem] uppercase tracking-[0.14em] text-muted">
        <span aria-hidden className="size-1.5 rounded-full bg-success" />
        Live
      </span>
    </div>
  );
}

function Row({ item, right }: { item: Item; right?: ReactNode }) {
  return (
    <div className="flex items-center gap-2.5 border-t border-border py-2 @md:py-2.5">
      <Dot state={item.state} />
      <span className={cn("min-w-0 flex-1 truncate text-[0.7rem] @md:text-[0.8rem]", item.state === "muted" && "text-muted")}>
        {item.label}
      </span>
      {right ?? (item.meta ? (
        <span className={cn("shrink-0 text-[0.65rem] font-medium @md:text-xs", item.state ? stateText[item.state] : "text-muted")}>
          {item.meta}
        </span>
      ) : null)}
    </div>
  );
}

function Shop({ v, slug }: { v: Visual; slug?: string }) {
  const [price, stock, cta] = v.items;
  return (
    <div className="flex h-full gap-3 @md:gap-5">
      <div data-anim="pop" className="grid w-[44%] place-items-center rounded-2xl bg-primary-soft">
        {slug ? <IndustryIcon slug={slug} className="size-10 text-primary @md:size-16" /> : null}
      </div>
      <div className="flex min-w-0 flex-1 flex-col">
        <p className="truncate text-[0.72rem] font-semibold @md:text-sm">{v.title}</p>
        <p className="mt-1 font-display text-xl font-bold tracking-tight @md:text-3xl">{price.label}</p>
        {price.meta ? <p className="text-[0.62rem] text-muted @md:text-xs">{price.meta}</p> : null}
        {stock ? (
          <span data-anim="pop" className="mt-3 w-fit rounded-full bg-primary-soft px-2.5 py-1 text-[0.62rem] font-semibold text-primary @md:text-xs">
            {stock.label}
          </span>
        ) : null}
        {cta ? (
          <span data-anim="grow" className="mt-auto block rounded-full bg-ink py-2 text-center text-[0.7rem] font-semibold text-ground @md:py-3 @md:text-sm">
            {cta.label}
          </span>
        ) : null}
      </div>
    </div>
  );
}

function Kitchen({ v }: { v: Visual }) {
  const [cooking = "", ready = ""] = v.labels ?? [];
  const columns = [
    { label: cooking, items: v.items.filter((i) => i.state !== "done"), tone: "border-accent/40 bg-accent-soft" },
    { label: ready, items: v.items.filter((i) => i.state === "done"), tone: "border-success/30 bg-success-soft" },
  ];
  return (
    <div className="flex h-full flex-col">
      <Header title={v.title} />
      <div className="mt-3 grid flex-1 grid-cols-2 gap-2.5 @md:mt-4 @md:gap-3">
        {columns.map((col) => (
          <div key={col.label} className="flex flex-col gap-2">
            <p className="font-mono text-[0.58rem] uppercase tracking-[0.14em] text-muted">{col.label}</p>
            {col.items.map((item) => (
              <div key={item.label} data-anim="pop" className={cn("rounded-xl border p-2 @md:p-3", col.tone)}>
                <p className="truncate text-[0.68rem] font-semibold @md:text-[0.8rem]">{item.label}</p>
                <p className="truncate text-[0.6rem] text-muted @md:text-xs">{item.meta}</p>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function Calendar({ v }: { v: Visual }) {
  const picked = Number(v.items[0]?.label.replace(/\D/g, "")) || 0;
  const booked = new Set([2, 6, 7, 13, 15, 20, 22, 27, 28]);
  const offset = 6; // March starts on a Sunday in this mock.
  const cells = Array.from({ length: 35 }, (_, i) => i - offset + 1);
  return (
    <div className="flex h-full flex-col">
      <Header title={v.title} />
      <div className="mt-3 grid grid-cols-7 gap-1 text-center @md:mt-4 @md:gap-1.5">
        {(v.labels ?? []).map((d, i) => (
          <span key={i} className="font-mono text-[0.55rem] text-muted @md:text-[0.65rem]">
            {d}
          </span>
        ))}
        {cells.map((day, i) => {
          const real = day >= 1 && day <= 31;
          const isPicked = day === picked;
          return (
            <span
              key={i}
              data-anim={isPicked ? "pop" : undefined}
              className={cn(
                "grid aspect-square place-items-center rounded-md text-[0.55rem] @md:rounded-lg @md:text-[0.7rem]",
                !real && "opacity-0",
                real && !isPicked && (booked.has(day) ? "text-muted/60 line-through" : "bg-surface-2"),
                isPicked && "bg-primary font-bold text-ground",
              )}
            >
              {real ? day : ""}
            </span>
          );
        })}
      </div>
      <div className="mt-auto">
        {v.items.slice(0, 2).map((item) => (
          <Row key={item.label} item={item} />
        ))}
      </div>
    </div>
  );
}

function Queue({ v }: { v: Visual }) {
  const [now, ...rest] = v.items;
  return (
    <div className="flex h-full flex-col">
      <Header title={v.title} />
      <div className="mt-3 flex items-end justify-between rounded-2xl bg-surface-2 p-3 @md:mt-4 @md:p-4">
        <p className="font-mono text-[0.6rem] uppercase tracking-[0.14em] text-muted">{now.label}</p>
        <p data-anim="pop" className="font-display text-3xl font-bold leading-none tracking-tight text-primary @md:text-5xl">
          {now.meta}
        </p>
      </div>
      <div className="mt-auto pt-2">
        {rest.map((item) => (
          <Row key={item.label} item={item} />
        ))}
      </div>
    </div>
  );
}

function Report({ v }: { v: Visual }) {
  const results = v.items.filter((i) => i.state !== "active");
  const sign = v.items.find((i) => i.state === "active");
  return (
    <div className="relative flex h-full flex-col">
      <Header title={v.title} />
      <div className="mt-3 space-y-1.5 @md:mt-4">
        <span data-anim="grow" className="block h-1.5 w-3/5 rounded-full bg-surface-2" />
        <span data-anim="grow" className="block h-1.5 w-2/5 rounded-full bg-surface-2" />
      </div>
      <div className="mt-3 @md:mt-4">
        {results.map((item) => (
          <Row key={item.label} item={item} />
        ))}
      </div>
      {sign ? (
        <span
          data-anim="pop"
          className="absolute bottom-0 right-0 rotate-[-8deg] rounded-lg border-2 border-primary px-2.5 py-1 text-[0.6rem] font-bold uppercase tracking-wider text-primary @md:text-xs"
        >
          {sign.label}
        </span>
      ) : null}
    </div>
  );
}

function School({ v }: { v: Visual }) {
  const [present = "", absent = ""] = v.labels ?? [];
  const absentSeats = new Set([7, 22]);
  return (
    <div className="flex h-full flex-col">
      <Header title={v.title} />
      <div className="mt-3 grid grid-cols-10 gap-1.5 @md:mt-4 @md:gap-2">
        {Array.from({ length: 30 }, (_, i) => (
          <span
            key={i}
            data-anim="pop"
            className={cn("aspect-square rounded-full", absentSeats.has(i) ? "bg-primary/70" : "bg-success/70")}
          />
        ))}
      </div>
      <div className="mt-2 flex gap-4 text-[0.58rem] text-muted @md:text-[0.68rem]">
        <span className="flex items-center gap-1.5">
          <span aria-hidden className="size-1.5 rounded-full bg-success" />
          {present}
        </span>
        <span className="flex items-center gap-1.5">
          <span aria-hidden className="size-1.5 rounded-full bg-primary" />
          {absent}
        </span>
      </div>
      <div className="mt-auto">
        {v.items.map((item) => (
          <Row key={item.label} item={item} />
        ))}
      </div>
    </div>
  );
}

function Pet({ v, slug }: { v: Visual; slug?: string }) {
  const [name, breed] = v.title.split(" · ");
  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center gap-3">
        <span data-anim="pop" className="grid size-10 place-items-center rounded-full bg-accent-soft text-accent @md:size-14">
          {slug ? <IndustryIcon slug={slug} className="size-5 @md:size-7" /> : null}
        </span>
        <div className="min-w-0">
          <p className="font-display text-base font-bold leading-tight tracking-tight @md:text-xl">{name}</p>
          {breed ? <p className="truncate text-[0.62rem] text-muted @md:text-xs">{breed}</p> : null}
        </div>
      </div>
      <ol className="relative mt-auto space-y-2.5 border-l border-border pl-4 @md:space-y-3.5">
        {v.items.map((item) => (
          <li key={item.label} className="relative">
            <span
              aria-hidden
              className={cn(
                "absolute -left-[1.3rem] top-1 size-2 rounded-full ring-4 ring-ground",
                item.state === "alert" ? "bg-primary" : item.state === "done" ? "bg-success" : "bg-accent",
              )}
            />
            <p className="text-[0.7rem] font-semibold @md:text-[0.82rem]">{item.label}</p>
            <p className={cn("text-[0.62rem] @md:text-xs", item.state ? stateText[item.state] : "text-muted")}>
              {item.meta}
            </p>
          </li>
        ))}
      </ol>
    </div>
  );
}

function Stock({ v }: { v: Visual }) {
  const [low = ""] = v.labels ?? [];
  return (
    <div className="flex h-full flex-col">
      <Header title={v.title} />
      <div className="mt-auto space-y-2.5 @md:space-y-3.5">
        {v.items.map((item) => {
          const level = Math.min(100, Number(item.meta) || 0);
          const isLow = item.state === "alert";
          return (
            <div key={item.label}>
              <div className="flex items-baseline justify-between gap-2 text-[0.65rem] @md:text-[0.8rem]">
                <span className="truncate">{item.label}</span>
                <span className={cn("shrink-0 font-mono", isLow ? "font-semibold text-primary" : "text-muted")}>
                  {isLow ? `${low} · ${level}%` : `${level}%`}
                </span>
              </div>
              <div className="mt-1 h-1.5 rounded-full bg-surface-2 @md:h-2">
                <span
                  data-anim="grow"
                  className={cn("block h-full rounded-full", isLow ? "bg-primary" : "bg-ink/70")}
                  style={{ width: `${level}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function Blocks({ v }: { v: Visual }) {
  return (
    <div className="flex h-full flex-col">
      <Header title={v.title} />
      <div className="mt-3 grid flex-1 grid-cols-3 gap-2 @md:mt-4 @md:gap-3">
        {v.items.map((item) => (
          <div
            key={item.label}
            data-anim="assemble"
            className={cn(
              "flex flex-col justify-between rounded-xl border p-2 @md:rounded-2xl @md:p-3",
              item.state === "active" ? "border-primary bg-primary text-ground" : "border-border bg-surface",
            )}
          >
            <span aria-hidden className={cn("size-2 rounded-full", item.state === "active" ? "bg-ground" : "bg-primary/60")} />
            <span className="text-[0.62rem] font-semibold leading-tight @md:text-[0.8rem]">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function Main({ category }: { category: Category }) {
  const v = category.visual;
  switch (v.kind) {
    case "shop":
      return <Shop v={v} slug={category.slug} />;
    case "kitchen":
      return <Kitchen v={v} />;
    case "calendar":
      return <Calendar v={v} />;
    case "queue":
      return <Queue v={v} />;
    case "report":
      return <Report v={v} />;
    case "school":
      return <School v={v} />;
    case "pet":
      return <Pet v={v} slug={category.slug} />;
    case "stock":
      return <Stock v={v} />;
    case "blocks":
      return <Blocks v={v} />;
  }
}

export function ShowcaseVisual({ category }: { category: Category }) {
  const { note, badge } = category.visual;
  return (
    <div aria-hidden className="@container relative mx-auto aspect-[6/5] w-full max-w-[34rem]">
      <div data-layer="glow" className="absolute inset-[16%]">
        <div data-drift className="size-full rounded-full bg-primary/15 blur-3xl" />
      </div>

      {/* The screen sits low enough that the notification only overlaps its header strip. */}
      <div data-layer="main" className="absolute inset-x-[4%] bottom-[11%] top-[15%]">
        <div
          data-drift
          className="size-full overflow-hidden rounded-[1.5rem] border border-border bg-ground p-4 shadow-[0_40px_80px_-30px_rgba(28,23,20,0.35)] @md:rounded-[1.75rem] @md:p-6"
        >
          <Main category={category} />
        </div>
      </div>

      <div data-layer="float-a" className="absolute right-0 top-0 w-[48%] max-w-60">
        <div data-drift className="rounded-2xl bg-ink p-3 text-ground shadow-[0_24px_50px_-20px_rgba(28,23,20,0.55)] @md:p-4">
          <p className="flex items-center gap-2 text-[0.68rem] font-semibold @md:text-sm">
            <span className="grid size-5 shrink-0 place-items-center rounded-full bg-primary @md:size-6">
              {/* `!`: cn does not merge classes, so beat LogoMark's default size-8. */}
              <LogoMark className="size-3! text-ground @md:size-3.5!" />
            </span>
            <span className="truncate">{note.title}</span>
          </p>
          <p className="mt-1.5 text-[0.62rem] text-ground/70 @md:text-xs">{note.text}</p>
        </div>
      </div>

      <div data-layer="float-b" className="absolute bottom-[2%] left-0">
        <div data-drift className="rounded-2xl border border-border bg-ground px-3.5 py-2.5 shadow-[0_20px_40px_-20px_rgba(28,23,20,0.4)] @md:px-5 @md:py-3.5">
          <p className="font-display text-lg font-bold leading-none tracking-tight text-primary @md:text-2xl">{badge.value}</p>
          <p className="mt-1 text-[0.6rem] text-muted @md:text-xs">{badge.label}</p>
        </div>
      </div>
    </div>
  );
}
