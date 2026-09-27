// Line-art perfume bottle in the style of the Saad Amir logo.
// Used wherever a product photograph would go until real imagery is added.

interface BottleArtProps {
  tone: string;
  shape?: number;
  label?: string;
  showSprig?: boolean;
  className?: string;
}

function Sprig() {
  return (
    <g fill="none" stroke="currentColor" strokeWidth={1.3} strokeLinecap="round" opacity={0.55}>
      <path d="M36 250 C 44 214, 40 184, 22 150" />
      <path d="M40 222 C 26 214, 16 200, 14 186 C 28 190, 38 204, 40 222 Z" />
      <path d="M36 196 C 48 186, 54 172, 52 158 C 40 166, 34 180, 36 196 Z" />
      <path d="M28 170 C 16 164, 10 152, 10 140 C 22 146, 28 158, 28 170 Z" />
      <path d="M164 252 C 170 226, 176 212, 190 196" />
      <path d="M170 226 C 182 224, 192 216, 196 206 C 184 206, 174 214, 170 226 Z" />
      <path d="M176 212 C 170 200, 172 188, 178 178 C 184 190, 182 202, 176 212 Z" />
    </g>
  );
}

export default function BottleArt({ tone, shape = 0, label = 'SA', showSprig = true, className = '' }: BottleArtProps) {
  const variant = ((shape % 3) + 3) % 3;

  return (
    <svg
      viewBox="0 0 200 260"
      className={className}
      role="img"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
    >
      {showSprig && <Sprig />}

      <g fill="none" stroke="currentColor" strokeWidth={2} strokeLinejoin="round">
        {variant === 0 && (
          <>
            {/* Square flacon — mirrors the bottle in the logo */}
            <rect x="80" y="30" width="40" height="26" rx="3" fill={tone} fillOpacity={0.9} />
            <rect x="88" y="56" width="24" height="18" />
            <path d="M88 74 L60 92 Q52 96 52 106 L52 226 Q52 234 60 234 L140 234 Q148 234 148 226 L148 106 Q148 96 140 92 L112 74" />
            <path d="M58 140 L142 140 L142 222 Q142 228 136 228 L64 228 Q58 228 58 222 Z" fill={tone} fillOpacity={0.28} stroke="none" />
            <line x1="62" y1="216" x2="138" y2="216" strokeWidth={1.2} />
            <line x1="136" y1="110" x2="136" y2="200" strokeWidth={1.2} opacity={0.6} />
            <rect x="74" y="150" width="52" height="40" strokeWidth={1.2} fill="currentColor" fillOpacity={0.06} />
          </>
        )}
        {variant === 1 && (
          <>
            {/* Tall column */}
            <rect x="84" y="22" width="32" height="34" rx="2" fill={tone} fillOpacity={0.9} />
            <rect x="90" y="56" width="20" height="14" />
            <rect x="64" y="70" width="72" height="166" rx="6" />
            <rect x="68" y="128" width="64" height="104" rx="4" fill={tone} fillOpacity={0.28} stroke="none" />
            <line x1="126" y1="84" x2="126" y2="216" strokeWidth={1.2} opacity={0.6} />
            <rect x="76" y="150" width="48" height="40" strokeWidth={1.2} fill="currentColor" fillOpacity={0.06} />
          </>
        )}
        {variant === 2 && (
          <>
            {/* Round flask */}
            <circle cx="100" cy="36" r="16" fill={tone} fillOpacity={0.9} />
            <rect x="90" y="52" width="20" height="46" />
            <circle cx="100" cy="165" r="66" />
            <path d="M39.2 170 A61 61 0 0 0 160.8 170 Z" fill={tone} fillOpacity={0.28} stroke="none" />
            <path d="M142 128 A52 52 0 0 1 150 170" strokeWidth={1.2} opacity={0.6} />
            <rect x="74" y="146" width="52" height="40" strokeWidth={1.2} fill="currentColor" fillOpacity={0.06} />
          </>
        )}
      </g>

      <text
        x="100"
        y={variant === 2 ? 174 : 178}
        textAnchor="middle"
        fill="currentColor"
        style={{ fontFamily: 'var(--font-cormorant), serif', fontSize: 22, letterSpacing: 2 }}
      >
        {label}
      </text>
    </svg>
  );
}
