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
  const [eventTitle, setEventTitle] = useState('');
  const [eventSubtitle, setEventSubtitle] = useState('');
  const [battleType, setBattleType] = useState('');
  const [battleBgColor, setBattleBgColor] = useState('');
  const [battleBgImage, setBattleBgImage] = useState<string | null>(null);
  const [battleTeamAImage, setBattleTeamAImage] = useState<string | null>(null);
  const [battleTeamBImage, setBattleTeamBImage] = useState<string | null>(null);

  const handleStartBattle = (red: string, blue: string, judges: number, rounds: number, names: string[], eTitle: string, eSubtitle: string, bType: string, bgColor: string, bgImage: string | null, teamAImage: string | null, teamBImage: string | null) => {
    setRedSide(red);
    setBlueSide(blue);
    setNumJudges(judges);
    setNumRounds(rounds);
    setJudgeNames(names);
    setEventTitle(eTitle);
    setEventSubtitle(eSubtitle);
    setBattleType(bType);
    setBattleBgColor(bgColor);
    setBattleBgImage(bgImage);
    setBattleTeamAImage(teamAImage);
    setBattleTeamBImage(teamBImage);
    setBattleStarted(true);
  };

  const handleResetBattle = () => {
    setBattleStarted(false);
    setRedSide('');
    setBlueSide('');
    setNumJudges(3);
    setNumRounds(3);
    setJudgeNames([]);
    setEventTitle('');
    setEventSubtitle('');
    setBattleType('');
    setBattleBgColor('');
    setBattleBgImage(null);
    setBattleTeamAImage(null);
    setBattleTeamBImage(null);
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
          eventTitle={eventTitle}
          eventSubtitle={eventSubtitle}
          battleType={battleType}
          bgColor={battleBgColor}
          bgImage={battleBgImage}
          initialTeamAImage={battleTeamAImage}
          initialTeamBImage={battleTeamBImage}
        />
      )}
    </div>
  );
}
