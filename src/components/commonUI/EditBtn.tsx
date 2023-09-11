import React from "react";
import { useRecoilState } from "recoil";
import dynamic from "next/dynamic";

import { modalAtom } from "@/constants/global/atoms";
import { BG_COLOR, TEXT_COLOR } from "@/constants/global/colors";

const KeywordSearch = dynamic(
  () => import("../../components/modal/keywordSearch/KeywordSearch"),
);

const EditBtn: React.FC<{ position: "top" | "bottom" | "disussion" }> = ({
  position,
}) => {
  const [isModal, setIsModal] = useRecoilState<boolean>(modalAtom);

  const editPosition =
    position === "top" || position === "disussion" ? "top-[26px]" : "";

  const buttonStyles = `${TEXT_COLOR.primary} ${
    position === "bottom"
      ? `text-[24px] sticky w-full pb-4 text-end bottom-0 ${BG_COLOR.general02}`
      : "text-[16px] absolute right-[25px]"
  } ${editPosition}`;

  return (
    <>
      <button
        className={buttonStyles}
        onClick={() => setIsModal((prev) => !prev)}
        onMouseOver={() =>
          import("../../components/modal/keywordSearch/KeywordSearch")
        }
      >
        + Edit
      </button>
      {isModal && <KeywordSearch />}
    </>
  );
};

export default EditBtn;
