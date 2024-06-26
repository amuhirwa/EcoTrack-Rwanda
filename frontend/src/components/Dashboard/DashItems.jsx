import React from "react";

import { useState } from "react";
import { Achievements } from "./Achievements";
import { Schedule_form } from "./Schedule_form";
import { useSelector } from "react-redux";
import Requests from "../waste-collection/Requests";
import Job from "../waste-collection/Job";
import WasteCollectorMDash from "./WasteCollectorMDash";
import { Messages } from "./Messages";
import { ChatRoom } from "./ChatRoom";
import { HouseShedule } from "./HouseShedule";

export const DashItems = () => {
  const [serverError, setServerError] = useState("");
  const selectedItem = useSelector((state) => state.sharedData.selectedItem);
  return (
    <div className="flex flex-col w-full rounded-lg mx-auto justify-around bg-white p-4 text-primary">
      {/* <div className="mb-10">
        <h1 className="text-[2rem] text-center ">
          {selectedItem === "Schedule" ? "Schedule a collection" : selectedItem}
        </h1>
      </div> */}
      {selectedItem == "Dashboard" && <WasteCollectorMDash />}
      {selectedItem == "Schedule" && <Schedule_form />}
      {selectedItem == "All Schedule" && <HouseShedule />}
      {selectedItem == "Achievements" && <Achievements />}
      {selectedItem == "Messages" && <Messages />}
      {selectedItem == "Chatroom" && <ChatRoom />}
    </div>
  );
};
