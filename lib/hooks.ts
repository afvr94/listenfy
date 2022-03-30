import { Playlist, User } from "@prisma/client";
import useSWR from "swr";
import fetcher from "./fetcher";

export const useMe = () => {
  const { data, error } = useSWR<User & { playlistsCount: number }>(
    "/me",
    fetcher
  );

  return {
    user: data,
    isLoading: !data && !error,
    error,
  };
};

export const usePlaylist = () => {
  const { data, error } = useSWR<Playlist[]>("/playlist", fetcher);

  return {
    playlists: data || [],
    isLoading: !data && !error,
    error,
  };
};
