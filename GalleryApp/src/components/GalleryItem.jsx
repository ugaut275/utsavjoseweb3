import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

const GalleryItem = ({ gallery }) => {
    const [pictureId, setPaintingId] = useState(0);

    useEffect(() => {
        const imageRetrieve = async () => {
            try {
                const data = await fetch(`http://34.172.61.40:8080/api/paintings/galleries/ref/${gallery.galleryId}`);
                const response = await data.json();
                if (response && response[0]) {
                    const paintingId = response[0].imageFileName + "";
                    if (paintingId.length === 4) {
                        setPaintingId(`00${paintingId}`);
                    }
                    else if (paintingId.length === 5) {
                        setPaintingId(`0${paintingId}`);
                    }
                    else if (paintingId.length === 7) {
                        setPaintingId(`${paintingId.slice(1)}`);
                    }
                    else {
                        setPaintingId(`${paintingId}`);
                    }
                }
            } catch (error) {
                console.log(error);
            }
        }
        imageRetrieve();
    }, []);

    // https://tailwindflex.com/@mr-robot/card-grid-section  ---> Took inspiration from here for the card design
    
   

    return (
        <div className=" p-1 rounded-full bg-gradient-to-b  from-yellow-700 to-yellow-500 overflow-hidden max-w-300 flex shadow-xl">
            <div className="text-center rounded-full bg-white w-sm p-1 flex flex-col gap-3 mb-5 min-h-full">
                <Link to={{ pathname: `/singlegallery/${gallery.galleryId}` }} state={{ dataCollect: gallery }} className="relative group">
                    <img className="w-full rounded-full transition-transform duration-300 ease-in-out transform group-hover:opacity-80 group-hover:scale-105" src={`https://res.cloudinary.com/funwebdev/image/upload/w_150/art/paintings/square/${pictureId}.jpg`}
                        alt={gallery.galleryName || "Gallery Image"}/>
                    <div className="absolute inset-0 bg-black bg-opacity-25 opacity-0  transition-opacity duration-300"></div>
                </Link>

                <Link
                    to={{ pathname: `/singlegallery/${gallery.galleryId}` }} state={{ dataCollect: gallery }} className="font-medium text-lg inline-block hover:text-indigo-600 transition duration-500 ease-in-out inline-block mb-2">
                    {gallery.galleryName}
                </Link>
                <p className="text-white-100 text-sm font-bold">
                    {gallery.galleryCity}, {gallery.galleryCountry}
                </p>
            </div>
        </div>
    )
}

export default GalleryItem;