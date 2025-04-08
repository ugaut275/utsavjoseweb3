import React, { useEffect, useState, useRef } from "react";
import { useLocation, useParams, Link } from "react-router-dom";
import notfavourite from "../assets/heart-empty.svg";
import SingleGenreCard from "./SingleGenreCard.jsx";

const SingleGenre = () => {
  const location = useLocation();
  const { genreId } = useParams();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [sortOption, setSortOption] = useState("title");
  const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);
  const favouriteGenres = JSON.parse(localStorage.getItem("favouriteGenres") || "[]");
  const [isFavourite, setFav] = useState(false);
  const myRef = useRef(null);
  const [isDisabled, setIsDisabled] = useState(false);


  // identical to single gallery


  useEffect(() => {
    const favourites = localStorage.getItem("favouriteGenres");
    if (favourites === null || favourites === "[]") {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
  }, []);

  useEffect(() => {
    if (favouriteGenres.includes(genreId)) {
      setFav(true);
    } else {
      setFav(false);
    }
  }, [genreId, favouriteGenres]);

  const addtoFavourites = (genreId) => {
    if (favouriteGenres.includes(genreId)) {
      const updatedFavourites = favouriteGenres.filter((id) => id !== genreId);
      localStorage.setItem("favouriteGenres", JSON.stringify(updatedFavourites));
      setFav(false);
      changeButtonState();
    } else {
      const updatedFavourites = [...favouriteGenres, genreId];
      localStorage.setItem("favouriteGenres", JSON.stringify(updatedFavourites));
      setFav(true);
      changeButtonState();
    }
  };

  const changeButtonState = () => {
    const favouriteArtists = localStorage.getItem("favouriteGenres");
    if (favouriteArtists === null || favouriteArtists === '[]') {

      setIsDisabled(true);

    } else {

      setIsDisabled(false);

    }

  }
  if (location.state?.data) {
    const { data } = location.state;

    return (
      <div className="flex flex-row w-full">
        <div className="sm:bg-gradient-to-br from-white via-stone-100 to-stone-300 min-h-screen mt-10">
          <div className="hidden sm:flex w-20 bg-white/50 backdrop-blur-sm w-full flex-col items-center py-8 space-y-6">
            <Link to="/ArtistView" className="p-3 rounded-xl hover:bg-stone-200/50 transition-colors group bg-stone-200/50">
              Artists
            </Link>
            <Link to="/gallery" className="p-3 rounded-xl hover:bg-stone-200/50 transition-colors group">
              Gallery
            </Link>
            <Link ref={myRef} to="/favourites" className={`p-3 rounded-xl hover:bg-stone-200/50 transition-colors group ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}`} onClick={(e) => isDisabled && e.preventDefault()}>
              Favourites
            </Link>
            <Link to="/paintings" className="block px-4 py-3 hover:bg-slate-50 text-slate-600">
              Paintings
            </Link>
            <Link to="/genres" className="block px-4 py-3 hover:bg-slate-50 text-slate-600">
              Genres
            </Link>
            <Link to="/about" className="block px-4 py-3 hover:bg-slate-50 text-slate-600">
              About
            </Link>

          </div>

          <div className="sm:hidden relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="p-3 rounded-xl bg-stone-200/50 hover:bg-stone-300 transition-colors w-full text-left">
              ≡
            </button>
          </div>
          {isDropdownOpen && (
            <div className="absolute rounded-lg mt-2 w-full z-10 bg-white shadow-lg border border-slate-100 overflow-hidden">
              <Link to="/ArtistView" className="block px-4 py-3 bg-slate-100 text-slate-800 font-medium">
                Artists
              </Link>
              <Link to="/gallery" className="block px-4 py-3 hover:bg-slate-50 text-slate-600">
                Gallery
              </Link>
              <Link ref={myRef}
                to="/favourites" className={`block px-4 py-3 hover:bg-slate-50 text-slate-600 ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}`} onClick={(e) => isDisabled && e.preventDefault()}>
                Favourites
              </Link>
              <Link to="/paintings" className="block px-4 py-3 hover:bg-slate-50 text-slate-600">
                Paintings
              </Link>
              <Link to="/genres" className="block px-4 py-3 hover:bg-slate-50 text-slate-600">
                Genres
              </Link>
              <Link to="/about" className="block px-4 py-3 hover:bg-slate-50 text-slate-600">
                About
              </Link>
            </div>
          )}
        </div>

        <div className="flex-grow flex flex-col p-8 mt-5 mr-10">
          <div className="flex flex-col max-w-full mr-0 w-full">
            <h1 className="text-3xl font-bold mr-10 self-center text-gray-800 mb-6">
              {data.firstName} {data.lastName}
            </h1>

            <div className="text-sm flex justify-between text-left text-gray-700 align-left space-y-1 mb-6 border-b-2 border-black-500 pb-4">
              <div className="flex flex-col gap-1">
                <p>
                  <span className="font-semibold">🎨</span> {data.genreName}
                </p>
                <Link to={data.artistLink} target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline">
                  🌐 Wikipedia
                </Link>
                <p className="">
                  <span className="font-semibold">ℹ️</span> {data.description}
                </p>
              </div>
              <div className="relative">
                <button
                  className={`flex hover:cursor-pointer gap-1 items-center ${isFavourite ? 'bg-red-100 hover:bg-red-200' : 'bg-gray-100 hover:bg-gray-200'} px-4 py-2 rounded-lg`}
                  onClick={() => addtoFavourites(genreId)}>
                  <img className="max-w-5 max-h-5" src={notfavourite} alt={isFavourite ? "Favorited" : "Add to Favorites"} />
                  <span>{isFavourite ? 'Favourited' : 'Favourite'}</span>
                </button>
              </div>
            </div>



            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Genre Paintings</h2>
              <div className="relative">
                <button
                  onClick={() => setIsSortDropdownOpen(!isSortDropdownOpen)}
                  className="flex items-center bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg">
                  Sort by: {sortOption === "title" ? "Painting Title" : "Year"}  {/* https://tailwindcss.com/plus/ui-blocks/application-ui/elements/dropdowns */}
                  <svg className="-mr-1 size-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                  </svg>
                </button>
                {isSortDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
                    <div className="py-1">
                      <button
                        onClick={() => {
                          setSortOption("title");
                          setIsSortDropdownOpen(false);
                        }}
                        className="block w-full text-left px-4 py-2 hover:bg-gray-100">
                        Painting Title
                      </button>
                      <button
                        onClick={() => {
                          setSortOption("year");
                          setIsSortDropdownOpen(false);
                        }}
                        className="block w-full text-left px-4 py-2 hover:bg-gray-100">
                        Year
                      </button>
                      <button
                        onClick={() => {
                          setSortOption("artistName");
                          setIsSortDropdownOpen(false);
                        }}
                        className="block w-full text-left px-4 py-2 hover:bg-gray-100">
                        Artist Name
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="flex flex-row gap-4 flex-wrap ml-10 sm:ml-45">
            <SingleGenreCard id={genreId} sortOption={sortOption} />
          </div>
        </div>
      </div>
    );
  }
};

export default SingleGenre;