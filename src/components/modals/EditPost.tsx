import { useGetData } from "@/hooks/apiCalls";
import PostCard from "../cards/Postcard";
import { Loader } from "../molecules/Loader";
import { useFetchProfile } from "@/hooks/apiHooks";
import { useAppSelector } from "@/lib/hook";
import type { RootState } from "@/lib/store";
import { formatTimeAgo } from "@/utils/helperTwo";
import CustomButton from "../forms/CustomButton";

type Prop = {
  toggleModal: () => void;
  publicId: string;
  onEdit: () => void;
  onCancel: () => void;
};

const EditPost = (props: Prop) => {
  const { userObject } = useAppSelector((state: RootState) => state.auth);

  const { data, isLoading: getContentByIdIsLoading } = useGetData({
    url: `contents/${props.publicId}`,
    queryKey: ["GetContentsById"],
  });

  const { data: profileData, isLoading } = useFetchProfile(userObject);

  const { onEdit, onCancel } = props;
  return (
    <div>
      {getContentByIdIsLoading || isLoading ? (
        <Loader />
      ) : (
        <PostCard
          {...props}
          avatar={profileData?.data?.profilePic}
          ifParagraph
          paragraphOne={data?.data?.message}
          profileName={profileData?.data?.displayName}
          handle={`@${profileData?.data?.username}`}
          time={formatTimeAgo(data?.createdDate)}
          isEditMode={true}
          onContentClick={onEdit}
          ifIcon={false}
          timeLineImage={data?.data?.mediaFiles}
          className="rounded-2xl max-w-[806px] bg-overlay bg-grey_20"
          headerActions={
            <div className="flex items-center pb-6 ml-auto">
              <CustomButton
                onClick={props.toggleModal}
                variant="secondary"
                className="text-xs mr-6 "
              >
                Cancel
              </CustomButton>
              <CustomButton variant="primary" className="text-xs px-3 w-[84px]">
                Save
              </CustomButton>
            </div>
          }
        />
      )}
    </div>
  );
};

export { EditPost };
