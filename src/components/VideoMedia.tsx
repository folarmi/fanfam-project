import videoMediaDefault from "../assets/videoMediaDefault.svg";
import Timeline from "./cards/Timeline";
import defaultAvatar from "../assets/defaultAvatar.svg";

const VideoMedia = () => {
  return (
    <div>
      <Timeline
        profileName="Priscilia yummy"
        avatar={defaultAvatar}
        handle="@yummychill54 ."
        time="3 h ago"
        bgColor="#FAFAFA"
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
        timeLineImage={videoMediaDefault}
        ifParagraph={true}
        //   setShowMoreModal={setShowMoreModalTwo}
        //   showMoreModal={showMoreModalTwo}
      />
      <Timeline
        profileName="Priscilia yummy"
        avatar={defaultAvatar}
        handle="@yummychill54 ."
        time="3 h ago"
        bgColor="#FAFAFA"
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
        timeLineImage={videoMediaDefault}
        ifParagraph={true}
        //   setShowMoreModal={setShowMoreModalTwo}
        //   showMoreModal={showMoreModalTwo}
      />
    </div>
  );
};

export default VideoMedia;
