// components/CardRecipe.tsx
import { Box, Text, Badge, Stack } from "@chakra-ui/react";
import { useRouter } from "next/navigation";

interface CardRecipeProps {
  id: string;
  name: string;
  ingredients: string[];
  rating: number;
  cuisine: string;
  diet: string;
  image: string;
}

const CardRecipe: React.FC<CardRecipeProps> = ({ id, name, ingredients, rating, cuisine, diet, image}) => {
  const router = useRouter();

  return (
    <Box borderWidth="1px" borderRadius="lg" overflow="hidden" p={4} onClick={() => router.push(`/recipe/${id}`)} cursor="pointer">
      <Stack spacing={2}>
        <Text fontWeight="bold" fontSize="xl">{name}</Text>
        <Text>{ingredients.join(", ")}</Text>
        <Badge colorScheme="purple">{rating} ⭐️</Badge>
        <Badge>{cuisine}</Badge>
        <Badge>{diet}</Badge>
        <Text>{image}</Text>
      </Stack>
    </Box>
  );
};

export default CardRecipe;
