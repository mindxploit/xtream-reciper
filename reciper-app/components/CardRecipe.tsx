// components/CardRecipe.tsx
import { Box, Text, Badge, Stack, HStack, VStack } from "@chakra-ui/react";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { config } from "process";
import { useEffect, useState } from "react";

interface CardRecipeProps {
  id: string;
  name: string;
  ingredients: string[];
  difficulty: string;
  cuisine: string;
  diet: string;
  image: string;
}

const CardRecipe: React.FC<CardRecipeProps> = ({
  id,
  name,
  ingredients,
  difficulty,
  cuisine,
  diet,
  image,
}) => {
  const router = useRouter();
  const [currentImage, setCurrentImage] = useState("");

  const getImage = () => {
    try {
      axios
        .get(`http://localhost:8080${image}`, { responseType: "blob" })
        .then((response) => {
          setCurrentImage(URL.createObjectURL(response.data));
        });
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    getImage();
  }, []);

  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      p={4}
      onClick={() => router.push(`/recipe/${id}`)}
      cursor="pointer"
    >
      <Stack  spacing={2}>
          <Text fontWeight="bold" fontSize="xl">
            {name}
          </Text>
        <HStack alignItems={"flex-start"}>
        {currentImage && (
          <Image width={150} height={50} alt="img" src={currentImage} />
        )}
          <VStack mt={2} alignItems={"flex-start"} >
            <Badge colorScheme="gray">
              {difficulty} 💪🏻
            </Badge>
            <Badge colorScheme="gray">{cuisine}</Badge>
            <Badge colorScheme="gray">{diet}</Badge>
          </VStack>
        </HStack>
        <Text>{ingredients.join(", ")}</Text>
      </Stack>
    </Box>
  );
};

export default CardRecipe;
