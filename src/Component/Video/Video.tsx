import { useSelector } from "react-redux";
import { RootState } from "../../Store/appStore";
import {
  VideoInterface,
  videoStyle,
  VideoSwitchInterface,
} from "../../Interfaces/video.interface";
import { useEffect, useState } from "react";
import { Box, Modal, Switch } from "@mui/material";
import { RxCross2 } from "react-icons/rx";
import ReactPlayer from "react-player";
import { FaTrash } from "react-icons/fa";
import { MyStory } from "../MyStory/MyStory";

export const Video = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [url, setUrl] = useState<string>("");
  const [reloadPage, setReloadPage] = useState<boolean>(true);
  const [video, setVideo] = useState<VideoSwitchInterface>({
    name: "",
    switch: false,
  });
  const [videoContent, setVideoContent] = useState<VideoInterface[]>([]);

  const pageColor = useSelector(
    (store: RootState) => store.pageColor.isPageColor
  );
  const textColor = useSelector(
    (store: RootState) => store.textColor.isTextColor
  );

  useEffect(() => {
    setReloadPage(false);

    const videoSwitch = localStorage.getItem("Video-Switch");
    if (videoSwitch) {
      setVideo(JSON.parse(videoSwitch));
    }

    const videoData = localStorage.getItem("Video-Data");
    if (videoData) {
      setVideoContent(JSON.parse(videoData));
    }
  }, []);

  useEffect(() => {
    if (!reloadPage) {
      localStorage.setItem("Video-Switch", JSON.stringify(video));
      localStorage.setItem("Video-Data", JSON.stringify(videoContent));
    }
  }, [video, videoContent]);

  const AddVideos = () => {
    const newVideo = {
      id: videoContent.length + 1,
      videoURL: url,
    };

    setVideoContent((prev) => [...prev, newVideo]);
    setOpen(false);
    setUrl("");
  };

  const handleDelete = (id: number) => {
    setVideoContent((prev) => prev.filter((v) => v.id !== id));
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
              placeholder="Video"
              value={video.name}
              onChange={(e) => setVideo({ ...video, name: e.target.value })}
            />
            <div
              className="h-1 w-16"
              style={{ backgroundColor: pageColor }}
            ></div>
          </div>
          <div className="flex items-center gap-1">
            <Switch
              checked={video.switch}
              onChange={(e) => {
                const newSwitchState = e.target.checked;
                setVideo({ ...video, switch: newSwitchState });
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

        {/* Video Content  */}
        {video.switch && <div className="flex flex-col gap-10 mt-5">
          {/* Add video button  */}
          <div className="grid grid-cols-12 gap-12">
            {videoContent.map((v) => (
              <div
                className="col-span-6 relative max-lg:col-span-12"
                key={v.id}
              >
                <ReactPlayer
                  // key={video.id}
                  width="100%"
                  height="250px"
                  url={v.videoURL}
                />
                <span
                  className="h-12 w-12 cursor-pointer rounded-full flex items-center justify-center backdrop-blur-[20px] absolute top-3 text-white right-1"
                  onClick={() => handleDelete(v.id)}
                >
                  <FaTrash />
                </span>
              </div>
            ))}
          </div>
          <div>
            <button
              className="flex items-center gap-2 py-[10px] px-[30px]"
              style={{
                backgroundColor: pageColor,
                color: textColor,
                fontFamily: "Poppins",
              }}
              onClick={() => setOpen(true)}
            >
              Add Videos
            </button>
          </div>
        </div>}

        {/* modal there */}

        <Modal open={open} onClose={() => setOpen(false)}>
          <Box sx={videoStyle}>
            <div className="flex flex-col">
              <div className="flex items-center justify-between p-4 border-b border-[rgb(222, 226, 230)]">
                <h2
                  style={{
                    fontSize: "24px",
                    fontFamily: "Spectral",
                    color: pageColor,
                  }}
                >
                  Add a Video
                </h2>
                <div
                  className="text-2xl cursor-pointer text-gray-600"
                  onClick={() => setOpen(false)}
                >
                  <RxCross2 />
                </div>
              </div>
              <div className="mt-[20px] px-6 flex flex-col border-b border-[rgb(222, 226, 230)]">
                <h5 className="mb-[8px]" style={{ fontFamily: "Poppins" }}>
                  Youtube URL
                </h5>
                <input
                  type="text"
                  className="py-3 px-3 mb-4"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="Enter the Address of your Video"
                  style={{ backgroundColor: "rgb(247, 245, 246)" }}
                />
                <p className="mb-3" style={{ fontFamily: "Poppins" }}>
                  The format should be like{" "}
                  <span className="underline">
                    https://www.youtube.com/watch?v=JGwWNGJdvx8
                  </span>
                </p>
              </div>
              <div className="flex justify-end mt-3 px-6">
                <button
                  className="px-[24px] py-[10px] mb-[20px]"
                  style={{
                    backgroundColor: pageColor,
                    color: textColor,
                    fontFamily: "Poppins",
                  }}
                  onClick={AddVideos}
                >
                  Submit
                </button>
              </div>
            </div>
          </Box>
        </Modal>
      </div>

      <MyStory />
    </>
  );
};
