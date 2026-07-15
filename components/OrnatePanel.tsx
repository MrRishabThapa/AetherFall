import { cn } from "./utils";

export function OrnatePanel({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
  "lift lift-glow relative rounded-2xl border border-stroke bg-glass backdrop-blur-xl",
  "shadow-[0_0_0_1px_rgba(255,255,255,0.03)]",
  className
)}
    >
      {/* corner glints */}
      <div className="pointer-events-none absolute inset-0 rounded-2xl [mask-image:radial-gradient(60%_60%_at_10%_10%,black,transparent)] bg-gradient-to-br from-gild/18 to-transparent" />
      <div className="pointer-events-none absolute inset-0 rounded-2xl [mask-image:radial-gradient(60%_60%_at_90%_90%,black,transparent)] bg-gradient-to-tl from-ember/12 to-transparent" />
      {children}
    </div>
  );
}