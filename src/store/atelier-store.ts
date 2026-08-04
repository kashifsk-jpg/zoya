import { create } from "zustand";
import { persist } from "zustand/middleware";
import { ATELIER_BASE_PRICE, atelierSteps, findOption } from "@/lib/atelier-options";

export type AtelierSelections = Record<string, string>;

export interface SavedAtelierDesign {
  id: string;
  name: string;
  selections: AtelierSelections;
  price: number;
  createdAt: string;
}

function defaultSelections(): AtelierSelections {
  const selections: AtelierSelections = {};
  for (const step of atelierSteps) {
    selections[step.id] = step.options[0].id;
  }
  return selections;
}

interface AtelierState {
  stepIndex: number;
  selections: AtelierSelections;
  history: AtelierSelections[];
  savedDesigns: SavedAtelierDesign[];
  setOption: (stepId: string, optionId: string) => void;
  goToStep: (index: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  undo: () => void;
  reset: () => void;
  saveDesign: (name: string) => void;
  deleteDesign: (id: string) => void;
  loadDesign: (id: string) => void;
}

export function computeAtelierPrice(selections: AtelierSelections) {
  return atelierSteps.reduce((sum, step) => {
    const option = findOption(step.id, selections[step.id]);
    return sum + (option?.priceDelta ?? 0);
  }, ATELIER_BASE_PRICE);
}

export const useAtelierStore = create<AtelierState>()(
  persist(
    (set, get) => ({
      stepIndex: 0,
      selections: defaultSelections(),
      history: [],
      savedDesigns: [],
      setOption: (stepId, optionId) =>
        set((state) => ({
          history: [...state.history, state.selections].slice(-20),
          selections: { ...state.selections, [stepId]: optionId },
        })),
      goToStep: (index) => set({ stepIndex: Math.max(0, Math.min(index, atelierSteps.length)) }),
      nextStep: () => set((state) => ({ stepIndex: Math.min(state.stepIndex + 1, atelierSteps.length) })),
      prevStep: () => set((state) => ({ stepIndex: Math.max(state.stepIndex - 1, 0) })),
      undo: () =>
        set((state) => {
          if (state.history.length === 0) return state;
          const previous = state.history[state.history.length - 1];
          return { selections: previous, history: state.history.slice(0, -1) };
        }),
      reset: () => set({ selections: defaultSelections(), stepIndex: 0, history: [] }),
      saveDesign: (name) =>
        set((state) => ({
          savedDesigns: [
            ...state.savedDesigns,
            {
              id: `design-${Date.now()}`,
              name,
              selections: state.selections,
              price: computeAtelierPrice(state.selections),
              createdAt: new Date().toISOString(),
            },
          ],
        })),
      deleteDesign: (id) => set((state) => ({ savedDesigns: state.savedDesigns.filter((d) => d.id !== id) })),
      loadDesign: (id) => {
        const design = get().savedDesigns.find((d) => d.id === id);
        if (design) set({ selections: design.selections, stepIndex: 0 });
      },
    }),
    { name: "zoya-atelier" },
  ),
);
