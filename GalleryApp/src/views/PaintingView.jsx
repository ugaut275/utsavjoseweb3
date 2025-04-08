import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PaintingModal from '../components/PaintingModal';


//https://horizon-ui.com/docs-tailwind/docs/react/select  for the filters 

const PaintingView = () => {


  const [paintings, setPaintings] = useState([]);
  const [filteredPaintings, setFilteredPaintings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPainting, setSelectedPainting] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [sortOption, setSortOption] = useState("title");
  const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);
  const [artists, setArtists] = useState([]);
  const [galleries, setGalleries] = useState([]);
  const [genres, setGenres] = useState([]);
  const [selectedArtist, setSelectedArtist] = useState("");
  const [selectedGallery, setSelectedGallery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");




  useEffect(() => {   // fetching all types of data at once
    const fetchData = async () => {
      try {
        // Fetch paintings
        const paintingsResponse = await fetch('http://35.193.45.17:8080/api/paintings');
        const paintingsData = await paintingsResponse.json();
        setPaintings(paintingsData);
        setFilteredPaintings(paintingsData);

        // Fetch artists
        const artistsResponse = await fetch('http://35.193.45.17:8080/api/artists');
        const artistsData = await artistsResponse.json();
        const formattedArtists = artistsData.map(artist => ({
          id: artist.artistId,
          name: `${artist.firstName} ${artist.lastName}`
        })).sort((a, b) => a.name.localeCompare(b.name));
        setArtists(formattedArtists);

        // Fetch galleries
        const galleriesResponse = await fetch('http://35.193.45.17:8080/api/gallery');
        const galleriesData = await galleriesResponse.json();
        const formattedGalleries = galleriesData.map(gallery => ({
          id: gallery.galleryId,
          name: gallery.galleryName
        })).sort((a, b) => a.name.localeCompare(b.name));
        setGalleries(formattedGalleries);

        // Fetch genres
        const genresResponse = await fetch('http://35.193.45.17:8080/api/genres');
        const genresData = await genresResponse.json();
        const formattedGenres = genresData.map(genre => ({
          id: genre.genreId,
          name: genre.genreName
        })).sort((a, b) => a.name.localeCompare(b.name));
        setGenres(formattedGenres);

      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to load data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const updateFilters = async () => {
      await applyFilters();
    };
    updateFilters();
  }, [selectedArtist, selectedGallery, selectedGenre, paintings]);

  const applyFilters = async () => {
    try {
      let result = [...paintings];

      if (selectedGenre) {    // since painting endpoint doesnt contain genre we are getting all painting from selected genre and then filtering the loaded painting array for the Id
        const genreResponse = await fetch(`http://35.193.45.17:8080/api/paintings/genre/ref/${selectedGenre}`);
        const genrePaintings = await genreResponse.json();
        const genrePaintingIds = genrePaintings.map(p => p.paintingId);
        
        result = paintings.filter(painting => genrePaintingIds.includes(painting.paintingId));
      } 
      else if (selectedArtist) {
        result = paintings.filter(painting => 
          painting.artists?.artistId === parseInt(selectedArtist)
        );
      }      // applying other filters is quite easy 
      else if (selectedGallery) {
        result = paintings.filter(painting => 
          painting.galleries?.galleryId === parseInt(selectedGallery)
        );
      }

      setFilteredPaintings(result);
    } catch (error) {
      console.error("Error applying filters:", error);
      setError("Failed to apply filters");
    }
  };

  const clearFilters = () => {
    setSelectedArtist("");
    setSelectedGallery("");
    setSelectedGenre("");
    setFilteredPaintings(paintings);
  };
// if artist filter selected
  const handleArtistChange = (e) => {
    setSelectedArtist(e.target.value);
    setSelectedGallery("");
    setSelectedGenre("");
  };

  const handleGalleryChange = (e) => {
    setSelectedGallery(e.target.value);
    setSelectedArtist("");
    setSelectedGenre("");
  };

  const handleGenreChange = (e) => {
    setSelectedGenre(e.target.value);
    setSelectedArtist("");
    setSelectedGallery("");
  };
    // recyvled from other pages
  const checkPaintId = (paintingId) => {
    const idStr = String(paintingId);
    if (idStr.length === 7) {
      return idStr.substring(0, 6);
    } else if (idStr.length === 4) {
      return `00${idStr}`;
    } else if (idStr.length === 5) {
      return `0${idStr}`;
    }
    return idStr;
  };

  const handlePaintingClick = (painting) => {
    setSelectedPainting(painting);
    setIsModalOpen(true);
  };

  if (loading) {       
    return (     // 
      <div className="flex flex-col items-center justify-center min-h-64 mt-16">
        <div className="text-center mb-4">
          <div className="inline-block h-8 w-8 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
        <p className="text-lg text-gray-700">Loading...</p>
      </div>
    );
  }

  if (error) {   // https://tw-elements.com/docs/standard/components/spinners/
    return (
      <div className="flex flex-col items-center justify-center min-h-64 mt-16">
        <p className="text-lg text-red-600">{error}</p>
        <button onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700" >
          Retry
        </button>
      </div>
    );
  }
  // manage sort options
  let sortedPaintings = [...filteredPaintings];
  switch (sortOption) {
    case "title":
      sortedPaintings.sort((a, b) => a.title.localeCompare(b.title));
      break;
    case "year":
      sortedPaintings.sort((a, b) => a.yearOfWork - b.yearOfWork);
      break;
    default:
      break;
  }

  return (
    <div className="flex flex-row w-full">
      <div className="sm:bg-gradient-to-br from-white via-stone-100 to-stone-300 min-h-screen mt-10">
        <div className="hidden sm:flex w-20 bg-white/50 backdrop-blur-sm w-full flex-col items-center py-8 space-y-6">
          <Link to="/ArtistView" className="p-3 rounded-xl hover:bg-stone-200/50 transition-colors group">
            Artists
          </Link>
          <Link to="/gallery" className="p-3 rounded-xl hover:bg-stone-200/50 transition-colors group">
            Gallery
          </Link>
          <Link to="" className="p-3 rounded-xl hover:bg-stone-200/50 transition-colors group bg-stone-200/50">
            Paintings
          </Link>
          <Link to="/genres" className="p-3 rounded-xl hover:bg-stone-200/50 transition-colors group">
            Genres
          </Link>
        </div>

        {/* Mobile Navigation  */}
        <div className="sm:hidden relative">
          <button onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="p-3 rounded-xl bg-stone-200/50 hover:bg-stone-300 transition-colors w-full text-left" >
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
              <Link to="/genres" className="block px-4 py-2 hover:text-blue-500">
                Genres
              </Link>
            </div>
          )}
        </div>
      </div>

      <div className="flex-grow flex flex-col p-8 mt-5 mr-10">
        <div className="flex flex-col max-w-full mr-0 w-full">
          <h1 className="text-3xl font-bold mr-10 self-center text-gray-800 mb-6">
            Paintings Collection
          </h1>

          {/* Filter Section */}    
          <div className="mb-8">
 
            <div className="bg-white shadow-md rounded-lg p-6 mb-6">
              <h3 className="text-lg font-semibold mb-4">Filter Paintings</h3>
              <div className="grid md:grid-cols-3 gap-6">
                {/* Artist Filter */}
                <div className={selectedGallery || selectedGenre ? 'opacity-50 pointer-events-none' : ''}>  {/* Blur it out when either of the other two filters are selected*/ }
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Artist
                  </label>
                  <select value={selectedArtist} onChange={handleArtistChange}
                    className={`w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 
                      ${selectedArtist ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}`}
                    disabled={selectedGallery || selectedGenre} >
                    <option value="">All Artists</option>
                    {artists.map(artist => (
                      <option key={artist.id} value={artist.id}>{artist.name}</option>
                    ))}
                  </select>
                </div>

                {/* Gallery Filter */}
                <div className={selectedArtist || selectedGenre ? 'opacity-50 pointer-events-none' : ''}>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Gallery
                  </label>
                  <select value={selectedGallery} onChange={handleGalleryChange}
                    className={`w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 ${selectedGallery ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}`}
                    disabled={selectedArtist || selectedGenre}>
                    <option value="">All Galleries</option>
                    {galleries.map(gallery => (
                      <option key={gallery.id} value={gallery.id}>{gallery.name}</option>
                    ))}
                  </select>
                </div>

                {/* Genre Filter */}
                <div className={selectedArtist || selectedGallery ? 'opacity-50 pointer-events-none' : ''}>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Genre
                  </label>
                  <select value={selectedGenre} onChange={handleGenreChange}
                    className={`w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500   ${selectedGenre ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}`} disabled={selectedArtist || selectedGallery}>
                    <option value="">All Genres</option>
                    {genres.map(genre => (
                      <option key={genre.id} value={genre.id}>{genre.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="mt-6 flex justify-between items-center">
                <div className="text-sm text-gray-600">
                  {selectedArtist && <span>Filtering by Artist</span>}
                  {selectedGallery && <span>Filtering by Gallery</span>}
                  {selectedGenre && <span>Filtering by Genre</span>}
                </div>
                <button onClick={clearFilters}
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition-colors">
                  Clear Filters
                </button>
              </div>
            </div>

          </div>

          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">
              {filteredPaintings.length} {filteredPaintings.length === 1 ? 'Painting' : 'Paintings'}
              {(selectedArtist || selectedGallery || selectedGenre) ? ' (Filtered)' : ''}
            </h2>
            <div className="relative">                             {/* This is recycled  components from my other pages. sourced provided in gallery page */}
              <button onClick={() => setIsSortDropdownOpen(!isSortDropdownOpen)}
                className="flex items-center bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg" >
                Sort by: {sortOption === "title" ? "Title" : "Year"}
                <svg className="-mr-1 size-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
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
                      className="block w-full text-left px-4 py-2 hover:bg-gray-100" >
                      Title
                    </button>
                    <button
                      onClick={() => {
                        setSortOption("year");
                        setIsSortDropdownOpen(false);
                      }}
                      className="block w-full text-left px-4 py-2 hover:bg-gray-100" >
                      Year
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
                 {/* This is recycled  components from my other pages. sourced provided in gallery page */}
          {sortedPaintings.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-lg text-gray-600">No paintings match your filter criteria.</p>
              <button onClick={clearFilters}
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700" >
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="ml-20 flex flex-row gap-4 flex-wrap">
              {sortedPaintings.map((painting, index) => (
                <div className="border-2 overflow-hidden shadow-md p-1 w-xs bg-gradient-to-b from-orange-200 to-yellow-300"
                  key={index}>
                  <div className="p-0.5 border-2 text-center b-0 flex flex-col gap-10 bg-gradient-to-b from-stone-100 to-white min-h-full">
                    <p className="relative group hover:cursor-pointer" onClick={() => handlePaintingClick(painting)}>
                      <img
                        className="w-full transition-transform duration-300 ease-in-out transform group-hover:opacity-90"
                        src={`https://res.cloudinary.com/funwebdev/image/upload/w_150/art/paintings/square/${checkPaintId(painting.imageFileName)}.jpg`}
                        alt={painting.title} />
                    </p>
                    <p onClick={() => handlePaintingClick(painting)}
                      className="font-medium text-lg hover:cursor-pointer hover:text-indigo-600 transition duration-500 ease-in-out inline-block mb-2">
                      {painting.title}
                    </p>
                    <p className="text-gray-700 text-sm font-bold">
                      {painting.yearOfWork}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {isModalOpen && selectedPainting && (
        <PaintingModal
          imageLink={`https://res.cloudinary.com/funwebdev/image/upload/w_150/art/paintings/square/${checkPaintId(selectedPainting.imageFileName)}.jpg`}
          painting={selectedPainting}
          isOpen={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};

export default PaintingView;