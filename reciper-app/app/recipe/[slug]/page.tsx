"use client";
import {
  Badge,
  Box,
  Button,
  HStack,
  Heading,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Text,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const RecipeDetails = ({ params }: { params: { slug: string } }) => {
  const [currentRecipe, setCurrentRecipe] = useState();

  const [currentImage, setCurrentImage] = useState("");
  const [currentComments, setCurrentComments] = useState<any[]>([]);
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(5);

  const router = useRouter();

  const handleSubmit = () => {
    try {
      axios
        .post(`http://localhost:8080/recipes/${params.slug}/comments`, {
          comment: review,
          rating,
        })
        .then((response) => {
          setCurrentComments((prev) => [...prev, { comment: review, rating }])
        });
    } catch (e) {
      console.error(e);
    }
  };

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
        .get(`http://localhost:8080/recipes/${params.slug}`, {})
        .then((response) => {
          getImage(response.data.image);
          setCurrentRecipe(response.data);
        });

      axios
        .get(`http://localhost:8080/recipes/${params.slug}/comments`, {})
        .then((response) => {
          setCurrentComments(response.data);
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
        onClick={() => router.push("/")}
      >
        <Text fontSize="4xl" fontFamily="cursive">
          Reciper
        </Text>
      </Box>
      <VStack pb={5} spacing={4}>
        <Heading>{currentRecipe?.name}</Heading>
        {currentImage && (
          <Image width={540} height={50} alt="img" src={currentImage} />
        )}
        <Heading size={"md"}>Ingredients</Heading>
        <Text>{currentRecipe?.ingredients.join(", ")}</Text>
        <Heading size={"md"}>Instructions</Heading>
        <Text>{currentRecipe?.instructions}</Text>

        <Box>
          <Heading textAlign={"center"} mb={2} size={"md"}>
            User comments
          </Heading>
          {currentComments &&
            currentComments?.map((c) => (
              <HStack key={c.id}>
                <Badge colorScheme="yellow">{c.rating} ⭐️</Badge>
                <Text>{c.comment}</Text>
              </HStack>
            ))}
        </Box>

        <Box>
          <Heading textAlign={"center"} mb={2} size={"md"}>
            Leave a review
          </Heading>
          <Text>{rating} ⭐️</Text>
          <Slider
            onChange={(value) => setRating(value)}
            aria-label="slider-ex-1"
            defaultValue={5}
            max={5}
          >
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb />
          </Slider>

          <Textarea
            value={review}
            onChange={(e) => setReview(e.target.value)}
            placeholder="Leave a comment here..."
          />
        </Box>
        <Button onClick={handleSubmit}>Submit</Button>
      </VStack>
    </div>
  );
};

export default RecipeDetails;
