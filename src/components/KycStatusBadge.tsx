type KycStatus =
  | "Not Started"
  | "In Progress"
  | "In Review"
  | "Approved"
  | "Declined"
  | "Abandoned"
  | "Expired";

const getKycStatusClassName = (status: KycStatus) => {
  switch (status) {
    case "Approved":
      return "border-green-200 bg-green-50 text-green-700";

    case "Declined":
      return "border-red-200 bg-red-50 text-red-700";

    case "In Progress":
    case "In Review":
      return "border-yellow-200 bg-yellow-50 text-yellow-700";

    case "Abandoned":
    case "Expired":
      return "border-orange-200 bg-orange-50 text-orange-700";

    default:
      return "border-gray-200 bg-gray-50 text-gray-700";
  }
};

export const KycStatusBadge = ({ status }: { status: KycStatus }) => {
  return (
    <span
      className={`inline-flex rounded-full border px-3 py-1 text-xs font-medium ${getKycStatusClassName(
        status,
      )}`}
    >
      {status}
    </span>
  );
};
