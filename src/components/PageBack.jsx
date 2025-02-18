import React from "react";
import { images } from "../utils/images";

const PageBackground = () => {
  return (
    <div>
      <div className="fixed w-full min-h-screen">
        <div className="flex h-full">
          <img
            src={images.pBack}
            className="pb-[7%] max-[500px]:absolute max-[500px]:p-0 max-[500px]:top-0"
          />
          <img
            src={images.aBack}
            className="ml-[11px] pt-[5%] max-[500px]:absolute max-[500px]:p-0 max-[500px]:right-0 max-[500px]:top-[20%]"
          />
        </div>
        <div className="flex">
          <img
            src={images.gBack}
            className="pb-[4%] max-[500px]:absolute max-[500px]:p-0 max-[500px]:top-[45%]"
          />
          <img
            src={images.eBack}
            className="ml-[64px] pt-[4%] max-[500px]:absolute max-[500px]:p-0 max-[500px]:right-0 max-[500px]:top-[65%]"
          />
        </div>
      </div>
    </div>
  );
};

export default PageBackground;
