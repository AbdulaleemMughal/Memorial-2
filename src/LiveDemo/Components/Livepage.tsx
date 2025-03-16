import { useSelector } from "react-redux";
import { Banner } from "./Banner";
import { UserHeader } from "./UserHeader";
import { RootState } from "../../Store/appStore";
import { Gallery } from "./Gallery";
import { Favourite } from "./Favourite";
import { Memory } from "./Memory"
import { MyStory } from "./MyStory";
import { Timeline } from "./Timeline";
import { Video } from "./Video";
import { Footer } from "./Footer"

export const LivePage = () => {
  const bgColor = useSelector((store: RootState) => store.bgColor.isBgColor);

  return (
    <>
      <div style={{ backgroundColor: bgColor }}>
        <Banner />
        <UserHeader />
        <div className="px-52 max-lg:px-28 max-md:px-3 ">
          <Gallery />
          <Favourite />
          <Memory />
          <MyStory />
          <Timeline />
          <Video />
          <Footer />
        </div>
      </div>
    </>
  );
};
