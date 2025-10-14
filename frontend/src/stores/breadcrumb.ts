import { create } from 'zustand';

export interface BreadcrumbI {
  title: string;
  url: string;
}

export type State = {
  breadcrumbs: BreadcrumbI[];
};

export type Action = {
  setBreadcrumbs: (breadcrumbs: BreadcrumbI[]) => void;
};

const useBreadcrumbStore = create<State & Action>((set) => ({
  breadcrumbs: [],
  setBreadcrumbs: (breadcrumbs) => set(() => ({ breadcrumbs: [...breadcrumbs] })),
}));

export default useBreadcrumbStore;
