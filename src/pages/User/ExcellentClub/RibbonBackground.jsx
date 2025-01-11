import React from "react";
import { images } from "../../../utils/images";

export default function RibbonBackground() {
  return (
    <div className="absolute flex items-center justify-center h-full -top-11">
      <img 
        src={images.ribbon} 
        alt="리본 배경" 
        className="w-full transform"
      />
    </div>
  );
}

// import React from "react";
// import { images } from "../../../utils/images";

// export default function RibbonBackground() {
//   return (
//     <div className="absolute flex items-center justify-center h-full">
//       <img 
//         src={images.ribbon} 
//         alt="리본 배경" 
//         className="max-w-[100%] h-auto transform rotate-[-52deg] opacity-30 scale-150 sm:scale-150 md:scale-150 lg:scale-150"
//       />
//     </div>
//   );
// }