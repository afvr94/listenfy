import { Flex, Box, Text } from "@chakra-ui/layout";
import { useStoreState } from "../lib/store";
import Player from "./Player";

const PlayerBar = () => {
  const activeSong = useStoreState((store) => store.activeSong);
  const activeSongs = useStoreState((store) => store.activeSongs);

  return (
    <Box
      height="100px"
      width="100vw"
      bg="gray.900"
      padding="10px"
      color="white"
    >
      <Flex align="center">
        {activeSong ? (
          <Box padding="20px" width="30%">
            <Text fontSize="lg">{activeSong.name}</Text>
            <Text fontSize="sm">{activeSong.artist.name}</Text>
          </Box>
        ) : null}
        <Box width="40%">
          {activeSong ? (
            <Player activeSong={activeSong} activeSongs={activeSongs} />
          ) : null}
        </Box>
      </Flex>
    </Box>
  );
};

export default PlayerBar;
