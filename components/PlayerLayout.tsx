import { Box } from "@chakra-ui/layout";
import { FC, ReactNode } from "react";
import PlayerBar from "./PlayerBar";
import Sidebar from "./Sidebar";

const PlayerLayout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <Box width="100vw" height="100vh">
      <Box position="absolute" top="0" width="250px" left="0">
        <Sidebar />
      </Box>
      {/* Make sure that content is not render under side and bottom bar */}
      <Box marginLeft="250px" marginBottom="100" height="calc(100vh - 100px)">
        {children}
      </Box>
      <Box position="absolute" left="0" bottom="0">
        <PlayerBar />
      </Box>
    </Box>
  );
};

export default PlayerLayout;
