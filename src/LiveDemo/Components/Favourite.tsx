import { useEffect, useState } from "react";
import { LiaQuoteLeftSolid } from "react-icons/lia";
import { FavouriteInterface, FavouriteSwitchInterface } from "../../Interfaces/favourite.interface";
import { useSelector } from "react-redux";
import { RootState } from "../../Store/appStore";

export const Favourite = () => {
  const [favourite, setFavourite] = useState<FavouriteSwitchInterface | null>(
    localStorage.getItem("Favourite-Switch")
      ? JSON.parse(localStorage.getItem("Favourite-Switch") as string)
      : null
  );
  const [favouriteContent, setFavouriteContent] = useState<
      FavouriteInterface[]
    >([]);


  const pageColor = useSelector(
    (store: RootState) => store.pageColor.isPageColor
  );
  const textColor = useSelector(
    (store: RootState) => store.textColor.isTextColor
  );

  useEffect(() => {
    const favourite_Content = localStorage.getItem("Favourite-Data");
    if (favourite_Content) {
      setFavouriteContent(JSON.parse(favourite_Content));
    }
  }, []);

  return (
    <>
      {favourite?.switch && <div className="pt-32">
        <div className="flex flex-col gap-2 pb-12">
          <h2
            className="text-[32px]"
            style={{ fontFamily: "Spectral", color: textColor }}
          >
            {favourite?.name}
          </h2>
          <div
            className="w-[60px] h-[3px]"
            style={{ backgroundColor: pageColor }}
          ></div>
        </div>

        <div className="grid grid-cols-12 gap-3">
            {
                favouriteContent.map((f) => (
                    <div className="col-span-4 py-[25px] px-[20px] shadow-lg max-md:col-span-6 max-sm:col-span-12">
                <div className="flex gap-2 items-center mb-2" style={{fontFamily: 'Poppins' ,color: pageColor}}>
                    <div><LiaQuoteLeftSolid /></div>
                    <h6>{f.firstname}</h6>
                </div>
                <p style={{fontFamily: 'Poppins' ,color: textColor}}>{f.response} </p>
            </div>
                ))
            }
            
        </div>
      </div>}
    </>
  );
};
