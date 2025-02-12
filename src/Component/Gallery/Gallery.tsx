import { Switch } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../Store/appStore";
import "../../App.css";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import {
  FolderInterface,
  GalleryInterface,
  ImageInterface,
} from "../../Interfaces/gallery.interface";
import { FaRegFolder } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa6";
import { SlTrash } from "react-icons/sl";
import { IoImageOutline } from "react-icons/io5";
import { GalleryImage } from "./GalleryImage";
import { Favourite } from "../Favourite/Favourite";

export const Gallery = () => {

  const imageRef = useRef<HTMLInputElement | null>(null);
  const [reloadPage, setReloadPage] = useState<boolean>(true);
  const [folder, setFolder] = useState<FolderInterface[]>([]);
  const [images, setImages] = useState<ImageInterface[]>([]);
  const [gallery, setGallery] = useState<GalleryInterface>({
    name: "",
    switch: false,
  });
  const pageColor = useSelector(
    (store: RootState) => store.pageColor.isPageColor
  );
  const textColor = useSelector(
    (store: RootState) => store.textColor.isTextColor
  );

  useEffect(() => {
    setReloadPage(false);

    const gallery = localStorage.getItem("Gallery-Switch");
    if (gallery) {
      setGallery(JSON.parse(gallery));
    }

    const folder = localStorage.getItem("gallery-folder");
    if (folder) {
      setFolder(JSON.parse(folder));
    };

    const Images = localStorage.getItem("gallery-images");
    if(Images) {
      setImages(JSON.parse(Images));
    }
  }, []);

  useEffect(() => {
    if (!reloadPage) {
      localStorage.setItem("Gallery-Switch", JSON.stringify(gallery));
      localStorage.setItem("gallery-folder", JSON.stringify(folder));
      localStorage.setItem("gallery-images", JSON.stringify(images));
    }
  }, [gallery, folder, images]);

  const addFolder = () => {
    const newFolder = { id: folder.length + 1, name: "New Folder" };
    setFolder([...folder, newFolder]);
  };


  const handleDelete = (id: number | string) => {
    setFolder((prev) => prev.filter((item) => item.id !== id));
  };

  const handleImageDelete = (id: number | string) => {
    let a = confirm("Do you really want to delete the Image");
    if(a) {
      setImages((prev) => prev.filter((item) => item.id !== id));
    }
  };

  const AddImage = () => {
    if (imageRef.current) {
      imageRef.current.click();
    }
  };

  const handleImage = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        const newImage: ImageInterface = {
          id: images.length + 1,
          imageURL: base64String,
          folderName: [],
        };
        const updatedGallery = [...images, newImage];
        setImages(updatedGallery);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <div className="mt-32">
        <div className="flex justify-between items-center">
          <div className="flex flex-col gap-[10px]">
            <input
              type="text"
              className="input-heading bg-transparent py-[5px] px-[10px] outline-none"
              style={{ color: textColor, fontFamily: "Spectral" }}
              placeholder="Gallery"
              value={gallery.name}
              onChange={(e) => setGallery({ ...gallery, name: e.target.value })}
            />
            <div
              className="h-1 w-16"
              style={{ backgroundColor: pageColor }}
            ></div>
          </div>
          <div className="flex items-center gap-1">
            <Switch
              checked={gallery.switch}
              onChange={(e) => {
                const newSwitchState = e.target.checked;
                setGallery({ ...gallery, switch: newSwitchState });
              }}
              color="secondary"
              sx={{
                "& .MuiSwitch-switchBase.Mui-checked": {
                  color: pageColor,
                },
                "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                  color: pageColor,
                },
                "& .MuiSwitch-track": {
                  color: pageColor,
                },
              }}
            />
            <p
              style={{ fontFamily: "Poppins", color: textColor }}
              className="font-semibold"
            >
              Enable
            </p>
          </div>
        </div>

        {/* Gallery content */}
        {gallery.switch && <div className="mt-12 flex flex-col items-start gap-10">
          <div className="flex items-center gap-3 flex-wrap">
            <button
              className="flex items-center gap-2 px-[30px] py-[10px]"
              style={{ border: `1px solid ${pageColor}`, color: pageColor }}
            >
              <FaRegFolder /> All
            </button>
            {folder.map((f) => (
              <div
                key={f.id}
                className="px-[24px] py-[8px] flex items-center gap-2"
                style={{ border: `1px solid ${pageColor}` }}
              >
                <input
                  type="text"
                  className="p-[3px] bg-transparent outline-none folder-input"
                  style={{ color: textColor }}
                  value={f.name}
                  onChange={(e) =>
                    setFolder(
                      folder.map((item) =>
                        item.id === f.id
                          ? { ...item, name: e.target.value }
                          : item
                      )
                    )
                  }
                />
                <SlTrash
                  style={{ color: "red", cursor: "pointer" }}
                  onClick={() => handleDelete(f.id)}
                />
              </div>
            ))}

            <button
              className="flex items-center gap-2 px-[30px] py-[10px]"
              style={{ color: textColor, backgroundColor: pageColor }}
              onClick={addFolder}
            >
              <FaPlus /> Add Folder
            </button>
          </div>

            {/* Image content */}

            <div className="flex gap-3 flex-wrap max-md:justify-center">
              {
                images.map((i) => (
                  <GalleryImage folder={folder} setImages={setImages} data={i} key={i.id} onDelete={handleImageDelete} />
                ))
              }
            </div>

          <button
            className="flex items-center gap-2 py-[10px] px-[30px]"
            style={{
              backgroundColor: pageColor,
              color: textColor,
              fontFamily: "Poppins",
            }}
            onClick={AddImage}
          >
            <IoImageOutline />
            Add Image
          </button>
          <input type="file" accept="image/*" className="hidden" ref={imageRef} onChange={handleImage} />
        </div>}
      </div>

      <Favourite />
    </>
  );
};
