import { PiBookOpenText } from "react-icons/pi";
import { FaRegStar } from "react-icons/fa6";
import { FaTimeline } from "react-icons/fa6";
import { FaPhotoFilm } from "react-icons/fa6";
import { LuListTree } from "react-icons/lu";
import { MdOutlineMessage } from "react-icons/md";
import { IoVideocamOutline } from "react-icons/io5";
import { useSelector } from "react-redux";
import { RootState } from "../../Store/appStore";

export const Header = () => {
  const pageColor = useSelector(
    (store: RootState) => store.pageColor.isPageColor
  );
  const textColor = useSelector(
    (store: RootState) => store.textColor.isTextColor
  );
  const font = useSelector((store: RootState) => store.font.isFont);

  return (
    <>
      <div className="py-[13px] px-[178px] header overflow-x-auto md:overflow-visible ">
        <div className="flex justify-center items-center gap-5 whitespace-nowrap">
          <div className="flex items-center py-[10px] px-[10px] gap-[5px] cursor-pointer">
            <div
              style={{
                color: pageColor,
                fontSize: "24px",
              }}
            >
              <PiBookOpenText />
            </div>
            <span
              style={{
                color: textColor,
                fontFamily: "Poppins",
                fontWeight: font,
              }}
            >
              My Story
            </span>
          </div>
          <div className="flex items-center py-[10px] px-[10px] gap-[5px] cursor-pointer">
            <div
              style={{
                color: pageColor,
                fontFamily: "Poppins",
                fontSize: "24px",
              }}
            >
              <FaRegStar />
            </div>
            <span
              style={{
                color: textColor,
                fontFamily: "Poppins",
                fontWeight: font,
              }}
            >
              Favourite
            </span>
          </div>
          <div className="flex items-center py-[10px] px-[10px] gap-[5px] cursor-pointer">
            <div
              style={{
                color: pageColor,
                fontFamily: "Poppins",
                fontSize: "24px",
              }}
            >
              <FaTimeline />
            </div>
            <span
              style={{
                color: textColor,
                fontFamily: "Poppins",
                fontWeight: font,
              }}
            >
              Timeline
            </span>
          </div>
          <div className="flex items-center py-[10px] px-[10px] gap-[5px] cursor-pointer">
            <div
              style={{
                color: pageColor,
                fontFamily: "Poppins",
                fontSize: "24px",
              }}
            >
              <FaPhotoFilm />
            </div>
            <span
              style={{
                color: textColor,
                fontFamily: "Poppins",
                fontWeight: font,
              }}
            >
              Gallery
            </span>
          </div>
          <div className="flex items-center py-[10px] px-[10px] gap-[5px] cursor-pointer">
            <div
              style={{
                color: pageColor,
                fontFamily: "Poppins",
                fontSize: "24px",
              }}
            >
              <LuListTree />
            </div>
            <span
              style={{
                color: textColor,
                fontFamily: "Poppins",
                fontWeight: font,
              }}
            >
              Family Tree
            </span>
          </div>
          <div className="flex items-center py-[10px] px-[10px] gap-[5px] cursor-pointer">
            <div
              style={{
                color: pageColor,
                fontFamily: "Poppins",
                fontSize: "24px",
              }}
            >
              <IoVideocamOutline />
            </div>
            <span
              style={{
                color: textColor,
                fontFamily: "Poppins",
                fontWeight: font,
              }}
            >
              Videos
            </span>
          </div>
          <div className="flex items-center py-[10px] px-[10px] gap-[5px] cursor-pointer">
            <div
              style={{
                color: pageColor,
                fontFamily: "Poppins",
                fontSize: "24px",
              }}
            >
              <MdOutlineMessage />
            </div>
            <span
              style={{
                color: textColor,
                fontFamily: "Poppins",
                fontWeight: font,
              }}
            >
              Memory Wall
            </span>
          </div>
        </div>
      </div>
    </>
  );
};
