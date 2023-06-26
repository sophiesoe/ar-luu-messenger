"use client";

import { Fragment, useMemo, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { IoClose, IoTrash } from "react-icons/io5";
import { Conversation, User } from "@prisma/client";
import { format } from "date-fns";
import useOtherUser from "@/app/hooks/useOtherUsers";
import Avatar from "@/app/commons/avatar/Avatar";
import AvatarGroup from "@/app/commons/avatar/AvatarGroup";

interface ProfileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirmOpen: () => void;
  data: Conversation & {
    users: User[];
  };
}

const ProfileDrawer: React.FC<ProfileDrawerProps> = ({
  isOpen,
  onClose,
  data,
  onConfirmOpen,
}) => {
  const otherUser = useOtherUser(data);

  const joinedDate = useMemo(() => {
    return format(new Date(otherUser.createdAt), "PP");
  }, [otherUser.createdAt]);

  const title = useMemo(() => {
    return data.name || otherUser.name;
  }, [data.name, otherUser.name]);

  const statusText = useMemo(() => {
    if (data.isGroup) {
      return `${data.users.length} members`;
    }

    return "Active now";
  }, [data]);

  return (
    <div>
      <Transition.Root show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={onClose}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div
              className="fixed inset-0 bg-primary-300
              bg-opacity-50 "
            />
          </Transition.Child>

          <div className="fixed inset-0 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                <Transition.Child
                  as={Fragment}
                  enter="transform transition ease-in-out duration-500"
                  enterFrom="translate-x-full"
                  enterTo="translate-x-0"
                  leave="transform transition ease-in-out duration-500"
                  leaveFrom="translate-x-0"
                  leaveTo="translate-x-full"
                >
                  <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                    <div className="flex h-full flex-col overflow-y-auto bg-primary-50 py-6 shadow-xl">
                      <div className="px-4 sm:px-6">
                        <div className="flex items-start justify-end">
                          <div className="ml-3 flex h-7 items-center">
                            <button
                              type="button"
                              className="rounded-md p-2 text-gray hover:bg-primary-100 hover:text-white focus:outline-none"
                              onClick={onClose}
                            >
                              <span className="sr-only">Close panel</span>
                              <IoClose size={24} aria-hidden="true" />
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="relative mt-6 flex-1 px-4 sm:px-6">
                        <div className="flex flex-col items-center">
                          <div className="mb-2">
                            {data.isGroup ? (
                              <AvatarGroup users={data.users} />
                            ) : (
                              <Avatar user={otherUser} />
                            )}
                          </div>
                          <p className="font-semibold">{title}</p>
                          <div className="text-sm text-gray">{statusText}</div>
                          <div className="my-8 flex gap-10">
                            <div
                              onClick={onConfirmOpen}
                              className="flex cursor-pointer flex-col items-center gap-3 hover:opacity-75"
                            >
                              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-danger-300 text-white">
                                <IoTrash size={20} />
                              </div>
                              <div className="text-sm font-light text-danger-300">
                                Delete
                              </div>
                            </div>
                          </div>
                          <div className="w-full pb-5 pt-5 sm:px-0 sm:pt-0">
                            <dl className="space-y-8 px-4 sm:space-y-6 sm:px-6">
                              {data.isGroup && (
                                <div>
                                  <dt
                                    className="
                                  text-gray-500 
                                  text-sm 
                                  font-medium 
                                  sm:w-40 
                                  sm:flex-shrink-0
                                "
                                  >
                                    Emails
                                  </dt>
                                  <dd
                                    className="
                                  text-gray-900 
                                  mt-1 
                                  text-sm 
                                  sm:col-span-2
                                "
                                  >
                                    {data.users
                                      .map((user) => user.email)
                                      .join(", ")}
                                  </dd>
                                </div>
                              )}
                              {!data.isGroup && (
                                <div>
                                  <dt
                                    className="
                                  text-sm
                                  font-medium 
                                  text-gray 
                                  sm:w-40 
                                  sm:flex-shrink-0
                                "
                                  >
                                    Email
                                  </dt>
                                  <dd
                                    className="
                                  text-gray-900 
                                  mt-1 
                                  text-sm 
                                  sm:col-span-2
                                "
                                  >
                                    {otherUser.email}
                                  </dd>
                                </div>
                              )}
                              {!data.isGroup && (
                                <>
                                  <hr className="text-primary-100" />
                                  <div>
                                    <dt
                                      className="
                                    text-sm 
                                    font-medium 
                                    text-gray 
                                    sm:w-40 
                                    sm:flex-shrink-0
                                  "
                                    >
                                      Joined Ar Luu
                                    </dt>
                                    <dd
                                      className="
                                    text-gray-900 
                                    mt-1 
                                    text-sm 
                                    sm:col-span-2
                                  "
                                    >
                                      <time dateTime={joinedDate}>
                                        {joinedDate}
                                      </time>
                                    </dd>
                                  </div>
                                </>
                              )}
                            </dl>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  );
};

export default ProfileDrawer;
