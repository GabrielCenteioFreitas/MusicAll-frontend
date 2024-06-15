import { ArtistInfo } from "@/components/ArtistPage/ArtistInfo/ArtistInfo"
import { ArtistMain } from "@/components/ArtistPage/ArtistMain/ArtistMain"
import { getFavorites } from "@/lib/getFavoritesData"
import { getDataFromLookup } from "@/lib/getITunesData"
import { getPreviewPlaylists } from "@/lib/getPlaylistsData"
import { ITunesAlbum } from "@/types/album"
import { ITunesArtist } from "@/types/artist"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

const ArtistPage = async ({ params }: { params: { iTunesId: number } }) => {
  const { iTunesId } = params
  const { results, resultCount } = await getDataFromLookup({
    id: iTunesId,
    entity: 'album',
    limit: 201,
  })
  const artistData: ITunesArtist = results[0]
  if (!artistData) {
    return redirect('/')
  }
  const albumData: ITunesAlbum[] = results.slice(1, resultCount)
  
  const token = cookies().get('token')?.value
  const previewPlaylists = await getPreviewPlaylists(token || null)
  const favorites = await getFavorites(token || null)
  
  return (
    <div className="flex flex-col gap-4 p-5 pb-20 relative min-h-full">
      <ArtistInfo
        artist={artistData}
        albums={albumData}
      />

      <ArtistMain
        artist={artistData}
        albums={albumData}
        previewPlaylists={previewPlaylists}
        favoriteArtists={favorites?.favoriteArtists || null}
        favoriteAlbums={favorites?.favoriteAlbums || null}
      />
    </div>
  );
}

export default ArtistPage;