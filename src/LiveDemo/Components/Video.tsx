import { useSelector } from "react-redux";
import { RootState } from "../../Store/appStore";
import {
  VideoInterface,
  VideoSwitchInterface,
} from "../../Interfaces/video.interface";
import { useEffect, useState } from "react";
import ReactPlayer from "react-player";

export const Video = () => {
  const [video, setVideo] = useState<VideoSwitchInterface | null>(
    localStorage.getItem("Video-Switch")
      ? JSON.parse(localStorage.getItem("Video-Switch") as string)
      : null
  );
  const [videoContent, setVideoContent] = useState<VideoInterface[]>([]);

  const pageColor = useSelector(
    (store: RootState) => store.pageColor.isPageColor
  );
  const textColor = useSelector(
    (store: RootState) => store.textColor.isTextColor
  );

  useEffect(() => {
    const videoData = localStorage.getItem("Video-Data");
    if (videoData) {
      setVideoContent(JSON.parse(videoData));
    }
  }, []);

  return (
    <>
      <div className="mt-32">
        <div className="flex flex-col gap-2 pb-12">
          <h2
            className="text-[32px]"
            style={{ fontFamily: "Spectral", color: textColor }}
          >
            {video?.name}
          </h2>
          <div
            className="w-[60px] h-[3px]"
            style={{ backgroundColor: pageColor }}
          ></div>
        </div>

        <div className="grid grid-cols-12 gap-3">
          {videoContent.map((v) => (
            <div className="col-span-6 max-lg:col-span-12">
              <ReactPlayer
                key={v.id}
                url={v.videoURL}
                width="100%"
                height="250px"
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
