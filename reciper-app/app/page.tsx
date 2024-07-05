// pages/index.tsx
"use client"
import { Box, Container, Input, Select, Stack, Text, IconButton, Grid, HStack, Flex } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { FilterContext, useFilterContext } from "@/context/FIlterContext";
import CardRecipe from "@/components/CardRecipe";

const Home = () => {
  const { cuisine, setCuisine, diet, setDiet, difficulty, setDifficulty } = useFilterContext()
  const [recipes, setRecipes] = useState<any[]>([]);

  const [cuisines, setCuisines] = useState<any[]>([]);
  const [difficulties, setDifficulties] = useState<any[]>([]);
  const [diets, setDiets] = useState<any[]>([]);

  const [searchText, setSearchText] = useState<string>("")

  useEffect(() => {
  //   // Fetch initial data for the dropdowns
    axios.get("http://localhost:8080/cuisines").then(response => {
      setCuisines(response.data);
    });

    axios.get("http://localhost:8080/difficulties").then(response => {
      setDifficulties(response.data);
    });
    
    axios.get("http://localhost:8080/diets").then(response => {
      setDiets(response.data);
    });
  
    // Fetch initial recipes data
    axios.get("http://localhost:8080/recipes").then(response => {
      setRecipes(response.data);
    });
  }, []);
  
  useEffect(() => {
    if (searchText.length) {

    axios.get("http://localhost:8080/recipes", { params: {q: searchText} }).then(response => {
      setRecipes(response.data);
    });
    } else {
      setRecipes([])
    }
  
  }, [searchText])
    console.log(recipes)
  

  return (
    <Container maxW="container.md" mt={10}>
      <Box as="header" mb={10} textAlign="center" top="0" bg="white" zIndex={1} py={4}>
        <Text fontSize="4xl" fontFamily="cursive">Reciper</Text>
      </Box>
      <Stack spacing={4} mb={5}>
        <HStack spacing={2}>
          <Input onChange={(e) => setSearchText(e.target.value)} placeholder="Search for recipes..." />
          <IconButton aria-label="Search recipes" icon={<SearchIcon />} />
        </HStack>
      </Stack>
        <HStack>
        <Select placeholder="Cuisine" value={cuisine} onChange={(e) => setCuisine(e.target.value)}>
          {cuisines.length && cuisines.map((e) => (
            <option key={e.id} value={e.name}>{e.name}</option>
          ))}
        </Select>
        <Select placeholder="Diet" value={diet} onChange={(e) => setDiet(e.target.value)}>
          {diets.length && diets.map((e) => (
            <option key={e.id} value={e.name}>{e.name}</option>
          ))}
        </Select>
        <Select placeholder="Difficulty" value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
          {difficulties.length && difficulties.map((e) => (
            <option key={e.id} value={e.name}>{e.name}</option>
          ))}
        </Select>
        </HStack>
      <Grid templateColumns="repeat(auto-fit, minmax(240px, 1fr))" gap={6}>
        {recipes.map(recipe => (
          <CardRecipe key={recipe.id} {...recipe} />
        ))}
      </Grid>
    </Container>
  );
};

export default Home;
