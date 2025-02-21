import Header from "../../../components/Header";
import PageBack from "../../../components/PageBack";

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
    imgSrc: "../../assets/images/ClubUnion/김정호.png",
    logoSrc: "../../assets/images/PageLogo.png",
    name: "김정호",
    department: "미디어소프트웨어학과 24학번",
    role: "동아리연합회 총무국장",
    task: "UXUI 디자인",
  },
  {
    id: 3,
    imgSrc: "../../assets/images/ClubUnion/임수현.png",
    logoSrc: "../../assets/images/PageLogo.png",
    name: "임수현",
    department: "사회복지학과 23학번",
    role: "동아리연합회 부회장",
    task: "UXUI 디자인",
  },
  {
    id: 4,
    imgSrc: "../../assets/images/ClubUnion/최효빈.png",
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
    imgSrc: "../../assets/images/likeLion/mingyu.png",
    logoSrc: "../../assets/images/LikeLionLogo.png",
    name: "한민규",
    department: "컴퓨터공학과 21학번",
    role: "대표",
    task: "Back-end",
    width: "78px",
    marginTop: "-8px",
    marginBottom: "8px",
  },
  {
    id: 2,
    imgSrc: "../../assets/images/likeLion/minseo.png",
    logoSrc: "../../assets/images/LikeLionLogo.png",
    name: "신민서",
    department: "미디어소프트웨어학과 22학번",
    role: "부대표",
    task: "Front-end",
    width: "85px",
    marginTop: "-5px",
  },
  {
    id: 3,
    imgSrc: "../../assets/images/likeLion/junbeom.png",
    logoSrc: "../../assets/images/LikeLionLogo.png",
    name: "박준범",
    department: "컴퓨터공학과 20학번",
    role: "운영진",
    task: "Back-end",
    width: "55px",
    marginTop: "5px",
  },
  {
    id: 4,
    imgSrc: "../../assets/images/likeLion/yujeong.png",
    logoSrc: "../../assets/images/LikeLionLogo.png",
    name: "최유정",
    department: "미디어소프트웨어학과 21학번",
    role: "운영진",
    task: "Front-end",
    width: "68px",
    marginTop: "-8px",
    marginBottom: "5px",
  },
  {
    id: 5,
    imgSrc: "../../assets/images/likeLion/ohyun.png",
    logoSrc: "../../assets/images/LikeLionLogo.png",
    name: "권오현",
    department: "컴퓨터공학과 23학번",
    role: "운영진",
    task: "Back-end",
    width: "58px",
    marginBottom: "1px",
    marginTop: "7px",
  },
  {
    id: 6,
    imgSrc: "../../assets/images/likeLion/hoyeon.png",
    logoSrc: "../../assets/images/LikeLionLogo.png",
    name: "이호연",
    department: "미디어소프트웨어학과 21학번",
    role: "운영진",
    task: "Front-end",
    width: "68px",
  },
  {
    id: 7,
    imgSrc: "../../assets/images/likeLion/juhee.png",
    logoSrc: "../../assets/images/LikeLionLogo.png",
    name: "노주희",
    department: "미디어소프트웨어학과 22학번",
    role: "운영진",
    task: "Back-end",
    width: "78px",
  },
  {
    id: 8,
    imgSrc: "../../assets/images/likeLion/hyewon.png",
    logoSrc: "../../assets/images/LikeLionLogo.png",
    name: "구혜원",
    department: "미디어소프트웨어학과 22학번",
    role: "운영진",
    task: "Front-end",
    width: "68px",
    marginBottom: "10px",
  },
  {
    id: 9,
    imgSrc: "../../assets/images/likeLion/hansol.png",
    logoSrc: "../../assets/images/LikeLionLogo.png",
    name: "오한솔",
    department: "관광학과 22학번",
    role: "운영진",
    task: "UXUI",
    width: "68px",
  },
];

