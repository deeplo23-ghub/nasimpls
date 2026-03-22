export function Divider({ className = "" }: { className?: string }) {
  return <div className={`h-[3px] w-14 bg-brand-red ${className}`.trim()} />;
}
