import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { IoImageOutline } from "react-icons/io5";
import { Button } from "./Button";
import { RootState } from "../Store/appStore";
import { IoLocationOutline } from "react-icons/io5";
import { LuCalendarDays } from "react-icons/lu";
import { useSelector } from "react-redux";
import { UserHeaderInterface } from "../Interfaces/UserHeader.interface";
import { Header } from "./Header";
import "../App.css";
import { Gallery } from "./Gallery/Gallery";
import dayjs, { Dayjs } from "dayjs";

export const UserHeader = () => {
  const ImageRef = useRef<HTMLInputElement | null>(null);
  const [reloadPage, setReloadPage] = useState<boolean>(true);
  const [image, setImage] = useState<string | null>(
    localStorage.getItem("User-Image")
  );
  const [profileData, setProfileData] = useState<UserHeaderInterface>({
    firstname: "",
    middlename: "",
    lastname: "",
    birthdate: null as Dayjs | null,
    expirydate: null as Dayjs | null,
    location: "",
  });

  const pageColor = useSelector(
    (store: RootState) => store.pageColor.isPageColor
  );
  const textColor = useSelector(
    (store: RootState) => store.textColor.isTextColor
  );
  const font = useSelector((store: RootState) => store.font.isFont);
  const bodyColor = useSelector((store: RootState) => store.bgColor.isBgColor);

  useEffect(() => {
    setReloadPage(false);

    const data = localStorage.getItem("Profile-Data");
    if (data) {
      const parsedData = JSON.parse(data);
      setProfileData({
        ...parsedData,
        birthdate: parsedData.birthdate ? dayjs(parsedData.birthdate) : null,
        expirydate: parsedData.expirydate ? dayjs(parsedData.expirydate) : null,
      });
    }
    // const handleScroll = () => { 
    //   const scroll = window.scrollY;
    //   const header = document.getElementById("header");
    //   if (header) {
    //     if (scroll > 200) {
    //       header.classList.add("active");
    //     } else {
    //       header.classList.remove("active");
    //     }
    //   }
    // };

    // window.addEventListener("scroll", handleScroll);
    // return () => {
    //   window.removeEventListener("scroll", handleScroll);
    // };
  }, []);

  useEffect(() => {
    if (!reloadPage) {
      localStorage.setItem(
        "Profile-Data",
        JSON.stringify({
          ...profileData,
          birthdate: profileData.birthdate
            ? profileData.birthdate.toISOString()
            : null,
          expirydate: profileData.expirydate
            ? profileData.expirydate.toISOString()
            : null,
        })
      );
    }
  }, [profileData]);

  const changeImage = () => {
    if (ImageRef.current) {
      ImageRef.current.click();
    }
  };

  const handleImage = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setImage(base64String);
        localStorage.setItem("User-Image", base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <div
        id="header"
        className="z-30"
        style={{ backgroundColor: bodyColor }}
      >
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <div className="flex justify-center md:gap-5 items-center relative bottom-16 user-header max-md:flex-col">
            <div className="relative w-[290px] aspect-square user-image">
              <img
                className="w-full h-full border-[5px] border-white max-md:h-[280px]"
                src={image || ""}
              />
              <div onClick={changeImage}>
                <Button
                  text="Change Image"
                  icon={<IoImageOutline />}
                  buttonStyle={{
                    position: "absolute",
                    top: "245px",
                    left: "130px",
                    fontFamily: "Poppins",
                    backgroundColor: pageColor,
                    color: textColor,
                  }}
                />
                <input
                  type="file"
                  accept="image/*"
                  ref={ImageRef}
                  className="hidden"
                  onChange={handleImage}
                />
              </div>
            </div>
            <div className="flex flex-col relative top-11 max-md:top-0 max-md:items-center h-[200px]">
              <div className="flex">
                <div>
                  <input
                    type="text"
                    className="names text-[40px] bg-transparent mx-[10px] outline-none py-[5px] px-[15px] w-[173px] max-md:w-[100px] max-md:text-[20px]"
                    placeholder="F Name"
                    value={profileData.firstname}
                    onChange={(e) => {
                      setProfileData({
                        ...profileData,
                        firstname: e.target.value,
                      });
                    }}
                    style={{
                      fontFamily: "Spectral",
                      color: textColor,
                      fontWeight: font,
                    }}
                  />
                </div>
                <div>
                  <input
                    type="text"
                    className="names text-[40px] bg-transparent mx-[10px] outline-none py-[5px] px-[15px] w-[173px] max-md:w-[100px] max-md:text-[20px]"
                    placeholder="M Name"
                    value={profileData.middlename}
                    onChange={(e) => {
                      setProfileData({
                        ...profileData,
                        middlename: e.target.value,
                      });
                    }}
                    style={{
                      fontFamily: "Spectral",
                      color: textColor,
                      fontWeight: font,
                    }}
                  />
                </div>
                <div>
                  <input
                    type="text"
                    className="names text-[40px] bg-transparent mx-[10px] outline-none py-[5px] px-[15px] w-[173px] max-md:w-[100px] max-md:text-[20px]"
                    placeholder="L Name"
                    value={profileData.lastname}
                    onChange={(e) => {
                      setProfileData({
                        ...profileData,
                        lastname: e.target.value,
                      });
                    }}
                    style={{
                      fontFamily: "Spectral",
                      color: textColor,
                      fontWeight: font,
                    }}
                  />
                </div>
              </div>
              <div className="flex items-center mt-4 mb-2 ml-[10px] gap-[10px] max-md:px-20">
                <div className="text-xl date max-md:" style={{ color: pageColor }}>
                  <LuCalendarDays />
                </div>
                <div className="date">
                  <DatePicker
                    label="Date of Birth"
                    value={profileData.birthdate}
                    onChange={(newValue) =>
                      setProfileData({
                        ...profileData,
                        birthdate: newValue ? dayjs(newValue) : null,
                      })
                    }
                  />
                </div>
                <div className="text-white date">-</div>
                <div className="date">
                  <DatePicker
                    label="Date of Expiry"
                    value={profileData.expirydate}
                    onChange={(newValue) =>
                      setProfileData({
                        ...profileData,
                        expirydate: newValue ? dayjs(newValue) : null,
                      })
                    }
                  />
                </div>
              </div>
              <div className="flex items-center gap-[10px] ml-[10px] max-md:w-[200px]">
                <div style={{ color: pageColor }} className="date">
                  <IoLocationOutline />
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="Location"
                    value={profileData.location}
                    onChange={(e) => {
                      setProfileData({
                        ...profileData,
                        location: e.target.value,
                      });
                    }}
                    className="date bg-transparent border border-[rgb(222, 226, 230)] w-[470px] py-[6px] px-3 outline-none max-md:w-[200px]"
                    style={{
                      fontFamily: "Poppins",
                      color: textColor,
                      fontWeight: font,
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </LocalizationProvider>

        <Header />
      </div>
      <div className="px-52 max-lg:px-10 max-sm:px-0">
        <Gallery />
      </div>
    </>
  );
};
