import { useEffect, useState } from "react";

export const Banner = () => {
  const [image, setImage] = useState<string>("");

  useEffect(() => {
    const bannerImage = localStorage.getItem("banner-Image");
    if (bannerImage) {
      setImage(bannerImage);
    }
  }, []);

  return (
    <>
      <div className="h-[400px] w-[100%] max-sm:h-[200px]">
        <img
          className="h-full w-full"
          src="https://images.pexels.com/photos/20798930/pexels-photo-20798930/free-photo-of-yellow-and-stone-fortification-in-morocco.png?auto=compress&cs=tinysrgb&w=600&lazy=load"
        />
      </div>
    </>
  );
};
