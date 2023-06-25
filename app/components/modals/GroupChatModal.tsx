"use client";

import { User } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import Modal from "./Modal";
import Input from "@/app/commons/inputs/Input";
import Button from "@/app/commons/buttons/Button";
import Select from "@/app/commons/select/Select";

interface GroupChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  users: User[];
}

const GroupChatModal: React.FC<GroupChatModalProps> = ({
  isOpen,
  onClose,
  users,
}) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const {
    watch,
    setValue,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      members: [],
      name: "",
    },
  });

  const members = watch("members");

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    axios
      .post("/api/conversations", {
        ...data,
        isGroup: true,
      })
      .then(() => {
        router.refresh();
        onClose();
      })
      .catch(() => {
        toast.error("Something went wrong!", {
          icon: "🥺",
          style: {
            background: "#E0EEF5",
            color: "#65AACD",
          },
        });
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <Modal onClose={onClose} isOpen={isOpen}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-10">
          <div>
            <h2
              className="
                text-base
                font-semibold 
                leading-7 
                text-primary-500
              "
            >
              Create a group chat
            </h2>
            <p className="mt-1 text-sm leading-6">
              Create a chat with more than{" "}
              <span className="font-semibold">2 people</span>.
            </p>
            <div className="mt-10 flex flex-col gap-y-8">
              <Input
                disabled={isLoading}
                label="Group Name"
                id="name"
                errors={errors}
                required
                register={register}
              />
              <Select
                disabled={isLoading}
                label="Members"
                options={users.map((user) => ({
                  value: user.id,
                  label: user.name,
                }))}
                onChange={(value) =>
                  setValue("members", value, {
                    shouldValidate: true,
                  })
                }
                value={members}
              />
            </div>
          </div>
        </div>
        <div className="mt-6 flex items-center justify-end gap-x-6">
          <Button
            disabled={isLoading}
            onClick={onClose}
            type="button"
            secondary
          >
            Cancel
          </Button>
          <Button disabled={isLoading} type="submit">
            Create
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default GroupChatModal;
