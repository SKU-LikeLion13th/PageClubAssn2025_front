import React from "react";
import PageBackgrouond from "../PageBackground";
import ClassList from "./ClassList";
import Header from "../../../components/Header";

export default function ClassSchedule() {
  return (
    <div className="relative py-8">
      <Header />
      <PageBackgrouond />

      <div className="relative z-20">
        <ClassList />
      </div>
    </div>
  );
}
