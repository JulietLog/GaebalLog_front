import Image from "next/image";
import React from "react";
import { useSetRecoilState } from "recoil";

import { activatedModalIdAtom } from "@/hooks/useModalController";

import profile from "../../../public/assets/icons/common/profile_light.png";

interface profileImage {
  idForModal: string | number;
  profileImage: string;
}

const ProfileImage: React.FC<profileImage> = ({ idForModal, profileImage }) => {
  const setActivatedId = useSetRecoilState(activatedModalIdAtom);

  return (
    <button
      className={`relative w-10 h-10`}
      data-testid={`profile_${idForModal}`}
      onClick={() => setActivatedId(idForModal)}
    >
      <Image
        className="rounded-full object-cover"
        src={profileImage ?? profile}
        fill
        sizes="80px"
        alt="프사"
      />
    </button>
  );
};

export default ProfileImage;
