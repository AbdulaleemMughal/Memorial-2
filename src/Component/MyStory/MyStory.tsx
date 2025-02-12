import { Switch } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../Store/appStore";
import { useEffect, useState } from "react";
import { myStorySwitchInterface } from "../../Interfaces/myStory.interface";
import { Editor } from "@tinymce/tinymce-react";
import { Memory } from "../Memory/Memory";

export const MyStory = () => {
  const [reload, setReload] = useState<boolean>(true);
  const [myStory, setMyStory] = useState<myStorySwitchInterface>({
    name: "",
    switch: false,
  });

  const [message, setMessage] = useState<string>("");

  const pageColor = useSelector(
    (store: RootState) => store.pageColor.isPageColor
  );
  const textColor = useSelector(
    (store: RootState) => store.textColor.isTextColor
  );

  useEffect(() => {
    setReload(false);

    const videoSwitch = localStorage.getItem("EditorSwitch");
    if (videoSwitch) {
      setMyStory(JSON.parse(videoSwitch));
    }

    const videoData = localStorage.getItem("Editor");
    if (videoData) {
      setMessage(videoData);
    }
  }, []);

  useEffect(() => {
    if (!reload) {
      localStorage.setItem("EditorSwitch", JSON.stringify(myStory));
      localStorage.setItem("Editor", (message));
    }
  }, [myStory, message]);

  const handleChange = (content: string, editor: any) => {
    setMessage(content);
    console.log(message);
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
              placeholder="My Story"
              value={myStory.name}
              onChange={(e) => setMyStory({ ...myStory, name: e.target.value })}
            />
            <div
              className="h-1 w-16"
              style={{ backgroundColor: pageColor }}
            ></div>
          </div>
          <div className="flex items-center gap-1">
            <Switch
              checked={myStory.switch}
              onChange={(e) => {
                const newSwitchState = e.target.checked;
                setMyStory({ ...myStory, switch: newSwitchState });
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

        {/* editor  */}
        {myStory.switch && (
          <div className="mt-10">
            <Editor
              apiKey="9yq7mn327c9z0scjv4oek1mhtf2b9wson0nxtm3fmaka1zek"
              value={message}
              onEditorChange={handleChange}
              init={{
                height: 400,
                menubar: false,
                plugins: [
                  "advlist autolink lists link image charmap print preview anchor",
                  "searchreplace visualblocks code fullscreen",
                  "insertdatetime media table paste code help wordcount",
                ],
                toolbar:
                  "undo redo | formatselect | bold italic backcolor | " +
                  "alignleft aligncenter alignright alignjustify | " +
                  "bullist numlist outdent indent | removeformat | help",
              }}
            />
          </div>
        )}
      </div>

      <Memory />
    </>
  );
};
