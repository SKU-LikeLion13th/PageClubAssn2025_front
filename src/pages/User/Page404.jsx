import React from "react";
import { images } from './../../utils/images';
import Header404 from '../../components/Header404';

const Page404 = () => {
  return (
    <div>
      <Header404/>
      <div className="flex justify-center items-center w-full min-h-[calc(100vh-130px)]">
        <img src={images.img404}/>
      </div>
    </div>
  );
};

export default Page404;
