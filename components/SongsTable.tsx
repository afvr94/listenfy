import { Box } from "@chakra-ui/layout";
import { Table, Thead, Td, Tr, Tbody, Th, IconButton } from "@chakra-ui/react";
import { BsFillPlayFill } from "react-icons/bs";
import { AiOutlineClockCircle } from "react-icons/ai";
import { FC } from "react";
import { useStoreActions } from "../lib/store";
import { CustomSong } from "../types";
import { formatDate, formatTime } from "../lib/formatters";

const SongsTable: FC<{ songs: CustomSong[] }> = ({ songs }) => {
  const setActiveSongs = useStoreActions((store) => store.changeActiveSongs);
  const setActiveSong = useStoreActions((store) => store.changeActiveSong);

  const handleOnPlay = (activeSong: CustomSong | null = null) => {
    setActiveSong(activeSong || songs[0]);
    setActiveSongs(songs);
  };

  return (
    <Box bg="transparent" color="white">
      <Box padding="10px" marginBottom="20px">
        <Box marginBottom="20px">
          <IconButton
            icon={<BsFillPlayFill fontSize="30px" />}
            colorScheme="green"
            size="lg"
            isRound
            aria-label="play"
            onClick={() => handleOnPlay()}
          />
        </Box>

        <Table variant="unstyled">
          <Thead
            borderBottom="1px solid"
            borderColor="rgba(255, 255, 255, 0.2)"
          >
            <Tr>
              <Th>#</Th>
              <Th>Title</Th>
              <Th>Date Added</Th>
              <Th>
                <AiOutlineClockCircle />
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {songs.map((song, index) => (
              <Tr
                sx={{
                  transition: "all .3s",
                  "&:hover": {
                    bg: "rgba(255, 255, 255, 0.1)",
                  },
                }}
                cursor="pointer"
                onClick={() => handleOnPlay(song)}
                key={song.id}
              >
                <Td>{index + 1}</Td>
                <Td>{song.name}</Td>
                <Td>{formatDate(song.createdAt)}</Td>
                <Td>{formatTime(song.duration)}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </Box>
  );
};

export default SongsTable;
