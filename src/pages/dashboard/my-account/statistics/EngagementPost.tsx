import Tabs from "@/components/forms/Tabs";
import { useState } from "react";
import EngagmentPurchases from "./EngagmentPurchases";
import Tips from "./Tips";
import Views from "./Views";
import Likes from "./Likes";
import Comments from "./Comments";

const EngagementPost = () => {
  const [postTabs] = useState([
    {
      id: 1,
      name: "Purchases",
    },
    {
      id: 2,
      name: "Tips",
    },
    {
      id: 3,
      name: "Views",
    },
    {
      id: 4,
      name: "Likes",
    },
    {
      id: 5,
      name: "Comments",
    },
  ]);

  const [activePostTab, setActivePostTab] = useState("Purchases");

  return (
    <div>
      <section className="px-4">
        <Tabs
          tabsArray={postTabs}
          setIsActiveTab={setActivePostTab}
          isActiveTab={activePostTab}
        />
      </section>

      {activePostTab === "Purchases" && <EngagmentPurchases />}
      {activePostTab === "Tips" && <Tips />}
      {activePostTab === "Views" && <Views />}
      {activePostTab === "Likes" && <Likes />}
      {activePostTab === "Comments" && <Comments />}
    </div>
  );
};

export default EngagementPost;
