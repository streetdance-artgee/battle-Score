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
  logoImage: string | null;
  teamAImage: string | null;
  teamBImage: string | null;
  onLogoImageChange: (url: string) => void;
  onTeamAImageChange: (url: string) => void;
  onTeamBImageChange: (url: string) => void;
}

export function ScoreHeader({
  teamAName,
  teamBName,
  teamAScore,
  teamBScore,
  onTeamANameChange,
  onTeamBNameChange,
  winner,
  logoImage,
  teamAImage,
  teamBImage,
  onLogoImageChange,
  onTeamAImageChange,
  onTeamBImageChange,
}: ScoreHeaderProps) {
  const logoInputRef = useRef<HTMLInputElement>(null);
  const teamAInputRef = useRef<HTMLInputElement>(null);
  const teamBInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    callback: (url: string) => void
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      callback(url);
    }
  };
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
      {/* Orange to magenta gradient header background like poster */}
      <div className="bg-gradient-to-b from-orange-500 via-rose-600 to-fuchsia-800 px-4 py-6 relative">
        {/* Hidden file input for header image */}
        <input
          ref={logoInputRef}
          type="file"
          accept="image/*"
          onChange={(e) => handleImageUpload(e, onLogoImageChange)}
          className="hidden"
        />

        <div className="max-w-4xl mx-auto">
          {/* Header Image - Top Center (above title) */}
          <div className="flex justify-center mb-4">
            <button
              type="button"
              onClick={() => logoInputRef.current?.click()}
              className="w-full max-w-md h-20 md:h-28 bg-white/10 hover:bg-white/20 transition-colors flex items-center justify-center overflow-hidden rounded-xl border-2 border-dashed border-white/40"
            >
              {logoImage ? (
                <Image
                  src={logoImage || "/placeholder.svg"}
                  alt="Header Image"
                  width={400}
                  height={112}
                  className="w-full h-full object-contain"
                />
              ) : (
                <div className="flex items-center gap-2 text-white/60">
                  <ImagePlus className="w-6 h-6 md:w-8 md:h-8" />
                  <span className="text-sm md:text-base font-medium">Click to add header image</span>
                </div>
              )}
            </button>
          </div>

          {/* Anniversary subtitle */}
          <p className="text-center text-accent-yellow font-bold text-xs md:text-sm uppercase tracking-widest mb-2">
            ORIGINALITY 25TH X LOCK{"'"}N{"'"}LOL 20TH ANNIVERSARY
          </p>

          {/* Main Logo - LOCK STEADY with stripes */}
          <div className="text-center mb-4">
            <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tight text-white leading-none">
              <span className="relative inline-block">
                LOCK
                {/* Horizontal stripes effect */}
                <span className="absolute inset-0 flex flex-col justify-center pointer-events-none overflow-hidden">
                  {[...Array(4)].map((_, i) => (
                    <span
                      key={i}
                      className="h-[3px] md:h-[4px] bg-rose-600/80 w-full"
                      style={{ marginTop: i === 0 ? "8px" : "4px" }}
                    />
                  ))}
                </span>
              </span>
              <span className="text-white ml-2">STEADY</span>
              <span className="text-accent-yellow ml-2 font-black italic transform -rotate-6 inline-block text-3xl md:text-5xl">
                PARTY
              </span>
            </h1>
          </div>

          {/* 5:5 TEAM BATTLE subtitle */}
          <p className="text-center text-white/90 font-bold text-sm md:text-lg uppercase tracking-[0.4em] mb-6">
            5:5 TEAM BATTLE
          </p>
        </div>
      </div>

      {/* Hidden file inputs for team images */}
      <input
        ref={teamAInputRef}
        type="file"
        accept="image/*"
        onChange={(e) => handleImageUpload(e, onTeamAImageChange)}
        className="hidden"
      />
      <input
        ref={teamBInputRef}
        type="file"
        accept="image/*"
        onChange={(e) => handleImageUpload(e, onTeamBImageChange)}
        className="hidden"
      />

      {/* Score Section - Navy background matching poster bottom */}
      <div className="bg-card border-b-2 border-border px-4 py-6 relative">
        {/* Team A Image - Left Side */}
        <button
          type="button"
          onClick={() => teamAInputRef.current?.click()}
          className="absolute left-0 top-0 bottom-0 w-24 md:w-40 lg:w-52 bg-secondary/50 hover:bg-secondary/70 transition-colors flex items-center justify-center overflow-hidden"
        >
          {teamAImage ? (
            <Image
              src={teamAImage || "/placeholder.svg"}
              alt={teamAName}
              fill
              className="object-cover"
            />
          ) : (
            <div className="flex flex-col items-center gap-2 text-team-a/50">
              <ImagePlus className="w-8 h-8 md:w-12 md:h-12" />
              <span className="text-xs md:text-sm font-medium">Team A Image</span>
            </div>
          )}
        </button>

        {/* Team B Image - Right Side */}
        <button
          type="button"
          onClick={() => teamBInputRef.current?.click()}
          className="absolute right-0 top-0 bottom-0 w-24 md:w-40 lg:w-52 bg-secondary/50 hover:bg-secondary/70 transition-colors flex items-center justify-center overflow-hidden"
        >
          {teamBImage ? (
            <Image
              src={teamBImage || "/placeholder.svg"}
              alt={teamBName}
              fill
              className="object-cover"
            />
          ) : (
            <div className="flex flex-col items-center gap-2 text-team-b/50">
              <ImagePlus className="w-8 h-8 md:w-12 md:h-12" />
              <span className="text-xs md:text-sm font-medium">Team B Image</span>
            </div>
          )}
        </button>

        <div className="max-w-4xl mx-auto px-24 md:px-40 lg:px-52">
          <div className="flex items-center justify-center gap-4 md:gap-8">
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
                      className="bg-input border-2 border-team-a rounded-lg px-2 py-1 text-lg md:text-xl font-bold text-team-a text-center w-32 md:w-40 uppercase"
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
                    className="flex items-center gap-2 group"
                  >
                    <span className="text-lg md:text-2xl font-bold text-team-a uppercase tracking-wide">
                      {teamAName}
                    </span>
                    <Pencil className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                )}
              </div>
              <div
                className={cn(
                  "text-6xl md:text-8xl font-black transition-all duration-300",
                  leader === "A"
                    ? "text-team-a drop-shadow-[0_0_25px_rgba(251,146,60,0.8)]"
                    : "text-team-a/50"
                )}
              >
                {teamAScore}
              </div>
            </div>

            {/* VS Divider */}
            <div className="flex flex-col items-center">
              <span className="text-3xl md:text-5xl font-black text-white/40">
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
                      className="bg-input border-2 border-team-b rounded-lg px-2 py-1 text-lg md:text-xl font-bold text-team-b text-center w-32 md:w-40 uppercase"
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
                    className="flex items-center gap-2 group"
                  >
                    <span className="text-lg md:text-2xl font-bold text-team-b uppercase tracking-wide">
                      {teamBName}
                    </span>
                    <Pencil className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                )}
              </div>
              <div
                className={cn(
                  "text-6xl md:text-8xl font-black transition-all duration-300",
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