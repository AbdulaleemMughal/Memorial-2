import { Box, Modal, Switch } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../Store/appStore";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import {
  MemoryInterface,
  MemorySwitchInterface,
  monthNames,
} from "../../LiveDemo/Components/memory.interface.ts";
import { memoryStyle } from "../../Interfaces/video.interface";
import { RxCross2 } from "react-icons/rx";
import { FaArrowRight } from "react-icons/fa6";
import { BiTrashAlt } from "react-icons/bi";
import { MemoryContent } from "./MemoryContent";
import { ImageInterface } from "../../Interfaces/gallery.interface";
import { Timeline } from "../Timeline/Timeline.tsx"

export const Memory = () => {
  const imageRef = useRef<HTMLInputElement | null>(null);
  const [reload, setReload] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [msg, setMsg] = useState<string>("");
  const [memoryData, setMemoryData] = useState<MemoryInterface[]>([]);
  const [images, setImages] = useState<ImageInterface[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const [memory, setMemory] = useState<MemorySwitchInterface>({
    name: "",
    switch: false,
  });

  const pageColor = useSelector(
    (store: RootState) => store.pageColor.isPageColor
  );
  const textColor = useSelector(
    (store: RootState) => store.textColor.isTextColor
  );

  useEffect(() => {
    setReload(false);

    const memorySwitch = localStorage.getItem("Memory-Switch");
    if (memorySwitch) {
      setMemory(JSON.parse(memorySwitch));
    };

    const memoryData = localStorage.getItem("Memory-Data");
    if (memoryData) {
      setMemoryData(JSON.parse(memoryData));
    };
  }, []);

  useEffect(() => {
    if(!reload) {
        localStorage.setItem("Memory-Switch",JSON.stringify(memory));
        localStorage.setItem("Memory-Data",JSON.stringify(memoryData));
    }
  }, [memory, memoryData])

  const changeImage = () => {
    if (imageRef.current) {
      imageRef.current.click();
    }
  };

  const handleImage = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        const newImage: ImageInterface = {
          id: images.length + 1,
          imageURL: base64String,
        };
        setImages((prev) => [...prev, newImage]);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleMemory = () => {
    const newMemory: MemoryInterface = {
      id: memoryData.length + 1,
      name,
      email,
      msg,
      date: new Date().getDate(),
      month: monthNames[new Date().getMonth()],
      year: new Date().getFullYear(),
      images: [...images],
    };

    setMemoryData((prev) => [...prev, newMemory]);

    setOpen(false);
    setName("");
    setEmail("");
    setMsg("");
    setImages([]);
  };

  const deleteImage = (id: number) => {
    setImages((prev) => prev.filter((image) => image.id !== id));
  };

  const deleteMemory = (id: number) => {
    setMemoryData((prev) => prev.filter((memory) => memory.id !== id));
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
              placeholder="Memory Wall"
              value={memory.name}
              onChange={(e) => setMemory({ ...memory, name: e.target.value })}
            />
            <div
              className="h-1 w-16"
              style={{ backgroundColor: pageColor }}
            ></div>
          </div>
          <div className="flex items-center gap-1">
            <Switch
              checked={memory.switch}
              onChange={(e) => {
                const newSwitchState = e.target.checked;
                setMemory({ ...memory, switch: newSwitchState });
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
        {/* memory content start here */}

        {memory.switch && <>
          <div className="flex justify-between items-center my-10 max-sm:text-sm">
            <p
              style={{
                color: pageColor,
                fontFamily: "Poppins",
              }}
            >
              To live in the hearts we leave behind is not to die. <br />
              Please share your Photos and Memories about the beloved
            </p>
            <button
              className="px-[24px] py-[10px] mb-[20px]"
              style={{
                backgroundColor: pageColor,
                color: textColor,
                fontFamily: "Poppins",
              }}
              onClick={() => setOpen(true)}
            >
              Contribute
            </button>

            <Modal open={open} onClose={() => setOpen(false)}>
              <Box sx={memoryStyle}>
                <div
                  className="flex justify-between items-center p-[16px] text-[24px] border-b border-[rgb(222, 226, 230)]"
                  style={{
                    color: pageColor,
                    fontFamily: "Poppins",
                  }}
                >
                  <h4>Contribute</h4>
                  <div
                    className="text-2xl cursor-pointer text-gray-600"
                    onClick={() => setOpen(false)}
                  >
                    <RxCross2 />
                  </div>
                </div>
                <div className="p-[16px]">
                  <form className="flex flex-col gap-[16px] border-b border-[rgb(222, 226, 230)] ">
                    <div className="flex items-center gap-3">
                      <div
                        className="flex flex-col w-full gap-[10px]"
                        style={{ color: pageColor }}
                      >
                        <label
                          className="font-bold"
                          style={{ fontFamily: "Poppins" }}
                        >
                          Your Name
                        </label>
                        <input
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="px-3 py-[6px] outline-none rounded-md"
                          placeholder="Enter Your Name"
                          style={{ border: `1px solid ${pageColor}` }}
                        />
                      </div>
                      <div
                        className="flex flex-col w-full gap-[10px]"
                        style={{ color: pageColor }}
                      >
                        <label
                          className="font-bold"
                          style={{ fontFamily: "Poppins" }}
                        >
                          Your Email
                        </label>
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="px-3 py-[6px] outline-none rounded-md"
                          placeholder="Enter Your Email"
                          style={{ border: `1px solid ${pageColor}` }}
                        />
                      </div>
                    </div>
                    <div
                      className="flex flex-col w-full gap-[10px]"
                      style={{ color: pageColor }}
                    >
                      <label
                        className="font-bold"
                        style={{ fontFamily: "Poppins" }}
                      >
                        Your Message
                      </label>
                      <textarea
                        rows={4}
                        value={msg}
                        onChange={(e) => setMsg(e.target.value)}
                        placeholder="Enter your Message"
                        className="px-3 py-[6px] outline-none rounded-md"
                        style={{ border: `1px solid ${pageColor}` }}
                      ></textarea>
                    </div>
                    <div
                      className="flex flex-col w-full gap-[10px]"
                      style={{ color: pageColor }}
                    >
                      <label
                        className="font-bold"
                        style={{ fontFamily: "Poppins" }}
                      >
                        Your Images
                      </label>
                      <div className="flex gap-3 items-center flex-wrap">
                        {images.map((i) => (
                          <div
                            className="relative h-[100px] w-[150px]"
                            key={i.id}
                          >
                            <img className="w-full h-full" src={i.imageURL} />
                            <div
                              className="absolute top-1 rounded-md cursor-pointer right-1 bg-white px-[2px] py-[5px] text-xl"
                              onClick={() => deleteImage(i.id)}
                            >
                              <BiTrashAlt />
                            </div>
                          </div>
                        ))}
                      </div>
                      <div>
                        <button
                          type="button"
                          className="px-[24px] py-[10px] mb-[20px] flex items-center gap-2"
                          style={{
                            backgroundColor: pageColor,
                            color: textColor,
                            fontFamily: "Poppins",
                          }}
                          onClick={changeImage}
                        >
                          Add Image <FaArrowRight />
                        </button>
                        <input
                          type="file"
                          accept="image/*"
                          ref={imageRef}
                          className="hidden"
                          onChange={handleImage}
                        />
                      </div>
                    </div>
                  </form>
                  <div className="flex justify-end my-3">
                    <div className="flex gap-2">
                      <button
                        className="py-[10px] px-[24px] border border-black"
                        onClick={() => setOpen(false)}
                      >
                        Cancel
                      </button>
                      <button
                        className="py-[10px] px-[24px]"
                        style={{
                          fontFamily: "Poppins",
                          backgroundColor: pageColor,
                          color: textColor,
                        }}
                        onClick={handleMemory}
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                </div>
              </Box>
            </Modal>
          </div>
          {memoryData.map((memory) => (
            <MemoryContent
              data={memory}
              key={memory.id}
              onDelete={deleteMemory}
            />
          ))}
        </>}
      </div>
      <Timeline />
    </>
  );
};
