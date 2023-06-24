import { IconType } from "react-icons";
interface AuthSocialButtonProps {
  icon: IconType;
  onClick?: () => void;
}

const AuthSocialButton: React.FC<AuthSocialButtonProps> = ({
  icon: Icon,
  onClick,
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="transition-color inline-flex w-full justify-center  rounded-lg px-4 py-2 text-primary-400 shadow-sm ring-1 ring-primary-100 duration-500 hover:bg-primary-300 hover:text-white focus:outline-offset-0"
    >
      <Icon />
    </button>
  );
};

export default AuthSocialButton;
