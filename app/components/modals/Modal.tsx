"use client";

import React, { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { IoClose } from "react-icons/io5";

interface ModalProps {
  isOpen?: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div
            className="
              fixed 
              inset-0 
              bg-primary-300
              bg-opacity-50 
              transition-opacity
            "
          />
        </Transition.Child>

        <div
          className="0 fixed inset-0
        overflow-y-auto"
        >
          <div
            className="
              flex 
              min-h-full 
              items-center 
              justify-center 
              p-4 
              text-center 
              sm:p-0
            "
          >
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel
                className="
                  relative 
                  w-full 
                  transform 
                  overflow-hidden 
                  rounded-lg 
                  bg-primary-50 
                  px-4
                  pb-4 
                  pt-5 
                  text-left 
                  shadow-xl
                  transition-all
                  sm:my-8 
                  sm:w-full 
                  sm:max-w-lg 
                  sm:p-6
                "
              >
                <div
                  className="
                    absolute 
                    right-0 
                    top-0 
                    z-10 
                    hidden 
                    pr-4 
                    pt-4
                    sm:block
                  "
                >
                  <button
                    type="button"
                    className="
                      rounded-md p-2 text-gray hover:bg-primary-100 hover:text-white focus:outline-none
                    "
                    onClick={onClose}
                  >
                    <span className="sr-only">Close</span>
                    <IoClose className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
                {children}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default Modal;
