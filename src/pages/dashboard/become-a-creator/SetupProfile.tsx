import { CreatorHeaderText } from "@/components/atoms/CreatorHeaderText";
import { EditProfile } from "../profile/EditProfile";

const SetupProfile = () => {
  return (
    <div>
      <div className="m-4">
        <CreatorHeaderText
          title="Complete Profile Information"
          description="Complete your profile information"
        />
      </div>
      <EditProfile />
    </div>
  );
};

export { SetupProfile };
