import "../../App.css";
import React from "react";
import { Switch } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../Store/appStore";
import { useEffect, useState } from "react";
import {
  TimelineInterface,
  TimelineSwitchInterface,
} from "../../Interfaces/timeline.interface";
import { MdAdd } from "react-icons/md";
import { day, month, year } from "./timeline";
import { IoLocationOutline } from "react-icons/io5";
import { FiTrash } from "react-icons/fi";
import { FamilyTree } from "../Family Tree/FamilyTree";

export const Timeline = () => {
  const [reload, setReload] = useState<boolean>(true);
  const [timelineData, setTimelineData] = useState<TimelineInterface[]>([]);
  const [timeline, setTimeline] = useState<TimelineSwitchInterface>({
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

    const timelineSwitch = localStorage.getItem("Timeline-Switch");
    if (timelineSwitch) {
      setTimeline(JSON.parse(timelineSwitch));
    }

    const timelineData = localStorage.getItem("Timeline-Data");
    if (timelineData) {
      setTimelineData(JSON.parse(timelineData));
    }
  }, []);

  useEffect(() => {
    if (!reload) {
      localStorage.setItem("Timeline-Switch", JSON.stringify(timeline));
      localStorage.setItem("Timeline-Data", JSON.stringify(timelineData));
    }
  }, [timeline, timelineData]);

  const handleTimeline = () => {
    const newTimeline: TimelineInterface = {
      id: timelineData.length + 1,
      year: "Year",
      month: "Month",
      day: "Day",
      title: "Headline",
      location: "Description",
    };

    setTimelineData((prev) => [...prev, newTimeline]);
  };

  const handleChange = (
    id: number,
    field: keyof TimelineInterface,
    value: string | number
  ) => {
    setTimelineData((prev) =>
      prev.map((timeline) =>
        timeline.id === id ? { ...timeline, [field]: value } : timeline
      )
    );
  };

  const handleDelete = (id: number) => {
    setTimelineData((prev) => prev.filter((item) => item.id !== id));
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
              placeholder="Timeline"
              value={timeline.name}
              onChange={(e) =>
                setTimeline({ ...timeline, name: e.target.value })
              }
            />
            <div
              className="h-1 w-16"
              style={{ backgroundColor: pageColor }}
            ></div>
          </div>
          <div className="flex items-center gap-1">
            <Switch
              checked={timeline.switch}
              onChange={(e) => {
                const newSwitchState = e.target.checked;
                setTimeline({ ...timeline, switch: newSwitchState });
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

        {timeline.switch && (
          <>
            {timelineData.map((t) => (
              <div className="max-md:flex max-md:gap-3">
                <div
                  className="hidden max-md:inline max-md:h-5 max-md:mt-10 max-md:w-5 max-md:rounded-full"
                  style={{ border: `5px solid ${pageColor}` }}
                ></div>
                <div className="flex gap-4 mt-10 max-md:flex-col max-md:w-full">
                  <div className="flex flex-col gap-2">
                    <div>
                      <select
                        style={{ fontFamily: "Poppins", color: pageColor }}
                        className="cursor-pointer px-[12px] py-[6px] text-[22px] w-[95px] border border-[rgb(222, 226, 230)] outline-none max-md:w-full"
                        onChange={(e) =>
                          handleChange(t.id, "year", e.target.value)
                        }
                      >
                        <option defaultValue="Year">{t.year}</option>
                        {year.map((y) => (
                          <option key={y.year} value={y.year}>
                            {y.year}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <select
                        style={{ fontFamily: "Poppins", color: pageColor }}
                        className="cursor-pointer px-[12px] py-[6px] text-[14px] w-[95px] border border-[rgb(222, 226, 230)] outline-none max-md:w-full"
                        onChange={(e) =>
                          handleChange(t.id, "month", e.target.value)
                        }
                      >
                        <option defaultValue="Month">{t.month}</option>
                        {month.map((m) => (
                          <option key={m.month} value={m.month}>
                            {m.month}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <select
                        style={{ fontFamily: "Poppins", color: pageColor }}
                        className="cursor-pointer px-[12px] py-[6px] text-[14px] w-[95px] border border-[rgb(222, 226, 230)] outline-none max-md:w-full"
                        onChange={(e) =>
                          handleChange(t.id, "day", e.target.value)
                        }
                      >
                        <option defaultValue="Day">{t.day}</option>
                        {day.map((d) => (
                          <option key={d.day} value={d.day}>
                            {d.day}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="mt-2 max-md:hidden">
                    <div
                      className="w-5 h-5 rounded-full"
                      style={{ border: `5px solid ${pageColor}` }}
                    ></div>
                  </div>
                  <div className="flex flex-col gap-3">
                    <div>
                      <input
                        type="text"
                        placeholder="Title"
                        value={t.title}
                        onChange={(e) =>
                          handleChange(t.id, "title", e.target.value)
                        }
                        style={{ color: pageColor, fontFamily: "Poppins" }}
                        className="timeline-inputs outline-none text-[22px] bg-transparent max-md:w-full"
                      />
                    </div>
                    <div className="flex gap-1 items-center">
                      <IoLocationOutline
                        style={{ fontSize: "20px", color: pageColor }}
                      />
                      <input
                        type="text"
                        placeholder="Location"
                        value={t.location}
                        onChange={(e) =>
                          handleChange(t.id, "location", e.target.value)
                        }
                        className="timeline-inputs outline-none w-full text-[16px] bg-transparent"
                        style={{ fontFamily: "Poppins" }}
                      />
                    </div>
                    <div
                      className="h-10 w-10 flex justify-center items-center rounded-md cursor-pointer"
                      style={{ backgroundColor: pageColor }}
                      onClick={() => handleDelete(t.id)}
                    >
                      <FiTrash />
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <button
              className="py-[10px] px-[24px] flex items-center gap-2 mt-20"
              style={{
                fontFamily: "Poppins",
                backgroundColor: pageColor,
                color: textColor,
              }}
              onClick={handleTimeline}
            >
              <MdAdd style={{ fontSize: "22px" }} /> Add More Timeline
            </button>
          </>
        )}
      </div>
      <FamilyTree />
    </>
  );
};
