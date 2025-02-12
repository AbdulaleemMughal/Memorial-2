import { useSelector } from "react-redux";
import { RootState } from "../../Store/appStore";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import { Link } from "react-router";

export const Footer = () => {

  const pageColor = useSelector(
    (store: RootState) => store.pageColor.isPageColor
  );
  const textColor = useSelector(
    (store: RootState) => store.textColor.isTextColor
  );

  return (
    <>
      <div className="flex justify-center items-center">
        <div className="flex flex-col">
          <p>
            Made With{" "}
            <span
              className="italic underline font-bold"
              style={{ color: pageColor }}
            >
              Abdul Aleem
            </span>
          </p>
          <div className="mt-2">
            <Link to="/live-page" target="_main">
            <button
              className="flex items-center gap-2 px-[24px] py-[10px]"
              style={{ backgroundColor: pageColor, color: textColor, fontFamily: 'Poppins' }}
            >
              <FaArrowUpRightFromSquare /> Veiw Live Page
            </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};
