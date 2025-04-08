import { useEffect, useState } from "react";
import PaintingModal from "./PaintingModal";

// Layout design same from GalleryItem.jsx with minor tweaks in the design

// Recieves an Id value from singlegallery and then run query to get all painting associated with the gallery and also revieves a state variable which sorts the paintings depending on the values 

const SingleGalleryCard = ({ id, sortOption }) => {
    const [paintingInfo, setPaintingInfo] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedPainting, setSelectedPainting] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getPaintingInfo = async () => {
            setLoading(true);
            try {
                const response = await fetch(`http://35.193.45.17:8080/api/paintings/galleries/ref/${id}`);
                if (!response.ok) {
                    throw new Error(`Error fetching paintings: ${response.status}`);
                }
                const data = await response.json();
                setPaintingInfo(data);
            } catch (error) {
                console.error("Failed to fetch paintings:", error);
            } finally {
                setLoading(false);
            }
        };

        getPaintingInfo();
    }, [id]);

    const checkPaintId = (paintingId) => {  // since imageID for the cloudinary link needs to be 6 digits we either add or remove trailing zeroes over here
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

    const handlePaintingClick = (item) => {
        setSelectedPainting(item);
        setIsModalOpen(true);
    };
    const closeModal = () => {
        setIsModalOpen(false);
    }
    const divElement = (item, index) => {
        const imageId = checkPaintId(item.imageFileName);
        const imageUrl = `https://res.cloudinary.com/funwebdev/image/upload/w_150/art/paintings/square/${imageId}.jpg`;

        return (
            <div className="border-2 overflow-hidden shadow-md p-1 w-xs bg-gradient-to-b from-orange-200 to-yellow-300" key={index}>
                <div className="p-0.5 border-2 text-center b-0 flex flex-col gap-10 bg-gradient-to-b from-stone-100 to-white min-h-full">
                    <p className="relative group hover:cursor-pointer" onClick={() => handlePaintingClick(item)}>
                        <img className="w-full transition-transform duration-300 ease-in-out transform group-hover:opacity-90"
                            src={imageUrl}
                            alt={item.title} />
                    </p>
                    <p onClick={() => handlePaintingClick(item)}
                        className="font-medium text-lg hover:cursor-pointer hover:text-indigo-600 transition duration-500 ease-in-out inline-block mb-2">{item.title}</p>
                    <p className="text-gray-700 text-sm font-bold">
                        {item.artists.firstName} {item.artists.lastName}, {item.yearOfWork}
                    </p>
                </div>
            </div>
        );
    };

    if (loading) {
        return <div className="text-center py-8">Loading paintings...</div>;
    }



    let sortedPaintings = [...paintingInfo];

    switch (sortOption) {   // sort the painting based on the value recieved
        case "title":
            sortedPaintings.sort((a, b) => a.title.localeCompare(b.title));
            break;
        case "year":
            sortedPaintings.sort((a, b) => a.yearOfWork - b.yearOfWork);
            break;
        case "artistName":
            sortedPaintings.sort((a, b) => a.artists.firstName.localeCompare(b.artists.firstName));
            break;
        default:
            sortedPaintings.sort((a, b) => a.title.localeCompare(b.title));
    }

    return (
        <>
            {sortedPaintings.map((item, index) => divElement(item, index))}   {/* create cards based on sorted array */}

            {isModalOpen && selectedPainting && (
                <PaintingModal imageLink={`https://res.cloudinary.com/funwebdev/image/upload/w_150/art/paintings/square/${checkPaintId(selectedPainting.imageFileName)}.jpg`}
                    painting={selectedPainting}
                    isOpen={closeModal} />
            )}
        </>
    );
};

export default SingleGalleryCard;