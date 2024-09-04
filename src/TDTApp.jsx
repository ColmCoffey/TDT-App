import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  VStack,
<<<<<<< HEAD
  Heading,
=======
  HStack,
>>>>>>> 2c343a9 (Revise UI)
  Text,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  List,
  ListItem,
<<<<<<< HEAD
  HStack,
  Circle,
=======
  Container,
  Heading,
  useColorModeValue,
>>>>>>> 2c343a9 (Revise UI)
} from '@chakra-ui/react';

const TDTApp = () => {
  const [showFirstDot, setShowFirstDot] = useState(false);
  const [showSecondDot, setShowSecondDot] = useState(false);
<<<<<<< HEAD
  const [trialState, setTrialState] = useState('ready'); // 'ready', 'running', 'response'
  const [results, setResults] = useState([]);

  // Timing state variables
  const [initialWait] = useState(2000);
  const [gapBetweenDots, setGapBetweenDots] = useState(50);
  const [dotDuration] = useState(20);
  const [postWait] = useState(2000);
=======
  const [trialState, setTrialState] = useState('ready');
  const [results, setResults] = useState([]);

  const [initialWait, setInitialWait] = useState(2000);
  const [gapBetweenDots, setGapBetweenDots] = useState(50);
  const [dotDuration, setDotDuration] = useState(20);
  const [postWait, setPostWait] = useState(2000);

  const bgColor = useColorModeValue('gray.50', 'gray.800');
  const dotColor = useColorModeValue('red.500', 'red.300');
>>>>>>> 2c343a9 (Revise UI)

  useEffect(() => {
    if (trialState !== 'running') return;

<<<<<<< HEAD
    const showFirstDot = () => {
=======
    console.log('Trial started');

    const showFirstDot = () => {
      console.log('Showing first dot');
>>>>>>> 2c343a9 (Revise UI)
      setShowFirstDot(true);
      setTimeout(() => setShowFirstDot(false), dotDuration);
    };

    const showSecondDot = () => {
<<<<<<< HEAD
=======
      console.log('Showing second dot');
>>>>>>> 2c343a9 (Revise UI)
      setShowSecondDot(true);
      setTimeout(() => setShowSecondDot(false), dotDuration);
    };

    const showResponseButtons = () => {
<<<<<<< HEAD
=======
      console.log('Showing response buttons');
>>>>>>> 2c343a9 (Revise UI)
      setTrialState('response');
    };

    const totalDuration = initialWait + gapBetweenDots + dotDuration + postWait;

    const timer1 = setTimeout(showFirstDot, initialWait);
    const timer2 = setTimeout(showSecondDot, initialWait + gapBetweenDots);
    const responseTimer = setTimeout(showResponseButtons, totalDuration);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(responseTimer);
    };
  }, [trialState, initialWait, gapBetweenDots, dotDuration, postWait]);

  const handleStart = () => {
    setTrialState('running');
  };

  const handleResponse = (response) => {
<<<<<<< HEAD
=======
    console.log('Response received:', response);
>>>>>>> 2c343a9 (Revise UI)
    const isCorrect = (gapBetweenDots === 0 && response === 'same') || 
                      (gapBetweenDots !== 0 && response === 'different');
    setResults([...results, { gapBetweenDots, response, isCorrect }]);
    setTrialState('ready');
  };

  return (
<<<<<<< HEAD
    <Box width="100%" maxWidth="500px" p={6} bg="white" borderRadius="md" boxShadow="md">
      <VStack spacing={6} align="stretch">
        {trialState === 'ready' && (
          <>
            <Button colorScheme="blue" onClick={handleStart}>
              Start Trial
            </Button>
            <VStack width="100%" align="stretch">
              <Text>Gap Between Dots: {gapBetweenDots}ms</Text>
              <Slider
                min={0}
                max={500}
                step={10}
                value={gapBetweenDots}
                onChange={(value) => setGapBetweenDots(value)}
=======
    <Container maxW="container.md" centerContent>
      <VStack spacing={8} align="stretch" w="full" minH="100vh" justify="center" bg={bgColor} p={8} borderRadius="lg">
        {trialState === 'ready' && (
          <>
            <Button colorScheme="blue" onClick={handleStart} size="lg">
              Start Trial
            </Button>
            <Box>
              <Text mb={2}>Gap Between Dots: {gapBetweenDots}ms</Text>
              <Slider
                aria-label="gap-between-dots"
                defaultValue={gapBetweenDots}
                min={0}
                max={500}
                step={10}
                onChange={(val) => setGapBetweenDots(val)}
>>>>>>> 2c343a9 (Revise UI)
              >
                <SliderTrack>
                  <SliderFilledTrack />
                </SliderTrack>
                <SliderThumb />
              </Slider>
<<<<<<< HEAD
            </VStack>
            {results.length > 0 && (
              <Box width="100%">
                <Heading size="md" mb={2}>Results:</Heading>
                <List spacing={2}>
                  {results.map((result, index) => (
                    <ListItem key={index}>
                      Gap: {result.gapBetweenDots}ms, Response: {result.response},
                      {' '}
                      <Text as="span" color={result.isCorrect ? "green.500" : "red.500"}>
                        {result.isCorrect ? 'Correct' : 'Incorrect'}
                      </Text>
=======
            </Box>
            {results.length > 0 && (
              <Box>
                <Heading size="md" mb={4}>Results:</Heading>
                <List spacing={3}>
                  {results.map((result, index) => (
                    <ListItem key={index}>
                      Gap: {result.gapBetweenDots}ms, Response: {result.response},
                      {result.isCorrect ? ' Correct' : ' Incorrect'}
>>>>>>> 2c343a9 (Revise UI)
                    </ListItem>
                  ))}
                </List>
              </Box>
            )}
          </>
        )}
        {trialState === 'running' && (
<<<<<<< HEAD
          <HStack justify="center" spacing={4}>
            <Circle size="50px" bg={showFirstDot ? "red.500" : "transparent"} transition="background-color 20ms" />
            <Circle size="50px" bg={showSecondDot ? "red.500" : "transparent"} transition="background-color 20ms" />
          </HStack>
        )}
        {trialState === 'response' && (
          <HStack justify="center" spacing={4}>
            <Button onClick={() => handleResponse('same')}>Same</Button>
            <Button onClick={() => handleResponse('different')}>Different</Button>
          </HStack>
        )}
      </VStack>
    </Box>
=======
          <HStack spacing={4} justify="center">
            <Box
              w="50px"
              h="50px"
              borderRadius="full"
              bg={showFirstDot ? dotColor : 'transparent'}
              transition="background-color 20ms"
            />
            <Box
              w="50px"
              h="50px"
              borderRadius="full"
              bg={showSecondDot ? dotColor : 'transparent'}
              transition="background-color 20ms"
            />
          </HStack>
        )}
        {trialState === 'response' && (
          <HStack spacing={4} justify="center">
            <Button colorScheme="green" onClick={() => handleResponse('same')}>Same</Button>
            <Button colorScheme="red" onClick={() => handleResponse('different')}>Different</Button>
          </HStack>
        )}
      </VStack>
    </Container>
>>>>>>> 2c343a9 (Revise UI)
  );
};

export default TDTApp;