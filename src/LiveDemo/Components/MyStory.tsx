import { useSelector } from "react-redux";
import { RootState } from "../../Store/appStore";
import { useEffect, useState } from "react";
import { FavouriteSwitchInterface } from "../../Interfaces/favourite.interface";

export const MyStory = () => {
  const [myStory, setMyStory] = useState<FavouriteSwitchInterface | null>();

  const [message, setMessage] = useState<string>("");

  const pageColor = useSelector(
    (store: RootState) => store.pageColor.isPageColor
  );
  const textColor = useSelector(
    (store: RootState) => store.textColor.isTextColor
  );

  useEffect(() => {
    const storySwitch = localStorage.getItem("EditorSwitch");
    if(storySwitch) {
      setMyStory(JSON.parse(storySwitch));
    }

    const storedEditorInput = localStorage.getItem("Editor") || "";
    setMessage(storedEditorInput);
  }, []);

  return (
    <>
      {myStory?.switch && (
        <div className="mt-32">
          <div className="flex flex-col gap-2 pb-12">
            <h2
              className="text-[32px]"
              style={{ fontFamily: "Spectral", color: textColor }}
            >
              {myStory?.name}
            </h2>
            <div
              className="w-[60px] h-[3px]"
              style={{ backgroundColor: pageColor }}
            ></div>
          </div>

          {/* Rendering the stored message as HTML */}
          <div
            id="message"
            style={{ color: textColor }}
            dangerouslySetInnerHTML={{ __html: message }}
          ></div>
        </div>
      )}
    </>
  );
};
