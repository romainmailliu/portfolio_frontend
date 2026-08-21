"use client";

import { useMemo, useState } from "react";
import {
  type SavingsCalculatorTask,
  savingsCalculatorContent,
  savingsCalculatorTasks,
} from "../data/ai-training-content";

function afterMinutes(task: SavingsCalculatorTask, before: number): number {
  return Math.max(task.afterFloor, Math.round(before * task.afterRatio));
}

function formatDuration(totalMinutes: number): string {
  if (totalMinutes < 60) return `${totalMinutes} min`;
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return minutes > 0 ? `${hours}h ${minutes}min` : `${hours}h`;
}

function unitSuffix(unit: SavingsCalculatorTask["unit"]): string {
  return unit === "day" ? "/ day" : "/ week";
}

export default function InboxSavingsCalculator() {
  const [values, setValues] = useState<Record<string, number>>(() =>
    Object.fromEntries(
      savingsCalculatorTasks.map((task) => [task.id, task.defaultMinutes]),
    ),
  );

  const results = useMemo(() => {
    const rows = savingsCalculatorTasks.map((task) => {
      const before = values[task.id] ?? task.defaultMinutes;
      const after = afterMinutes(task, before);
      const saved = Math.max(0, before - after);
      const weekly =
        task.unit === "day"
          ? saved * savingsCalculatorContent.workDaysPerWeek
          : saved;

      return { task, before, after, saved, weekly };
    });

    const weeklySaved = rows.reduce((total, row) => total + row.weekly, 0);

    return { rows, weeklySaved };
  }, [values]);

  return (
    <div className="ai-card ai-savings-calc overflow-hidden p-6 md:p-8">
      <div className="space-y-8">
        {results.rows.map(({ task, before, after, saved }) => (
          <div key={task.id}>
            <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
              <label htmlFor={`savings-${task.id}`} className="text-sm font-semibold text-slate-900">
                {task.label}
              </label>
              <span className="text-sm tabular-nums text-slate-600">
                {before} min{unitSuffix(task.unit)}
              </span>
            </div>
            <input
              id={`savings-${task.id}`}
              type="range"
              min={task.minMinutes}
              max={task.maxMinutes}
              step={1}
              value={before}
              onChange={(e) =>
                setValues((prev) => ({ ...prev, [task.id]: Number(e.target.value) }))
              }
              className="ai-range mt-3 w-full"
            />
            <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-500">
              <span>
                After setup: ~{after} min{unitSuffix(task.unit)}
              </span>
              <span className="font-semibold text-sky-700">
                Save ~{saved} min{unitSuffix(task.unit)}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="ai-savings-calc__total mt-10 rounded-xl border border-sky-200 bg-sky-50/60 px-5 py-5 text-center md:px-8">
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-sky-800">
          Estimated time back
        </p>
        <p className="mt-2 text-3xl font-bold tabular-nums tracking-tight text-slate-900 md:text-4xl">
          ~{formatDuration(results.weeklySaved)}
          <span className="text-lg font-semibold text-slate-500"> / week</span>
        </p>
        <p className="mt-2 text-xs leading-relaxed text-slate-500">
          {savingsCalculatorContent.disclaimer}
        </p>
      </div>
    </div>
  );
}
