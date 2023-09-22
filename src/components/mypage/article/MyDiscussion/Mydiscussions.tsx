import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";

import SortBar from "@/components/commonUI/SortBar";

import DropDown from "../../DropDown";

import MyDiscussion from "./elements/MyDiscussion";

const myDiscussionTypeList = ["내가 쓴 토의", "상대방이 쓴 토의"];

const Mydiscussions = () => {
  const [dropDownType, setDropDownType] = React.useState("내가 쓴 토의");
  const [tab, setTab] = React.useState<sortTab>("조회 순");

  const { data } = useQuery({
    queryKey: ["myWritten"],
    queryFn: async () => await axios.get("/api/mypage/mydiscussion"),
  });
  const discussionList = data?.data.discussions as discussions;

  return (
    <div className="flex w-full h-full flex-col px-[44px] pb-[24px]">
      <div className="flex">
        <DropDown
          tab="mydiscussions"
          types={myDiscussionTypeList}
          dropDownType={dropDownType}
          setDropDownType={setDropDownType}
        />
        <div className="self-end mb-1 ml-auto">
          <SortBar tab={tab} setTab={setTab} option="mypage" />
        </div>
      </div>
      <article className="flex gap-[24px]">
        {discussionList?.map((discussion: beforeDiscussion) => {
          return (
            <MyDiscussion
              key={`post${discussion.chatListId}`}
              discussion={discussion}
            />
          );
        })}
      </article>
    </div>
  );
};

export default Mydiscussions;
