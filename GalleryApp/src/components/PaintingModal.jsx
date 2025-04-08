import React, { useEffect } from 'react';
import notfavourite from '../assets/heart-empty.svg'
import { useState } from 'react';
import { Link } from 'react-router-dom';



//https://flowbite.com/docs/components/modal/   Design and code from here 
//https://dribbble.com/search/modal

const PaintingModal = ({ imageLink, painting, isOpen,}) => {
  const favouritePaintings = JSON.parse(localStorage.getItem("favouritePaintings") || "[]"); // Get the favourite paintings from local storage or initialize it as an empty array
    const [isFavourite, setFav] = useState(false);



  const addtoFavourites = (paintingId) => {   // Function to add or remove a painting from favourites also updates the state that effects the favourite buttons css
    if (favouritePaintings.includes(paintingId)) {
      console.log("bofa");
        const updatedFavourites = favouritePaintings.filter(id => id !== paintingId);
        localStorage.setItem("favouritePaintings", JSON.stringify(updatedFavourites));
        setFav(false);

    } else {
        const updatedFavourites = [...favouritePaintings, paintingId];
       
        localStorage.setItem("favouritePaintings", JSON.stringify(updatedFavourites));
        setFav(true);

    }
};

  useEffect(()=>{  // check favourite status on load 
   
    if(favouritePaintings.includes(painting.paintingId)){
      setFav(true); 
    }
    else{
      setFav(false)
    }

  },[])
  return (
    // code and deisgn from the URLs above
    <div className="fixed inset-0 flex items-center justify-center bg-transparent bg-blur backdrop-blur bg-opacity-50">
    <div className="relative w-full max-w-2xl p-1 bg-yellow-400 ">
    <div className="bg-black rounded-lg shadow-lg overflow-hidden max-h-[80vh] overflow-y-auto">
        <div className="flex items-center justify-between p-4 border-b rounded-t dark:border-gray-700">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{painting.title}</h3>
          <button
            onClick={() => isOpen(false)}
            className="hover:cursor-pointer text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center dark:hover:bg-gray-700 dark:hover:text-white">
            ✖
          </button>
        </div>

        <div className="p-6 overflow-y-auto">
          <div className="flex flex-col gap-8">
            <div className="flex flex-col">
              <img src={imageLink} alt={painting.title} className="w-full object-contain rounded-3xl border border-yellow-400 shadow-md"/>
              <div className="mt-4 flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-1 bg-purple-500 rounded-full"></div>
                  <h4 className="text-white text-lg font-bold">
                    {painting.artists?.firstName} {painting.artists?.lastName}
                  </h4>
                </div>

                <button className={`flex hover:cursor-pointer gap-1 items-center ${isFavourite ? "bg-pink-600 hover:bg-pink-700" : "bg-gray-800 hover:bg-gray-700"} px-3 py-1.5 rounded-full text-white text-sm transition-colors duration-200`}
                  onClick={() => addtoFavourites(painting.paintingId)}>
                  <img className="max-w-4 max-h-4" src={notfavourite}
                    alt={isFavourite ? "Favorited" : "Add to Favorites"}/>
                  <span>{isFavourite ? "Favourited" : "Favourite"}</span>
                </button>
              </div>
            </div>

            <div className="space-y-5">
              <div className="bg-gray-900/50 p-4 rounded-lg">
                <h4 className="text-white text-lg font-bold border-b border-gray-700 pb-2 mb-3">Artwork Details</h4>
                <dl className="grid grid-cols-2 gap-y-2 text-sm">
                  <dt className="text-gray-400">Year:</dt>
                  <dd className="text-white">{painting.yearOfWork}</dd>

                  <dt className="text-gray-400">Medium:</dt>
                  <dd className="text-white">{painting.medium}</dd>

                  <dt className="text-gray-400">Dimensions:</dt>
                  <dd className="text-white">
                    {painting.width} × {painting.height}
                  </dd>

                  <dt className="text-gray-400">Copyright:</dt>
                  <dd className="text-white">{painting.copyrightText}</dd>
                </dl>
              </div>

              {/* Gallery Information */}
              <div className="bg-gray-900/50 p-4 rounded-lg">
                <h4 className="text-white text-lg font-bold border-b border-gray-700 pb-2 mb-3">
                  Gallery Information
                </h4>
                <dl className="grid grid-cols-2 gap-y-2 text-sm">
                  <dt className="text-gray-400">Gallery:</dt>
                  <dd className="text-white">{painting.galleries?.galleryName}</dd>

                  <dt className="text-gray-400">Location:</dt>
                  <dd className="text-white">
                    {painting.galleries?.galleryCity}, {painting.galleries?.galleryCountry}
                  </dd>
                </dl>
              </div>

              {/* Description */}
              <div className="bg-gray-900/50 p-4 rounded-lg">
                <h4 className="text-white text-lg font-bold border-b border-gray-700 pb-2 mb-3">Description</h4>
                <p className="text-white text-sm">{painting.description}</p>
              </div>

              {/* External Links */}
              <div className="flex flex-wrap gap-2 pt-2">
                {painting.museumLink && (
                  <a href={painting.museumLink}
                    className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-full text-sm transition-colors duration-200 flex items-center gap-2">
                    <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                    Museum Link
                  </a>
                )}

                {painting.wikiLink && painting.wikiLink.length > 0 && (
                  <a href={painting.wikiLink}
                    className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-full text-sm transition-colors duration-200 flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                    Wiki Link
                  </a>
                )}

                {painting.googleLink && (
                  <a href={painting.googleLink}
                    className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-full text-sm transition-colors duration-200 flex items-center gap-2">
                    <span className="w-2 h-2 bg-purple-400 rounded-full"></span>
                    Google Arts
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
};

export default PaintingModal;