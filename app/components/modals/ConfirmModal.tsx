"use client";

import React, { useCallback, useState, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { FiAlertTriangle } from "react-icons/fi";
import axios from "axios";
import { useRouter } from "next/navigation";
import useConversation from "@/app/hooks/useConversation";
import { toast } from "react-hot-toast";
import Modal from "./Modal";
import Button from "../../commons/buttons/Button";

interface ConfirmModalProps {
  isOpen?: boolean;
  onClose: () => void;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({ isOpen, onClose }) => {
  const router = useRouter();
  const { conversationId } = useConversation();
  const [isLoading, setIsLoading] = useState(false);

  const onDelete = useCallback(() => {
    setIsLoading(true);

    axios
      .delete(`/api/conversations/${conversationId}`)
      .then(() => {
        onClose();
        router.push("/conversations");
        router.refresh();
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
  }, [router, conversationId, onClose]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-center">
          <FiAlertTriangle
            className="
              text-danger-400"
            aria-hidden="true"
            size={35}
          />
        </div>
        <Dialog.Title
          as="h3"
          className="text-center text-base font-semibold leading-6"
        >
          Delete whole conversation?
        </Dialog.Title>
        <div>
          <p className="text-sm text-gray">
            Are you sure you want to delete this conversation? Once you do that,{" "}
            <span className="font-semibold text-black">
              this action cannot be undone.
            </span>
          </p>
        </div>
      </div>
      <div className="mt-4 flex flex-row-reverse items-center gap-3 lg:mt-5">
        <Button disabled={isLoading} danger onClick={onDelete}>
          Delete
        </Button>
        <Button disabled={isLoading} secondary onClick={onClose}>
          Cancel
        </Button>
      </div>
    </Modal>
  );
};

export default ConfirmModal;
