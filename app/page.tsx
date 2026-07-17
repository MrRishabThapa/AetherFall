import { HeroVideo } from "@/components/HeroVideo";
import type { ReactNode } from "react";

import { Navbar } from "@/components/Navbar";
import { ScrollRail } from "@/components/ScrollRail";
import { OrnatePanel } from "@/components/OrnatePanel";
import { BadgeCheck, ExternalLink } from "lucide-react";
import { WorldRoadmapCurved } from "@/components/WorldRoadmap";
import {
  Crosshair,
  Footprints,
  Map,
  Swords,
  Users,
  Coins,
  ArrowDown,
} from "lucide-react";
import { ProcessGallery, type ProcessItem } from "@/components/ProcessGallery";
import { Images } from "lucide-react";

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
const processItems: ProcessItem[] = [
  {
    type: "image",
    src: "/process/logo-design.jpeg",
    title: "Early Logo Design",
  },
  {
    type: "video",
    src: "/process/initial.mp4",
    poster: "/process/02-camera-poster.jpg",
    title: "Camera Prototype (video)",
  },

  { type: "image", src: "/process/story.png", title: "Game UI concept" },

  {
    type: "image",
    src: "/process/character-custom-design.png",
    title: "Custom Character Design",
  },
  {
    type: "video",
    src: "/process/Design.mp4",
    poster: "/process/04-boss-poster.jpg",
    title: "Chracter Design Iteration (video)",
  },
];
import Image from "next/image";

type TeamMember = {
  name: string;
  title: string;
  work: string;
  img: string;
  grid: string; // controls placement in the 6-col grid
  imgPos?: string; // optional: object-position tweak per photo
};

