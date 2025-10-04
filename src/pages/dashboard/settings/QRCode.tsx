import AccountBackButton from "@/components/forms/AccountBackButton";
import CustomButton from "@/components/forms/CustomButton";
import Typography from "@/components/forms/Typography";
import qrCode from "@/assets/QRCode.svg";

const QRCode = () => {
  return (
    <div>
      <AccountBackButton showBack={false} showMobileBack moduleName="QR Code" />
      <Typography variant="p2" className="text-grey_800 pt-4 pl-4">
        This QR code will lead to your profile page when scanned
      </Typography>

      <div className="flex flex-col items-center justify-center mt-6">
        <img src={qrCode} alt="qrCode" />

        <div className="mt-8 flex w-1/4">
          <CustomButton primaryButtonSize="xs" className="px-4">
            Download QR code
          </CustomButton>
        </div>
      </div>
    </div>
  );
};

export { QRCode };
