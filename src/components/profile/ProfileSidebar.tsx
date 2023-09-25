"use client";

import Image from "next/image";
import React from "react";
import { useRecoilValue } from "recoil";

import { userAtom } from "@/hooks/useUserAuth";

import default_profile from "../../../public/assets/images/common/default_profile.png";

const ProfileSidebar = () => {
  const { nickname, profileImg } = useRecoilValue(userAtom);

  return (
    <div className="flex flex-col gap-[32px] py-[80px] pr-[76px]">
      <Image
        src={profileImg ?? default_profile}
        alt="프로필 사진"
        width={200}
        height={200}
        className="h-[200px] !important rounded-full"
        layout="fixed"
        objectFit="cover"
      />
      <span className="text-[24px] text-center font-bold">{nickname}</span>
      <div className="flex flex-col gap-10">
        <div className="flex justify-between">
          <p>나를 추가한 이웃</p>
          <span className="text-[#967AC3]">{13}</span>
        </div>
        <div className="flex justify-between">
          <p>내가 추가한 이웃</p>
          <span className="text-[#967AC3]">{13}</span>
        </div>
      </div>
    </div>
  );
};

export default ProfileSidebar;
