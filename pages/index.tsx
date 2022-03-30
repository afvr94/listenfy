import { Box, Flex, Text } from "@chakra-ui/layout";
import { Image } from "@chakra-ui/react";
import { Artist } from "@prisma/client";
import { GetServerSideProps } from "next";
import { FC } from "react";
import GradientLayout from "../components/GradientLayout";
import { validateToken } from "../lib/auth";
import { useMe } from "../lib/hooks";
import prisma from "../lib/prisma";

const Home: FC<{ artists: Artist[] }> = ({ artists }) => {
  const { user, isLoading } = useMe();

  if (isLoading) {
    return null;
  }

  return (
    <GradientLayout
      color="purple"
      title={`${user?.firstName} ${user?.lastName}`}
      subtitle="Profile"
      description={`${user?.playlistsCount} public playlist`}
      isRoundImage
      image="https://tinted-gym-f99.notion.site/image/https%3A%2F%2Fdl.dropboxusercontent.com%2Fs%2Fbgiv0ssz3xpotz9%2Fpeep.png%3Fdl%3D0?table=block&id=33f9771b-0e6f-4a72-832c-69ed2d41f290&spaceId=511cd811-5561-4a61-b550-c4086b4afafb&width=2000&userId=&cache=v2"
    >
      <Box color="white" paddingX="40px">
        <Box marginBottom="40px">
          <Text fontSize="2xl" fontWeight="bold">
            Top artist this month
          </Text>
          <Text fontSize="md">only visible to you</Text>
        </Box>
        <Flex>
          {artists.map((artist) => (
            <Box paddingX="10px" key={artist.id} width="20%">
              <Box bg="gray.900" borderRadius="4px" padding="15px" width="100%">
                <Image
                  src="https://placekitten.com/300/300"
                  borderRadius="100%"
                />
                <Box marginTop="20px">
                  <Text fontSize="large">{artist.name}</Text>
                  <Text fontSize="sm">Artist</Text>
                </Box>
              </Box>
            </Box>
          ))}
        </Flex>
      </Box>
    </GradientLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  try {
    validateToken(req.cookies.LISTENFY_ACCESS_TOKEN);
  } catch {
    return {
      redirect: {
        permanent: false,
        destination: "/signin",
      },
    };
  }
  const artists = await prisma.artist.findMany({});

  return {
    props: {
      artists,
    },
  };
};

export default Home;
