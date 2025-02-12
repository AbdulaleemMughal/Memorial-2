import { MdAdd } from "react-icons/md";
import { LuTrash } from "react-icons/lu";
import { IoPersonCircleSharp } from "react-icons/io5";
import { useState } from "react";

export const Card = () => {
  const [addCard, setAddCard] = useState<boolean>(true);

  return (
    <>
      {addCard ? (
        <AddCard setAddCard={setAddCard} />
      ) : (
        <div className="h-[170px] w-[130px] bg-blue-500 flex flex-col p-[10px]">
          <div className="flex justify-end text-lg text-white cursor-pointer rounded-md" onClick={() => setAddCard(true)}>
            <LuTrash style={{ backgroundColor: "red", padding: "2px" }} />
          </div>
          <div className="text-8xl w-[90%] m-auto text-gray-400 bg-white rounded-full flex justify-center cursor-pointer">
            <IoPersonCircleSharp />
          </div>
          <div>
            <input
              type="text"
              placeholder="full name"
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
    setAddCard: React.Dispatch<React.SetStateAction<boolean>>;
}
export const AddCard = ({ setAddCard }: AddCardProps) => {
  return (
    <>
      <div className="h-[170px] w-[130px] bg-blue-500 flex justify-center items-center">
        <div className="h-[40px] w-[40px] bg-white rounded-full flex justify-center items-center cursor-pointer" onClick={() => setAddCard(false)}>
          <MdAdd style={{ fontSize: "20px" }} />
        </div>
      </div>
    </>
  );
};
