import React, { useRef, useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import SingleGalleryCard from "./SingleGalleryCard";
import { Link } from "react-router-dom";
import notfavourite from "../assets/heart-empty.svg";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
const SingleGallery = () => {
  const location = useLocation();
  const { galleryId } = useParams();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [sortOption, setSortOption] = useState("title");
  const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);
  const favourites = JSON.parse(localStorage.getItem("favourites") || "[]");
  const [isFavourite, setFav] = useState();
  const myRef = useRef(null);
  const [isDisabled, setIsDisabled] = useState(false);



  useEffect(() => {    // see if favourites exists other wise initalize to empty array if nothing there then disable the favourites button link
    const favourites = localStorage.getItem("favourites");
    if (favourites === null || favourites === '[]') {

      setIsDisabled(true);

    } else {

      setIsDisabled(false);

    }

  }, []);
  useEffect(() => {
    if (favourites.includes(galleryId)) {
      setFav(true);
    }
    else {
      setFav(false);
    }
  }, [])


  const addtoFavourites = (galleryId) => {  // function checks if favourites exists if so update Local storage and button with new info other wise add new data to local storage


    if (favourites.includes(galleryId)) {
      const updatedFavourites = favourites.filter(id => id !== galleryId);
      localStorage.setItem("favourites", JSON.stringify(updatedFavourites));
      setFav(false);
      changeButtonState();
    } else {
      const updatedFavourites = [...favourites, galleryId];
      localStorage.setItem("favourites", JSON.stringify(updatedFavourites));
      setFav(true);
      changeButtonState();
    }
  }

  const changeButtonState = () => {     // function to call when add to favourites button is clicked... it disables the Link to the favourites page depending on the state of isFavourite
    const favouriteArtists = localStorage.getItem("favourites");
    if (favouriteArtists === null || favouriteArtists === '[]') {

      setIsDisabled(true);

    } else {

      setIsDisabled(false);

    }

  }

  if (location.state?.dataCollect) {  // if data exists
    const { dataCollect } = location.state;

    return (
      <div className="flex flex-row w-full">
        <div className="sm: bg-gradient-to-br from-white via-stone-100 to-stone-300 min-h-screen mt-10">
          <div className="hidden sm:flex w-20 bg-white/50 backdrop-blur-sm w-full flex-col items-center py-8 space-y-6">
            <Link to="/ArtistView" className="p-3 rounded-xl hover:bg-stone-200/50 transition-colors group"> {/* hidden until screen size atleast small*/}
              Artists
            </Link>
            <Link to="/gallery" className="p-3 rounded-xl hover:bg-stone-200/50 transition-colors group bg-stone-200/50">
              Gallery
            </Link>
            <Link ref={myRef} to="/favourites" className={`p-3 rounded-xl hover:bg-stone-200/50 transition-colors group ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}`} onClick={(e) => isDisabled && e.preventDefault()}>  {/* Check if disabled and update style, prevent default when clicked while isDisabled is true, otherwise work as usual */}
              Favourites
            </Link>
            <Link to="/paintings" className="p-3 rounded-xl hover:bg-stone-200/50 transition-colors group">
              Paintings
            </Link>
            <Link to="/genres" className="p-3 rounded-xl hover:bg-stone-200/50 transition-colors group">
              Genres
            </Link>
            <Link to="/about" className="p-3 rounded-xl hover:bg-stone-200/50 transition-colors group">
              About
            </Link>
          </div>
          <div className="sm:hidden relative"> {/* Hidden when screen size gets to small */}
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)} // open or close dropdown menu by updating state
              className="p-3 rounded-xl bg-stone-200/50 hover:bg-stone-300 transition-colors w-full text-left">
              ≡
            </button>
            {isDropdownOpen && (  // if dropdown is open display this 
              <div className="absolute rounded-lg mt-2 w-full z-10">
                <Link to="/ArtistView" className="block px-4 py-2 hover:text-blue-500">
                  Artists
                </Link>
                <Link to="/gallery" className="block px-4 py-2 hover:text-blue-500">
                  Gallery
                </Link>
                <Link ref={myRef} to={`/favourites" className="block px-4 py-2 hover:text-blue-500 ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}`} onClick={(e) => isDisabled && e.preventDefault()}>
                  Favourites
                </Link>
                <Link to="/paintings" className="block px-4 py-2 hover:text-blue-500">
                  Paintings
                </Link>
                <Link to="/genres" className="block px-4 py-2 hover:text-blue-500">
                  Genres
                </Link>
                <Link to="" className="block px-4 py-2 hover:text-blue-500">
                  About
                </Link>
              </div>
            )}
          </div>
        </div>

        <div className="flex-grow flex flex-col p-8 mt-5 mr-10">   {/* simple flex column*/}
          <div className="flex flex-col max-w-full mr-0 w-full">
            <h1 className="text-3xl font-bold mr-10 self-center text-gray-800 mb-6">
              {dataCollect.galleryName}
            </h1>

            <div className="text-sm flex justify-between text-left text-gray-700 align-left space-y-1 mb-6 border-b-2 border-black-500 pb-4">
              <div>
                <p>
                  <span className="font-semibold">🏛️</span> {dataCollect.galleryNativeName}
                </p>
                <p>
                  <span className="font-semibold">🗺️</span> {dataCollect.galleryCity}, {dataCollect.galleryCountry}
                </p>
                <a
                  href={dataCollect.galleryWebSite}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline">
                  🌐 Visit Website
                </a>
              </div>
              <div className="relative">
                {/* if gallery is favourites bg is red other wise its gray*/}
                {isFavourite ? (   
                  <button  className="flex hover:cursor-pointer gap-1 items-center bg-red-100 hover:bg-red-200 px-4 py-2 rounded-lg"
                    onClick={() => addtoFavourites(galleryId)}>
                    <img className="max-w-5 max-h-5" src={notfavourite} alt="Favorited" />
                    <span>Favourited</span>
                  </button>
                ) : (
                  <button className="flex hover:cursor-pointer gap-1 items-center bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg"
                    onClick={() => addtoFavourites(galleryId)}>
                    <img className="max-w-5 max-h-5" src={notfavourite} alt="Add to Favorites" />
                    <span>Favourite</span>
                  </button>
                )}


              </div>
            </div>

            {/* Map Container: couldnt get this to work how i wanted without chatgpt, query included in the link  */}
            <div className="w-full h-[400px] relative bg-gray-200 rounded-lg mb-6 overflow-hidden">
              <MapContainer
                center={[dataCollect.latitude, dataCollect.longitude]}
                zoom={13}
                scrollWheelZoom={false}
                style={{ height: '100%', width: '100%' }}
                className="z-0 rounded-lg"
                >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={[dataCollect.latitude, dataCollect.longitude]}>
                  <Popup>
                    <div className="text-sm">
                      <p className="font-semibold">{dataCollect.galleryName}</p>
                      <p>{dataCollect.galleryCity}, {dataCollect.galleryCountry}</p>
                    </div>
                  </Popup>
                </Marker>
              </MapContainer>
            </div>

                  {/* Sort dropdown source attached in about displays a different value based on which of the options was selected */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Gallery Collection</h2>
              <div className="relative">  {/* https://tailwindcss.com/plus/ui-blocks/application-ui/elements/dropdowns */}
                <button onClick={() => setIsSortDropdownOpen(!isSortDropdownOpen)}
                  className="flex items-center bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg">   
                  Sort by: {sortOption === "title" ? "Painting Title" :   
                    sortOption === "artistName" ? "Artist Name" :
                      "Year"}
                  <svg className="-mr-1 size-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon">
                    <path fillRule="evenodd" d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                  </svg>
                </button>
                {/* if the state is set to yes which is handled by the button above open the sort function changing the state here causes a re render of the single gallery card  */}
                {isSortDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
                    <div className="py-1">
                      <button
                        onClick={() => {
                          setSortOption("artistName");
                          setIsSortDropdownOpen(false);
                        }}
                        className="block w-full text-left px-4 py-2 hover:bg-gray-100">
                        Artist Name
                      </button>
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
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="flex flex-row gap-4 flex-wrap ml-10 sm:ml-45">
            <SingleGalleryCard id={galleryId} sortOption={sortOption} />
          </div>
        </div>
      </div>
    );
  }
};

export default SingleGallery;