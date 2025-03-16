import { useSelector } from "react-redux";
import { RootState } from "../../Store/appStore";

export const Footer = () => {
  const pageColor = useSelector(
    (store: RootState) => store.pageColor.isPageColor
  );

  return (
    <>
      <div className="flex justify-center">
        <p>
          Made with{" "}
          <span
            className="underline italic font-bold"
            style={{ color: pageColor }}
          >
            Abdul Aleem
          </span>
        </p>
      </div>
    </>
  );
};
