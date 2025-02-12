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
          src={image}
/>
      </div>
    </>
  );
};
