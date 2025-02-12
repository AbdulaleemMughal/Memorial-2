import "../Css/livepage.css";
import { useSelector } from "react-redux";
import { RootState } from "../../Store/appStore";
import { useEffect, useState } from "react";
import { UserHeaderInterface } from "../../Interfaces/UserHeader.interface";
import { LuCalendarDays } from "react-icons/lu";
import { IoLocationOutline } from "react-icons/io5";
import { Header } from "./Header";
import dayjs from "dayjs";

export const UserHeader = () => {
  const [image, setImage] = useState<string | null>(
    localStorage.getItem("User-Image")
  );
  const [profileData, setProfileData] = useState<UserHeaderInterface | null>();

  const bodyColor = useSelector((store: RootState) => store.bgColor.isBgColor);
  const pageColor = useSelector(
    (store: RootState) => store.pageColor.isPageColor
  );
  const textColor = useSelector(
    (store: RootState) => store.textColor.isTextColor
  );

  useEffect(() => {
    const data = localStorage.getItem("Profile-Data");
    if (data) {
      const parsedData = JSON.parse(data);
      setProfileData({
        ...parsedData,
        birthdate: parsedData.birthdate ? dayjs(parsedData.birthdate) : null,
        expirydate: parsedData.expirydate ? dayjs(parsedData.expirydate) : null,
      });
    }

    const handleScroll = () => {
      const scroll = window.scrollY;
      const header = document.getElementById("header");
      if (header) {
        if (scroll > 300) {
          header.classList.add("active");
        } else {
          header.classList.remove("active");
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <div
        id="header"
        className="sticky top-0 z-30"
        style={{ backgroundColor: bodyColor }}
      >
        <div className="flex justify-center md:gap-5 items-center relative bottom-16 user-header max-md:flex max-md:justify-center max-sm:flex-col max-sm:hide-header">
          <div className="relative w-[290px] aspect-square user-image max-md:h-[250px] max-sm:w-[200px] max-sm:h-[200px]">
            <img
              className="w-full h-full border-[5px] border-white max-md:h-full"
              src={image || ""}
            />
          </div>
          <div className="flex flex-col relative top-11 max-sm:items-center">
            <h1
              className="text-[48px] mb-4 max-md:text-[30px]"
              style={{ fontFamily: "Spectral", color: textColor }}
            >
              {profileData?.firstname} {profileData?.middlename}{" "}
              {profileData?.lastname}
            </h1>
            <p
              className="flex items-center gap-2 text-[16px] mb-[10px] text-xl"
              style={{ fontFamily: "Poppins", color: textColor }}
            >
              <LuCalendarDays style={{ color: pageColor }} />
              {profileData?.birthdate
                ? profileData.birthdate.format("DD-MM-YYYY")
                : "N/A"}
               • 
              {profileData?.expirydate
                ? profileData.expirydate.format("DD-MM-YYYY")
                : "N/A"}
            </p>

            <p
              className="flex items-center gap-2 text-[16px] text-xl"
              style={{ fontFamily: "Poppins", color: textColor }}
            >
              <IoLocationOutline style={{ color: pageColor }} />
              {profileData?.location}
            </p>
          </div>
        </div>
        <Header />
      </div>
    </>
  );
};
