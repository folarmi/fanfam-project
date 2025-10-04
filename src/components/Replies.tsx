import Timeline from "./cards/Timeline";
import defaultAvatar from "../assets/defaultAvatar.svg";
import timelineImage from "../assets/timelineImage.svg";
import timelineTwo from "../assets/timelineTwo.svg";

const Replies = () => {
  return (
    <div>
      <div className="relative">
        <Timeline
          profileName="Priscilia yummy"
          avatar={defaultAvatar}
          handle="@yummychill54 ."
          time="3 h ago"
          paragraphOne="Lorem ipsum dolor sit amet consectetur. Amet dolor arcu praesent
        mi. Nulla sed cursus quis mas sa nato que at adip iscing. Phar
        etra justo pretium sollic itudin digni ssim non solli citudin sit
        pellentesque ipsum. Molestie dui tempus nec maecenas eget justo
        dictum a."
          paragraphTwo="Lorem ipsum dolor sit amet consectetur. Amet dolor arcu praesent
        mi. Nulla sed cursus quis mas sa nato que at adip iscing. Phar
        etra justo pretium sollic itudin digni ssim non solli citudin sit
        pellentesque ipsum. Molestie dui tempus nec maecenas eget justo
        dictum a."
          timeLineImage={timelineImage}
          ifParagraph={true}
          ifIcon={false}
          bgColor="#fafafa"
          //   setShowMoreModal={setShowMoreModalTwo}
          //   showMoreModal={showMoreModalTwo}
        />
      </div>

      <div className="relative">
        <Timeline
          profileName="Priscilia yummy"
          avatar={defaultAvatar}
          handle="@yummychill54 ."
          time="3 h ago"
          paragraphOne="Lorem ipsum dolor sit amet consectetur. Amet dolor arcu praesent
        mi. Nulla sed cursus quis mas sa nato que at adip iscing. Phar
        etra justo pretium sollic itudin digni ssim non solli citudin sit
        pellentesque ipsum. Molestie dui tempus nec maecenas eget justo
        dictum a."
          paragraphTwo="Lorem ipsum dolor sit amet consectetur. Amet dolor arcu praesent
        mi. Nulla sed cursus quis mas sa nato que at adip iscing. Phar
        etra justo pretium sollic itudin digni ssim non solli citudin sit
        pellentesque ipsum. Molestie dui tempus nec maecenas eget justo
        dictum a."
          timeLineImage={timelineTwo}
          ifParagraph={true}
          bgColor="#fafafa"
          //   setShowMoreModal={setShowMoreModalTwo}
          //   showMoreModal={showMoreModalTwo}
        />
      </div>
    </div>
  );
};

export default Replies;
