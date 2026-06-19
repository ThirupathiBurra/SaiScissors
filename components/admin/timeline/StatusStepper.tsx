import React from 'react';
import { Check } from 'lucide-react';

interface StatusStepperProps {
  currentStep: number; // 0, 1, 2, 3
  steps: string[];
}

export function StatusStepper({ currentStep, steps }: StatusStepperProps) {
  return (
    <div className="flex items-center w-full">
      {steps.map((step, index) => {
        const isCompleted = index < currentStep;
        const isActive = index === currentStep;

        return (
          <React.Fragment key={step}>
            <div className="flex flex-col items-center">
              <div 
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors
                  ${isCompleted ? 'bg-[#C9A84C] text-black' : 
                    isActive ? 'border-2 border-[#C9A84C] text-[#C9A84C] bg-[rgba(201,168,76,0.1)]' : 
                    'bg-[rgba(255,255,255,0.05)] text-[#6B7280]'}`}
              >
                {isCompleted ? <Check size={16} /> : index + 1}
              </div>
              <span className={`text-[10px] mt-2 font-medium uppercase tracking-wider ${isActive ? 'text-[#C9A84C]' : 'text-[#6B7280]'}`}>
                {step}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div className={`flex-1 h-px mx-4 ${index < currentStep ? 'bg-[#C9A84C]' : 'bg-[rgba(255,255,255,0.1)]'}`} />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}
