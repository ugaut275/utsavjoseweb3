import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {createBrowserRouter,RouterProvider} from 'react-router-dom';
import GalleryView from './views/GalleryView.jsx';
import SingleGallery from './components/SingleGallery.jsx';
import NotFound from './views/NotFound.jsx';
import ArtistView from './views/ArtistView.jsx';
import FavouritesView from './views/FavouritesView.jsx';
import SingleArtists from './components/SingleArtists.jsx';
import GenreView from './views/GenreView.jsx';
import SingleGenre from './components/SingleGenre.jsx';
import PaintingView from './views/PaintingView.jsx'
import About from './views/About.jsx'
const router = createBrowserRouter([
  {path: '/', element: <App />},
  {path: '/gallery', element: <GalleryView />},
  {path: '/singlegallery/:galleryId', element: <SingleGallery />},
  {path: '/ArtistView', element: <ArtistView/>},
  {path: '/favourites', element: <FavouritesView/>},
  {path: '/GenreDetails/:genreId', element: <SingleGenre />}, 
  {path: '/genres', element: <GenreView/>},
  {path: '/about', element: <About/>},
  {path: '/paintings', element: <PaintingView/>},
  {path: '/ArtistDetails/:artistId', element: <SingleArtists />}, 
  {path: '*', element: <h1><NotFound/></h1>},
]);
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
