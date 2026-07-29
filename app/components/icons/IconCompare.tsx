interface IconCompareProps {
  className?: string;
}

// Two columns side by side — the compare mode symbol.
export default function IconCompare({ className = "h-5 w-5" }: IconCompareProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 4H6a2 2 0 00-2 2v12a2 2 0 002 2h3M15 4h3a2 2 0 012 2v12a2 2 0 01-2 2h-3M12 2v20"
      />
    </svg>
  );
}
