import { create } from 'zustand';

interface SidebarState {
  isCollapsed: boolean;
  isMobileOpen: boolean;
  isMobile: boolean;
  toggleCollapse: () => void;
  openMobile: () => void;
  closeMobile: () => void;
  toggleMobile: () => void;
  setIsMobile: (isMobile: boolean) => void;
  getShouldCollapse: () => boolean;
}

export const useSidebarStore = create<SidebarState>((set, get) => ({
  isCollapsed: false,
  isMobileOpen: false,
  isMobile: false,

  toggleCollapse: () => set((state) => ({ isCollapsed: !state.isCollapsed })),
  openMobile: () => set({ isMobileOpen: true }),
  closeMobile: () => set({ isMobileOpen: false }),
  toggleMobile: () => set((state) => ({ isMobileOpen: !state.isMobileOpen })),
  setIsMobile: (isMobile: boolean) => set({ isMobile }),

  getShouldCollapse: () => {
    const state = get();
    if (state.isMobile) {
      return !state.isMobileOpen;
    }
    return state.isCollapsed;
  },
}));

if (typeof window !== 'undefined') {
  const checkMobile = () => {
    const isMobile = window.innerWidth < 768;
    const store = useSidebarStore.getState();

    store.setIsMobile(isMobile);
    if (isMobile) {
      store.closeMobile();
    }
  };

  checkMobile();
  window.addEventListener('resize', checkMobile);
}
