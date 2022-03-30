import { Flex, Box, Text } from "@chakra-ui/layout";

const PlayerBar = () => {
  return (
    <Box
      height="100px"
      width="100vw"
      bg="gray.900"
      padding="10px"
      color="white"
    >
      <Flex align="center">
        <Box padding="20px" width="30%">
          <Text fontSize="lg">Song name</Text>
          <Text fontSize="sm">Artist name</Text>
        </Box>
        <Box width="40%">Control</Box>
      </Flex>
    </Box>
  );
};

export default PlayerBar;
