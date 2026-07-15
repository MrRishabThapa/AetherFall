import Image from "next/image";
import type { ReactNode } from "react";
import { Navbar } from "@/components/Navbar";
import { ScrollRail } from "@/components/ScrollRail";
import { OrnatePanel } from "@/components/OrnatePanel";
import { Crosshair, Footprints, Map, Swords, Users, ArrowDown } from "lucide-react";

function Section({
  id,
  title,
  icon,
  children,
}: {
  id: string;
  title: string;
  icon?: ReactNode;
  children: ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-28">
      <OrnatePanel className="p-6 md:p-8">
        <div className="flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-xl border border-stroke bg-black/20">
            {icon}
          </div>
          <h2 className="text-xl md:text-2xl font-semibold tracking-tight">{title}</h2>
        </div>

        <div className="mt-5 text-sm md:text-[15px] leading-relaxed text-white/75">
          {children}
        </div>
      </OrnatePanel>
    </section>
  );
}

export default function Page() {
  return (
    <div className="min-h-screen bg-ink">
      <Navbar />
      <ScrollRail />

      {/* LANDING (first screen) */}
      <section className="relative pt-28 pb-10">
        {/* page ambience behind the banner */}
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/55 to-ink" />
          <div className="absolute inset-0 bg-[radial-gradient(55%_45%_at_50%_15%,rgba(244,208,122,0.10),transparent_70%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(40%_40%_at_75%_25%,rgba(255,122,61,0.10),transparent_72%)]" />
        </div>

        <div className="mx-auto max-w-6xl px-4">
          {/* Banner frame (sketch-like landing) */}
          <div className="lift lift-glow relative overflow-hidden rounded-[28px] border border-stroke bg-white/5 backdrop-blur-2xl">
            {/* watercolor/banner background */}
            <div
              className="absolute inset-0 opacity-[0.55] bg-[url('/landing-bg.jpg')] bg-cover bg-center"
              aria-hidden
            />
            {/* readability overlays (don’t kill the art) */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-black/15" />
            <div className="absolute inset-0 bg-[radial-gradient(70%_70%_at_20%_40%,rgba(0,0,0,0.55),transparent_55%)]" />
            {/* subtle gold rim glow */}
            <div className="absolute -inset-24 bg-[radial-gradient(circle,rgba(244,208,122,0.10),transparent_55%)] blur-2xl" />

            <div className="relative grid gap-10 px-6 py-10 md:grid-cols-12 md:px-10 md:py-14">
              {/* Left content */}
              <div className="md:col-span-7">
                <div className="inline-flex items-center gap-2 rounded-full border border-stroke bg-black/25 px-3 py-1 text-xs text-white/70 backdrop-blur-xl">
                  University Exhibition • Scratch 3.0
                </div>

                <h1 className="mt-5 text-4xl md:text-6xl font-extrabold leading-[0.95] tracking-tight">
                  ATHERFALL <br />
                  <span className="text-white/90">— Hunt, Return, Ascend</span>
                </h1>

                <p className="mt-5 max-w-xl text-sm md:text-base text-white/75">
                  AtherFall is a top-down medieval hunting RPG built in Scratch.
                  Take missions at camp, stalk animals across biomes, strike from behind,
                  and unlock the abyss arena boss fight.
                </p>

                <div className="mt-7 flex flex-wrap gap-3">
                  <a
                    href="#play"
                    className="lift lift-glow rounded-xl bg-gradient-to-b from-gild/25 to-ember/10 px-5 py-3 text-sm font-semibold border border-stroke hover:from-gild/30 hover:to-ember/15 transition shadow-gild"
                  >
                    Try the Demo
                  </a>
                  <a
                    href="#overview"
                    className="lift lift-glow rounded-xl px-5 py-3 text-sm font-semibold border border-stroke bg-black/25 hover:bg-white/5 transition backdrop-blur-xl"
                  >
                    Read Docs
                  </a>
                </div>

                <a
                  href="#overview"
                  className="mt-10 inline-flex items-center gap-2 text-xs text-white/60 hover:text-white/80 transition"
                >
                  <ArrowDown className="h-4 w-4" />
                  Scroll to documentation
                </a>
              </div>

              {/* Right: character cutout */}
              <div className="md:col-span-5 relative">
                <div className="relative h-[340px] md:h-[420px] w-full">
                  {/* glow behind character */}
                  <div className="absolute left-1/2 top-1/2 h-[260px] w-[260px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-ember/10 blur-[60px]" />
                  <div className="absolute left-[58%] top-[40%] h-[220px] w-[220px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gild/10 blur-[70px]" />

                  <Image
                    src="/character.svg"
                    alt="AtherFall Character"
                    fill
                    priority
                    className="object-contain drop-shadow-[0_30px_60px_rgba(0,0,0,0.70)]"
                  />
                </div>

                {/* Quick specs overlay card (optional) */}
                
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DOCS CONTENT (revealed on scroll) */}
      <main className="mx-auto max-w-6xl px-4 pb-24">
        <div className="grid gap-6">
          <Section id="overview" title="Overview" icon={<Map className="h-5 w-5 text-gild/90" />}>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <span className="text-white">Goal:</span> complete hunts → unlock portal → defeat abyss boss.
              </li>
              <li>
                <span className="text-white">Designed for exhibitions:</span> readable, fast to learn, satisfying loop.
              </li>
              <li>
                <span className="text-white">Visual style:</span> large detailed maps (sprite-based, not backdrops).
              </li>
            </ul>
          </Section>

          <Section
            id="gameplay"
            title="Core Gameplay Loop"
            icon={<Footprints className="h-5 w-5 text-gild/90" />}
          >
            <ol className="list-decimal pl-5 space-y-2">
              <li>Start at Base Camp</li>
              <li>Talk to quest NPC → receive hunt mission</li>
              <li>Travel across biomes to find animals</li>
              <li>Back-attack to secure the kill (risk if seen)</li>
              <li>Return trophy/body to camp → progress</li>
              <li>Enter dungeon → boss fight → win</li>
            </ol>
          </Section>

          <Section id="world" title="World / Map Structure" icon={<Map className="h-5 w-5 text-gild/90" />}>
            <div className="space-y-4">
              <div>
                <div className="text-white font-semibold">Base Camp</div>
                <div>Static hub screen: NPC dialogue, mission turn-in, overworld access.</div>
              </div>
              <div>
                <div className="text-white font-semibold">Overworld (3 Biomes)</div>
                <div>One big scrollable sprite map: Forest → Arctic → Desert transitions.</div>
                <div className="mt-2 text-white/70">
                  Collision is <span className="text-white">border-only</span> around the full map for smooth exploration.
                </div>
              </div>
              <div>
                <div className="text-white font-semibold">Dungeon Arena</div>
                <div>Single-screen abyss arena with only outer wall collision.</div>
              </div>
            </div>
          </Section>

          <Section
            id="mechanics"
            title="Key Mechanics"
            icon={<Crosshair className="h-5 w-5 text-gild/90" />}
          >
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <span className="text-white">Camera:</span> player centered, world offsets with camX/camY.
              </li>
              <li>
                <span className="text-white">Dialogue:</span> pixel font rendering, multi-page, Enter to advance.
              </li>
              <li>
                <span className="text-white">Missions:</span> progress tracking (0/3 etc.), portal unlock after enough missions.
              </li>
              <li>
                <span className="text-white">Hunting:</span> strike from behind; danger if the target turns to face you.
              </li>
            </ul>
          </Section>

          <Section id="boss" title="Final Boss" icon={<Swords className="h-5 w-5 text-gild/90" />}>
            <ul className="list-disc pl-5 space-y-2">
              <li>Clear patterns, readable arena, exhibition-friendly difficulty.</li>
              <li>Boss HP bar + strong end-state feedback (win screen/credits).</li>
            </ul>
          </Section>

          <Section id="team" title="Team" icon={<Users className="h-5 w-5 text-gild/90" />}>
            <ul className="list-disc pl-5 space-y-2">
              <li><span className="text-white">Rishab:</span> integration, camera, missions, final build</li>
              <li><span className="text-white">Anup:</span> animal AI, boss behavior</li>
              <li><span className="text-white">Roshni + Vishal:</span> map art, UI, dialogue visuals, portal</li>
              <li><span className="text-white">Satish:</span> sound testing</li>
            </ul>
          </Section>

          <Section id="play" title="Play / Demo Embed">
            <p className="mb-3">Embed your Scratch project here (replace the project ID).</p>
            <div className="lift lift-glow aspect-video w-full overflow-hidden rounded-xl border border-stroke bg-black/30">
              <iframe
                className="h-full w-full"
                src="https://scratch.mit.edu/projects/1362259568/embed"
                allowFullScreen
              />
            </div>
          </Section>
        </div>

        <footer className="mt-10 text-center text-xs text-white/45">
          © {new Date().getFullYear()} AtherFall — Medieval Scratch RPG Docs
        </footer>
      </main>
    </div>
  );
}