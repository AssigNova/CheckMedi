import React from "react";
import SideBar from "../../UI/SideBar";
import LabReportList from "./LabReportList";
import { DocumentTextIcon } from "@heroicons/react/outline";

export default function LabDashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        <div className=" p-8 w-full">
          <LabReportList />
        </div>
      </div>
    </div>
  );
}
