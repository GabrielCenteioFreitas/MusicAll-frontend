'use client'

import { usePlayer } from "@/hooks/usePlayer";
import { cn } from "@/lib/utils";
import { PlayingSong } from "@/types/song";
import { IoPauseSharp, IoPlaySharp } from "react-icons/io5";
import { Button } from "../ui/button";

interface SongCardPlayButtonProps {
  song: PlayingSong;
  groupSongs: PlayingSong[];
  songIndex: number;
  className?: string;
}

export const SongCardPlayButton = ({ song, groupSongs, songIndex, className }: SongCardPlayButtonProps) => {
  const { playingSong, setPlayingSong, currentSound, isPlaying, setIsPlaying, setNextSongs, addCurrentToPrev } = usePlayer()
  const isSongPlaying = song.song.id === playingSong?.song.id

  const handleClick = () => {
    if (isSongPlaying) {
      if (isPlaying) {
        currentSound?.pause()
        setIsPlaying(false)
      } else {
        setIsPlaying(true)
        currentSound?.play()
      }
    } else {
      currentSound?.stop()
      addCurrentToPrev()
      setPlayingSong(song)
      setNextSongs([
        ...groupSongs
          .slice(songIndex+1, groupSongs.length)
          .map(song => song),
        ...groupSongs
          .slice(0, songIndex)
          .map(song => song),
      ])
      setIsPlaying(true)
    }
  }

  const defaultPosition = 'bottom-12 group-hover:bottom-[68px] opacity-0 group-hover:opacity-100'
  const playingPosition = 'bottom-[68px] opacity-100'

  return (
    <Button
      variant="none"
      size="none"
      className={cn(`
        absolute right-4 transition-all duration-200
        size-11 bg-zinc-900 hover:bg-zinc-800 text-gray-50 rounded-full
      `, isSongPlaying ? playingPosition : defaultPosition,
      className)}
      title="Ouvir música"
      onClick={handleClick}
    >
      {isPlaying && isSongPlaying ? (
        <IoPauseSharp className="size-6"/>
      ) : (
        <IoPlaySharp className="size-5 -mr-1"/>
      )}
    </Button>
  );
}