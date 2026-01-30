'use client';

import React, { useState } from 'react';
import BattleSetup from '../components/BattleSetup';
import BattleArena from '../components/BattleArena'; // Import BattleArena

export default function Home() {
  const [battleStarted, setBattleStarted] = useState(false);
  const [redSide, setRedSide] = useState('');
  const [blueSide, setBlueSide] = useState('');
  const [numJudges, setNumJudges] = useState(3);
  const [numRounds, setNumRounds] = useState(3);
  const [judgeNames, setJudgeNames] = useState<string[]>([]);

  const handleStartBattle = (red: string, blue: string, judges: number, rounds: number, names: string[]) => {
    setRedSide(red);
    setBlueSide(blue);
    setNumJudges(judges);
    setNumRounds(rounds);
    setJudgeNames(names);
    setBattleStarted(true);
  };

  const handleResetBattle = () => {
    setBattleStarted(false);
    setRedSide('');
    setBlueSide('');
    setNumJudges(3);
    setNumRounds(3);
    setJudgeNames([]);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {!battleStarted ? (
        <BattleSetup onStartBattle={handleStartBattle} />
      ) : (
        <BattleArena
          redSide={redSide}
          blueSide={blueSide}
          numJudges={numJudges}
          numRounds={numRounds}
          judgeNames={judgeNames}
          onResetBattle={handleResetBattle} // Pass the reset function
        />
      )}
    </div>
  );
}
