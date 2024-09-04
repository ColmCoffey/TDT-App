import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  VStack,
  Heading,
  Text,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  List,
  ListItem,
  HStack,
  Circle,
} from '@chakra-ui/react';

const TDTApp = () => {
  const [showFirstDot, setShowFirstDot] = useState(false);
  const [showSecondDot, setShowSecondDot] = useState(false);
  const [trialState, setTrialState] = useState('ready'); // 'ready', 'running', 'response'
  const [results, setResults] = useState([]);

  // Timing state variables
  const [initialWait] = useState(2000);
  const [gapBetweenDots, setGapBetweenDots] = useState(50);
  const [dotDuration] = useState(20);
  const [postWait] = useState(2000);

  useEffect(() => {
    if (trialState !== 'running') return;

    const showFirstDot = () => {
      setShowFirstDot(true);
      setTimeout(() => setShowFirstDot(false), dotDuration);
    };

    const showSecondDot = () => {
      setShowSecondDot(true);
      setTimeout(() => setShowSecondDot(false), dotDuration);
    };

    const showResponseButtons = () => {
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
    const isCorrect = (gapBetweenDots === 0 && response === 'same') || 
                      (gapBetweenDots !== 0 && response === 'different');
    setResults([...results, { gapBetweenDots, response, isCorrect }]);
    setTrialState('ready');
  };

  return (
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
              >
                <SliderTrack>
                  <SliderFilledTrack />
                </SliderTrack>
                <SliderThumb />
              </Slider>
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
                    </ListItem>
                  ))}
                </List>
              </Box>
            )}
          </>
        )}
        {trialState === 'running' && (
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
  );
};

export default TDTApp;