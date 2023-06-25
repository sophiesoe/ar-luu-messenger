"use client";

import React, { useCallback, useState } from "react";
import { Dialog } from "@headlessui/react";
import { FiAlertTriangle } from "react-icons/fi";
import axios from "axios";
import { useRouter } from "next/navigation";
import useConversation from "@/app/hooks/useConversation";
import { toast } from "react-hot-toast";
import Modal from "./Modal";
import Button from "../commons/buttons/Button";

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
      .catch(() => toast.error("Something went wrong!"))
      .finally(() => setIsLoading(false));
  }, [router, conversationId, onClose]);

  return (
    <Modal isOpen={isOpen} onCloseModal={onClose}>
      <div className="sm:flex sm:items-start">
        <div
          className="
            h-25 
            w-25 
            mx-auto 
            flex 
            flex-shrink-0 
            items-center 
            justify-center 
            rounded-full 
            bg-danger-50 
            sm:mx-0 
            sm:h-10 
            sm:w-10
          "
        >
          <FiAlertTriangle
            className="h-6 w-6 text-danger-500"
            aria-hidden="true"
          />
        </div>
        <div
          className="
            mt-3 
            text-center 
            sm:ml-4 
            sm:mt-0 
            sm:text-left
          "
        >
          <Dialog.Title as="h3" className="text-base font-semibold leading-6">
            Delete conversation
          </Dialog.Title>
          <div className="mt-2">
            <p className="text-sm text-gray">
              Are you sure you want to delete this conversation? Once you do
              that,
              <span className="font-semibold text-black">
                This action cannot be undone.
              </span>
            </p>
          </div>
        </div>
      </div>
      <div className="mt-5 gap-3 sm:mt-4 sm:flex sm:flex-row-reverse">
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
