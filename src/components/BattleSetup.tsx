'use client';

import React, { useState } from 'react';

interface BattleSetupProps {
  onStartBattle: (redSide: string, blueSide: string, numJudges: number, numRounds: number, judgeNames: string[]) => void;
}

const BattleSetup: React.FC<BattleSetupProps> = ({ onStartBattle }) => {
  const [redSide, setRedSide] = useState('');
  const [blueSide, setBlueSide] = useState('');
  const [numJudges, setNumJudges] = useState(3);
  const [numRounds, setNumRounds] = useState(3);
  const [judgeNames, setJudgeNames] = useState<string[]>(['', '', '']);

  // Update judgeNames array size when numJudges changes
  const handleNumJudgesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const count = Number(e.target.value);
    setNumJudges(count);
    setJudgeNames((prev) => {
      const newNames = [...prev];
      if (count > prev.length) {
        return [...prev, ...Array(count - prev.length).fill('')];
      }
      return newNames.slice(0, count);
    });
  };

  const handleJudgeNameChange = (index: number, name: string) => {
    const newNames = [...judgeNames];
    newNames[index] = name;
    setJudgeNames(newNames);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (redSide && blueSide && numJudges > 0 && numRounds > 0) {
      // Use "심사위원 N" as fallback if name is empty
      const finalJudgeNames = judgeNames.map((name, i) => name.trim() || `심사위원 ${i + 1}`);
      onStartBattle(redSide, blueSide, numJudges, numRounds, finalJudgeNames);
    } else {
      alert('모든 필드를 채워주세요.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4">
      <h2 className="text-xl md:text-2xl font-extrabold mb-8 text-white text-center">
        DBS v1.0 © ArtGee. All rights reserved.
      </h2>
      <form onSubmit={handleSubmit} className="w-full max-w-2xl bg-gray-800 p-8 rounded-lg shadow-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label htmlFor="redSide" className="block text-xl font-semibold mb-2 text-red-400">
                레드 팀 (댄서/크루)
              </label>
              <input
                type="text"
                id="redSide"
                className="w-full p-3 rounded-md bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500 text-lg"
                value={redSide}
                onChange={(e) => setRedSide(e.target.value)}
                placeholder="레드 팀 이름"
                required
              />
            </div>

            <div>
              <label htmlFor="blueSide" className="block text-xl font-semibold mb-2 text-blue-400">
                블루 팀 (댄서/크루)
              </label>
              <input
                type="text"
                id="blueSide"
                className="w-full p-3 rounded-md bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
                value={blueSide}
                onChange={(e) => setBlueSide(e.target.value)}
                placeholder="블루 팀 이름"
                required
              />
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label htmlFor="numJudges" className="block text-xl font-semibold mb-2 text-gray-300">
                심사위원 수
              </label>
              <input
                type="number"
                id="numJudges"
                className="w-full p-3 rounded-md bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 text-lg"
                value={numJudges}
                onChange={handleNumJudgesChange}
                min="1"
                max="9"
                required
              />
            </div>

            <div>
              <label htmlFor="numRounds" className="block text-xl font-semibold mb-2 text-gray-300">
                총 라운드 수
              </label>
              <input
                type="number"
                id="numRounds"
                className="w-full p-3 rounded-md bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 text-lg"
                value={numRounds}
                onChange={(e) => setNumRounds(Number(e.target.value))}
                min="1"
                max="10"
                required
              />
            </div>
        </div>

        <div className="mb-8">
            <label className="block text-xl font-semibold mb-4 text-gray-300">
                심사위원 이름
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {judgeNames.map((name, index) => (
                    <input
                        key={index}
                        type="text"
                        className="p-2 rounded-md bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
                        value={name}
                        onChange={(e) => handleJudgeNameChange(index, e.target.value)}
                        placeholder={`심사위원 ${index + 1}`}
                    />
                ))}
            </div>
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold py-4 px-6 rounded-md text-2xl transform hover:scale-105 transition duration-300 ease-in-out shadow-lg"
        >
          배틀 시작
        </button>
      </form>
    </div>
  );
};

export default BattleSetup;
