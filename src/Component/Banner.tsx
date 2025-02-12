import { IoImageOutline } from "react-icons/io5";
import { BsSliders } from "react-icons/bs";
import { SideBar } from "./SideBar";
import { ChangeEvent, useRef, useState } from "react";
import { UserHeader } from "./UserHeader";
import { Button } from "./Button";
import { useSelector } from "react-redux";
import { RootState } from "../Store/appStore";

export const Banner = () => {
  const ImageRef = useRef<HTMLInputElement>(null);

  const [openDrawer, setOpenDrawer] = useState<boolean>(false);
  const [image, setImage] = useState<string | null>(
    localStorage.getItem("banner-Image")
  );

  const pageColor = useSelector(
    (store: RootState) => store.pageColor.isPageColor
  );
  const textColor = useSelector(
    (store: RootState) => store.textColor.isTextColor
  );

  const changeImage = () => {
    if (ImageRef.current) {
      ImageRef.current.click();
    } else {
      console.error("File input ref is not assigned!");
    }
  };

  const handleImage = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setImage(base64String);
        localStorage.setItem("banner-Image", base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const sideBar = () => {
    setOpenDrawer(true);
  };
  return (
    <>
      <div className="h-[400px] w-full max-md:h-[200px]">
        {/* Background Image */}
        <img
          className="w-full h-full object-cover"
          src={image || ""}
          alt="Banner"
        />

        {/* Button Over Image */}
        <div className="fixed top-0 w-full">
          <Button
            text="Page Setting"
            icon={<BsSliders />}
            buttonStyle={{
              position: "absolute",
              top: "24px",
              left: "24px",
              fontFamily: "Poppins",
              backgroundColor: pageColor,
              color: textColor,
            }}
            onClick={sideBar}
          />
        </div>
        <div>
          <Button
            text="Change Image"
            icon={<IoImageOutline />}
            buttonStyle={{
              position: "absolute",
              top: "355px",
              right: "12px",
              fontFamily: "Poppins",
              backgroundColor: pageColor,
              color: textColor,
            }}
            onClick={changeImage}
          />
        </div>
        <input
          type="file"
          className="opacity-0 absolute w-0 h-0"
          accept="image/*"
          ref={ImageRef}
          onChange={handleImage}
        />
      </div>
      <SideBar openDrawer={openDrawer} setOpenDrawer={setOpenDrawer} />
      <UserHeader />
    </>
  );
};
