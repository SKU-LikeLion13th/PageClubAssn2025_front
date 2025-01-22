import PageBackground from "../PageBackground";
import Header from "../../../components/Header";

const members = [
  {
    id: 1,
    role: "동아리연합회 회장",
    imgSrc: "../../assets/images/ClubUnion/기하은.png",
    department: "경영학과 22",
    name: "기하은",
  },
  {
    id: 2,
    role: "동아리연합회 부회장",
    imgSrc: "../../assets/images/ClubUnion/임수현.png",
    department: "사회복지학과 23",
    name: "임수현",
  },
  {
    id: 3,
    role: "동아리연합회 총무국장",
    imgSrc: "../../assets/images/ClubUnion/한수진.png",
    department: "체육교육과 22",
    name: "한수진",
  },
  {
    id: 4,
    role: "동아리연합회 총무국장",
    imgSrc: "../../assets/images/ClubUnion/김정호.png",
    department: "미디어소프트웨어학과 24",
    name: "김정호",
  },
  {
    id: 5,
    role: "동아리연합회 복지국장",
    imgSrc: "../../assets/images/ClubUnion/강신욱.png",
    department: "관광학과 19",
    name: "강신욱",
  },
  {
    id: 6,
    role: "동아리연합회 복지국장",
    imgSrc: "../../assets/images/ClubUnion/이다혜.png",
    department: "뷰티디자인학과 24",
    name: "이다혜",
  },
  {
    id: 7,
    role: "동아리연합회 홍보국장",
    imgSrc: "../../assets/images/ClubUnion/이예원.png",
    department: "기독교교육상담학과 23",
    name: "이예원",
  },
  {
    id: 8,
    role: "동아리연합회 홍보국장",
    imgSrc: "../../assets/images/ClubUnion/김채현.png",
    department: "유아교육과 24",
    name: "기하은",
  },
  {
    id: 9,
    role: "동아리연합회 사업국장",
    imgSrc: "../../assets/images/ClubUnion/오도현.png",
    department: "산업경영공학과 20",
    name: "오도현",
  },
  {
    id: 10,
    role: "동아리연합회 기획국장",
    imgSrc: "../../assets/images/ClubUnion/최효빈.png",
    department: "사회복지학과 20",
    name: "최효빈",
  },
];

export default function Introduction() {
  return (
    <div className="py-8">
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
          <div className="grid grid-cols-2 grid-flow-row gap-5 justify-center mt-4">
            {members.map((member) => (
              <div
                key={member.id}
                className="z-10 flex flex-col items-center mt-2"
              >
                <img
                  src={member.imgSrc}
                  alt={member.name}
                  className="w-[68px] h-[68px] object-contain"
                />
                <p className="text-[14px] text-center mt-2 font-Moneygraphy text-[#3F3F3F]">
                  {member.role}
                  <br />
                  <div className="font-Moneygraphy mt-2 text-[12px] leading-[13.2px] text-[#3F3F3F]">
                    {member.department}
                    <br />
                    {member.name}
                  </div>
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
