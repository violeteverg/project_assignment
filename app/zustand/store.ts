import { createStore } from "zustand/vanilla";

// Initial value
export type StoreState = {
  isOpen: boolean;
  isDelete: boolean;
  expenseId: number;
  fullName: string;
};

// Actions
export type StoreActions = {
  setIsOpen: (isOpen: boolean) => void;
  setIsDelete: (isDelete: boolean) => void;
  setExpenseId: (expenseId: number) => void;
  setFullName: (firstName: string, lastName: string) => void;
};

export type MainStore = StoreState & StoreActions;

export const defaultInitState: StoreState = {
  isOpen: false,
  isDelete: false,
  expenseId: 0,
  fullName: "",
};

export const createMainStore = (initState: StoreState = defaultInitState) => {
  return createStore<MainStore>()((set) => ({
    ...initState,
    setIsOpen: (isOpen) => set({ isOpen }),
    setIsDelete: (isDelete) => set({ isDelete }),
    setExpenseId: (expenseId) => set({ expenseId }),
    setFullName: (firstName, lastName) =>
      set({ fullName: `${firstName} ${lastName}` }),
  }));
};
