import Header from "./Header";
import PageBackground from "../PageBackground";

const members = [
  {
    id: 1,
    imgSrc: "../../assets/images/기하은.png",
    logoSrc: "../../assets/images/PageLogo.png",
    name: "기하은",
    department: "경영학과 22학번",
    role: "동아리연합회 회장",
    task: "총괄",
  },
  {
    id: 2,
    imgSrc: "../../assets/images/김정호.png", // 교체할 이미지 경로
    logoSrc: "../../assets/images/PageLogo.png",
    name: "김정호",
    department: "미디어소프트웨어학과 24학번",
    role: "동아리연합회 총무국장",
    task: "UXUI 디자인",
  },
  {
    id: 3,
    imgSrc: "../../assets/images/임수현.png", // 교체할 이미지 경로
    logoSrc: "../../assets/images/PageLogo.png",
    name: "임수현",
    department: "사회복지학과 23학번",
    role: "동아리연합회 부회장",
    task: "UXUI 디자인",
  },
  {
    id: 4,
    imgSrc: "../../assets/images/최효빈.png", // 교체할 이미지 경로
    logoSrc: "../../assets/images/PageLogo.png",
    name: "최효빈",
    department: "사회복지학과 23학번",
    role: "동아리연합회 기획국장",
    task: "기획",
  },
];

export default function AboutUs() {
  return (
    <div className="px-4 py-8">
      <Header />
      <PageBackground />
      <div className="z-12">
        <div className="flex flex-col items-center w-full mt-6">
          <div className="flex items-center justify-center w-[211px] h-[40px] border-[0.8px] border-[#D2B48C] bg-white rounded-[20px] text-[20px] text-[#996515] z-10">
            만든이들
          </div>
          <div className="flex z-10 w-[240px] items-center mt-6">
            <div className="mr-[2.3rem]">
              <img
                src="../../assets/images/PageLogo.png"
                alt=""
                className="w-[73px] h-[60px] "
              />
              <p className="text-[6px] text-center font-Moneygraphy text-[#996515]">
                성결대학교
                <br />
                제41대 Page 동아리연합회
              </p>
            </div>
            <div className="">
              <img
                src="../../assets/images/Group501.png"
                alt=""
                className="w-[28px] h-[25px]"
              />
            </div>
            <div className="ml-[3rem] flex flex-col items-center">
              <img
                src="../../assets/images/LikeLionLogo.png"
                alt=""
                className="w-[43px] h-[43px] mt-2"
              />
              <p className="text-[6px] text-center font-Moneygraphy text-[#996515] mt-[0.5rem]">
                성결대학교
                <br />
                멋쟁이사자처럼 13기
              </p>
            </div>
          </div>
          <p className="font-Moneygraphy text-[12px] text-center mt-6 leading-[13.2px]">
            성결대학교 제41대 동아리연합회에서 웹사이트를 기획했습니다.
            <br />
            성결대학교 멋쟁이사자처럼에서 웹사이트를 제작했습니다.
          </p>
        </div>

        {/* border */}
        <div className="mt-12 flex justify-center items-center">
          <hr className="w-[212px] border-[#D2B48C] border-[0.8px]" />
        </div>

        {/* Page */}
        <div>
          <div className="mt-6 flex flex-col items-center justify-center">
            <img
              src="../../assets/images/PageLogo.png"
              alt=""
              className="w-[73px] h-[60px] text-center"
            />
            <p className="text-[6px] text-center font-Moneygraphy text-[#996515]">
              성결대학교
              <br />
              제41대 Page 동아리연합회
            </p>
          </div>
          <div className="grid grid-rows-2 grid-flow-col gap-4 justify-center mt-4">
            {members.map((member) => (
              <div
                key={member.id}
                className="border-[0.5px] border-[#D2B48C] rounded-[10px] bg-white text-center flex flex-col justify-center items-center w-[7rem] z-10 px-4 pt-6 pb-4 font-Moneygraphy"
              >
                <img
                  src={member.imgSrc}
                  alt={member.name}
                  className="w-[38px] h-[38px]"
                />
                <div className="flex justify-center items-center mt-2">
                  <img
                    src={member.logoSrc}
                    alt="Logo"
                    className="w-[30px] h-auto mr-2"
                  />
                  <p className="text-[8px]">{member.name}</p>
                </div>
                <p className="text-[6px] leading-[7px] text-center mt-2">
                  {member.department}
                  <br />
                  {member.role}
                </p>
                <div className="mt-2 flex justify-center items-center">
                  <hr className="w-[58px] border-[#D2B48C] border-[0.5px]" />
                </div>
                <p className="mt-2 text-[6px] leading-[7px] text-center">
                  {member.task}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* LikeLion */}
        <div className="">
          <div className="mt-6 flex flex-col items-center justify-center z-10">
            <img
              src="../../assets/images/LikeLionLogo.png"
              alt=""
              className="w-[43px] h-[43px] text-center flex justify-center"
            />
            <p className="text-[6px] text-center font-Moneygraphy text-[#996515]">
              성결대학교
              <br />
              멋쟁이사자처럼 13기
            </p>
          </div>
          <div className="grid grid-rows-2 grid-flow-col gap-4 flex justify-center mt-4 ">
            <div className="border-[0.5px] border-[#D2B48C] rounded-[10px] bg-white text-center flex flex-col justify-center items-center w-[8rem] z-10 px-4 py-6">
              <img
                src="../../assets/images/기하은.png"
                alt=""
                className="w-[34px] h-[34px]"
              />
              <div>dkdk</div>
            </div>
            <div className="border-[0.5px] border-[#D2B48C] rounded-[10px] bg-white text-center flex justify-center items-center w-[8rem] z-10">
              아아
            </div>
            <div className="border-[0.5px] border-[#D2B48C] rounded-[10px] bg-white text-center flex justify-center items-center w-[8rem] ">
              아아
            </div>
            <div className="border-[0.5px] border-[#D2B48C] rounded-[10px] bg-white text-center flex justify-center items-center w-[8rem]">
              아아
            </div>
          </div>
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
