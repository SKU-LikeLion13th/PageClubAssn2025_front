import React from "react";
import PageBackgrouond from "../PageBackgrouond";
import ClassList from "./ClassList";

export default function ClassSchedule() {
  return (
    <div className="relative">
      <PageBackgrouond />

      <div className="relative z-20">
        <ClassList />
      </div>
    </div>
  );
}
