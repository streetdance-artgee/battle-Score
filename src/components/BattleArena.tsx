'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { ScoreHeader } from './ScoreHeader'; // ScoreHeader 컴포넌트 임포트

interface JudgeVote {
  [judgeId: number]: 'red' | 'blue' | 'tie' | null;
}

interface BattleArenaProps {
  redSide: string;
  blueSide: string;
  numJudges: number;
  numRounds: number;
  onResetBattle: () => void;
  judgeNames: string[];
}

const BattleArena: React.FC<BattleArenaProps> = ({ redSide, blueSide, numJudges, numRounds, onResetBattle, judgeNames }) => {
  const [currentRound, setCurrentRound] = useState(1);
  const [judgeVotes, setJudgeVotes] = useState<JudgeVote>({});
  const [redWins, setRedWins] = useState(0);
  const [blueWins, setBlueWins] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [logoImage, setLogoImage] = useState<string | null>(null);
  const [teamAImage, setTeamAImage] = useState<string | null>(null);
  const [teamBImage, setTeamBImage] = useState<string | null>(null);
  const [teamAName, setTeamAName] = useState(redSide);
  const [teamBName, setTeamBName] = useState(blueSide);

  const [roundWinner, setRoundWinner] = useState<'red' | 'blue' | 'tie' | null>(null);
  const [overallWinner, setOverallWinner] = useState<'red' | 'blue' | 'tie' | null>(null);

  useEffect(() => {
    // Initialize judge votes for the current round
    const initialVotes: JudgeVote = {};
    for (let i = 1; i <= numJudges; i++) {
      initialVotes[i] = null;
    }
    setJudgeVotes(initialVotes);
  }, [currentRound, numJudges]);

  // Update team names on prop change (e.g., battle reset)
  useEffect(() => {
    setTeamAName(redSide);
    setTeamBName(blueSide);
    setRedWins(0); // Reset scores on new battle
    setBlueWins(0); // Reset scores on new battle
    setOverallWinner(null); // Reset overall winner
    setCurrentRound(1); // Reset current round
    setShowResults(false); // Reset show results
  }, [redSide, blueSide, numJudges, numRounds]); // Depend on all battle setup props

  const handleJudgeVote = (judgeId: number, vote: 'red' | 'blue' | 'tie') => {
    setJudgeVotes((prevVotes) => {
      const newVotes = {
        ...prevVotes,
        [judgeId]: vote,
      };

      // Check if all judges have voted
      const allJudgesVoted = Object.keys(newVotes).length === numJudges && Object.values(newVotes).every((v) => v !== null);

      if (allJudgesVoted) {
        // Calculate result immediately
        let redVotes = 0;
        let blueVotes = 0;
        
        Object.values(newVotes).forEach((v) => {
           if (v === 'red') redVotes++;
           else if (v === 'blue') blueVotes++;
        });

        let winnerThisRound: 'red' | 'blue' | 'tie' = 'tie';
        if (redVotes > blueVotes) winnerThisRound = 'red';
        else if (blueVotes > redVotes) winnerThisRound = 'blue';

        setRoundWinner(winnerThisRound);
        setShowResults(true);
      }

      return newVotes;
    });
  };

  const calculateRoundResult = useCallback(() => {
    let redVotes = 0;
    let blueVotes = 0;
    let tieVotes = 0;

    Object.values(judgeVotes).forEach((vote) => {
      if (vote === 'red') redVotes++;
      else if (vote === 'blue') blueVotes++;
      else if (vote === 'tie') tieVotes++;
    });

    if (redVotes > blueVotes) {
      return 'red';
    } else if (blueVotes > redVotes) {
      return 'blue';
    } else {
      return 'tie';
    }
  }, [judgeVotes]);

  const isBattleOver = currentRound > numRounds || overallWinner !== null;

  const handleNextRound = useCallback(() => {
    // Calculate new total wins including this round
    let newRedWins = redWins;
    let newBlueWins = blueWins;
    
    if (roundWinner === 'red') newRedWins++;
    else if (roundWinner === 'blue') newBlueWins++;
    
    // Update win states
    setRedWins(newRedWins);
    setBlueWins(newBlueWins);

    // Check for Majority Win (Best of X)
    const majorityThreshold = Math.floor(numRounds / 2) + 1;

    if (newRedWins >= majorityThreshold) {
        setOverallWinner('red');
        // Do not increment currentRound if battle is over
    } else if (newBlueWins >= majorityThreshold) {
        setOverallWinner('blue');
    } else if (currentRound < numRounds) {
      setCurrentRound((prev) => prev + 1);
      setRoundWinner(null); // Reset for next round only if continuing
    } else {
      // Reached max rounds without majority (e.g. ties preventing early win, or just end of game)
      const finalWinner = newRedWins > newBlueWins ? 'red' : newBlueWins > newRedWins ? 'blue' : 'tie';
      setOverallWinner(finalWinner);
    }
    
    setShowResults(false);
  }, [redWins, blueWins, roundWinner, numRounds, currentRound]);

  // Auto-advance to next round after showing results
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    if (showResults && !isBattleOver) {
      timeoutId = setTimeout(() => {
        handleNextRound();
      }, 3000); // 3 seconds delay to view results
    }
    return () => clearTimeout(timeoutId);
  }, [showResults, isBattleOver, handleNextRound]);

  const toggleShowResults = () => {
    if (!showResults) {
      setRoundWinner(calculateRoundResult()); // 결과를 보여줄 때 계산
    }
    setShowResults(!showResults);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white">
      <ScoreHeader
        teamAName={teamAName}
        teamBName={teamBName}
        teamAScore={redWins}
        teamBScore={blueWins}
        onTeamANameChange={setTeamAName}
        onTeamBNameChange={setTeamBName}
        winner={overallWinner === 'red' ? 'A' : overallWinner === 'blue' ? 'B' : null}
        logoImage={logoImage}
        teamAImage={teamAImage}
        teamBImage={teamBImage}
        onLogoImageChange={setLogoImage}
        onTeamAImageChange={setTeamAImage}
        onTeamBImageChange={setTeamBImage}
      />

      <main className="flex-1 flex flex-col items-center justify-center p-4">
        {!isBattleOver && (
          <>
            <div className="text-center mb-8">
              <p className="text-4xl font-bold text-gray-300">ROUND {currentRound} / {numRounds}</p>
            </div>

            {!showResults && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                {Array.from({ length: numJudges }).map((_, i) => (
                  <div key={i} className="flex flex-col items-center p-4 bg-gray-800 rounded-lg shadow-md">
                    <p className="text-xl font-semibold mb-2">{judgeNames[i] || `JUDGE ${i + 1}`}</p>
                    <div className="flex gap-2">
                      <button
                        className={`px-4 py-2 rounded-md font-bold transition-colors duration-200 ${
                          judgeVotes[i + 1] === 'red' ? 'bg-red-600' : 'bg-gray-700 hover:bg-red-500'
                        }`}
                        onClick={() => handleJudgeVote(i + 1, 'red')}
                      >
                        RED
                      </button>
                      <button
                        className={`px-4 py-2 rounded-md font-bold transition-colors duration-200 ${
                          judgeVotes[i + 1] === 'tie' ? 'bg-yellow-600' : 'bg-gray-700 hover:bg-yellow-500'
                        }`}
                        onClick={() => handleJudgeVote(i + 1, 'tie')}
                      >
                        TIE
                      </button>
                      <button
                        className={`px-4 py-2 rounded-md font-bold transition-colors duration-200 ${
                          judgeVotes[i + 1] === 'blue' ? 'bg-blue-600' : 'bg-gray-700 hover:bg-blue-500'
                        }`}
                        onClick={() => handleJudgeVote(i + 1, 'blue')}
                      >
                        BLUE
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {showResults && (
              <div className="mb-8 p-6 bg-gray-800 rounded-lg shadow-lg w-full max-w-4xl">
                <h3 className="text-3xl font-bold mb-6 text-center">ROUND {currentRound} VOTING RESULTS</h3>
                <div className="grid grid-cols-3 md:grid-cols-5 gap-4 justify-items-center mb-6">
                  {Object.entries(judgeVotes).map(([judgeId, vote]) => (
                    <div key={judgeId} className="flex flex-col items-center p-4 bg-gray-700 rounded-lg w-full">
                      <span className="text-lg font-semibold mb-2">{judgeNames[Number(judgeId) - 1] || `JUDGE ${judgeId}`}</span>
                      {vote === 'red' && <div className="w-12 h-12 rounded-full bg-red-600 border-4 border-white shadow-lg"></div>}
                      {vote === 'blue' && <div className="w-12 h-12 rounded-full bg-blue-600 border-4 border-white shadow-lg"></div>}
                      {vote === 'tie' && <div className="w-12 h-12 rounded-full bg-yellow-500 border-4 border-white shadow-lg"></div>}
                      {!vote && <span className="text-gray-500">?</span>}
                      <span className="mt-2 font-bold uppercase text-sm">
                        {vote === 'red' ? 'RED' : vote === 'blue' ? 'BLUE' : vote === 'tie' ? 'TIE' : 'NO VOTE'}
                      </span>
                    </div>
                  ))}
                </div>
                
                <div className="text-center pt-4 border-t border-gray-600">
                  <p className="text-4xl font-extrabold">
                    라운드 승자: <span className={roundWinner === 'red' ? 'text-red-500' : roundWinner === 'blue' ? 'text-blue-500' : 'text-yellow-500'}>
                      {roundWinner === 'red' ? teamAName : roundWinner === 'blue' ? teamBName : 'TIE'}
                    </span>
                  </p>
                </div>
              </div>
            )}

            {!isBattleOver && showResults && (
              <div className="text-center mt-4 text-gray-400 animate-pulse">
                Proceeding to next round...
              </div>
            )}
          </>
        )}
        {isBattleOver && (
          <div className="text-center p-8 bg-gray-800 rounded-lg shadow-lg">
            <h3 className="text-5xl font-extrabold mb-4">BATTLE ENDED!</h3>
            <p className="text-4xl font-extrabold">Overall Winner:</p>
            <p className={`text-6xl font-extrabold ${overallWinner === 'red' ? 'text-red-500' : overallWinner === 'blue' ? 'text-blue-500' : 'text-yellow-500'}`}>
              {overallWinner === 'red' ? teamAName : overallWinner === 'blue' ? teamBName : 'TIE'}
            </p>
            <button
              className="mt-8 bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white font-bold py-3 px-6 rounded-md text-xl transform hover:scale-105 transition duration-300 ease-in-out shadow-lg"
              onClick={onResetBattle}
            >
              START NEW BATTLE
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default BattleArena;