function TeamCard({ m }: { m: TeamMember }) {
  return (
    <div className={`lift lift-glow ${m.grid}`}>
      {/* Portrait shape: aspect-[3/4] */}
      <div className="relative w-full overflow-hidden rounded-[32px] border border-stroke bg-black/20 aspect-[3/4]">
        <Image
          src={m.img}
          alt={m.name}
          fill
          className={`object-cover ${m.imgPos ?? "object-top"}`}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />

        {/* Dark fade overlay for text clarity */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />

        {/* Optional vignette */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_70%_at_50%_20%,transparent_35%,rgba(0,0,0,0.55))]" />

        <div className="absolute bottom-0 left-0 right-0 p-6">
          <div className="text-2xl md:text-3xl font-extrabold tracking-tight text-white">
            {m.name}
          </div>
          <div className="mt-1 text-xs font-semibold tracking-[0.18em] text-ember uppercase">
            {m.title}
          </div>
          <div className="mt-3 text-sm text-white/75 leading-relaxed">
            {m.work}
          </div>
        </div>

        <div className="pointer-events-none absolute inset-0 rounded-[32px] ring-1 ring-white/5" />
      </div>
    </div>
  );
}
export default function Page() {
  const playbackRate = 0.7; // <- change this (0.5 = slower, 0.85 = slightly slower)

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

              <HeroVideo
                src="/assets/kai.mp4"
                playbackRate={0.7}
                className="block h-[52vh] w-full object-cover md:h-[60vh] lg:h-[72vh]"
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
              A world-ending event that happened long ago. The truth was broken
              into pieces. Now someone is putting the memory back together.
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
          <Section
            id="overview"
            title="Overview"
            icon={<Map className="h-5 w-5 text-gild/90" />}
          >
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <span className="text-white">Goal:</span> Battle Mini bosses →
                unlock portal → defeat abyss boss.
              </li>
              <li>
                <span className="text-white">Designed for exhibitions:</span>{" "}
                readable, fast to learn, satisfying loop.
              </li>
              <li>
                <span className="text-white">Visual style:</span> fitting size
                detailed maps (sprite-based, not backdrops).
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
              <li>Talk to quest NPC → receive boss mission</li>
              <li>Travel across biomes to find mysterious creatures</li>
              <li>Kill bosses to unlock portals → progress</li>
              <li>Enter dungeon → boss fight → win</li>
            </ol>
          </Section>
          <Section
            id="characters"
            title="Characters"
            icon={<Coins className="h-5 w-5 text-gild/90" />}
          >
            <ul className="list-disc pl-5 space-y-2">
              <li>
                Protagonist : Player-controlled, sword-wielding, can slice
                enemies
              </li>
              <li>
                Forest Boss : <b>DRYAD</b> ; very energetic, spins a lot ,
                butterfly kicks
              </li>
              <li>
                Artic Boss : <b>PRIME APE</b> ; Strong Bulky , moves slowly but
                has high health and attack damage
              </li>

              <li>
                Desert Boss : <b>CORPSE</b> ; Slithery , moves quickly and has
                high attack speed
              </li>
            </ul>
          </Section>
          <Section
            id="world"
            title="World / Map Structure"
            icon={<Map className="h-5 w-5 text-gild/90" />}
          >
            <div className="text-white/70">
              Progression across biomes, ending in the Abyss arena. Hover a stop
              to highlight the route up to that point.
            </div>

            <WorldRoadmapCurved />
          </Section>

          <Section
            id="mechanics"
            title="Key Mechanics"
            icon={<Crosshair className="h-5 w-5 text-gild/90" />}
          >
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <span className="text-white">Camera:</span> Screen centered ,
                Player always visible, smooth follow, no zoom.
              </li>
              <li>
                <span className="text-white">Dialogue:</span> pixel font
                rendering, multi-page
              </li>
              <li>
                <span className="text-white">Missions:</span> progress tracking
                (0/3 etc.), portal unlock after enough missions.
              </li>
              <li>
                <span className="text-white">Controls:</span> A W S D keys for
                movement, L for slicing sword
              </li>
            </ul>
          </Section>

          <Section
            id="boss"
            title="Final Boss"
            icon={<Swords className="h-5 w-5 text-gild/90" />}
          >
            <div className="text-white/75">????????????????????</div>
          </Section>
          <Section
            id="process"
            title="Process / Development Journey"
            icon={<Images className="h-5 w-5 text-gild/90" />}
          >
            <div className="text-white/70">
              Evidence of effort and iteration: sketches, failed attempts,
              prototypes, and progress milestones.
            </div>

            <ProcessGallery items={processItems} previewCount={3} />
          </Section>
          <Section
            id="team"
            title="Team"
            icon={<Users className="h-5 w-5 text-gild/90" />}
          >
            <div className="mt-6">
              {/* 6-col grid on large screens */}
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-6">
                {[
                  // TOP ROW (2 cards centered)
                  {
                    name: "Rishab",
                    title: "Game Logic / Integration",
                    work: "Core integration, camera/overworld logic, missions integration, final build.",
                    img: "/team/Rishab.jpeg",
                    grid: "lg:col-start-2 lg:col-span-2",
                    imgPos: "object-[center_15%]",
                  },
                  {
                    name: "Anup",
                    title: "Enemy AI / Boss Systems",
                    work: "Boss behaviour, creature patterns, combat logic and tuning.",
                    img: "/team/Anup.jpeg",
                    grid: "lg:col-start-4 lg:col-span-2",
                    imgPos: "object-[center_15%]",
                  },

                  // BOTTOM ROW (3 cards evenly spaced)
                  {
                    name: "Roshni",
                    title: "Art / UI",
                    work: "Biome/map art, UI assets, dialogue visuals, polish pass.",
                    img: "/team/roshni.jpeg",
                    grid: "lg:col-start-1 lg:col-span-2",
                    imgPos: "object-[center_20%]",
                  },
                  {
                    name: "Vishal",
                    title: "Art / UI",
                    work: "Map artwork support, UI components, portal visuals, finishing touches.",
                    img: "/team/Vishal.png",
                    grid: "lg:col-start-3 lg:col-span-2",
                    imgPos: "object-[center_20%]",
                  },
                  {
                    name: "Satish",
                    title: "Audio / Miscellaneous Items",
                    work: "Sound testing, ambience checks, mix/volume balancing.",
                    img: "/team/satishh.png",
                    grid: "lg:col-start-5 lg:col-span-2",
                    imgPos: "object-[center_20%]",
                  },
                ].map((m) => (
                  <TeamCard key={m.name} m={m} />
                ))}
              </div>
            </div>
          </Section>
          <Section
            id="credits"
            title="Credits & Sources"
            icon={<BadgeCheck className="h-5 w-5 text-gild/90" />}
          >
            <div className="space-y-6">
              <div>
                <div className="text-white font-semibold">
                  2D Art / Sprite Pack
                </div>
                <div className="mt-2 text-white/70">
                  We used assets from OpenGameArt and credited the original
                  creator as required.
                </div>

                <div className="mt-3 rounded-xl border border-stroke bg-black/20 p-4">
                  <div className="text-sm font-semibold text-white/85">
                    Tiny Adventure Pack — Vryell (OpenGameArt)
                  </div>

                  <div className="mt-2 text-sm text-white/70 space-y-1">
                    <div>
                      Source:{" "}
                      <a
                        className="inline-flex items-center gap-1 underline underline-offset-4 hover:text-white"
                        href="https://opengameart.org/content/tiny-adventure-pack"
                        target="_blank"
                        rel="noreferrer"
                      >
                        opengameart.org/content/tiny-adventure-pack{" "}
                        <ExternalLink className="h-3.5 w-3.5" />
                      </a>
                    </div>
                    <div>
                      License:{" "}
                      <a
                        className="inline-flex items-center gap-1 underline underline-offset-4 hover:text-white"
                        href="https://creativecommons.org/licenses/by/4.0/"
                        target="_blank"
                        rel="noreferrer"
                      >
                        CC BY 4.0 <ExternalLink className="h-3.5 w-3.5" />
                      </a>
                    </div>
                    <div className="text-xs text-white/55 mt-2">
                      Attribution note: If we modified/edited these sprites
                      (recolors, cropping, compositing), we still credit the
                      original author and indicate changes were made.
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <div className="text-white font-semibold">
                  Movement / Scratch Logic Reference
                </div>
                <div className="mt-2 text-white/70">
                  Our player movement and Scratch system logic was developed by
                  our team, with learning/reference support from community
                  tutorials.
                </div>

                <div className="mt-3 rounded-xl border border-stroke bg-black/20 p-4">
                  <div className="text-sm font-semibold text-white/85">
                    Griffpatch (YouTube) — Scratch tutorials
                  </div>
                  <div className="mt-2 text-sm text-white/70">
                    Reference channel:{" "}
                    <a
                      className="inline-flex items-center gap-1 underline underline-offset-4 hover:text-white"
                      href="https://www.youtube.com/@griffpatch"
                      target="_blank"
                      rel="noreferrer"
                    >
                      youtube.com/@griffpatch{" "}
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  </div>
                  <div className="mt-2 text-xs text-white/55">
                    Used as inspiration/reference for movement/camera patterns;
                    integrated and adapted within our project.
                  </div>
                </div>
              </div>

              <div className="text-xs text-white/50">
                If any additional third‑party assets were used (audio, fonts,
                textures), they will be listed here with their sources and
                licenses.
              </div>
            </div>
          </Section>

          <Section id="play" title="Play / Demo Embed">
            <div className="lift lift-glow aspect-video w-full overflow-hidden rounded-xl border border-stroke bg-black/30">
              <iframe
                className="h-full w-full"
                src="https://scratch.mit.edu/projects/1362631682/embed"
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
