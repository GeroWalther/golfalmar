type Point = { date: string; revenueCents: number; count: number };

export function SalesSparkline({ data }: { data: Point[] }) {
  const width = 800;
  const height = 200;
  const padding = { top: 16, right: 16, bottom: 24, left: 40 };
  const innerW = width - padding.left - padding.right;
  const innerH = height - padding.top - padding.bottom;

  const maxRev = Math.max(1, ...data.map((d) => d.revenueCents));
  const xStep = data.length > 1 ? innerW / (data.length - 1) : innerW;

  const points = data.map((d, i) => {
    const x = padding.left + i * xStep;
    const y = padding.top + innerH - (d.revenueCents / maxRev) * innerH;
    return { x, y, ...d };
  });

  const path =
    points.length === 0
      ? ""
      : "M" + points.map((p) => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(" L");

  const areaPath =
    points.length === 0
      ? ""
      : `${path} L ${points[points.length - 1].x.toFixed(1)},${(padding.top + innerH).toFixed(1)} L ${points[0].x.toFixed(1)},${(padding.top + innerH).toFixed(1)} Z`;

  const totalRev = data.reduce((s, d) => s + d.revenueCents, 0);
  const totalOrders = data.reduce((s, d) => s + d.count, 0);

  return (
    <div className="rounded-md border border-border bg-card p-5">
      <div className="flex flex-wrap items-baseline justify-between gap-3 mb-4">
        <div>
          <p className="eyebrow">Revenue · last 30 days</p>
          <p className="mt-2 font-heading text-2xl font-extrabold">
            €{(totalRev / 100).toFixed(0)}
          </p>
          <p className="text-xs text-muted-foreground mt-0.5">
            {totalOrders} orders
          </p>
        </div>
      </div>
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="w-full h-auto"
        role="img"
        aria-label="Daily revenue, last 30 days"
      >
        <defs>
          <linearGradient id="spark-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="oklch(0.42 0.11 152)" stopOpacity="0.25" />
            <stop offset="100%" stopColor="oklch(0.42 0.11 152)" stopOpacity="0" />
          </linearGradient>
        </defs>
        {/* y-axis grid lines */}
        {[0.25, 0.5, 0.75, 1].map((f) => {
          const y = padding.top + innerH * (1 - f);
          return (
            <line
              key={f}
              x1={padding.left}
              x2={padding.left + innerW}
              y1={y}
              y2={y}
              stroke="oklch(0.14 0 0 / 8%)"
              strokeDasharray="2 4"
            />
          );
        })}
        <path d={areaPath} fill="url(#spark-fill)" />
        <path
          d={path}
          fill="none"
          stroke="oklch(0.42 0.11 152)"
          strokeWidth="2"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
        {points.map((p) =>
          p.revenueCents > 0 ? (
            <circle
              key={p.date}
              cx={p.x}
              cy={p.y}
              r={3}
              fill="oklch(0.42 0.11 152)"
            >
              <title>{`${p.date} — €${(p.revenueCents / 100).toFixed(0)} (${p.count} orders)`}</title>
            </circle>
          ) : null,
        )}
        {/* y-axis labels */}
        <text
          x={padding.left - 6}
          y={padding.top + 4}
          fontSize="10"
          fontFamily="ui-monospace, monospace"
          fill="currentColor"
          textAnchor="end"
          opacity="0.5"
        >
          €{(maxRev / 100).toFixed(0)}
        </text>
        <text
          x={padding.left - 6}
          y={padding.top + innerH + 3}
          fontSize="10"
          fontFamily="ui-monospace, monospace"
          fill="currentColor"
          textAnchor="end"
          opacity="0.5"
        >
          €0
        </text>
        {/* x-axis first/last date */}
        {data.length > 0 && (
          <>
            <text
              x={padding.left}
              y={height - 6}
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              fill="currentColor"
              opacity="0.5"
            >
              {data[0].date}
            </text>
            <text
              x={padding.left + innerW}
              y={height - 6}
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              fill="currentColor"
              textAnchor="end"
              opacity="0.5"
            >
              {data[data.length - 1].date}
            </text>
          </>
        )}
      </svg>
    </div>
  );
}