export default function AboutUs() {
  return (
    <div className="">
      <Header />
      <PageBack />
      <div className="z-12">
        <div className="flex flex-col items-center w-full mt-6">
          <div className="flex items-center justify-center w-[211px] h-[40px] border-[0.8px] border-[#D2B48C] bg-white rounded-[20px] text-[20px] text-[#996515] z-10">
            만든이들
          </div>
          <div className="z-10 flex items-center mt-6">
            <div className="mr-[1rem] flex flex-col items-center">
              <img
                src="../../assets/images/PageLogo.png"
                alt=""
                className="w-[78px] h-[65px] "
              />
              <p className="text-[10px] text-center font-Moneygraphy text-[#996515]">
                성결대학교
                <br />
                제41대 Page 동아리연합회
              </p>
            </div>
            <div className="flex flex-col items-center">
              <img
                src="../../assets/images/Group501.png"
                alt=""
                className="w-[30px] h-[27px]"
              />
            </div>
            <div className="ml-[2rem] flex flex-col items-center">
              <img
                src="../../assets/images/LikeLionLogo.png"
                alt=""
                className="w-[48px] h-[48px] mt-2"
              />
              <p className="text-[10px] text-center font-Moneygraphy text-[#996515] mt-[0.5rem]">
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
              className="w-[90px] text-center"
            />
            <p className="text-[10px] text-center font-Moneygraphy text-[#996515]">
              성결대학교
              <br />
              제41대 Page 동아리연합회
            </p>
          </div>
          <div className="grid justify-center grid-flow-col grid-rows-2 gap-4 mt-4">
            {members.map((member) => (
              <div
                key={member.id}
                className="border-[0.5px] border-[#D2B48C] rounded-[10px] bg-white text-center flex flex-col justify-center items-center w-[8rem] z-10 px-2 pt-4 pb-3 font-Moneygraphy"
              >
                <img
                  src={member.imgSrc}
                  alt={member.name}
                  className={`w-[70px] ${
                    member.name === "김정호" ? "w-[80px] mb-[-10px]" : ""
                  }`}
                />
                <div className="flex items-center justify-center mt-2">
                  <img
                    src={member.logoSrc}
                    alt="Logo"
                    className="w-[30px] h-auto"
                  />
                  <p className="text-[10px]">{member.name}</p>
                </div>
                <p className="text-[8px] leading-[10px] text-center">
                  {member.department}
                  <br />
                  {member.role}
                </p>
                <div className="flex items-center justify-center mt-3">
                  <hr className="w-[58px] border-[#D2B48C] border-[0.5px]" />
                </div>
                <p className="mt-2.5 text-[8px] leading-[7px] text-center">
                  {member.task}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* LikeLion */}
        <div className="mt-8">
          <div className="z-10 flex flex-col items-center justify-center">
            <img
              src="../../assets/images/LikeLionLogo.png"
              alt=""
              className="w-[43px] h-[43px] text-center flex justify-center"
            />
            <p className="text-[10px] text-center font-Moneygraphy text-[#996515] mt-3">
              성결대학교
              <br />
              멋쟁이사자처럼 13기
            </p>
          </div>
          <div className="flex items-center justify-center">
            <div className="grid grid-flow-row grid-cols-2 gap-4 my-4">
              {likeLionMembers.map((member) => (
                <div
                  key={member.id}
                  className="border-[0.5px] border-[#D2B48C] rounded-[10px] bg-white text-center flex flex-col justify-center items-center w-[8rem] z-10 px-2 pt-4 pb-3 font-Moneygraphy"
                >
                  <img
                    src={member.imgSrc}
                    alt={member.name}
                    className="object-contain"
                    style={{
                      width: member.width,
                      marginBottom: member.marginBottom,
                      marginTop: member.marginTop,
                    }}
                  />
                  <div className="flex items-center justify-center mt-2">
                    <img
                      src={member.logoSrc}
                      alt="Logo"
                      className="w-[13px] h-auto mr-1"
                    />
                    <p className="text-[10px]">{member.name}</p>
                  </div>
                  <p className="text-[8px] leading-[10px] text-center mt-2">
                    {member.department}
                    <br />
                  </p>
                  <p className="text-[8px] mt-1">{member.role}</p>
                  <div className="flex items-center justify-center mt-2">
                    <hr className="w-[58px] border-[#D2B48C] border-[0.5px]" />
                  </div>
                  <p className="mt-2 text-[8px] leading-[7px] text-center">
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
