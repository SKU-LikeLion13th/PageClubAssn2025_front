import PageBackground from "../PageBackground";
import Header from "./Header";

export default function Introduction() {
  return (
    <div className="px-4 py-8">
      <Header />
      <PageBackground />
      <div className="z-12">
        <div className="flex flex-col items-center w-full mt-6">
          <div className="flex items-center justify-center w-[211px] h-[40px] border-[0.8px] border-[#D2B48C] bg-white rounded-[20px] text-[20px] text-[#996515] z-10">
            슬로건
          </div>
          <p className="font-Ownglyph_ryurue mt-6 text-[20px] font-normal text-[#3F3F3F]">
            함께 채워나갈 우리의 이야기, Page 동아리연합회
          </p>
        </div>

        <div className="flex flex-col items-center w-full mt-10 ">
          <div className="flex items-center justify-center w-[211px] h-[40px] border-[0.8px] border-[#D2B48C] bg-white rounded-[20px] text-[20px] text-[#996515] z-10">
            슬로건 의미
          </div>
          <p className="font-Ownglyph_ryurue mt-6 text-[20px] font-normal text-[#3F3F3F] text-center leading-8">
            동아리연합회와 동아리의 이야기를
            <br />
            함께 채워나가자는 의미로,
            <br />
            동아리들은 추억의 페이지를
            <br />
            채워나가고, 동아리연합회는
            <br />
            이러한 추억 페이지를 엮어서
            <br />
            이야기르 만들겠습니다.
          </p>
        </div>

        <div className="flex flex-col items-center w-full mt-10 z-10">
          <div className="flex items-center justify-center w-[211px] h-[40px] border-[0.8px] border-[#D2B48C] bg-white rounded-[20px] text-[20px] text-[#996515] z-10">
            집행부 소개
          </div>
        </div>
      </div>
    </div>
  );
}
