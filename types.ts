import { Song } from "@prisma/client";
import { Action } from "easy-peasy";

export interface CustomSong extends Song {
  artist: {
    id: string;
    name: string;
  };
}

export type Store = {
  activeSongs: CustomSong[];
  activeSong: CustomSong | null;
  changeActiveSongs: Action<Store, CustomSong[]>;
  changeActiveSong: Action<Store, CustomSong>;
};
