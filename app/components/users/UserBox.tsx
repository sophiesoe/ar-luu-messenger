import Avatar from "@/app/commons/avatar/Avatar";
import { User } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import LoadingModal from "../modals/LoadingModal";

interface UserBoxProps {
  data: User;
}

const UserBox: React.FC<UserBoxProps> = ({ data }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = useCallback(() => {
    setIsLoading(true);

    axios
      .post("/api/conversations", { userId: data.id })
      .then((data) => {
        router.push(`/conversations/${data.data.id}`);
      })
      .finally(() => setIsLoading(false));
  }, [data, router]);
  return (
    <>
      {isLoading && <LoadingModal />}
      <div
        onClick={handleClick}
        className="
          relative 
          flex 
          w-full
          cursor-pointer
          items-center
          space-x-3 
          rounded-lg
          bg-primary-50
          p-3
          transition
          hover:bg-primary-100
        "
      >
        <Avatar user={data} />
        <div className="min-w-0 flex-1">
          <div className="focus:outline-none">
            <span className="absolute inset-0" aria-hidden="true" />
            <div className="mb-1 flex items-center justify-between">
              <p className="text-md font-semibold">{data.name}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserBox;
