/**
 * Maquette neutre de la carte digitale.
 * Identité entièrement fictive (Alex Martin, Studio Nova) : l’identité du
 * client réel n’apparaît jamais dans le portfolio.
 */

const rows = [
  { label: "Mobile", value: "06 00 00 00 00" },
  { label: "E-mail", value: "alex@studio-nova.fr" },
  { label: "Site", value: "studio-nova.fr" },
  { label: "LinkedIn", value: "Studio Nova" },
];

export function BusinessCardScreen() {
  return (
    <div
      className="@container absolute inset-0 flex flex-col overflow-hidden text-[#ECE7DD]"
      style={{ background: "linear-gradient(180deg,#151A22 0%,#0E1116 46%)" }}
    >
      <div className="flex items-center justify-between px-[7cqw] pt-[15cqw]">
        <span className="text-[3.4cqw] tracking-[0.3em] text-[#ECE7DD]/60">STUDIO NOVA</span>
        <span className="grid size-[8cqw] place-items-center rounded-full border border-[#D6BF94]/50 text-[3.2cqw] text-[#D6BF94]">
          N
        </span>
      </div>

      <div className="px-[7cqw] pt-[9cqw]">
        <div className="grid size-[20cqw] place-items-center rounded-full bg-[#D6BF94] font-serif text-[8cqw] text-[#0E1116]">
          AM
        </div>
        <p className="mt-[5cqw] font-serif text-[10.5cqw] leading-[1] tracking-[-0.02em]">Alex Martin</p>
        <p className="mt-[2cqw] text-[3.8cqw] text-[#ECE7DD]/60">Direction de création, Studio Nova</p>
      </div>

      <div className="mt-[7cqw] px-[7cqw]">
        <div className="flex h-[12cqw] items-center justify-center rounded-full bg-[#D6BF94] text-[3.9cqw] font-semibold text-[#0E1116]">
          Ajouter aux contacts
        </div>
      </div>

      <ul className="mt-[6cqw] px-[7cqw]">
        {rows.map((r) => (
          <li key={r.label} className="flex items-center justify-between border-t border-[#ECE7DD]/10 py-[3.6cqw]">
            <span className="text-[3.3cqw] text-[#ECE7DD]/45">{r.label}</span>
            <span className="text-[3.7cqw]">{r.value}</span>
          </li>
        ))}
      </ul>

      <div className="mt-auto flex items-center justify-between border-t border-[#ECE7DD]/10 px-[7cqw] py-[5cqw]">
        <span className="text-[3.4cqw] text-[#ECE7DD]/55">Partager ma carte</span>
        <QrGlyph className="size-[10cqw] text-[#ECE7DD]/80" />
      </div>
    </div>
  );
}

/** Motif QR décoratif (non scannable), calculé une fois et rendu en un seul tracé. */
const QR_N = 21;
const QR_PATH = (() => {
  const finder = (x: number, y: number) =>
    (x < 7 && y < 7) || (x >= QR_N - 7 && y < 7) || (x < 7 && y >= QR_N - 7);
  let d = "";
  for (let y = 0; y < QR_N; y++)
    for (let x = 0; x < QR_N; x++)
      if (!finder(x, y) && (x * 7 + y * 13 + x * y) % 5 < 2) d += `M${x} ${y}h1v1h-1z`;
  for (const [x, y] of [[0, 0], [QR_N - 7, 0], [0, QR_N - 7]]) {
    d += `M${x} ${y}h7v7h-7zM${x + 1} ${y + 1}v5h5v-5zM${x + 2} ${y + 2}h3v3h-3z`;
  }
  return d;
})();

export function QrGlyph({ className }: { className?: string }) {
  return (
    <svg aria-hidden viewBox={`0 0 ${QR_N} ${QR_N}`} className={className} shapeRendering="crispEdges">
      <path d={QR_PATH} fill="currentColor" fillRule="evenodd" />
    </svg>
  );
}
