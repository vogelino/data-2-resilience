import { readable } from "svelte/store";

export const reactiveQueryArgs = <T>(cb: () => T) => {
  return readable(cb(), (set) => {
    $effect.pre(() => {
      set(cb());
    });
  });
};
