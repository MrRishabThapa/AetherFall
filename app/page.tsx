// app/page.tsx
import type { ReactNode } from "react";
import { Navbar } from "@/components/Navbar";
import { ScrollRail } from "@/components/ScrollRail";
import { OrnatePanel } from "@/components/OrnatePanel";
import { BackgroundScene } from "@/components/BackgroundScene";
import { Embers } from "@/components/Embers";
import { Crosshair, Footprints, Map, Swords, Users } from "lucide-react";


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
          <h2 className="text-xl md:text-2xl font-semibold tracking-tight">
            {title}
          </h2>
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
    <div className="min-h-screen">
      {/* Alive cinematic background (fixed, animated) */}
      <BackgroundScene />
      <Embers />

      <Navbar />
      <ScrollRail />

      {/* HERO (content only now; background handled by BackgroundScene) */}
      <div className="relative pt-28">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid gap-8 md:grid-cols-12 items-end pb-14">
            <div className="md:col-span-7">
              <div className="inline-flex items-center gap-2 rounded-full border border-stroke bg-white/5 px-3 py-1 text-xs text-white/70 backdrop-blur-xl">
                University Exhibition • Scratch 3.0
              </div>

              <h1 className="mt-5 text-4xl md:text-6xl font-extrabold leading-[0.95] tracking-tight">
                TRACK THE HUNT. <br />
                CLAIM THE TROPHY.
              </h1>

              <p className="mt-5 max-w-xl text-sm md:text-base text-white/70">
                AtherFall is a top-down medieval hunting RPG in Scratch. Take quests
                at camp, stalk beasts across three biomes, strike from behind, and
                enter the abyss arena for the final boss.
              </p>

              <div className="mt-7 flex flex-wrap gap-3">
                <a
                  href="#play"
                  className="lift rounded-xl bg-gradient-to-b from-gild/25 to-ember/10 px-5 py-3 text-sm font-semibold border border-stroke hover:from-gild/30 hover:to-ember/15 transition shadow-gild"
                >
                  Try the Demo
                </a>
                <a
                  href="#overview"
                  className="lift rounded-xl px-5 py-3 text-sm font-semibold border border-stroke bg-black/25 hover:bg-white/5 transition backdrop-blur-xl"
                >
                  Read Docs
                </a>
              </div>
            </div>

            <div className="md:col-span-5">
              <OrnatePanel className="p-5">
                <div className="text-xs text-white/60 tracking-wider">QUICK SPECS</div>
                <div className="mt-3 grid gap-2 text-sm text-white/75">
                  <div className="flex justify-between gap-4">
                    <span>Engine</span>
                    <span className="text-white">Scratch 3.0 (.sb3)</span>
                  </div>
                  <div className="flex justify-between gap-4">
                    <span>World</span>
                    <span className="text-white">Camp + Overworld + Dungeon</span>
                  </div>
                  <div className="flex justify-between gap-4">
                    <span>Hook</span>
                    <span className="text-white">Stealth back-attacks</span>
                  </div>
                  <div className="flex justify-between gap-4">
                    <span>Collision</span>
                    <span className="text-white">Border-only</span>
                  </div>
                </div>
              </OrnatePanel>
            </div>
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <main className="mx-auto max-w-6xl px-4 pb-24">
        <div className="grid gap-6">
          <Section
            id="overview"
            title="Overview"
            icon={<Map className="h-5 w-5 text-gild/90" />}
          >
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <span className="text-white">Goal:</span> complete hunts → unlock portal
                → defeat abyss boss.
              </li>
              <li>
                <span className="text-white">Designed for exhibitions:</span> readable,
                fast to learn, satisfying loop.
              </li>
              <li>
                <span className="text-white">Visual style:</span> large detailed maps
                (sprite-based, not backdrops).
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

          <Section
            id="world"
            title="World / Map Structure"
            icon={<Map className="h-5 w-5 text-gild/90" />}
          >
            <div className="space-y-4">
              <div>
                <div className="text-white font-semibold">Base Camp</div>
                <div>
                  Static hub screen: NPC dialogue, mission turn-in, overworld access.
                </div>
              </div>

              <div>
                <div className="text-white font-semibold">Overworld (3 Biomes)</div>
                <div>
                  One big scrollable sprite map: Forest → Arctic → Desert transitions.
                </div>
                <div className="mt-2 text-white/70">
                  Collision is <span className="text-white">border-only</span> around the
                  full map for smooth exploration.
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
                <span className="text-white">Camera:</span> player centered, world offsets
                with camX/camY.
              </li>
              <li>
                <span className="text-white">Dialogue:</span> pixel font rendering,
                multi-page, Enter to advance.
              </li>
              <li>
                <span className="text-white">Missions:</span> progress tracking (0/3 etc.),
                portal unlock after enough missions.
              </li>
              <li>
                <span className="text-white">Hunting:</span> strike from behind; danger if
                the target turns to face you.
              </li>
            </ul>
          </Section>

          <Section
            id="boss"
            title="Final Boss"
            icon={<Swords className="h-5 w-5 text-gild/90" />}
          >
            <ul className="list-disc pl-5 space-y-2">
              <li>Clear patterns, readable arena, exhibition-friendly difficulty.</li>
              <li>Boss HP bar + strong end-state feedback (win screen/credits).</li>
            </ul>
          </Section>

          <Section
            id="team"
            title="Team"
            icon={<Users className="h-5 w-5 text-gild/90" />}
          >
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <span className="text-white">Rishab:</span> integration, camera, missions,
                final build
              </li>
              <li>
                <span className="text-white">Anup:</span> animal AI, boss behavior
              </li>
              <li>
                <span className="text-white">Roshni + Vishal:</span> map art, UI, dialogue
                visuals, portal
              </li>
              <li>
                <span className="text-white">Satish:</span> sound testing
              </li>
            </ul>
          </Section>

          <Section id="play" title="Play / Demo Embed">
            <p className="mb-3">
              Embed your Scratch project here (replace the project ID).
            </p>

            <div className="lift aspect-video w-full overflow-hidden rounded-xl border border-stroke bg-black/30">
              <iframe
                className="h-full w-full"
                src="https://scratch.mit.edu/projects/1362259568"
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