import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';

const TwoDotsApp = () => {
  const [showFirstDot, setShowFirstDot] = useState(false);
  const [showSecondDot, setShowSecondDot] = useState(false);
  const [trialState, setTrialState] = useState('ready'); // 'ready', 'running', 'response'
  const [results, setResults] = useState([]);

  // Timing state variables
  const [initialWait, setInitialWait] = useState(2000);
  const [gapBetweenDots, setGapBetweenDots] = useState(50);
  const [dotDuration, setDotDuration] = useState(20);
  const [postWait, setPostWait] = useState(2000);

  useEffect(() => {
    if (trialState !== 'running') return;

    console.log('Trial started');

    const showFirstDot = () => {
      console.log('Showing first dot');
      setShowFirstDot(true);
      setTimeout(() => setShowFirstDot(false), dotDuration);
    };

    const showSecondDot = () => {
      console.log('Showing second dot');
      setShowSecondDot(true);
      setTimeout(() => setShowSecondDot(false), dotDuration);
    };

    const showResponseButtons = () => {
      console.log('Showing response buttons');
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
    console.log('Response received:', response);
    const isCorrect = (gapBetweenDots === 0 && response === 'same') || 
                      (gapBetweenDots !== 0 && response === 'different');
    setResults([...results, { gapBetweenDots, response, isCorrect }]);
    setTrialState('ready');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      {trialState === 'ready' && (
        <>
          <Button onClick={handleStart} className="mb-4">
            Start Trial
          </Button>
          <div className="w-64 space-y-4">
            <div>
              <label>Gap Between Dots (ms): {gapBetweenDots}</label>
              <Slider
                min={0}
                max={500}
                step={10}
                value={[gapBetweenDots]}
                onValueChange={(value) => setGapBetweenDots(value[0])}
              />
            </div>
          </div>
          {results.length > 0 && (
            <div className="mt-4">
              <h3>Results:</h3>
              <ul>
                {results.map((result, index) => (
                  <li key={index}>
                    Gap: {result.gapBetweenDots}ms, Response: {result.response}, 
                    {result.isCorrect ? ' Correct' : ' Incorrect'}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </>
      )}
      {trialState === 'running' && (
        <div className="flex space-x-4">
          <div 
            className={`w-8 h-8 rounded-full ${showFirstDot ? 'bg-red-500' : 'bg-transparent'} transition-opacity duration-20`}
          />
          <div 
            className={`w-8 h-8 rounded-full ${showSecondDot ? 'bg-red-500' : 'bg-transparent'} transition-opacity duration-20`}
          />
        </div>
      )}
      {trialState === 'response' && (
        <div className="space-x-4">
          <Button onClick={() => handleResponse('same')}>Same</Button>
          <Button onClick={() => handleResponse('different')}>Different</Button>
        </div>
      )}
    </div>
  );
};

export default TwoDotsApp;
