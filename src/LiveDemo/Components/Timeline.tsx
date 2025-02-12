import { useSelector } from "react-redux";
import { RootState } from "../../Store/appStore";
import { useEffect, useState } from "react";
import { IoLocationOutline } from "react-icons/io5";
import {
  TimelineInterface,
  TimelineSwitchInterface,
} from "../../Interfaces/timeline.interface";

export const Timeline = () => {
  const [timeline, setTimeline] = useState<TimelineSwitchInterface | null>();
  const [timelineData, setTimelineData] = useState<TimelineInterface[]>([]);

  const pageColor = useSelector(
    (store: RootState) => store.pageColor.isPageColor
  );
  const textColor = useSelector(
    (store: RootState) => store.textColor.isTextColor
  );

  useEffect(() => {
    const timelineSwitch = localStorage.getItem("Timeline-Switch");
    if(timelineSwitch) {
      setTimeline(JSON.parse(timelineSwitch));
    }

    const timelineData = localStorage.getItem("Timeline-Data");
    if (timelineData) {
      setTimelineData(JSON.parse(timelineData));
    }
  }, []);

  return (
    <>
      {timeline?.switch && (
        <div className="pt-32">
          <div className="flex flex-col gap-2 pb-12">
            <h2
              className="text-[32px]"
              style={{ fontFamily: "Spectral", color: textColor }}
            >
              {timeline?.name}
            </h2>
            <div
              className="w-[60px] h-[3px]"
              style={{ backgroundColor: pageColor }}
            ></div>
          </div>

          {timelineData.map((t) => (
            <div className="max-md:flex max-md:items-center max-md:gap-5">
              <div
                className="hidden max-md:inline max-md:h-5 max-md:w-5 max-md:rounded-full"
                style={{ border: `5px solid ${pageColor}` }}
              ></div>
              <div className="flex gap-7 mt-10" key={t.id}>
                <div className="flex flex-col">
                  <h2
                    className="text-[22px] mb-2"
                    style={{ fontFamily: "Spectral", color: textColor }}
                  >
                    {t.year}
                  </h2>
                  <p style={{ fontFamily: "Poppins", color: textColor }}>
                    {t.month} {t.day} <sup>th</sup>
                  </p>
                </div>
                <div
                  className="h-5 w-5 rounded-full max-md:hidden"
                  style={{ border: `5px solid ${pageColor}` }}
                ></div>
                <div className="flex flex-col">
                  <h5
                    className="text-[22px] pb-2"
                    style={{ color: textColor, fontFamily: "Poppins" }}
                  >
                    {t.title}
                  </h5>
                  <p
                    className="flex gap-2 items-center"
                    style={{ color: textColor, fontFamily: "Poppins" }}
                  >
                    <IoLocationOutline style={{ color: pageColor }} />{" "}
                    {t.location}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};
