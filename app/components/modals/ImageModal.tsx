"use client";

import Image from "next/image";
import Modal from "./Modal";

interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  src?: string | null;
}

const ImageModal: React.FC<ImageModalProps> = ({ src, isOpen, onClose }) => {
  if (!src) return null;
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="h-80 w-80">
        <Image
          className="object-contain"
          fill
          alt="Image"
          src={src}
          loading="lazy"
        />
      </div>
    </Modal>
  );
};

export default ImageModal;
