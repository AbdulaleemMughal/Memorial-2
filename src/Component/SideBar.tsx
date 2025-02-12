import React, { SetStateAction, useRef, useState } from "react";
import { Box, Drawer } from "@mui/material";
import { RxCross2 } from "react-icons/rx";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { RxDragHandleDots2 } from "react-icons/rx";
import { sidebar } from "../Typescript/sidebar";
import { PageColor } from "../Typescript/PageColor";
import { CgColorPicker } from "react-icons/cg";
import { BsBoxArrowUpRight } from "react-icons/bs";
import { BsArrowRight } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { addColor } from "../Store/pageSettingSlice";
import { addBgColor } from "../Store/backgroundColorSlice";
import { RootState } from "../Store/appStore";
import { addFont } from "../Store/fontSlice";
import { addTextColor } from "../Store/textColorSlice";
import { Link } from "react-router";

type SidebarProps = {
  openDrawer: boolean;
  setOpenDrawer: React.Dispatch<SetStateAction<boolean>>;
};

export const SideBar = ({ openDrawer, setOpenDrawer }: SidebarProps) => {
  const pageColorRef = useRef<HTMLInputElement>(null);
  const bgColorRef = useRef<HTMLInputElement>(null);
  const textColorRef = useRef<HTMLInputElement>(null);

  const dispatch = useDispatch();
  const [openReorder, setOpenReorder] = useState<boolean>(false);
  const [openPageColor, setOpenPageColor] = useState<boolean>(false);
  const [openBackgroundColor, setOpenBackgroundColor] =
    useState<boolean>(false);
  const [openTextColor, setOpenTextColor] = useState<boolean>(false);
  const [fontWeight, setFontWeight] = useState<boolean>(false);

  const BgColor = useSelector((store: RootState) => store.bgColor.isBgColor);
  const pageColor = useSelector(
    (store: RootState) => store.pageColor.isPageColor
  );
  const textColor = useSelector(
    (store: RootState) => store.textColor.isTextColor
  );

  document.body.style.backgroundColor = BgColor;

  return (
    <>
      <Drawer open={openDrawer} onClose={() => setOpenDrawer(false)}>
        <Box sx={{ width: 400 }} role="presentation">
          <div className="p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="flex flex-col gap-2">
                  <h2
                    className="text-[24px] tracking-tighter"
                    style={{ fontFamily: "Spectral" }}
                  >
                    Page Configurations
                  </h2>
                  <div
                    className="h-[2px] w-[60px]"
                    style={{ backgroundColor: pageColor }}
                  ></div>
                </div>
                <div
                  className="text-3xl cursor-pointer"
                  onClick={() => setOpenDrawer(false)}
                >
                  <RxCross2 />
                </div>
              </div>
              {/* Sidebar content */}
              <div className="border-b border-black">
                <div
                  className="flex flex-col mb-2 pt-3 cursor-pointer"
                  onClick={() => {
                    setOpenReorder(!openReorder);
                    setFontWeight(false);
                    setOpenBackgroundColor(false);
                    setOpenPageColor(false);
                    setOpenTextColor(false);
                  }}
                >
                  <div className="flex justify-between items-center">
                    <p style={{ fontFamily: "Poppins" }}>Re-order Sections</p>
                    <div className="text-3xl transition-transform duration-300">
                      {openReorder ? (
                        <MdKeyboardArrowUp />
                      ) : (
                        <MdKeyboardArrowDown />
                      )}
                    </div>
                  </div>
                </div>

                {/* Animated dropdown */}
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    openReorder
                      ? "max-h-60 opacity-100 py-2"
                      : "max-h-0 opacity-0 py-0"
                  }`}
                >
                  <p
                    className="text-[14px]"
                    style={{ fontFamily: "Poppins", color: textColor }}
                  >
                    Re-order the different sections of the Page:
                  </p>
                  <div className="bg-[#F8F9FA] p-2">
                    {sidebar.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center gap-2 py-1"
                      >
                        <div>
                          <RxDragHandleDots2 />
                        </div>
                        <p>{item.name}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* ------page color ------ */}
              <div className="border-b border-black">
                <div
                  className="flex flex-col pb-2 pt-3 cursor-pointer"
                  onClick={() => {
                    setOpenReorder(false);
                    setFontWeight(false);
                    setOpenBackgroundColor(false);
                    setOpenPageColor(!openPageColor);
                    setOpenTextColor(false);
                  }}
                >
                  <div className="flex justify-between items-center">
                    <p style={{ fontFamily: "Poppins" }}>Page Color</p>
                    <div className="text-3xl transition-transform duration-300">
                      {openPageColor ? (
                        <MdKeyboardArrowUp />
                      ) : (
                        <MdKeyboardArrowDown />
                      )}
                    </div>
                  </div>
                </div>

                {/* Animated dropdown */}
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    openPageColor
                      ? "max-h-60 opacity-100 py-2"
                      : "max-h-0 opacity-0 py-0"
                  }`}
                >
                  <p
                    className="text-[14px] pb-2"
                    style={{ fontFamily: "Poppins", color: textColor }}
                  >
                    Select Page Color:
                  </p>
                  <div className="flex items-center flex-wrap gap-2 py-1">
                    {PageColor.map((color) => (
                      <div
                        key={color.id}
                        className="w-8 h-8 rounded-full cursor-pointer"
                        style={{ backgroundColor: color.hex }}
                        onClick={() => dispatch(addColor(color.hex))}
                      ></div>
                    ))}
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center text-xl bg-black text-white cursor-pointer"
                      onClick={() => {
                        if (pageColorRef.current) {
                          pageColorRef.current.click();
                        }
                      }}
                    >
                      <CgColorPicker />
                    </div>
                    <input
                      type="color"
                      className="hidden"
                      ref={pageColorRef}
                      onChange={(e) => dispatch(addColor(e.target.value))}
                    />
                  </div>
                </div>
              </div>

              {/* ------Background color ------ */}
              <div className="border-b border-black">
                <div
                  className="flex flex-col pb-2 pt-3 cursor-pointer"
                  onClick={() => {
                    setOpenReorder(false);
                    setFontWeight(false);
                    setOpenBackgroundColor(!openBackgroundColor);
                    setOpenPageColor(false);
                    setOpenTextColor(false);
                  }}
                >
                  <div className="flex justify-between items-center">
                    <p style={{ fontFamily: "Poppins" }}>Background Color</p>
                    <div className="text-3xl transition-transform duration-300">
                      {openBackgroundColor ? (
                        <MdKeyboardArrowUp />
                      ) : (
                        <MdKeyboardArrowDown />
                      )}
                    </div>
                  </div>
                </div>

                {/* Dropdown with dynamic height animation */}
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    openBackgroundColor
                      ? "max-h-60 opacity-100 py-2"
                      : "max-h-0 opacity-0 py-0"
                  }`}
                >
                  <p
                    className="text-[14px] pb-2"
                    style={{ fontFamily: "Poppins", color: textColor }}
                  >
                    Select Background Color:
                  </p>
                  <div className="flex items-center flex-wrap gap-2 py-1">
                    {PageColor.map((color) => (
                      <div
                        key={color.id}
                        className="w-8 h-8 rounded-full cursor-pointer"
                        style={{ backgroundColor: color.hex }}
                        onClick={() => dispatch(addBgColor(color.hex))}
                      ></div>
                    ))}
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center text-xl bg-black text-white cursor-pointer"
                      onClick={() => {
                        if (bgColorRef.current) {
                          bgColorRef.current.click();
                        }
                      }}
                    >
                      <CgColorPicker />
                    </div>
                    <input
                      type="color"
                      className="hidden"
                      ref={bgColorRef}
                      onChange={(e) => dispatch(addBgColor(e.target.value))}
                    />
                  </div>
                </div>
              </div>

              {/* ------Text color ------ */}
              <div className="border-b border-black">
                <div
                  className="flex flex-col pb-2 pt-3 cursor-pointer"
                  onClick={() => {
                    setOpenReorder(false);
                    setFontWeight(false);
                    setOpenBackgroundColor(false);
                    setOpenPageColor(false);
                    setOpenTextColor(!openTextColor);
                  }}
                >
                  <div className="flex justify-between items-center">
                    <p style={{ fontFamily: "Poppins" }}>Text Color</p>
                    <div className="text-3xl transition-transform duration-300">
                      {openTextColor ? (
                        <MdKeyboardArrowUp />
                      ) : (
                        <MdKeyboardArrowDown />
                      )}
                    </div>
                  </div>
                </div>

                {/* Animated dropdown */}
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    openTextColor
                      ? "max-h-60 opacity-100 py-2"
                      : "max-h-0 opacity-0 py-0"
                  }`}
                >
                  <p
                    className="text-[14px] pb-2"
                    style={{ fontFamily: "Poppins", color: textColor }}
                  >
                    Select Text Color:
                  </p>
                  <div className="flex items-center flex-wrap gap-2 py-1">
                    {PageColor.map((color) => (
                      <div
                        key={color.id}
                        className="w-8 h-8 rounded-full cursor-pointer"
                        style={{ backgroundColor: color.hex }}
                        onClick={() => dispatch(addTextColor(color.hex))}
                      ></div>
                    ))}
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center text-xl bg-black text-white cursor-pointer"
                      onClick={() => {
                        if (textColorRef.current) {
                          textColorRef.current.click();
                        }
                      }}
                    >
                      <CgColorPicker />
                    </div>
                    <input
                      type="color"
                      className="hidden"
                      ref={textColorRef}
                      onChange={(e) => dispatch(addTextColor(e.target.value))}
                    />
                  </div>
                </div>
              </div>
              {/* ------font weight ------ */}
              <div className="border-b border-black">
                <div
                  className="flex flex-col pb-2 pt-3 cursor-pointer"
                  onClick={() => {
                    setOpenReorder(false);
                    setFontWeight(!fontWeight);
                    setOpenBackgroundColor(false);
                    setOpenPageColor(false);
                    setOpenTextColor(false);
                  }}
                >
                  <div className="flex justify-between items-center">
                    <p style={{ fontFamily: "Poppins" }}>Font Weight</p>
                    <div className="text-3xl transition-transform duration-300">
                      {fontWeight ? (
                        <MdKeyboardArrowUp />
                      ) : (
                        <MdKeyboardArrowDown />
                      )}
                    </div>
                  </div>
                </div>

                {/* Animated dropdown */}
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    fontWeight
                      ? "max-h-40 opacity-100 py-2"
                      : "max-h-0 opacity-0 py-0"
                  }`}
                >
                  <p
                    className="text-[14px] pb-2"
                    style={{ fontFamily: "Poppins", color: textColor }}
                  >
                    Choose the Font "Weight" for your text:
                  </p>
                  <div className="flex items-center flex-wrap gap-2 py-1">
                    <button
                      className="bg-black py-[5px] px-[20px] text-white transition-all duration-200 hover:bg-gray-800"
                      style={{ fontFamily: "Poppins" }}
                      onClick={() => dispatch(addFont("normal"))}
                    >
                      Light
                    </button>
                    <button
                      className="bg-black py-[5px] px-[20px] text-white transition-all duration-200 hover:bg-gray-800"
                      style={{ fontFamily: "Poppins" }}
                      onClick={() => dispatch(addFont("bold"))}
                    >
                      Bold
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* ------foter ------ */}
            <footer className="flex flex-col gap-4 sticky bottom-0 mt-[230px] bg-white">
              <Link to="/live-page" target="_main">
                <button
                  className={`flex w-full justify-center items-center gap-2 bg-red-500 py-[10px] px-[24px]`}
                  style={{
                    fontFamily: "Poppins",
                    backgroundColor: pageColor,
                    color: textColor,
                  }}
                >
                  <BsBoxArrowUpRight style={{ fontWeight: "bold" }} />
                  View Live Page
                </button>
              </Link>
              <button
                className={`flex justify-center items-center gap-2 bg-red-500 py-[10px] px-[24px]`}
                style={{
                  fontFamily: "Poppins",
                  backgroundColor: pageColor,
                  color: textColor,
                }}
              >
                Register Page
                <BsArrowRight style={{ fontWeight: "bold" }} />
              </button>
            </footer>
          </div>
        </Box>
      </Drawer>
    </>
  );
};
