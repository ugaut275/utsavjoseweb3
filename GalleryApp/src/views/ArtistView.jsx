import { useRef, useEffect, useState } from "react"
import { Link } from "react-router-dom"

// Recycled page from the GalleryView.... Logic is entirely the same

const ArtistView = () => {
    const [myArtists, setMyArtists] = useState([])
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)
    const [loading, setLoading] = useState(true)
    const [isDisabled, setIsDisabled] = useState(true)
    const myRef = useRef(null);

    useEffect(() => {
        const favouriteArtists = localStorage.getItem("favouriteArtists");
        if (favouriteArtists === null || favouriteArtists === '[]') {

            setIsDisabled(true);

        } else {

            setIsDisabled(false);

        }

    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("http://35.193.45.17:8080/api/artists")
                const data = await response.json()
                setMyArtists(data)
            } catch (error) {
                console.error("Error fetching data:", error)
            } finally {
                setLoading(false)
            }
        }
        fetchData()

    }, [])
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
            <div className="sm:bg-gradient-to-br from-gray-300 via-gray-100 to-stone-200 min-h-screen mt-10">
                <div className="hidden sm:flex min-h-full bg-white shadow-md rounded-r-lg flex-col py-6 space-y-2">
                    <Link
                        to=""
                        className="mx-4 px-4 py-3 rounded-lg hover:bg-stone-100 text-stone-700 opacity-50  transition-colors cursor-not-allowed">
                        Artists
                    </Link>
                    <Link
                        to="/gallery"
                        className="mx-4 px-4 py-3 rounded-lg text-slate-600 hover:bg-slate-100 hover:text-slate-800 transition-colors">
                        Gallery
                    </Link>
                    <Link
                        ref={myRef}
                        to="/favourites"
                        className={`mx-4 px-4 py-3 rounded-lg text-stone-600 hover:bg-stone-100 hover:text-stone-800 transition-colors ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}`} onClick={(e) => isDisabled && e.preventDefault()}>
                        Favourite Artits
                    </Link>
                    <Link
                        to="/paintings"
                        className="mx-4 px-4 py-3 rounded-lg text-slate-600 hover:bg-slate-100 hover:text-slate-800 transition-colors">
                        Paintings
                    </Link>
                    <Link
                        to="/genres"
                        className="mx-4 px-4 py-3 rounded-lg text-slate-600 hover:bg-slate-100 hover:text-slate-800 transition-colors">
                        Genres
                    </Link>
                </div>
                <div className="sm:hidden relative">
                    <button
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className="p-3 bg-white shadow-sm rounded-md hover:bg-slate-50 transition-colors w-full text-left flex items-center">
                        <span className="text-xl">≡</span>
                        <span className="ml-2 font-medium">Menu</span>
                    </button>
                    {isDropdownOpen && (
                        <div className="absolute rounded-lg mt-2 w-full z-10 bg-white shadow-lg border border-slate-100 overflow-hidden">
                            <Link to="" className="block px-4 py-3 hover:bg-stone-50  text-stone-200 opacity-50 font-medium">
                                Artists
                            </Link>
                            <Link to="/gallery" className="block px-4 py-3 hover:bg-stone-50 text-stone-600">
                                Gallery
                            </Link>
                            <Link ref={myRef}
                                to="/favourites" className={`block px-4 py-3 hover:bg-stone-50 text-slate-600 ${isDisabled?'opacity-50 cursor-not-allowed' : '' }`} onClick={(e) => isDisabled && e.preventDefault()}>
                                Favourites
                            </Link>
                            <Link to="/paintings" className="block px-4 py-3 hover:bg-stone-50 text-stone-600">
                                Paintings
                            </Link>
                            <Link to="/genres" className="block px-4 py-3 hover:bg-stone-100 text-stone-600">
                                Genres
                            </Link>
                        </div>
                    )}
                </div>
            </div>

            <div className="flex flex-col p-6 w-full mt-10">
                <h1 className="text-4xl font-extrabold text-slate-900 mb-8 text-center">Artists</h1>
                <div className=" rounded-lg  overflow-hidden">
                    <ul className="divide-y ">
                        {myArtists.map((artist) => (
                            <li key={`artist-${artist.artistId}-${artist.lastName}`}
                                className="border-b border-b-yellow-500 p-5 hover:bg-stone-50 transition-colors duration-200 ease-in-out">
                                <div className="flex justify-between items-center">
                                    <div>
                                        <p className="text-xl font-semibold text-slate-800">
                                            {artist.firstName} {artist.lastName}
                                        </p>
                                        <p className="text-slate-600 text-sm mt-1">
                                            {artist.nationality} | {artist.yearOfBirth} - {artist.yearOfDeath || "Present"}
                                        </p>
                                    </div>
                                    <Link
                                        to={{ pathname: `/ArtistDetails/${artist.artistId}` }}
                                        state={{ data: artist }}
                                        className="px-4 py-2 text-sm  hover:cursor-pointer text-indigo-600 rounded-md transition-colors duration-200 ease-in-out">
                                        Details
                                    </Link>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default ArtistView

