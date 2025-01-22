import React from "react";
import { images } from "../../../utils/images";

const PageBack = () => {
  return (
    <div>
      <div className="fixed min-h-screen w-full">
        <div className="flex">
          <img
            src={images.pBack}
            className="pb-48 max-[500px]:absolute max-[500px]:p-0 max-[500px]:top-0"
          />
          <img
            src={images.aBack}
            className="ml-[11px] pt-44 max-[500px]:absolute max-[500px]:p-0 max-[500px]:right-0 max-[500px]:top-[25%]"
          />
        </div>
        <div className="flex">
          <img
            src={images.gBack}
            className="pb-48 max-[500px]:absolute max-[500px]:p-0 max-[500px]:top-[50%]"
          />
          <img
            src={images.eBack}
            className="ml-[64px] pt-48 max-[500px]:absolute max-[500px]:p-0 max-[500px]:right-0 max-[500px]:top-[75%]"
          />
        </div>
      </div>
    </div>
  );
};

export default PageBack;
