import "../../App.css";
import { Switch } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../Store/appStore";
import { useEffect, useState } from "react";
import {
  FavouriteInterface,
  FavouriteSwitchInterface,
} from "../../Interfaces/favourite.interface";
import { MdAdd } from "react-icons/md";
import { SlTrash } from "react-icons/sl";
import { LiaQuoteLeftSolid } from "react-icons/lia";
import { Video } from "../Video/Video";

export const Favourite = () => {
  const [favourite, setFavourite] = useState<FavouriteSwitchInterface>({
    name: "",
    switch: false,
  });
  const [favouriteContent, setFavouriteContent] = useState<
    FavouriteInterface[]
  >([]);
  const [reloadPage, setReloadPage] = useState<boolean>(true);

  const pageColor = useSelector(
    (store: RootState) => store.pageColor.isPageColor
  );
  const textColor = useSelector(
    (store: RootState) => store.textColor.isTextColor
  );

  useEffect(() => {
    setReloadPage(false);

    const favouriteSwitch = localStorage.getItem("Favourite-Switch");
    if (favouriteSwitch) {
      setFavourite(JSON.parse(favouriteSwitch));
    }

    const favourite_Content = localStorage.getItem("Favourite-Data");
    if (favourite_Content) {
      setFavouriteContent(JSON.parse(favourite_Content));
    }
  }, []);

  useEffect(() => {
    if (!reloadPage) {
      localStorage.setItem("Favourite-Switch", JSON.stringify(favourite));
      localStorage.setItem("Favourite-Data", JSON.stringify(favouriteContent));
    }
  }, [favourite, favouriteContent]);

  const AddFavourite = () => {
    const newFavourite = {
      id: favouriteContent.length + 1,
      firstname: "",
      response: "",
    };

    setFavouriteContent((prev) => [...prev, newFavourite]);
  };

  const handleDelete = (id: number) => {
    setFavouriteContent((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <>
      <div className="mt-32">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-[10px]">
            <input
              type="text"
              className="input-heading bg-transparent py-[5px] px-[10px] outline-none"
              style={{ color: textColor, fontFamily: "Spectral" }}
              placeholder="Favourite"
              value={favourite.name}
              onChange={(e) =>
                setFavourite({ ...favourite, name: e.target.value })
              }
            />
            <div
              className="h-1 w-16"
              style={{ backgroundColor: pageColor }}
            ></div>
          </div>
          <div className="flex items-center gap-1">
            <Switch
              checked={favourite.switch}
              onChange={(e) => {
                const newSwitchState = e.target.checked;
                setFavourite({ ...favourite, switch: newSwitchState });
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

        {favourite.switch && (
          <div className="flex flex-col gap-10">
            <div className="grid grid-cols-12 gap-3">
              {favouriteContent.map((f) => {
                return (
                  <div className="col-span-4 shadow-lg my-3 max-lg:col-span-12">
                    <div className="flex flex-col gap-2 px-[20px] py-[25px]">
                      <div
                        className="flex justify-end text-red-600 cursor-pointer"
                        onClick={() => handleDelete(f.id)}
                      >
                        <SlTrash />
                      </div>
                      <div className="flex items-center gap-2">
                        <div>
                          <LiaQuoteLeftSolid />
                        </div>
                        <input
                          type="text"
                          className="favourite-input bg-transparent outline-none w-full"
                          style={{ fontFamily: "Poppins", color: textColor }}
                          placeholder="What's your {firstname's} favourite"
                          value={f.firstname}
                          onChange={(e) =>
                            setFavouriteContent((prev) =>
                              prev.map((item) =>
                                item.id === f.id
                                  ? { ...item, firstname: e.target.value }
                                  : item
                              )
                            )
                          }
                        />
                      </div>
                      <div>
                        <textarea
                          className="w-full favourite-input bg-transparent outline-none"
                          style={{ fontFamily: "Poppins", color: textColor }}
                          placeholder="Your Response Here"
                          value={f.response}
                          onChange={(e) =>
                            setFavouriteContent((prev) =>
                              prev.map((item) =>
                                item.id === f.id
                                  ? { ...item, response: e.target.value }
                                  : item
                              )
                            )
                          }
                        ></textarea>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div>
              <button
                className="flex items-center gap-2 py-[10px] px-[30px]"
                style={{
                  backgroundColor: pageColor,
                  color: textColor,
                  fontFamily: "Poppins",
                }}
                onClick={AddFavourite}
              >
                <MdAdd />
                Add More
              </button>
            </div>
          </div>
        )}
      </div>
      <Video />
    </>
  );
};
