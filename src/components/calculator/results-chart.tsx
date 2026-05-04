'use client';

import { cn } from '@/lib/utils/cn';
import type { ChartSegment } from '@/types/calculator';
import { formatCurrency } from '@/lib/utils/format';

interface ResultsChartProps {
  segments: ChartSegment[];
  centerLabel?: string;
  centerValue?: string;
  size?: number;
  className?: string;
}

export function ResultsChart({
  segments,
  centerLabel,
  centerValue,
  size = 220,
  className,
}: ResultsChartProps) {
  const strokeWidth = 32;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const center = size / 2;

  // Offsets vorab berechnen statt einer let-Variable im map-Callback —
  // React 19's Compiler markiert reassignment innerhalb eines Renders als
  // Anti-Pattern, weil es nicht-deterministisch wirkt.
  const segmentOffsets = segments.reduce<number[]>((acc) => {
    const last = acc.length === 0 ? 0 : acc[acc.length - 1] + (segments[acc.length - 1].percentage / 100) * circumference;
    acc.push(last);
    return acc;
  }, []);

  return (
    <div className={cn('flex flex-col items-center gap-4', className)}>
      <div className="relative" style={{ width: size, height: size }}>
        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          className="-rotate-90"
          aria-hidden="true"
        >
          {/* Background circle */}
          <circle
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            stroke="var(--color-border)"
            strokeWidth={strokeWidth}
          />
          {/* Segments */}
          {segments.map((segment, i) => {
            const segmentLength = (segment.percentage / 100) * circumference;
            const offset = circumference - segmentOffsets[i];

            return (
              <circle
                key={segment.label}
                cx={center}
                cy={center}
                r={radius}
                fill="none"
                stroke={segment.color}
                strokeWidth={strokeWidth}
                strokeDasharray={`${segmentLength} ${circumference - segmentLength}`}
                strokeDashoffset={offset}
                strokeLinecap="butt"
                className="animate-chart-segment"
              />
            );
          })}
        </svg>
        {/* Center text */}
        {(centerLabel || centerValue) && (
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            {centerLabel && (
              <span className="text-sm text-text-muted">{centerLabel}</span>
            )}
            {centerValue && (
              <span className="text-lg font-semibold font-currency text-text">
                {centerValue}
              </span>
            )}
          </div>
        )}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap justify-center gap-x-4 gap-y-2">
        {segments.map((segment) => (
          <div key={segment.label} className="flex items-center gap-1.5">
            <div
              className="h-2.5 w-2.5 rounded-full shrink-0"
              style={{ backgroundColor: segment.color }}
            />
            <span className="text-sm text-text-secondary">{segment.label}</span>
            <span className="text-sm font-currency text-text-muted">
              {formatCurrency(segment.value)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
