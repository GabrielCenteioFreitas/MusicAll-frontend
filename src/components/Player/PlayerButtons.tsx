import { usePlayer } from "@/hooks/usePlayer";
import { FaRepeat, FaShuffle } from "react-icons/fa6";
import { IoIosSkipBackward, IoIosSkipForward } from "react-icons/io";
import { IoPauseSharp, IoPlaySharp } from "react-icons/io5";
import { Button } from "../ui/button";
import { PlayerButton } from "./PlayerButton/index";

export const PlayerButtons = () => {
  const {
    playingSong, currentSound,
    isPlaying, setIsPlaying,
    playNextSong, playPrevSong,
    isRandomModeEnabled, setIsRandomModeEnabled,
    isLoopModeEnabled, setIsLoopModeEnabled,
  } = usePlayer()
  
  const handlePlayPauseClick = () => {
    if (isPlaying) {
      currentSound?.pause()
      setIsPlaying(false)
    } else {
      currentSound?.play()
      setIsPlaying(true)
    }
  }

  const handleNextSongClick = () => {
    currentSound?.stop()
    playNextSong()
  }

  const handlePrevSongClick = () => {
    currentSound?.stop()
    playPrevSong()
  }

  const handleToggleRandomModeClick = () => {
    setIsRandomModeEnabled(!isRandomModeEnabled)
  }

  const handleToggleLoopModeClick = () => {
    if (!playingSong) {
      return
    }
    
    setIsLoopModeEnabled(!isLoopModeEnabled)
  }

  return (
    <div className="flex justify-center gap-3">
      <PlayerButton.Root
        title={isRandomModeEnabled ? "Desativar modo aleatório" : "Ativar modo aleatório"}
        onClick={handleToggleRandomModeClick}
      >
        <PlayerButton.Icon
          icon={FaShuffle}
          className={isRandomModeEnabled ? "text-green-400 hover:text-green-700" : ""}
          size={20}
        />
      </PlayerButton.Root>

      <PlayerButton.Root
        title="Música anterior"
        onClick={handlePrevSongClick}
      >
        <PlayerButton.Icon icon={IoIosSkipBackward} />
      </PlayerButton.Root>

      <Button
        variant="secondary"
        size="none"
        className="rounded-full p-0 size-11 transition-colors"
        title="Ouvir playlist"
        onClick={handlePlayPauseClick}
      >
        {isPlaying ? (
          <IoPauseSharp className="size-6 text-zinc-50" />
        ) : (
          <IoPlaySharp className="-mr-1 size-6 text-zinc-50" />
        )}
      </Button>

      <PlayerButton.Root
        title="Próxima música"
        onClick={handleNextSongClick}
      >
        <PlayerButton.Icon icon={IoIosSkipForward}/>
      </PlayerButton.Root>

      <PlayerButton.Root
        title="Loop"
        onClick={handleToggleLoopModeClick}
      >
        <PlayerButton.Icon
          icon={FaRepeat}
          className={isLoopModeEnabled ? "text-green-400 hover:text-green-700" : ""}
          size={18}
        />
      </PlayerButton.Root>
    </div>
  );
}
