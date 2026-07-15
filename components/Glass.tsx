import { cn } from "./utils";

export function Glass({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-stroke bg-glass backdrop-blur-xl shadow-[0_0_0_1px_rgba(255,255,255,0.04)]",
        className
      )}
    >
      {children}
    </div>
  );
}