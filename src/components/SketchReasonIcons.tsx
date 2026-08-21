type SketchIconProps = {
  className?: string;
};

const stroke = {
  fill: "none" as const,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

function Wobble({
  d,
  color,
  width = 2.4,
  fill,
}: {
  d: string;
  color: string;
  width?: number;
  fill?: string;
}) {
  return (
    <>
      <path
        d={d}
        fill={fill ?? "none"}
        stroke={color}
        strokeWidth={width}
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity={0.35}
        transform="translate(0.7, 0.6)"
      />
      <path
        d={d}
        fill={fill ?? "none"}
        stroke={color}
        strokeWidth={width}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </>
  );
}

/** Checkmark + little spark — practical, hands-on */
export function SketchPracticalIcon({ className = "h-full w-full" }: SketchIconProps) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden>
      <circle cx="24" cy="24" r="19" fill="#ecfdf5" stroke="#6ee7b7" strokeWidth="1.5" strokeDasharray="4 3" />
      <Wobble d="M14 24.5l6.5 6.8L34 17.5" color="#059669" width={3} />
      <path
        d="M33 11l1.2 2.4 2.6.4-1.9 1.8.5 2.6L33 16.8l-2.4 1.3.5-2.6-1.9-1.8 2.6-.4L33 11z"
        fill="#fbbf24"
        stroke="#f59e0b"
        strokeWidth="1"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="14" r="1.5" fill="#38bdf8" opacity="0.8" />
      <circle cx="37" cy="32" r="1.2" fill="#f472b6" opacity="0.75" />
    </svg>
  );
}

/** Hand-drawn shield — independent, tailored */
export function SketchShieldIcon({ className = "h-full w-full" }: SketchIconProps) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden>
      <path
        d="M24 5.5L38 11.2v11.8c0 8.2-5.8 14.5-14 17.5-8.2-3-14-9.3-14-17.5V11.2L24 5.5z"
        fill="#eff6ff"
        stroke="#60a5fa"
        strokeWidth="2"
        strokeLinejoin="round"
        transform="translate(0.5, 0.4)"
        opacity={0.5}
      />
      <Wobble
        d="M24 6L37.5 11.5v11.5c0 7.8-5.5 13.8-13.5 16.5C15.9 36.8 10.5 30.8 10.5 23V11.5L24 6z"
        color="#2563eb"
        width={2.4}
        fill="#eff6ff"
      />
      <path
        d="M19 23.5l3.5 3.8 7.5-8.2"
        {...stroke}
        stroke="#2563eb"
        strokeWidth="2.5"
      />
      <circle cx="35" cy="13" r="2" fill="#fde68a" stroke="#f59e0b" strokeWidth="1.2" />
    </svg>
  );
}

/** Two friendly doodle people + chat bubble */
export function SketchCommunicationIcon({ className = "h-full w-full" }: SketchIconProps) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden>
      <ellipse cx="24" cy="40" rx="16" ry="2.5" fill="#e2e8f0" opacity="0.6" />
      {/* Person left */}
      <circle cx="16" cy="17" r="5.5" fill="#fff7ed" stroke="#ea580c" strokeWidth="2" />
      <path
        d="M8.5 36c1.2-6 4.5-9 7.5-9s6.3 3 7.5 9"
        fill="#ffedd5"
        stroke="#ea580c"
        strokeWidth="2"
        strokeLinecap="round"
      />
      {/* Person right */}
      <circle cx="31" cy="19" r="5" fill="#f0f9ff" stroke="#0284c7" strokeWidth="2" />
      <path
        d="M24.5 36c1-5.5 3.5-8.5 6.5-8.5s5.5 3 6.5 8.5"
        fill="#e0f2fe"
        stroke="#0284c7"
        strokeWidth="2"
        strokeLinecap="round"
      />
      {/* Speech bubble */}
      <path
        d="M20 8.5h14c2 0 3.5 1.6 3.5 3.5s-1.5 3.5-3.5 3.5H25l-3.5 3v-3h-1.5c-2 0-3.5-1.5-3.5-3.5s1.5-3.5 3.5-3.5z"
        fill="#fef9c3"
        stroke="#ca8a04"
        strokeWidth="1.8"
        strokeLinejoin="round"
        transform="rotate(-4 27 12)"
      />
      <path
        d="M23 11.5h8M23 14h5"
        {...stroke}
        stroke="#ca8a04"
        strokeWidth="1.5"
        opacity="0.8"
        transform="rotate(-4 27 12)"
      />
    </svg>
  );
}

export const sketchReasonIcons = [
  SketchPracticalIcon,
  SketchShieldIcon,
  SketchCommunicationIcon,
] as const;
