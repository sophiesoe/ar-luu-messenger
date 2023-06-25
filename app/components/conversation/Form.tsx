"use client";

import useConversation from "@/app/hooks/useConversation";
import axios from "axios";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import { HiPaperAirplane, HiPhoto } from "react-icons/hi2";
import { CldUploadButton } from "next-cloudinary";
import MessageInput from "@/app/commons/inputs/MessageInput";
import { useRouter } from "next/navigation";

const Form = () => {
  const { conversationId } = useConversation();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      message: "",
    },
  });
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setValue("message", "", { shouldValidate: true });
    axios.post("/api/messages", {
      ...data,
      conversationId,
    });
  };

  const handleUpload = (result: any) => {
    axios.post("/api/messages", {
      image: result.info.secure_url,
      conversationId,
    });
  };

  return (
    <div
      className="
        flex 
        w-full 
        items-center 
        gap-2 
        bg-primary-50
        px-4 
        py-4
        lg:gap-4
      "
    >
      <CldUploadButton
        options={{ maxFiles: 1 }}
        onUpload={handleUpload}
        uploadPreset="vcvte6mb"
      >
        <HiPhoto size={25} className="cursor-pointer text-primary-300" />
      </CldUploadButton>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex w-full items-center gap-2 lg:gap-4"
      >
        <MessageInput
          id="message"
          register={register}
          errors={errors}
          required
          placeholder="Type a message"
        />
        <button
          type="submit"
          className="
            hover:bg-sky-600 
            cursor-pointer 
            rounded-full 
            bg-primary-300 
            p-2
            transition
            duration-300
          "
        >
          <HiPaperAirplane size={18} className="text-primary-50" />
        </button>
      </form>
    </div>
  );
};

export default Form;
