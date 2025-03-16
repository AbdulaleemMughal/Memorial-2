import { useSelector } from "react-redux";
import { RootState } from "../../Store/appStore";
import { useEffect, useState } from "react";
import { FavouriteSwitchInterface } from "../../Interfaces/favourite.interface";
import { MemoryInterface } from "./memory.interface";

export const Memory = () => {

    const [memory, setMemory] = useState<FavouriteSwitchInterface | null>();
        const [memoryData, setMemoryData] = useState<MemoryInterface[]>([]);

  const pageColor = useSelector(
    (store: RootState) => store.pageColor.isPageColor
  );
  const textColor = useSelector(
    (store: RootState) => store.textColor.isTextColor
  );

  useEffect(() => {
    const memorySwitch = localStorage.getItem("Memory-Switch");
    if(memorySwitch) {
      setMemory(JSON.parse(memorySwitch));
    }

    const memoryData = localStorage.getItem("Memory-Data");
    if (memoryData) {
      setMemoryData(JSON.parse(memoryData));
    };
  }, [])

  return (
    <>
     {memory?.switch &&  <div className="mt-32">
        <div className="flex flex-col gap-2 pb-12">
          <h2
            className="text-[32px]"
            style={{ fontFamily: "Spectral", color: textColor }}
          >
            {memory.name}
          </h2>
          <div
            className="w-[60px] h-[3px]"
            style={{ backgroundColor: pageColor }}
          ></div>
        </div>

{
    memoryData.map((m) => (
        <div className="shadow-lg mt-4 pt-[20px] pr-[20px] pl-[20px] pb-[48px]" key={m.id}>
            <div style={{color: textColor, fontFamily: 'Poppins'}}>{m.month} {m.date} {m.year}</div>
            <p className="mt-[20px] mb-[8px]" style={{fontFamily: 'Spectral', color: pageColor}}>{m.msg}</p>
            <div className="flex justify-end mb-3">
                <h2 className="text-[28px]" style={{fontFamily: 'Spectral', color: textColor}}>{m.name}</h2>
            </div>
            <div className="flex flex-wrap gap-3 items-center">
                {
                    m.images.map((img) => (
                        <img key={img.id} className="rounded-md w-[150px] h-[120px]" src={img.imageURL} />

                    ))
                }
            </div>
        </div>
    ))
}
        
      </div>}
    </>
  );
};
