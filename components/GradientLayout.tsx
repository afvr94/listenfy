import { Flex, Box, Text } from "@chakra-ui/layout";
import { Image } from "@chakra-ui/react";
import { FC, ReactNode } from "react";

const GradientLayout: FC<{
  color: string;
  children: ReactNode;
  image: string;
  title: string;
  subtitle: string;
  description: string;
  isRoundImage: boolean;
}> = ({
  color,
  children,
  image,
  title,
  subtitle,
  description,
  isRoundImage,
}) => {
  return (
    <Box
      height="100%"
      overflowY="auto"
      bgGradient={`linear(${color}.500 0%, ${color}.600 15%, ${color}.700 40%, rgba(0,0,0,0.95) 75%)`}
    >
      <Flex bg={`${color}.600`} padding="40px" align="end">
        <Box padding="20px">
          <Image
            src={image}
            boxSize="160px"
            boxShadow="2xl"
            borderRadius={isRoundImage ? "100%" : "3px"}
          />
        </Box>
        <Box padding="20px" lineHeight="40px" color="white">
          <Text fontSize="x-small" fontWeight="bold" casing="uppercase">
            {subtitle}
          </Text>
          <Text fontSize="6xl">{title}</Text>
          <Text fontSize="x-small">{description}</Text>
        </Box>
      </Flex>
      <Box paddingY="50px">{children}</Box>
    </Box>
  );
};

export default GradientLayout;
