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
      {/* Fixed navbar layered above hero */}
      <Navbar />
      <ScrollRail />

      {/* FULL-VH LANDING HERO (full width, not inside a container) */}
      <section className="relative min-h-[100svh] w-full pt-28">
        {/* background ambience behind everything */}
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/45 to-ink" />
          <div className="absolute inset-0 bg-[radial-gradient(55%_45%_at_25%_35%,rgba(255,122,61,0.10),transparent_65%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(45%_45%_at_80%_30%,rgba(244,208,122,0.08),transparent_70%)]" />
        </div>

        <div className="grid min-h-[calc(100svh-7rem)] grid-cols-1 items-center gap-10 px-6 pb-12 lg:grid-cols-2 lg:gap-14 lg:px-14">
          {/* LEFT: VIDEO HERO */}
          <div className="relative">
            <div className="lift lift-glow relative overflow-hidden rounded-3xl border border-stroke bg-black/20">
              {/* subtle glossy overlay */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-black/45 via-transparent to-white/5" />

              <video
                className="block h-[52vh] w-full object-cover md:h-[60vh] lg:h-[72vh]"
                src="/assets/kai.mp4"
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
              />

              {/* vignette to make it cinematic */}
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(80%_70%_at_50%_40%,transparent_45%,rgba(0,0,0,0.65))]" />
            </div>

           
          </div>

          {/* RIGHT: TITLE + SUBTITLE */}
          <div className="relative">
            

            <h1 className="mt-5 text-4xl md:text-6xl font-extrabold leading-[0.95] tracking-tight">
              Aetherfall: <br />
              Echoes of The Sundering
            </h1>

            <p className="mt-5 max-w-xl text-sm md:text-base text-white/75">
              A world-ending event that happened long ago. The truth was broken into pieces.
              Now someone is putting the memory back together.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href="#play"
                className="lift lift-glow rounded-xl bg-gradient-to-b from-gild/25 to-ember/10 px-5 py-3 text-sm font-semibold border border-stroke hover:from-gild/30 hover:to-ember/15 transition shadow-gild"
              >
                Play / Demo
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
              className="mt-10 inline-flex items-center gap-2 text-xs text-white/55 hover:text-white/80 transition"
            >
              <ArrowDown className="h-4 w-4" />
              Scroll to documentation
            </a>
          </div>
        </div>
      </section>

      {/* DOCS BELOW (exposed on scroll) */}
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

          <Section id="gameplay" title="Core Gameplay Loop" icon={<Footprints className="h-5 w-5 text-gild/90" />}>
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

          <Section id="mechanics" title="Key Mechanics" icon={<Crosshair className="h-5 w-5 text-gild/90" />}>
            <ul className="list-disc pl-5 space-y-2">
              <li><span className="text-white">Camera:</span> player centered, world offsets with camX/camY.</li>
              <li><span className="text-white">Dialogue:</span> pixel font rendering, multi-page, Enter to advance.</li>
              <li><span className="text-white">Missions:</span> progress tracking (0/3 etc.), portal unlock after enough missions.</li>
              <li><span className="text-white">Hunting:</span> strike from behind; danger if the target turns to face you.</li>
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
          © {new Date().getFullYear()} Aetherfall — Docs
        </footer>
      </main>
    </div>
  );
}