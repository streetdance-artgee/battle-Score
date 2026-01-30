"use client";

import React from "react";
import { Pencil, Check, ImagePlus } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface ScoreHeaderProps {

  teamAName: string;

  teamBName: string;

  teamAScore: number;

  teamBScore: number;

  onTeamANameChange: (name: string) => void;

  onTeamBNameChange: (name: string) => void;

  winner: "A" | "B" | null;

  teamAImage: string | null;

  teamBImage: string | null;

  eventTitle: string;

  eventSubtitle: string;

  battleType: string;

  bgColor: string;

  bgImage: string | null;

}



export function ScoreHeader({

  teamAName,

  teamBName,

  teamAScore,

  teamBScore,

  onTeamANameChange,

  onTeamBNameChange,

  winner,

  teamAImage,

  teamBImage,

  eventTitle,

  eventSubtitle,

  battleType,

  bgColor,

  bgImage,

}: ScoreHeaderProps) {

  const [editingTeam, setEditingTeam] = useState<"A" | "B" | null>(null);

  const [tempName, setTempName] = useState("");

  const inputRef = useRef<HTMLInputElement>(null);



  useEffect(() => {

    if (editingTeam && inputRef.current) {

      inputRef.current.focus();

      inputRef.current.select();

    }

  }, [editingTeam]);



  const startEditing = (team: "A" | "B") => {

    setEditingTeam(team);

    setTempName(team === "A" ? teamAName : teamBName);

  };



  const saveEdit = () => {

    if (editingTeam === "A" && tempName.trim()) {

      onTeamANameChange(tempName.trim());

    } else if (editingTeam === "B" && tempName.trim()) {

      onTeamBNameChange(tempName.trim());

    }

    setEditingTeam(null);

    setTempName("");

  };



  const handleKeyDown = (e: React.KeyboardEvent) => {

    if (e.key === "Enter") {

      saveEdit();

    } else if (e.key === "Escape") {

      setEditingTeam(null);

      setTempName("");

    }

  };



  const leader =

    teamAScore > teamBScore ? "A" : teamBScore > teamAScore ? "B" : null;



  return (

    <header className="sticky top-0 z-10 overflow-hidden relative">

      {/* Dynamic background for header */}

      <div 

        className="px-4 py-6 relative"

        style={{

          backgroundColor: bgColor || 'transparent',

          backgroundImage: bgImage ? `url(${bgImage})` : 'none',

          backgroundSize: 'cover',

          backgroundPosition: 'center',

          backgroundRepeat: 'no-repeat'

        }}

      >

        {/* Overlay to ensure text readability if needed, or if no bg set, fallback to gradient? 

            For now, user controls it. If they want gradient, they can pick a color or we assume custom overrides.

            I will remove the default gradient classes since user is setting bg. 

        */}

        

        <div className="max-w-4xl mx-auto pt-4">

          {/* Anniversary subtitle */}

          <p className="text-center text-accent-yellow font-bold text-xs md:text-sm uppercase tracking-widest mb-2">

            {eventSubtitle}

          </p>



          {/* Main Logo */}

          <div className="text-center mb-4">

            <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tight text-white leading-none break-words">

              {eventTitle.split(' ').map((word, i, arr) => (

                <span key={i} className={`inline-block mr-2 ${i === arr.length - 1 ? 'text-accent-yellow italic transform -rotate-3' : ''}`}>

                  {word}

                  {/* Stripes effect on first word only for style */}

                  {i === 0 && (

                    <span className="absolute inset-0 flex flex-col justify-center pointer-events-none overflow-hidden opacity-50">

                      {[...Array(4)].map((_, j) => (

                        <span

                          key={j}

                          className="h-[3px] md:h-[4px] bg-rose-600/80 w-full"

                          style={{ marginTop: j === 0 ? "8px" : "4px" }}

                        />

                      ))}

                    </span>

                  )}

                </span>

              ))}

            </h1>

          </div>



          {/* 5:5 TEAM BATTLE subtitle */}

          <p className="text-center text-white/90 font-bold text-sm md:text-lg uppercase tracking-[0.4em] mb-6">

            {battleType}

          </p>

        </div>

      </div>



            {/* Score Section - Navy background matching poster bottom */}



            <div className="bg-card border-b-2 border-border px-4 py-6 flex items-center justify-between gap-2 md:gap-8">



              {/* Team A Image - Left Side */}



              <div



                className="relative aspect-[4/3] h-24 md:h-36 lg:h-44 bg-secondary/50 flex-shrink-0 flex items-center justify-center overflow-hidden rounded-lg shadow-inner border border-white/5"



              >



                {teamAImage ? (



                  <Image



                    src={teamAImage || "/placeholder.svg"}



                    alt={teamAName}



                    fill



                    className="object-cover"



                  />



                ) : (



                  <div className="flex flex-col items-center gap-1 text-team-a/50 p-2 text-center">



                    <ImagePlus className="w-6 h-6 md:w-10 md:h-10" />



                    <span className="text-[10px] md:text-sm font-medium leading-tight">Team A</span>



                  </div>



                )}



              </div>



      



              <div className="flex-1 flex justify-center min-w-0">



                <div className="flex items-center justify-center gap-2 md:gap-8 w-full max-w-5xl">



                  {/* Team A */}



                  <div className="flex-1 text-center">



                    <div className="flex items-center justify-center gap-2 mb-2">



                      {editingTeam === "A" ? (



                        <div className="flex items-center gap-2">



                          <input



                            ref={inputRef}



                            type="text"



                            value={tempName}



                            onChange={(e) => setTempName(e.target.value)}



                            onKeyDown={handleKeyDown}



                            onBlur={saveEdit}



                            className="bg-input border-2 border-team-a rounded-lg px-2 py-1 text-lg md:text-xl font-bold text-team-a text-center w-full min-w-[80px] max-w-[160px] uppercase"



                            maxLength={15}



                          />



                          <button



                            type="button"



                            onClick={saveEdit}



                            className="text-team-a hover:text-team-a/80"



                          >



                            <Check className="w-5 h-5" />



                          </button>



                        </div>



                      ) : (



                        <button



                          type="button"



                          onClick={() => startEditing("A")}



                          className="flex items-center gap-2 group justify-center"



                        >



                          <span className="text-lg md:text-3xl font-bold text-team-a uppercase tracking-wide truncate max-w-[150px] md:max-w-xs">



                            {teamAName}



                          </span>



                          <Pencil className="w-3 h-3 md:w-4 md:h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />



                        </button>



                      )}



                    </div>



                    <div



                      className={cn(



                        "text-5xl md:text-8xl font-black transition-all duration-300 leading-none",



                        leader === "A"



                          ? "text-team-a drop-shadow-[0_0_25px_rgba(251,146,60,0.8)]"



                          : "text-team-a/50"



                      )}



                    >



                      {teamAScore}



                    </div>



                  </div>



      



                  {/* VS Divider */}



                  <div className="flex flex-col items-center px-2">



                    <span className="text-2xl md:text-5xl font-black text-white/40 italic">



                      VS



                    </span>



                  </div>



      



                  {/* Team B */}



                  <div className="flex-1 text-center">



                    <div className="flex items-center justify-center gap-2 mb-2">



                      {editingTeam === "B" ? (



                        <div className="flex items-center gap-2">



                          <input



                            ref={inputRef}



                            type="text"



                            value={tempName}



                            onChange={(e) => setTempName(e.target.value)}



                            onKeyDown={handleKeyDown}



                            onBlur={saveEdit}



                            className="bg-input border-2 border-team-b rounded-lg px-2 py-1 text-lg md:text-xl font-bold text-team-b text-center w-full min-w-[80px] max-w-[160px] uppercase"



                            maxLength={15}



                          />



                          <button



                            type="button"



                            onClick={saveEdit}



                            className="text-team-b hover:text-team-b/80"



                          >



                            <Check className="w-5 h-5" />



                          </button>



                        </div>



                      ) : (



                        <button



                          type="button"



                          onClick={() => startEditing("B")}



                          className="flex items-center gap-2 group justify-center"



                        >



                          <span className="text-lg md:text-3xl font-bold text-team-b uppercase tracking-wide truncate max-w-[150px] md:max-w-xs">



                            {teamBName}



                          </span>



                          <Pencil className="w-3 h-3 md:w-4 md:h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />



                        </button>



                      )}



                    </div>



                    <div



                      className={cn(



                        "text-5xl md:text-8xl font-black transition-all duration-300 leading-none",



                        leader === "B"



                          ? "text-team-b drop-shadow-[0_0_25px_rgba(236,72,153,0.8)]"



                          : "text-team-b/50"



                      )}



                    >



                      {teamBScore}



                    </div>



                  </div>



                </div>



              </div>



      



              {/* Team B Image - Right Side */}



              <div



                className="relative aspect-[4/3] h-24 md:h-36 lg:h-44 bg-secondary/50 flex-shrink-0 flex items-center justify-center overflow-hidden rounded-lg shadow-inner border border-white/5"



              >



                {teamBImage ? (



                  <Image



                    src={teamBImage || "/placeholder.svg"}



                    alt={teamBName}



                    fill



                    className="object-cover"



                  />



                ) : (



                  <div className="flex flex-col items-center gap-1 text-team-b/50 p-2 text-center">



                    <ImagePlus className="w-6 h-6 md:w-10 md:h-10" />



                    <span className="text-[10px] md:text-sm font-medium leading-tight">Team B</span>



                  </div>



                )}



              </div>



            </div>

      {/* Winner Overlay - positioned over the score section */}
      {winner && (
        <div className="absolute inset-0 flex items-center justify-center z-20">
          <div
            className={`relative overflow-hidden py-6 px-8 rounded-2xl shadow-2xl ${
              winner === "A"
                ? "bg-gradient-to-r from-team-a via-orange-400 to-team-a"
                : "bg-gradient-to-r from-team-b via-pink-400 to-team-b"
            }`}
          >
            {/* Animated shine effect */}
            <div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-[shimmer_2s_infinite]"
              style={{ transform: "skewX(-20deg)" }}
            />

            <div className="relative flex items-center justify-center gap-4">
              <span className="text-4xl md:text-6xl">🏆</span>
              <div className="text-center">
                <p className="text-white font-black text-3xl md:text-5xl uppercase tracking-wider drop-shadow-lg">
                  {winner === "A" ? teamAName : teamBName}
                </p>
                <p className="text-white/90 font-bold text-xl md:text-3xl uppercase tracking-widest">
                  WINS THE BATTLE!
                </p>
              </div>
              <span className="text-4xl md:text-6xl">🏆</span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}