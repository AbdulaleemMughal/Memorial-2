import { LuTrash } from "react-icons/lu";
import { SiblingCardInterface } from "../../Interfaces/familytree.interface";
import { IoPersonCircleSharp } from "react-icons/io5";
import React, { useRef } from "react";

type SiblingCardProps = {
    data: SiblingCardInterface;
    setData: React.Dispatch<React.SetStateAction<SiblingCardInterface[]>>
    onDelete: (id: number) => void;
}

export const SiblingCard = ({data, setData, onDelete}: SiblingCardProps) => {

    const imageRef = useRef<HTMLInputElement>(null);

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newName = e.target.value;
    
        setData((prev) =>
          prev.map((item) =>
            item.id === data.id ? { ...item, name: newName } : item
          )
        );
      };

      const changeImage = () => {
        if (imageRef.current) {
          imageRef.current.click();
        };
      };

      const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
          const reader = new FileReader();
          reader.onloadend = () => {
            const base64String = reader.result as string;
            setData((prev) =>
              prev.map((item) =>
                item.id === data.id ? {...item, imgUrl: base64String } : item
              )
            );
          };
          reader.readAsDataURL(file);
        }
      };


    return (
        <>
            <div className="h-[170px] w-[130px] bg-blue-500 flex flex-col p-[10px]">
                      <div className="flex justify-end text-lg text-white cursor-pointer rounded-md" onClick={() => onDelete(data.id)}>
                        <LuTrash style={{ backgroundColor: "red", padding: "2px" }} />
                      </div>
                      <div onClick={changeImage} className="text-8xl w-[90%] m-auto text-gray-400 bg-white rounded-full flex justify-center cursor-pointer">
                            {data.imgUrl ? (
                                <img
                                  className="w-full rounded-full h-[99px]"
                                  src={data.imgUrl}
                                />
                              ) : (
                                <IoPersonCircleSharp />
                              )}
                      </div>
                      <input type="file" accept="image/*" ref={imageRef} className="hidden" onChange={handleImage} />
                      <div>
                        <input
                          type="text"
                          placeholder="full name"
                          value={data.name}
                          onChange={handleNameChange}
                          className="w-full bg-transparent outline-none text-center text-sm font-semibold"
                          style={{ border: "1px dashed white" }}
                        />
                      </div>
                    </div>
        </>
    );
}