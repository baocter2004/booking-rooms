import { create } from 'zustand';

export interface UserI {
  id: number;
  email: string;
  username?: string;
  avatar?: string;
}

export type State = {
  user: UserI;
};

export type Action = {
  setUser: (user: UserI) => void;
};

const useUserStore = create<State & Action>((set) => ({
  user: {} as UserI,
  setUser: (user) => set(() => ({ user })),
}));

export default useUserStore;
