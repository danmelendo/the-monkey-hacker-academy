export function Logo({ size = 36, className = "" }: { size?: number; className?: string }) {
  return (
    <img
      src="/Logo.png"
      alt="MongoHacker"
      width={size}
      height={size}
      className={`rounded-full ${className}`}
      loading="eager"
    />
  );
}
