'use client';

import React, { useState } from 'react';

interface BattleSetupProps {
  onStartBattle: (
    redSide: string,
    blueSide: string,
    numJudges: number,
    numRounds: number,
    judgeNames: string[],
    eventTitle: string,
    eventSubtitle: string,
    battleType: string,
    bgColor: string,
    bgImage: string | null,
    teamAImage: string | null,
    teamBImage: string | null
  ) => void;
}

const BattleSetup: React.FC<BattleSetupProps> = ({ onStartBattle }) => {
  const [redSide, setRedSide] = useState('');
  const [blueSide, setBlueSide] = useState('');
  const [teamAImage, setTeamAImage] = useState<string | null>(null);
  const [teamBImage, setTeamBImage] = useState<string | null>(null);
  const [numJudges, setNumJudges] = useState(3);
  const [numRounds, setNumRounds] = useState(3);
  const [judgeNames, setJudgeNames] = useState<string[]>(['', '', '']);
  const [eventTitle, setEventTitle] = useState('LOCK STEADY PARTY');
  const [eventSubtitle, setEventSubtitle] = useState("ORIGINALITY 25TH X LOCK'N'LOL 20TH ANNIVERSARY");
  const [battleType, setBattleType] = useState('5:5 TEAM BATTLE');
  const [bgColor, setBgColor] = useState('#111827'); // Default gray-900
  const [bgImage, setBgImage] = useState<string | null>(null);

  const handleTeamAImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setTeamAImage(url);
    }
  };

  const handleTeamBImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setTeamBImage(url);
    }
  };

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

  const handleBgImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setBgImage(url);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (redSide && blueSide && numJudges > 0 && numRounds > 0 && eventTitle && battleType) {
      // Use "심사위원 N" as fallback if name is empty
      const finalJudgeNames = judgeNames.map((name, i) => name.trim() || `심사위원 ${i + 1}`);
      onStartBattle(redSide, blueSide, numJudges, numRounds, finalJudgeNames, eventTitle, eventSubtitle, battleType, bgColor, bgImage, teamAImage, teamBImage);
    } else {
      alert('모든 필드를 채워주세요.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4">
      <div className="flex flex-col items-center mb-10">
        <h2 className="text-3xl font-black text-white tracking-widest italic">
          DBS <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400">v1.0</span>
        </h2>
        <div className="h-0.5 w-24 bg-gradient-to-r from-transparent via-gray-600 to-transparent my-3"></div>
        <p className="text-[10px] md:text-xs text-gray-500 font-mono tracking-[0.3em] uppercase">
          © ArtGee. All rights reserved.
        </p>
      </div>
      <form onSubmit={handleSubmit} className="w-full max-w-2xl bg-gray-800 p-8 rounded-lg shadow-lg">
        
        {/* Event Info Section */}
        <div className="mb-8 border-b border-gray-700 pb-6">
          <h3 className="text-xl font-bold text-gray-300 mb-4">행사 정보</h3>
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label htmlFor="eventTitle" className="block text-sm font-semibold mb-1 text-gray-400">
                메인 행사명 (Main Title)
              </label>
              <input
                type="text"
                id="eventTitle"
                className="w-full p-3 rounded-md bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 text-lg"
                value={eventTitle}
                onChange={(e) => setEventTitle(e.target.value)}
                placeholder="예: LOCK STEADY PARTY"
                required
              />
            </div>
            <div>
              <label htmlFor="eventSubtitle" className="block text-sm font-semibold mb-1 text-gray-400">
                부제 / 기념 문구 (Subtitle)
              </label>
              <input
                type="text"
                id="eventSubtitle"
                className="w-full p-3 rounded-md bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 text-sm"
                value={eventSubtitle}
                onChange={(e) => setEventSubtitle(e.target.value)}
                placeholder="예: ORIGINALITY 25TH..."
              />
            </div>
            <div>
              <label htmlFor="battleType" className="block text-sm font-semibold mb-1 text-gray-400">
                배틀 타입 (Battle Type)
              </label>
              <input
                type="text"
                id="battleType"
                className="w-full p-3 rounded-md bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 text-sm"
                value={battleType}
                onChange={(e) => setBattleType(e.target.value)}
                placeholder="예: 5:5 TEAM BATTLE"
                required
              />
            </div>
          </div>
        </div>

        {/* Background Settings */}
        <div className="mb-8 border-b border-gray-700 pb-6">
          <h3 className="text-xl font-bold text-gray-300 mb-4">배경 설정</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="bgColor" className="block text-sm font-semibold mb-1 text-gray-400">
                배경 색상 (Background Color)
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="color"
                  id="bgColor"
                  className="h-10 w-10 p-0 border-0 rounded overflow-hidden cursor-pointer"
                  value={bgColor}
                  onChange={(e) => setBgColor(e.target.value)}
                />
                <span className="text-gray-400 text-sm">{bgColor}</span>
              </div>
            </div>
            <div>
              <label htmlFor="bgImage" className="block text-sm font-semibold mb-1 text-gray-400">
                배경 이미지 (Background Image)
              </label>
              <input
                type="file"
                id="bgImage"
                accept="image/*"
                className="w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-gray-700 file:text-white hover:file:bg-gray-600"
                onChange={handleBgImageChange}
              />
              {bgImage && <p className="text-xs text-green-400 mt-1">이미지 선택됨</p>}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-gray-700/50 p-4 rounded-lg">
              <label htmlFor="redSide" className="block text-xl font-semibold mb-2 text-red-400">
                레드 팀 (댄서/크루)
              </label>
              <input
                type="text"
                id="redSide"
                className="w-full p-3 rounded-md bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500 text-lg mb-3"
                value={redSide}
                onChange={(e) => setRedSide(e.target.value)}
                placeholder="레드 팀 이름"
                required
              />
              <label className="block text-sm font-semibold mb-1 text-gray-400">
                레드 팀 이미지
              </label>
              <input
                type="file"
                accept="image/*"
                className="w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-red-900/50 file:text-red-200 hover:file:bg-red-900/70"
                onChange={handleTeamAImageChange}
              />
              {teamAImage && <p className="text-xs text-red-400 mt-1">이미지 선택됨</p>}
            </div>

            <div className="bg-gray-700/50 p-4 rounded-lg">
              <label htmlFor="blueSide" className="block text-xl font-semibold mb-2 text-blue-400">
                블루 팀 (댄서/크루)
              </label>
              <input
                type="text"
                id="blueSide"
                className="w-full p-3 rounded-md bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg mb-3"
                value={blueSide}
                onChange={(e) => setBlueSide(e.target.value)}
                placeholder="블루 팀 이름"
                required
              />
              <label className="block text-sm font-semibold mb-1 text-gray-400">
                블루 팀 이미지
              </label>
              <input
                type="file"
                accept="image/*"
                className="w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-900/50 file:text-blue-200 hover:file:bg-blue-900/70"
                onChange={handleTeamBImageChange}
              />
              {teamBImage && <p className="text-xs text-blue-400 mt-1">이미지 선택됨</p>}
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
