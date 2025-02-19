import React from "react";
import PageBack from "../../../components/PageBack";
import ClassList from "./ClassList";
import Header from "../../../components/Header";

export default function ClassSchedule() {
  return (
    <div className="relative">
      <Header/>
      <PageBack />

      <div className="relative z-20 min-h-[51rem]">
        <ClassList />
      </div>
    </div>
  );
}
