"use client"
import { Badge, Box, HStack, Heading, Text, VStack } from '@chakra-ui/react';
import axios from 'axios';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const RecipeDetails = ({ params }: { params: { slug: string } }) => {
  const [currentRecipe, setCurrentRecipe] = useState()

  const [currentImage, setCurrentImage] = useState("");
  const [currentComments, setCurrentComments] = useState()

  const router = useRouter()

  const getImage = (imgUrl: string) => {
    try {
      axios
        .get(`http://localhost:8080${imgUrl}`, { responseType: "blob" })
        .then((response) => {
          setCurrentImage(URL.createObjectURL(response.data));
        });
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    try {
      axios
        .get(`http://localhost:8080/recipes/${params.slug}`, {
        })
        .then((response) => {
          getImage(response.data.image)
          setCurrentRecipe(response.data)
        });

        axios
        .get(`http://localhost:8080/recipes/${params.slug}/comments`, {
        })
        .then((response) => {
          setCurrentComments(response.data)
          console.log(response.data)
        });
    } catch (e) {
      console.error(e);
    }
  }, [params.slug]);

  return (
    <div>
      <Box
          as="header"
          mb={5}
          textAlign="center"
          top="0"
          bg="white"
          zIndex={1}
          py={4}
          cursor={"pointer"}
          onClick={() => router.push('/')}
        >
          <Text fontSize="4xl" fontFamily="cursive">
            Reciper
          </Text>
        </Box>
      <VStack spacing={4}>
        <Heading>{currentRecipe?.name}</Heading>
        {currentImage && (
          <Image width={540} height={50} alt="img" src={currentImage} />
        )}
        <Heading size={"md"}>Ingredients</Heading>
        <Text>{currentRecipe?.ingredients.join(", ")}</Text>
        <Heading size={"md"}>Instructions</Heading>
        <Text>{currentRecipe?.instructions}</Text>
        
        <Box>
          <Heading mb={2} size={"md"}>User comments</Heading>
          {currentComments && currentComments?.map((c) => (
            <HStack key={c.id}>
              <Badge colorScheme='yellow'>{c.rating} ⭐️</Badge>
              <Text>{c.comment}</Text>
            </HStack>
          ))}
        </Box>
      </VStack>
    </div>
  )
}

export default RecipeDetails