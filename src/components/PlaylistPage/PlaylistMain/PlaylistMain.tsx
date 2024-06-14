'use client'

import { FavoriteSong } from "@/types/favorites";
import { Playlist } from "@/types/playlist";
import { PreviewPlaylist } from "@/types/previewPlaylist";
import { ChangeEvent, useEffect, useState } from "react";
import { SearchInput } from "../../SearchInput";
import { DeletePlaylistButton } from "./DeletePlaylistButton";
import { EditPlaylistInfo } from "./EditPlaylistInfo";
import { PlayButton } from "./PlayButton";
import { SongsTable } from "./SongsTable/SongsTable";

interface PlaylistMainProps {
  playlist: Playlist;
  previewPlaylists: PreviewPlaylist[] | null;
  favoriteSongs: FavoriteSong[] | null;
  isUserTheCreator: boolean;
}

export const PlaylistMain = ({ playlist, previewPlaylists, favoriteSongs, isUserTheCreator }: PlaylistMainProps) => {
  const [search, setSearch] = useState('')
  
  useEffect(() => {
    const url = new URL(window.location.toString());
    const searchParam = url.searchParams.get('search') ?? '';
    setSearch(searchParam);
  }, []);

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    const search = event.target.value

    const url = new URL(window.location.toString())
    if (search !== '') {
      url.searchParams.set('search', search)
    } else {
      url.searchParams.delete('search');
    }
    window.history.pushState({}, "", url)

    setSearch(search)
  }

  const filteredSongs = search !== ''
    ? playlist.songs.filter(song => song.song.name.toLocaleLowerCase().includes(search.toLocaleLowerCase()))
    : playlist.songs

  return (
    <div className="flex flex-col gap-7">
      <div className="flex justify-between">
        <div className="flex gap-3 items-center">
          <PlayButton playlist={playlist} />

          {isUserTheCreator && (
            <div className="flex gap-2">
              <EditPlaylistInfo playlist={playlist} />

              <DeletePlaylistButton playlist={playlist} />
            </div>
          )}
        </div>

        <SearchInput search={search} handleSearch={handleSearch} />
      </div>

      <SongsTable
        playlist={playlist}
        songs={filteredSongs}
        favoriteSongs={favoriteSongs}
        previewPlaylists={previewPlaylists}
        isUserTheCreator={isUserTheCreator}
      />
    </div>
  );
}
