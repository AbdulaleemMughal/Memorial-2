import { useSelector } from "react-redux";
import { RootState } from "../../Store/appStore";
import { useEffect, useState } from "react";
import { FaRegFolder } from "react-icons/fa6";
import {
  FolderInterface,
  GalleryInterface,
  ImageInterface,
} from "../../Interfaces/gallery.interface";

export const Gallery = () => {
  const [folder, setFolder] = useState<FolderInterface[]>([]);
  const [images, setImages] = useState<ImageInterface[]>([]);
  const [allImages, setAllImages] = useState<ImageInterface[]>([]);
  const [gallery, setGallery] = useState<GalleryInterface>(
    localStorage.getItem("Profile-Data")
      ? JSON.parse(localStorage.getItem("Gallery-Switch") as string)
      : null
  );

  const pageColor = useSelector(
    (store: RootState) => store.pageColor.isPageColor
  );
  const textColor = useSelector(
    (store: RootState) => store.textColor.isTextColor
  );

  useEffect(() => {
    const folderData = localStorage.getItem("gallery-folder");
    if (folderData) {
      setFolder(JSON.parse(folderData));
    }
  
    const imagesData = localStorage.getItem("gallery-images");
    if (imagesData) {
      const parsedImages = JSON.parse(imagesData);
      setImages(parsedImages);
      setAllImages(parsedImages); // Save the full image list
    }
  }, []);

  const filterImages = (name: string) => {
    const filteredImages = allImages.filter((img) => img.folderName?.includes(name));
    setImages(filteredImages);
  };
  
  const AllImages = () => {
    setImages(allImages);
  };

  return (
    <>
      {gallery.switch && (
        <div className="mt-32">
          <div className="flex flex-col gap-2 pb-12">
            <h2
              className="text-[32px]"
              style={{ fontFamily: "Spectral", color: textColor }}
            >
              {gallery.name}
            </h2>
            <div
              className="w-[60px] h-[3px]"
              style={{ backgroundColor: pageColor }}
            ></div>
          </div>
          <div className="flex flex-wrap gap-3 items-center mb-[30px]">
            <button
              className="flex gap-[20px] items-center py-[10px] px-[24px]"
              style={{ border: `1px solid ${pageColor}`, color: textColor }}
              onClick={() => AllImages()}
            >
              <FaRegFolder />
              All
            </button>
            {folder.map((f) => (
              <button
                key={f.id}
                className="py-[10px] px-[24px]"
                style={{ border: `1px solid ${pageColor}`, color: textColor }}
                onClick={() => filterImages(f.name)}
              >
                {f.name}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-12 gap-3">
            {images.map((i) => (
              <div className="col-span-3 max-md:col-span-6 max-sm:col-span-12">
                <img
                  className="w-full object-cover h-[180px]"
                  src={i.imageURL}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};
