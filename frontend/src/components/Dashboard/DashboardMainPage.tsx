import { useState } from "react";
 // adjust the import path
import DashboardHome from "./DashBoardHome"; // Your actual dashboard component
// import Matches from "./Matches";
// import Messages from "./Messages";
import LoveSidebar from "./LoveSidebar";
import { useGetUser } from "@/lib/useGetUser";
// import other components

const DashboardMainPage = () => {
  const [activeItem, setActiveItem] = useState("dashboard");
  const userData=useGetUser()

  const renderContent = () => {
    switch (activeItem) {
      case "dashboard":
        return <DashboardHome />;
    //   case "matches":
    //     return <Matches />;
    //   case "messages":
    //     return <Messages />;
      // add other cases
      default:
        return <div>Select an option</div>;
    }
  };

  return (
    <div className="flex h-screen">
      <LoveSidebar activeItem={activeItem} setActiveItem={setActiveItem} userData={userData} />
      <div className="flex-1 pl-6 overflow-y-auto">{renderContent()}</div>
    </div>
  );
};

export default DashboardMainPage;
