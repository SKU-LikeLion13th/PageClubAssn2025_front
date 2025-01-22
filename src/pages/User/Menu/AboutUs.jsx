import Header from "../../../components/Header";
import PageBack from "../PageBack";

const members = [
  {
    id: 1,
    imgSrc: "../../assets/images/ClubUnion/기하은.png",
    logoSrc: "../../assets/images/PageLogo.png",
    name: "기하은",
    department: "경영학과 22학번",
    role: "동아리연합회 회장",
    task: "총괄",
  },
  {
    id: 2,
    imgSrc: "../../assets/images/ClubUnion/김정호.png", // 교체할 이미지 경로
    logoSrc: "../../assets/images/PageLogo.png",
    name: "김정호",
    department: "미디어소프트웨어학과 24학번",
    role: "동아리연합회 총무국장",
    task: "UXUI 디자인",
  },
  {
    id: 3,
    imgSrc: "../../assets/images/ClubUnion/임수현.png", // 교체할 이미지 경로
    logoSrc: "../../assets/images/PageLogo.png",
    name: "임수현",
    department: "사회복지학과 23학번",
    role: "동아리연합회 부회장",
    task: "UXUI 디자인",
  },
  {
    id: 4,
    imgSrc: "../../assets/images/ClubUnion/최효빈.png", // 교체할 이미지 경로
    logoSrc: "../../assets/images/PageLogo.png",
    name: "최효빈",
    department: "사회복지학과 23학번",
    role: "동아리연합회 기획국장",
    task: "기획",
  },
];

const likeLionMembers = [
  {
    id: 1,
    imgSrc: "../../assets/images/likeLion/mingyu.png", // 이 부분에 실제 이미지 경로를 넣어주세요
    logoSrc: "../../assets/images/LikeLionLogo.png",
    name: "한민규",
    department: "컴퓨터공학과 21학번",
    role: "대표",
    task: "Back-end",
  },
  {
    id: 2,
    imgSrc: "../../assets/images/likeLion/minseo.png", // 이 부분에 실제 이미지 경로를 넣어주세요
    logoSrc: "../../assets/images/LikeLionLogo.png",
    name: "신민서",
    department: "미디어소프트웨어학과 22학번",
    role: "부대표",
    task: "Front-end",
  },
  {
    id: 3,
    imgSrc: "../../assets/images/likeLion/junbeom.png", // 이 부분에 실제 이미지 경로를 넣어주세요
    logoSrc: "../../assets/images/LikeLionLogo.png",
    name: "박준범",
    department: "컴퓨터공학과 20학번",
    role: "운영진",
    task: "Back-end",
  },
  {
    id: 4,
    imgSrc: "../../assets/images/likeLion/yujeong.png", // 이 부분에 실제 이미지 경로를 넣어주세요
    logoSrc: "../../assets/images/LikeLionLogo.png",
    name: "최유정",
    department: "미디어소프트웨어학과 21학번",
    role: "운영진",
    task: "Front-end",
  },
  {
    id: 5,
    imgSrc: "../../assets/images/likeLion/ohyun.png", // 이 부분에 실제 이미지 경로를 넣어주세요
    logoSrc: "../../assets/images/LikeLionLogo.png",
    name: "권오현",
    department: "컴퓨터공학과 23학번",
    role: "운영진",
    task: "Back-end",
  },
  {
    id: 6,
    imgSrc: "../../assets/images/likeLion/hoyeon.png", // 이 부분에 실제 이미지 경로를 넣어주세요
    logoSrc: "../../assets/images/LikeLionLogo.png",
    name: "이호연",
    department: "미디어소프트웨어학과 21학번",
    role: "운영진",
    task: "Front-end",
  },
  {
    id: 7,
    imgSrc: "../../assets/images/likeLion/juhee.png", // 이 부분에 실제 이미지 경로를 넣어주세요
    logoSrc: "../../assets/images/LikeLionLogo.png",
    name: "노주희",
    department: "미디어소프트웨어학과 22학번",
    role: "운영진",
    task: "Back-end",
  },
  {
    id: 8,
    imgSrc: "../../assets/images/likeLion/hyewon.png", // 이 부분에 실제 이미지 경로를 넣어주세요
    logoSrc: "../../assets/images/LikeLionLogo.png",
    name: "구혜원",
    department: "미디어소프트웨어학과 22학번",
    role: "운영진",
    task: "Front-end",
  },
  {
    id: 9,
    imgSrc: "../../assets/images/likeLion/hansol.png", // 이 부분에 실제 이미지 경로를 넣어주세요
    logoSrc: "../../assets/images/LikeLionLogo.png",
    name: "오한솔",
    department: "관광학과 22학번",
    role: "운영진",
    task: "UXUI",
  },
];

export default function AboutUs() {
  return (
    <div className="py-8 ">
      <Header />
      <PageBack />
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
        <div className="flex items-center justify-center mt-12">
          <hr className="w-[212px] border-[#D2B48C] border-[0.8px]" />
        </div>

        {/* Page */}
        <div>
          <div className="flex flex-col items-center justify-center mt-6">
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
          <div className="grid justify-center grid-flow-col grid-rows-2 gap-4 mt-4">
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
                <div className="flex items-center justify-center mt-2">
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
                <div className="flex items-center justify-center mt-2">
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
        <div className="mt-6">
          <div className="z-10 flex flex-col items-center justify-center">
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
          <div className="flex items-center justify-center">
            <div className="grid grid-flow-row grid-cols-2 gap-4 mt-4 ">
              {likeLionMembers.map((member) => (
                <div
                  key={member.id}
                  className="border-[0.5px] border-[#D2B48C] rounded-[10px] bg-white text-center flex flex-col justify-center items-center w-[7rem] z-10 px-4 pt-6 pb-4 font-Moneygraphy"
                >
                  <img
                    src={member.imgSrc}
                    alt={member.name}
                    className="w-[38px] h-[38px]"
                  />
                  <div className="flex items-center justify-center mt-2">
                    <img
                      src={member.logoSrc}
                      alt="Logo"
                      className="w-[12px] h-auto mr-2"
                    />
                    <p className="text-[8px]">{member.name}</p>
                  </div>
                  <p className="text-[6px] leading-[7px] text-center mt-2">
                    {member.department}
                    <p>{member.task}</p>
                    <br />
                    {member.role}
                  </p>
                  <div className="flex items-center justify-center mt-2">
                    <hr className="w-[58px] border-[#D2B48C] border-[0.5px]" />
                  </div>
                  <p className="mt-2 text-[6px] leading-[7px] text-center">
                    {member.task}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
