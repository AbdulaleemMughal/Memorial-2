import { FaTrash } from "react-icons/fa";
import { useSelector } from "react-redux";
import { RootState } from "../../Store/appStore";
import { MemoryInterface } from "../../LiveDemo/Components/memory.interface";

type MemoryContentProps = {
  data: MemoryInterface;
  onDelete: (id: number) => void;
};

export const MemoryContent = ({ data, onDelete }: MemoryContentProps) => {
  const textColor = useSelector(
    (store: RootState) => store.textColor.isTextColor
  );

  return (
    <>
      <div className="mt-4 px-[20px] pt-[20px] pb-[40px] shadow-lg">
        <div className="flex justify-between items-center">
          <p style={{ color: textColor }}>{data.month} {data.date}, {data.year}</p>
          <div className="flex gap-3 items-center">
            <select className="px-4 py-2">
              <option>Selected</option>
              <option>Pending</option>
            </select>
            <FaTrash style={{ color: textColor }} className="cursor-pointer" onClick={() => onDelete(data.id)} />
          </div>
        </div>
        <h2 className="mt-4">{data.msg}</h2>
        <div className="flex justify-end">
          <h1 className="text-3xl" style={{ fontFamily: "Poppins", color: textColor }}>
            {data.name}
          </h1>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          {data.images.map((img) => (
            <img
              key={img.id}
              className="w-[150px] h-[120px] rounded-md mt-5"
              src={img.imageURL}
            />
          ))}
        </div>
      </div>
    </>
  );
};
