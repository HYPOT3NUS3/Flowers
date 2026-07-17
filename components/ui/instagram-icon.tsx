export function InstagramIcon({ size = 20, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      height={size}
      viewBox="0 0 24 24"
      width={size}
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="3.25" y="3.25" width="17.5" height="17.5" rx="5.1" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="12" cy="12" r="4.05" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="17.05" cy="6.95" r="1.2" fill="currentColor" />
    </svg>
  );
}
