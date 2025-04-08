import GalleryItem from './GalleryItem.jsx'

const GalleryList = ({galleries, addtoFavorites}) => {
    return (
        <div className="ml-10 md:ml-40 flex gap-20 flex-wrap">
            {galleries?.sort((a,b)=>{
                return a.galleryName.localeCompare(b.galleryName);
            }).map((gallery, index) => (
                <GalleryItem key={gallery.id || index} gallery={gallery} addtoFavorites={addtoFavorites} />
            ))}
        </div>
    )
}

export default GalleryList;