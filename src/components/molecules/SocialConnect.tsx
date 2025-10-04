import AccountBackButton from "@/components/forms/AccountBackButton";
import SocialButton from "@/components/forms/SocialButton";

interface SocialConnectProps {
  image: string;
  name: string;
}

const SocialConnect = ({ image, name }: SocialConnectProps) => {
  return (
    <div>
      <AccountBackButton />
      <SocialButton buttonText={`Sign in to ${name}`} image={image} />
    </div>
  );
};

export { SocialConnect };
