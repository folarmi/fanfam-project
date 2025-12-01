import { ConfirmActionModal } from "@/components/modals/ConfirmActionModal";
import Modal from "@/components/modals/Modal";
import { useCustomMutation } from "@/hooks/apiCalls";
import { useState } from "react";
import { useParams } from "react-router-dom";

const UnsubscribedProfile = () => {
  const { id } = useParams();
  const [confirmSubscription, setConfirmSubscription] = useState(false);

  const toggleSubscriptionModal = () => {
    setConfirmSubscription(!confirmSubscription);
  };

  const deleteFreeTrialLinkMutation = useCustomMutation({
    endpoint: `subscriptions/subscribe/${id}`,
    // method: "delete",
    successMessage: () => "Free Trial Link deleted successfully",
    onSuccessCallback: () => {
      // refetch();
    },
  });

  return (
    <div>
      <p>UnsubscribedProfile</p>

      <Modal show={confirmSubscription} toggleModal={toggleSubscriptionModal}>
        <div className="p-4">
          <ConfirmActionModal
            toggleModal={toggleSubscriptionModal}
            message=" Are you sure you want to subscribe to this creator?"
            title="Subscribe to Creator"
            deleteFn={deleteFreeTrialLinkMutation.mutate}
            isDeleting={deleteFreeTrialLinkMutation.isPending}
            buttonText="Yes, Subscribe"
          />
        </div>
      </Modal>
    </div>
  );
};

export { UnsubscribedProfile };
