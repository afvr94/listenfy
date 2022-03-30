import { Song } from "@prisma/client";
import { createStore, action, Action } from "easy-peasy";

type Store = {
  activeSongs: Song[];
  activeSong: Song | null;
  changeActiveSongs: Action<Store, Song[]>;
  changeActiveSong: Action<Store, Song>;
};

export const store = createStore<Store>({
  activeSongs: [],
  activeSong: null,
  changeActiveSongs: action((state, payload) => {
    state.activeSongs = payload;
  }),
  changeActiveSong: action((state, payload) => {
    state.activeSong = payload;
  }),
});
