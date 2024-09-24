import type { StateCreator } from "zustand";

const localStorageMiddleware =
  <T extends object>(config: StateCreator<T>, key: string): StateCreator<T> =>
  (set, get, api) =>
    config(
      (args) => {
        set(args);
        localStorage.setItem(key, JSON.stringify(get()));
      },
      get,
      api,
    );

export default localStorageMiddleware;
