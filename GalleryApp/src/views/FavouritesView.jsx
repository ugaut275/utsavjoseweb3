/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import PaintingModal from "../components/PaintingModal"
const FavouritesView = () => {
  const [favouriteGalleries, setFavouriteGalleries] = useState([])
  const [favouriteArtists, setFavouriteArtists] = useState([])
  const [favouritePaintings, setFavouritePaintings] = useState([])
  const [favouriteGenres, setFavouriteGenres] = useState([])
  const [loading, setLoading] = useState(true)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [filterOption, setFilterOption] = useState("galleries")

  const [isModalOpen, setIsModalOpen] = useState(false);

  const closeModal = () => {
    setIsModalOpen(false);
  }

  const openModal=(painting)=>{
    return(
      <PaintingModal
      imageLink={`https://res.cloudinary.com/funwebdev/image/upload/w_150/art/paintings/square/${checkPaintId(painting.imageFileName)}.jpg`}
      painting={painting}
      isOpen={closeModal} />
    )
  }

  const checkPaintId = (paintingId) => {
    const idStr = String(paintingId);

    if (idStr.length === 7) {
      // Return first 6 characters if length is 7
      return idStr.substring(0, 6);
    } else if (idStr.length === 4) {
      return `00${idStr}`;
    } else if (idStr.length === 5) {
      return `0${idStr}`;
    } else {
      return idStr;
    }
  };
  useEffect(() => {
    const fetchAllFavourites = async () => {
      try {
        // Fetch Favourite Galleries
        const galleries = JSON.parse(localStorage.getItem("favourites")) || []
        if (galleries.length > 0) {
          const galleriesData = await Promise.all(
            galleries.map(async (galleryId) => {
              const response = await fetch(`http://34.172.61.40:8080/api/paintings/galleries/ref/${galleryId}`)
              const data = await response.json()
              return data[0]
            })
          )
          setFavouriteGalleries(galleriesData.filter(Boolean))
        }

        // Fetch Favourite Artists
        const artists = JSON.parse(localStorage.getItem("favouriteArtists")) || []
        if (artists.length > 0) {
          const artistsData = await Promise.all(
            artists.map(async (artistId) => {
              const response = await fetch(`http://34.172.61.40:8080/api/artists/ref/${artistId}`)
              const data = await response.json()
              return data
            })
          )
          setFavouriteArtists(artistsData.filter(Boolean))
        }

        // Fetch Favourite Paintings
        const paintings = JSON.parse(localStorage.getItem("favouritePaintings")) || []
        if (paintings.length > 0) {
          const paintingsData = await Promise.all(
            paintings.map(async (paintingId) => {
              const response = await fetch(`http://34.172.61.40:8080/api/paintings/ref/${paintingId}`)
              const data = await response.json()
              return data
            })
          )
          setFavouritePaintings(paintingsData.filter(Boolean))
        }

        // Fetch Favourite Genres
        const genres = JSON.parse(localStorage.getItem("favouriteGenres")) || []
        if (genres.length > 0) {
          const genresData = await Promise.all(
            genres.map(async (genreId) => {
              const response = await fetch(`http://34.172.61.40:8080/api/genres/ref/${genreId}`)
              const data = await response.json()
              return data
            })
          )
          setFavouriteGenres(genresData.filter(Boolean))
        }

      } catch (error) {
        console.error("Error fetching favourites:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchAllFavourites()
  }, [])

  const removeFromFavourites = (id, type) => {
    try {
      switch (type) {
        case 'galleries': {
          const updatedGalleries = favouriteGalleries
            .map(gallery => gallery.galleries.galleryId)
            .filter(galleryId => galleryId !== id)
          localStorage.setItem("favourites", JSON.stringify(updatedGalleries))
          setFavouriteGalleries(items => items.filter(gallery => gallery.galleries.galleryId !== id))
          break
        }

        case 'artists': {
          const updatedArtists = favouriteArtists
            .map(artist => artist.artistId)
            .filter(artistId => artistId !== id)
          localStorage.setItem("favouriteArtists", JSON.stringify(updatedArtists))
          setFavouriteArtists(items => items.filter(artist => artist.artistId !== id))
          break
        }
        case 'paintings': {
          const updatedPaintings = favouritePaintings
            .map(painting => painting.paintingId)
            .filter(paintingId => paintingId !== id)
          localStorage.setItem("favouritePaintings", JSON.stringify(updatedPaintings))
          setFavouritePaintings(items => items.filter(painting => painting.paintingId !== id))
          break
        }
        case 'genres': {
          const updatedGenres = favouriteGenres
            .map(genre => genre.genreId)
            .filter(genreId => genreId !== id)
          localStorage.setItem("favouriteGenres", JSON.stringify(updatedGenres))
          setFavouriteGenres(items => items.filter(genre => genre.genreId !== id))
          break
        }
      }
    } catch (error) {
      console.error("Error removing from favourites:", error)
    }
  }

  const renderContent = () => {
    switch (filterOption) {
      case 'galleries':
        return (
          <ul className="divide-y divide-double divide-yellow-400">
            {favouriteGalleries.map(gallery => (
              <li key={`gallery-${gallery.galleries?.galleryId}`} className="py-4 flex justify-between items-center">
                <div className="flex-1">
                  <Link
                    to={{ pathname: `/singlegallery/${gallery.galleries.galleryId}` }}
                    state={{ dataCollect: gallery }}
                    className="block">
                    <h2 className="text-lg font-medium text-gray-800 hover:text-gray-600 transition duration-300">
                      {gallery.galleries?.galleryName || "Unknown Gallery"}
                    </h2>
                  </Link>
                  <p className="text-sm text-gray-600 mt-1">
                    {gallery.galleries?.galleryCity}, {gallery.galleries?.galleryCountry}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <Link
                    to={{ pathname: `/singlegallery/${gallery.galleries?.galleryId}` }}
                    state={{ dataCollect: gallery }}
                    className="text-sm bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded transition-colors">
                    View
                  </Link>
                  <button
                    onClick={() => removeFromFavourites(gallery.galleries?.galleryId, 'galleries')}
                    className="hover:text-red-500 hover:cursor-pointer transition-colors duration-300 bg-gray-100 hover:bg-gray-300 px-3 py-1 rounded">
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )

      case 'artists':
        return (
          <ul className="divide-y divide-double divide-yellow-400">
            {favouriteArtists.map(artist => (
              <li key={`artist-${artist.artistId}`} className="py-4 flex justify-between items-center">
                <div className="flex-1">
                  <Link
                    to={{ pathname: `/ArtistDetails/${artist.artistId}` }}
                    state={{ data: artist }}
                    className="block">
                    <h2 className="text-lg font-medium text-gray-800 hover:text-gray-600 transition duration-300">
                      {artist.firstName} {artist.lastName}
                    </h2>
                  </Link>
                  <p className="text-sm text-gray-600 mt-1">
                    {artist.nationality}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <Link
                    to={{ pathname: `/ArtistDetails/${artist.artistId}` }}
                    state={{ data: artist }}
                    className="text-sm bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded transition-colors">
                    View
                  </Link>
                  <button
                    onClick={() => removeFromFavourites(artist.artistId, 'artists')}
                    className="hover:text-red-500 hover:cursor-pointer transition-colors duration-300 bg-gray-100 hover:bg-gray-300 px-3 py-1 rounded">
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )

      case 'paintings':
        return (
          <ul className="divide-y divide-double divide-yellow-400">
            {favouritePaintings.map(painting => (
              <li key={`painting-${painting.paintingId}`} className="py-4 flex justify-between items-center">
                <div className="flex-1">
                  <h2 className="text-lg font-medium text-gray-800">
                    {painting.title}
                  </h2>
                  <p className="text-sm text-gray-600 mt-1">
                    {painting.yearOfWork}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                <button
                    onClick={() => openModal(painting)}
                    className="hover:text-red-500 hover:cursor-pointer transition-colors duration-300 bg-gray-100 hover:bg-gray-300 px-3 py-1 rounded">
                    View
                  </button>
                  <button
                    onClick={() => removeFromFavourites(painting.paintingId, 'paintings')}
                    className="hover:text-red-500 hover:cursor-pointer transition-colors duration-300 bg-gray-100 hover:bg-gray-300 px-3 py-1 rounded">
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )

      case 'genres':
        return (
          <ul className="divide-y divide-double divide-yellow-400">
            {favouriteGenres.map(genre => (
              <li key={`genre-${genre.genreId}`} className="py-4 flex justify-between items-center">
                <div className="flex-1">
                  <Link
                    to={{ pathname: `/GenreDetails/${genre.genreId}` }}
                    state={{ data: genre }}
                    className="block">
                    <h2 className="text-lg font-medium text-gray-800 hover:text-gray-600 transition duration-300">
                      {genre.genreName}
                    </h2>
                  </Link>
                  <p className="text-sm text-gray-600 mt-1">
                    {genre.description}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <Link
                    to={{ pathname: `/GenreDetails/${genre.genreId}` }}
                    state={{ data: genre }}
                    className="text-sm bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded transition-colors">
                    View
                  </Link>
                  <button
                    onClick={() => removeFromFavourites(genre.genreId, 'genres')}
                    className="hover:text-red-500 hover:cursor-pointer transition-colors duration-300 bg-gray-100 hover:bg-gray-300 px-3 py-1 rounded">
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )
    }
  }

  if (loading) {
    return (     
      <div className="flex flex-col items-center justify-center min-h-64 mt-16">
        <div className="text-center mb-4">
          <div className="inline-block h-8 w-8 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
        <p className="text-lg text-gray-700">Loading...</p>
      </div>
    )
  }

  return (
    <div className="flex flex-row w-full">
      <div className=" sm:bg-gradient-to-br  from-white via-stone-100 to-stone-300 min-h-screen mt-10">
        <div className="hidden sm:flex w-20 bg-white/50 backdrop-blur-sm w-full flex-col items-center py-8 space-y-6">
          <Link to="/ArtistView" className="p-3 rounded-xl hover:bg-stone-200/50 transition-colors group">
            Artists
          </Link>
          <Link to="/gallery" className="p-3 rounded-xl hover:bg-stone-200/50 transition-colors group">
            Gallery
          </Link>
          <Link to="" className="p-3 rounded-xl hover:bg-stone-200/50 transition-colors group bg-stone-200/50">
            Favourites
          </Link>
          <Link to="/paintings" className="p-3 rounded-xl hover:bg-stone-200/50 transition-colors group">
            Paintings
          </Link>
          <Link to="/genre" className="p-3 rounded-xl hover:bg-stone-200/50 transition-colors group">
            Genres
          </Link>

        </div>
        <div className="sm:hidden relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="p-3 rounded-xl bg-stone-200/50 hover:bg-stone-300 transition-colors w-full text-left">
            ≡
          </button>
          {isDropdownOpen && (
            <div className="absolute rounded-lg mt-2 w-full z-10">
              <Link to="/ArtistView" className="block px-4 py-2 hover:text-blue-500">
                Artists
              </Link>
              <Link to="/gallery" className="block px-4 py-2 hover:text-blue-500">
                Gallery
              </Link>
              <Link to="" className="block px-4 py-2 hover:text-blue-500">
                Favourites
              </Link>
              <Link to="/paintings" className="block px-4 py-2 hover:text-blue-500">
                Paintings
              </Link>
              <Link to="/genres" className="block px-4 py-2 hover:text-blue-500">
                Genres
              </Link>

            </div>
          )}
        </div>
      </div>

      <div className="flex-grow flex flex-col p-8 mt-5 mr-10">
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800">Favourites</h1>
            <p className="text-gray-500">
              {filterOption === 'galleries' && `${favouriteGalleries.length}`}
              {filterOption === 'artists' && `${favouriteArtists.length}`}
              {filterOption === 'paintings' && `${favouritePaintings.length} `}
              {filterOption === 'genres' && `${favouriteGenres.length} `}
            </p>
          </div>

          <div className="flex justify-center mb-8">
            <div className="bg-gray-100 rounded-lg inline-flex p-1">
              <button
                className={`px-6 py-2 rounded-md transition ${filterOption === 'galleries' ? 'bg-white shadow-sm font-medium' : 'text-gray-600 hover:bg-gray-200'}`}
                onClick={() => setFilterOption('galleries')}>
                Galleries
              </button>
              <button
                className={`px-6 py-2 rounded-md transition ${filterOption === 'artists' ? 'bg-white shadow-sm font-medium' : 'text-gray-600 hover:bg-gray-200'}`}
                onClick={() => setFilterOption('artists')}>
                Artists
              </button>
              <button
                className={`px-6 py-2 rounded-md transition ${filterOption === 'paintings' ? 'bg-white shadow-sm font-medium' : 'text-gray-600 hover:bg-gray-200'}`}
                onClick={() => setFilterOption('paintings')}>
                Paintings
              </button>
              <button
                className={`px-6 py-2 rounded-md transition ${filterOption === 'genres' ? 'bg-white shadow-sm font-medium' : 'text-gray-600 hover:bg-gray-200'}`}
                onClick={() => setFilterOption('genres')}>
                Genres
              </button>
            </div>
          </div>

          {renderContent()}
        </div>
      </div>
    </div>
  )
}

export default FavouritesView