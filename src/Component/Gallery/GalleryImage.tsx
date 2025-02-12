import { IoEllipsisHorizontalSharp } from "react-icons/io5";
import { FaEye } from "react-icons/fa6";
import { FaTrash } from "react-icons/fa6";
import { FaFolder } from "react-icons/fa";
import { useSelector } from "react-redux";
import { RootState } from "../../Store/appStore";
import {
  FolderInterface,
  ImageInterface,
} from "../../Interfaces/gallery.interface";
import React, { useState } from "react";
import { Backdrop } from "@mui/material";

type GalleryImageProps = {
  folder: FolderInterface[];
  data: ImageInterface;
  onDelete: (id: number) => void;
  setImages: React.Dispatch<React.SetStateAction<ImageInterface[]>>
};

export const GalleryImage = ({ folder, data, onDelete, setImages }: GalleryImageProps) => {
  const [backdrop, setBackdrop] = useState<boolean>(false);
  const [folderDropdown, setFolderDropdown] = useState<boolean>(false);
  const [dropdown, setDropdown] = useState<boolean>(false);
  const pageColor = useSelector(
    (store: RootState) => store.pageColor.isPageColor
  );

  const handleCheckboxChange = (id: number, name: string, checked: boolean) => {
    setImages((prev) =>
      prev.map((image) =>
        image.id === id
          ? {
              ...image,
              folderName: image.folderName?.includes(name)
                ? image.folderName.filter((folder) => folder !== name) 
                : [...(image.folderName || []), name], 
            }
          : image
      )
    );
  };

  return (
    <>
        <div className="w-[267px] h-[180px] relative">
          <img src={data.imageURL} className="w-full h-full" alt="" />
          <div
            className="absolute text-3xl right-2 top-2 text-white cursor-pointer"
            onClick={() => {
              setDropdown(!dropdown);
              setFolderDropdown(false);
            }}
          >
            <IoEllipsisHorizontalSharp />
          </div>
          {dropdown && (
            <div className="absolute top-8 right-2 bg-white w-[100px] py-1 rounded-lg">
              <ul className="list-none flex">
                <li
                  className="px-[10px] py-1 cursor-pointer"
                  style={{ fontSize: "14px", color: pageColor }}
                  onClick={() => onDelete(data.id)}
                >
                  <FaTrash />
                </li>
                <li
                  className="px-[10px] py-1 cursor-pointer"
                  style={{ fontSize: "14px", color: pageColor }}
                  onClick={() => setBackdrop(true)}
                >
                  <FaEye />
                </li>
                <Backdrop
                    sx={(theme) => ({
                      color: "#fff",
                      zIndex: theme.zIndex.drawer + 1,
                    })}
                    open={backdrop}
                    onClick={() => setBackdrop(false)}
                  >
                    <img src={data.imageURL} height="350px" width="450px" />
                  </Backdrop>
                <li
                  className="px-[10px] py-1 cursor-pointer"
                  style={{ fontSize: "14px", color: pageColor }}
                  onClick={() => setFolderDropdown(!folderDropdown)}
                >
                  <FaFolder />
                </li>
              </ul>
            </div>
          )}

          {folderDropdown && (
            <div className="w-[100px] h-[100px] bg-white absolute top-16 right-2 rounded-md overflow-auto">
              {folder.map((f) => (
                <div className="flex items-center gap-1 p-1" key={f.id}>
                  <input
                      type="checkbox"
                      id={f.name || ""}
                      name={f.name || ""}
                      checked={data.folderName?.includes(f.name) ? true : false}
                      onChange={(e) => {
                        if (f.name) {
                          handleCheckboxChange(
                            data.id,
                            f.name,
                            e.target.checked
                          );
                        }
                      }}
                    />
                  <label
                    className="text-[10px]"
                    style={{ fontFamily: "Poppins", color: pageColor }}
                  >
                    {f.name}
                  </label>
                </div>
              ))}
            </div>
          )}
        </div>
    </>
  );
};
