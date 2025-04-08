import React, { useEffect, useState, useRef } from 'react';
import GalleryList from "../components/GalleryList";
import { Link } from 'react-router-dom';
import image from "../assets/chatgpt_bg.png";


// Used Chat GPT to help with making the LINk component conditionally enabled or disabled... you should find it in the attached chat history


const GalleryView = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [galleries, setGalleryData] = useState([]);
  const [loading, setLoading] = useState(true);
  const myRef = useRef(null);
  const dropdownRef = useRef(null);
  const DarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const DropdownCheck = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Fetching all galleries and setting it to a state variable
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://35.193.45.17:8080/api/gallery');
        const data = await response.json();
        setGalleryData(data);
      } catch (error) {
        console.log(error);
      }finally{
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {   // checking to see if the favourites button should be enabled or disabled based on if we have anything in the localstorage for galleries
    const favourites = localStorage.getItem("favourites");
    if (favourites === null || favourites === '[]') {
  
        setIsDisabled(true);
      
    } else {
   
        setIsDisabled(false);
      
    }

  }, []);

  useEffect(() => {   // handles the event when button clicked outside the dropdown .... AI generated 
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (loading) {    // https://tw-elements.com/docs/standard/components/spinners/   ---> Browsed through here to get an understand. simple enough 
    return (
      <div className="flex flex-col items-center justify-center min-h-screen mt-16">
        <div className="text-center mb-4">
          <div className="inline-block h-8 w-8 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
        <p className="text-lg text-gray-700">Loading...</p>
      </div>
    );
  }

  return (
    // sets the background to an image that i asked chatgpt to generate. Had some darkmode features before i changed to picture but it still works for the side bar
    <div style={{ backgroundImage: `url(${image})` }} className="flex bg-fixed bg-cover  bg-no-repeat bg-center min-h-screen">
      <div className={` ${isDarkMode ? 'bg-stone-800' : 'bg-white'} hidden sm:flex  shadow-lg w-64 sm:min-h-screen`}>
        <div className="p-6 h-full flex flex-col">     {/* Arranging sidebar components in a column format and making it so that it spans the lenght of the page. */}
          <div className="flex items-center mb-8">
            <h1 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-black'}`} >GalleryView</h1>
          </div>

          <div className="flex-1 space-y-2">

             {/* TLink components to various other pages*/}
            <Link
              to="/ArtistView"
              className={`block px-4 py-2 rounded-md font-medium transition-colors duration-200 ${isDarkMode ? 'text-white hover:bg-gray-700' : 'hover:bg-gray-100'}`}>
              Artists
            </Link>
            <Link
              to="/paintings"
              className={`block px-4 py-2 rounded-md font-medium transition-colors duration-200 ${isDarkMode ? 'text-white  hover:bg-gray-700' : 'hover:bg-gray-100'}`}>
              Paintings
            </Link>
            <Link
              to="/genres"
              className={`block px-4 py-2 rounded-md font-medium transition-colors duration-200 ${isDarkMode ? 'text-white  hover:bg-gray-700' : 'hover:bg-gray-100'}`}>
              Genre
            </Link>
            <Link
              to="/about" className={`block px-4 py-2 rounded-md font-medium transition-colors duration-200 ${isDarkMode ? 'text-white  hover:bg-gray-700' : 'hover:bg-gray-100'}`}>
              About
            </Link>
            <Link
              ref={myRef} to={"/favourites"} className={`block px-4 py-2 rounded-md font-medium transition-colors duration-200 ${isDarkMode ? 'text-white  hover:bg-gray-700' : 'hover:bg-gray-100'} ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
              onClick={(e) => isDisabled && e.preventDefault()}>  
              Favourites
            </Link>
            <div className="pt-4 border-t mt-4">
              <button
                onClick={DarkMode}
                className={`flex items-center justify-between w-full px-4 py-2 rounded-md ${isDarkMode ? 'text-white  hover:bg-gray-700' : 'hover:bg-gray-100'}`}>
                <span>{isDarkMode ? 'Light Mode' : 'Dark Mode'}</span>
                <span>{isDarkMode ? '☀️' : '🌙'}</span>
              </button>

            </div>
          </div>


        </div>

      </div>
      <div className='sm:hidden absolute mt-5 left-3/7 text-xl font-bold '>
        <h1> GalleryView App</h1>
      </div>
      <div className="sm:hidden  w-30 absolute mt-5 ml-5 ">
        <button onClick={DropdownCheck} className="p-3 rounded-xl bg-stone-200 hover:bg-stone-300 transition-colors w-full text-left flex items-center justify-between">
          <span>≡</span>
        </button>
        {isDropdownOpen && (
          <div ref={dropdownRef} className="absolute left-0 right-0 bg-white shadow-lg rounded-lg mt-2 w-full z-10  ">
            <Link to="/ArtistView" className="block px-4 py-2 hover:text-blue-500">
              Artists
            </Link>
            <Link to="/gallery" className="block px-4 py-2 hover:text-blue-500">
              Gallery
            </Link>
            <Link to="/favourites" className="block px-4 py-2 hover:text-blue-500">
              Favourites
            </Link>
            <Link to="/paintings" className="block px-4 py-2 hover:text-blue-500">
              Paintings
            </Link>
            <Link to="/genres" className="block px-4 py-2 hover:text-blue-500">
              Genres
            </Link>
            <Link to="/about" className="block px-4 py-2 hover:text-blue-500">
              About
            </Link>
          </div>
        )}
      </div>
      <div className="flex flex-col">
        <div className="flex my-35 p-6">
          <GalleryList galleries={galleries} isDarkMode={isDarkMode} />
        </div>
      </div>
    </div>
  );
};

export default GalleryView;