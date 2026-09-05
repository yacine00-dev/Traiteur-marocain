import { Check } from "lucide-react";
import { STEP_LABELS } from "./types";

interface StepIndicatorProps {
  currentStep: number;
}

export function StepIndicator({ currentStep }: StepIndicatorProps) {
  return (
    <div className="flex border-b border-border" role="list" aria-label="Progression du devis">
      {STEP_LABELS.map((label, i) => {
        const n = i + 1;
        const active = n === currentStep;
        const done = n < currentStep;
        return (
          <div
            key={label}
            role="listitem"
            aria-current={active ? "step" : undefined}
            className={`flex-1 flex flex-col items-center py-4 gap-1.5 border-r last:border-r-0 border-border ${
              active ? "bg-primary/5" : ""
            }`}
          >
            <span
              className={`font-sans text-[9px] w-5 h-5 flex items-center justify-center border transition-colors ${
                done
                  ? "border-primary bg-primary text-white"
                  : active
                  ? "border-primary text-primary"
                  : "border-border text-muted-foreground"
              }`}
            >
              {done ? <Check size={9} aria-hidden="true" /> : n}
            </span>
            <span
              className={`font-sans text-[9px] tracking-[0.12em] uppercase hidden sm:block ${
                active ? "text-primary" : "text-muted-foreground"
              }`}
            >
              {label}
            </span>
          </div>
        );
      })}
    </div>
  );
}
