import { Playlist as PlaylistType } from "@prisma/client";
import { GetServerSideProps } from "next/types";
import { FC } from "react";
import GradientLayout from "../../components/GradientLayout";
import SongsTable from "../../components/SongsTable";
import { validateToken } from "../../lib/auth";
import prisma from "../../lib/prisma";
import { CustomSong } from "../../types";

const getBGColor = (id: number) => {
  const colors = [
    "red",
    "green",
    "blue",
    "orange",
    "purple",
    "gray",
    "teal",
    "yellow",
  ];

  return colors[id - 1] || colors[Math.floor(Math.random() * colors.length)];
};

interface CustomPlaylistType extends PlaylistType {
  songs: CustomSong[];
}

const Playlist: FC<{ playlist: CustomPlaylistType }> = ({ playlist }) => {
  const color = getBGColor(playlist.id);
  return (
    <GradientLayout
      color={color}
      isRoundImage={false}
      title={playlist.name}
      subtitle="playlist"
      description={`${playlist.songs.length} songs`}
      image={`https://picsum.photos/400?random=${playlist.id}`}
    >
      <SongsTable songs={playlist.songs} />
    </GradientLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  query,
  req,
}) => {
  let user;
  try {
    user = validateToken(req.cookies.LISTENFY_ACCESS_TOKEN);
  } catch {
    return {
      redirect: {
        permanent: false,
        destination: "/signin",
      },
    };
  }

  const playlistId = Number(query.id);

  const [playlist] = await prisma.playlist.findMany({
    where: {
      id: playlistId,
      userId: user.id,
    },
    include: {
      songs: {
        include: {
          artist: {
            select: {
              name: true,
              id: true,
            },
          },
        },
      },
    },
  });

  return {
    props: { playlist },
  };
};

export default Playlist;
