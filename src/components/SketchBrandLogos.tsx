type SketchLogoProps = {
  className?: string;
};

const stroke = {
  fill: "none" as const,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

function SketchGhost({
  d,
  stroke: strokeColor,
  strokeWidth = 2,
}: {
  d: string;
  stroke: string;
  strokeWidth?: number;
}) {
  return (
    <>
      <path
        d={d}
        {...stroke}
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        opacity={0.35}
        transform="translate(0.6, 0.5)"
      />
      <path d={d} {...stroke} stroke={strokeColor} strokeWidth={strokeWidth} />
    </>
  );
}

export function SketchClaudeLogo({ className = "h-10 w-10" }: SketchLogoProps) {
  const rays = [0, 45, 90, 135, 180, 225, 270, 315];
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden>
      <rect
        x="3"
        y="3"
        width="42"
        height="42"
        rx="8"
        fill="#fff9f5"
        stroke="#e8d5cc"
        strokeWidth="1.2"
        strokeDasharray="5 4"
      />
      <g transform="translate(24, 24)">
        {rays.map((angle) => (
          <ellipse
            key={angle}
            cx="0"
            cy="-11"
            rx="3.2"
            ry="9.5"
            fill="none"
            stroke="#c96a4a"
            strokeWidth="2.2"
            strokeLinecap="round"
            transform={`rotate(${angle})`}
            opacity={0.92}
          />
        ))}
        <circle cx="0.4" cy="0.6" r="3.2" fill="#fff9f5" stroke="#c96a4a" strokeWidth="1.8" />
      </g>
    </svg>
  );
}

export function SketchGoogleLogo({ className = "h-10 w-10" }: SketchLogoProps) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden>
      <rect
        x="3"
        y="3"
        width="42"
        height="42"
        rx="8"
        fill="#f8fbff"
        stroke="#c7d8ee"
        strokeWidth="1.2"
        strokeDasharray="5 4"
      />
      <SketchGhost d="M24 8.5c-6.2.4-11.4 3.8-13.8 8.9" stroke="#4285F4" strokeWidth={2.2} />
      <SketchGhost
        d="M10.2 17.2c-.8 1.6-1.2 3.4-1.2 5.3s.4 3.7 1.2 5.3"
        stroke="#34A853"
        strokeWidth={2.2}
      />
      <SketchGhost
        d="M10.2 27.8c2.4 5.1 7.6 8.5 13.8 8.9"
        stroke="#34A853"
        strokeWidth={2.2}
      />
      <SketchGhost d="M24 36.7c5.8-.4 10.8-3.4 13.4-8.1" stroke="#FBBC05" strokeWidth={2.2} />
      <SketchGhost
        d="M37.4 28.6c.9-1.7 1.4-3.6 1.4-5.6s-.5-3.9-1.4-5.6"
        stroke="#EA4335"
        strokeWidth={2.2}
      />
      <SketchGhost d="M37.4 17.4C34.8 12.7 29.8 9.3 24 8.5" stroke="#EA4335" strokeWidth={2.2} />
      <path
        d="M24 22.8h9.2c.5 1.8.2 3.8-1 5.3-1.4 1.7-3.5 2.6-5.8 2.4-3.1-.3-5.6-2.8-5.9-5.9-.2-2.3.7-4.4 2.4-5.8 1.5-1.2 3.5-1.5 5.3-1h.8"
        {...stroke}
        stroke="#4285F4"
        strokeWidth={2.2}
      />
    </svg>
  );
}

export function SketchMicrosoftLogo({ className = "h-10 w-10" }: SketchLogoProps) {
  const tiles = [
    { d: "M5 5.5L20 5l1.2 14.5L6 20.2Z", fill: "#fde8e4", stroke: "#e85d3a" },
    { d: "M26.5 5.2L41 6l-.8 14.8L26 19.5Z", fill: "#eef6e0", stroke: "#7cb518" },
    { d: "M5.5 26.2L20.5 25l.5 15L6 41.5Z", fill: "#e4f4fc", stroke: "#2aa8e0" },
    { d: "M26.8 26.5L41.5 26l1 15.2L27 41.8Z", fill: "#fff6df", stroke: "#e8a317" },
  ];

  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden>
      <rect
        x="3"
        y="3"
        width="42"
        height="42"
        rx="8"
        fill="#fafafa"
        stroke="#d4d4d8"
        strokeWidth="1.2"
        strokeDasharray="5 4"
      />
      {tiles.map((tile) => (
        <g key={tile.stroke}>
          <path
            d={tile.d}
            fill={tile.fill}
            stroke={tile.stroke}
            strokeWidth="1.8"
            strokeLinejoin="round"
            opacity={0.9}
            transform="translate(0.5, 0.4)"
          />
          <path
            d={tile.d}
            fill="none"
            stroke={tile.stroke}
            strokeWidth="2"
            strokeLinejoin="round"
          />
        </g>
      ))}
    </svg>
  );
}

export const sketchPlatformLogos: Record<string, React.ComponentType<SketchLogoProps>> = {
  "Google Workspace": SketchGoogleLogo,
  "Microsoft 365": SketchMicrosoftLogo,
};
