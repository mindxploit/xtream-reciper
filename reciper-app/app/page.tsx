// pages/index.tsx
"use client";
import {
  Box,
  Container,
  Input,
  Select,
  Stack,
  Text,
  IconButton,
  Grid,
  HStack,
  Flex,
  Button,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { useEffect, useState } from "react";
import axios from "axios";
import { useFilterContext } from "@/context/FIlterContext";
import CardRecipe from "@/components/CardRecipe";

const Home = () => {
  const { cuisine, setCuisine, diet, setDiet, difficulty, setDifficulty } =
    useFilterContext();
  const [recipes, setRecipes] = useState<any[]>([]);

  const [cuisines, setCuisines] = useState<any[]>([]);
  const [difficulties, setDifficulties] = useState<any[]>([]);
  const [diets, setDiets] = useState<any[]>([]);

  const [searchText, setSearchText] = useState<string>("");

  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    //   // Fetch initial data for the dropdowns
    axios.get("http://localhost:8080/cuisines").then((response) => {
      setCuisines(response.data);
    });

    axios.get("http://localhost:8080/difficulties").then((response) => {
      setDifficulties(response.data);
    });

    axios.get("http://localhost:8080/diets").then((response) => {
      setDiets(response.data);
    });

    // Fetch initial recipes data
    axios.get("http://localhost:8080/recipes").then((response) => {
      setRecipes(response.data);
    });
  }, []);

  useEffect(() => {
    try {
      axios
        .get("http://localhost:8080/recipes", {
          params: {
            q: searchText,
            cuisineId: cuisines?.find((e) => e.name === cuisine)?.id,
            dietId: diets?.find((e) => e.name === diet)?.id,
            difficultyId: difficulties?.find((e) => e.name === difficulty)?.id,
            _page: currentPage,
            _limit: 6,
          },
        })
        .then((response) => {
          response.data.length !== 0 ? setRecipes(response.data) : setCurrentPage(1);
        });
    } catch (e) {
      console.error(e);
    }
  }, [searchText, cuisine, diet, difficulty, currentPage, cuisines, diets, difficulties]);

  useEffect(() => {
    setCurrentPage(1);
  }, [cuisine, diet, difficulty]);

  return (
    <Box height={"100wh"}>
      <Container maxW="container.md">
        <Box
          as="header"
          mb={5}
          textAlign="center"
          top="0"
          bg="white"
          zIndex={1}
          py={4}
        >
          <Text fontSize="4xl" fontFamily="cursive">
            Reciper
          </Text>
        </Box>
        <Stack spacing={4} mb={3}>
          <HStack spacing={2}>
            <Input
              onChange={(e) => setSearchText(e.target.value)}
              placeholder="Search for recipes... 👨🏻‍🍳"
            />
            <IconButton aria-label="Search recipes" icon={<SearchIcon />} />
          </HStack>
        </Stack>
        <HStack mb={5}>
          <Select
            placeholder="Cuisine"
            value={cuisine}
            onChange={(e) => setCuisine(e.target.value)}
          >
            {cuisines.length &&
              cuisines.map((e) => (
                <option key={e.id} value={e.name}>
                  {e.name}
                </option>
              ))}
          </Select>
          <Select
            placeholder="Diet"
            value={diet}
            onChange={(e) => setDiet(e.target.value)}
          >
            {diets.length &&
              diets.map((e) => (
                <option key={e.id} value={e.name}>
                  {e.name}
                </option>
              ))}
          </Select>
          <Select
            placeholder="Difficulty"
            value={difficulty}
            onChange={(e) => {
              setDifficulty(e.target.value);
            }}
          >
            {difficulties.length &&
              difficulties.map((e) => (
                <option key={e.id} value={e.name}>
                  {e.name}
                </option>
              ))}
          </Select>
        </HStack>
        <Grid templateColumns="repeat(auto-fit, minmax(240px, 1fr))" gap={6}>
          {recipes.map((recipe) => (
            <CardRecipe
              key={recipe.id}
              {...recipe}
              cuisine={cuisines[recipe.cuisineId - 1]?.name}
              difficulty={difficulties[recipe.difficultyId - 1]?.name}
              diet={diets[recipe.dietId - 1]?.name}
            />
          ))}
        </Grid>
      </Container>

      <HStack
        background={"white"}
        borderTop={"1px solid purple"}
        position={"absolute"}
        pt={6}
        bottom={10}
        right={0}
        left={0}
        justifyContent={"center"}
        spacing={3}
      >
        <Button
          onClick={() => currentPage > 1 && setCurrentPage((prev) => prev - 1)}
        >
          {"<"}
        </Button>
        <Text>Page: {currentPage}</Text>
        <Button
          onClick={() =>
            recipes.length === 6 && setCurrentPage((prev) => prev + 1)
          }
        >
          {">"}
        </Button>
      </HStack>
    </Box>
  );
};

export default Home;
