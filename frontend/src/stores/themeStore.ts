import { create } from 'zustand';

export type Theme = "light" | "dark" | "system";

type State = {
  theme: Theme;
};

type Action = {
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
};

const getInitialTheme = (): Theme => {
  if (typeof window === "undefined") return "system";
  
  const savedTheme = localStorage.getItem('theme') as Theme;
  if (savedTheme && ["light", "dark", "system"].includes(savedTheme)) {
    return savedTheme;
  }
  
  return 'system';
};

const applyTheme = (theme: Theme) => {
  const root = document.documentElement;
  
  if (theme === "system") {
    const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    root.classList.toggle('dark', isDark);
  } else {
    root.classList.toggle('dark', theme === 'dark');
  }
};

const useThemeStore = create<State & Action>((set, get) => ({
  theme: getInitialTheme(),
  
  setTheme: (theme) => {
    localStorage.setItem("theme", theme);
    applyTheme(theme);
    set({ theme });
  },
  
  toggleTheme: () => {
    const currentTheme = get().theme;
    const newTheme: Theme = currentTheme === "light" ? "dark" : "light";
    get().setTheme(newTheme);
  },
}));

if (typeof window !== "undefined") {
  const initialTheme = getInitialTheme();
  applyTheme(initialTheme);
  
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener("change", () => {
    const store = useThemeStore.getState();
    if (store.theme === 'system') {
      applyTheme("system");
    }
  });
}

export default useThemeStore;

