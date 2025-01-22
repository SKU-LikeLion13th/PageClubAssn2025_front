import React from "react";
import PageBack from "../PageBack";
import ClassList from "./ClassList";
import Header from "../../../components/Header";

export default function ClassSchedule() {
  return (
    <div className="relative">
      <PageBack />

      <div className="relative z-20">
        <ClassList />
      </div>
    </div>
  );
}
