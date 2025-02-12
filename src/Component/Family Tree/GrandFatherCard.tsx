import { MdAdd } from "react-icons/md";
import { LuTrash } from "react-icons/lu";
import { IoPersonCircleSharp } from "react-icons/io5";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { CardInterface } from "../../Interfaces/familytree.interface";

export const GrandFatherCard = () => {
  const imageRef = useRef<HTMLInputElement | null>(null);
  const [reload, setReload] = useState(true);
  const [image, setImage] = useState<CardInterface>({
    name: "full name",
    imgURL: "",
    show: true,
  });

  useEffect(() => {
    setReload(false);

    const fatherImage = localStorage.getItem("Grand-Father");
    if (fatherImage) {
      setImage(JSON.parse(fatherImage));
    }
  }, []);

  useEffect(() => {
    if (!reload) {
      localStorage.setItem("Grand-Father", JSON.stringify(image));
    }
  }, [image]);

  const changeImage = () => {
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
        setImage({ ...image, imgURL: base64String });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      {image.show ? (
        <AddCard setAddCard={setImage} image={image} />
      ) : (
        <div className="h-[170px] w-[130px] bg-blue-500 flex flex-col p-[10px]">
          <div
            className="flex justify-end text-lg text-white cursor-pointer rounded-md"
            onClick={() =>
              setImage({ name: "full name", imgURL: "", show: true })
            }
          >
            <LuTrash style={{ backgroundColor: "red", padding: "2px" }} />
          </div>
          <div
            onClick={changeImage}
            className="text-8xl w-[90%] m-auto text-gray-400 bg-white rounded-full flex justify-center cursor-pointer"
          >
            {image.imgURL ? (
              <img
                className="w-full rounded-full h-[99px]"
                src={image.imgURL}
              />
            ) : (
              <IoPersonCircleSharp />
            )}
          </div>
          <input
            type="file"
            ref={imageRef}
            accept="image/*"
            onChange={handleImage}
            className="hidden"
          />
          <div>
            <input
              type="text"
              placeholder="full name"
              value={image.name}
              onChange={(e) => setImage({ ...image, name: e.target.value })}
              className="w-full bg-transparent outline-none text-center text-sm font-semibold"
              style={{ border: "1px dashed white" }}
            />
          </div>
        </div>
      )}
    </>
  );
};

type AddCardProps = {
  setAddCard: React.Dispatch<React.SetStateAction<CardInterface>>;
  image: CardInterface;
};
const AddCard = ({ setAddCard, image }: AddCardProps) => {
  return (
    <>
      <div
        className="h-[170px] w-[130px] bg-blue-500 flex justify-center items-center cursor-pointer"
        onClick={() => setAddCard({ ...image, show: false })}
      >
        <div className="h-[40px] w-[40px] bg-white rounded-full flex justify-center items-center">
          <MdAdd style={{ fontSize: "20px" }} />
        </div>
      </div>
    </>
  );
};
