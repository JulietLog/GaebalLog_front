import React from "react";
import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Detail from "@/app/tech/[postId]/page";
import { renderLoggedInLayout } from "@/utils/util-test";

const renderDetail = {
  loggedIn: (postId: string) => {
    renderLoggedInLayout(<Detail params={{ postId }} />, {
      withHeader: true,
    });
  },
};
describe("다른 사람 포스트에 대한 테스트", () => {
  test("다른사람의 글을 보면, 삭제 버튼이 보이지 않아야 함.", async () => {
    renderDetail.loggedIn("29");
    await waitFor(() => {
      screen.getByText("디테일 페이지 제목");
    });
    expect(screen.queryByText("글 수정")).not.toBeInTheDocument();
    expect(screen.queryByText("글 삭제")).not.toBeInTheDocument();
  });
});
describe("내가 작성한 포스트에 대한 테스트", () => {
  beforeEach(() => {
    renderDetail.loggedIn("37");
  });

  test("서버에서 받아온 본문 렌더링", async () => {
    await waitFor(() => {
      screen.getByText("디테일 페이지 제목");
    });
  });
  test("글 삭제 기능 테스트", async () => {
    const deleteBtn = await screen.findByText("글 삭제");
    await userEvent.click(deleteBtn);
    const confirmBtn = screen.getByText("예");
    await userEvent.click(confirmBtn);
    expect(window.alert).toBeCalledWith("해당 글이 삭제되었습니다.");
  });
  test("글 수정 기능 테스트", async () => {
    const editBtn = await screen.findByText("글 수정");
    await userEvent.click(editBtn);
  });
});

// describe("댓글 컴포넌트 테스트", () => {
//   test("디테일 페이지 댓글 렌더링 테스트", async () => {
//     expect(await screen.findByText("yeon")).toBeInTheDocument();
//   });

//   test("답글쓰기를 누르면 댓글 작성창이 1개만 렌더링 되어야함. 기본 댓글창까지 최종 2개가 렌더링 되는 것을 확인", async () => {
//     expect(
//       (await screen.findAllByPlaceholderText("댓글을 입력해주세요.")).length,
//     ).toBe(1);

//     await userEvent.click(await screen.findByTestId("addCommentButton_1"));
//     await userEvent.click(await screen.findByTestId("addCommentButton_2"));

//     expect(
//       (await screen.findAllByPlaceholderText("댓글을 입력해주세요.")).length,
//     ).toBe(2);

//     await userEvent.click(await screen.findByTestId("addCommentButton_1"));

//     expect(
//       (await screen.findAllByPlaceholderText("댓글을 입력해주세요.")).length,
//     ).toBe(2);
//   });
// });

// describe("삭제된 댓글 렌더링 테스트", () => {
//   test("댓글 삭제됐을 때 테스트", async () => {
//     render(<CommentsList {...comment} />, { wrapper: Provider });

//     expect(screen.queryByText("삭제 된 댓글 입니다.")).not.toBeInTheDocument();

//     render(<CommentsList {...deletedComment} />, { wrapper: Provider });

//     expect(await screen.findByText("삭제 된 댓글 입니다.")).toBeInTheDocument();
//   });

//   test("대댓글 삭제됐을 때 테스트", async () => {
//     render(<ChildComment {...comment} />, { wrapper: Provider });

//     expect(screen.queryByText("삭제 된 댓글 입니다.")).not.toBeInTheDocument();

//     render(<ChildComment {...deletedComment} />, { wrapper: Provider });

//     expect(await screen.findByText("삭제 된 댓글 입니다.")).toBeInTheDocument();
//   });

//   test("대대댓글 삭제됐을 때 테스트", async () => {
//     render(<GrandChildComment {...comment} />, { wrapper: Provider });

//     expect(screen.queryByText("삭제 된 댓글 입니다.")).not.toBeInTheDocument();

//     render(<GrandChildComment {...deletedComment} />, { wrapper: Provider });

//     expect(await screen.findByText("삭제 된 댓글 입니다.")).toBeInTheDocument();
//   });
// });

// test("대대댓글은 답글쓰기가 보이지 않아야 함.", async () => {
//   render(<GrandChildComment {...comment} />, { wrapper: Provider });
//   expect(screen.queryByText("답글쓰기")).not.toBeInTheDocument();
// });
