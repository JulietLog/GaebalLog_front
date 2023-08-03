import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import RootLayout from "@/app/layout";
import Home from "@/app/page";
import utilDelay from "@/utils/util-delay";

test("edit 버튼을 누르면 키워드 검색 모달이 열리고 Cancle 버튼을 누르면 닫힌다.", async () => {
  render(
    <RootLayout>
      <Home />
    </RootLayout>,
  );
  await userEvent.click(screen.getByRole("button", { name: /Edit/ }));
  expect(
    await screen.findByRole("button", { name: "Cancle" }),
  ).toBeInTheDocument();

  await userEvent.click(screen.getByRole("button", { name: "Cancle" }));
  expect(
    screen.queryByRole("button", { name: "Cancle" }),
  ).not.toBeInTheDocument();
});

describe("키워드 검색 모달 API 요청 테스트", () => {
  beforeEach(async () => {
    render(
      <RootLayout>
        <Home />
      </RootLayout>,
    );
    await userEvent.click(screen.getByRole("button", { name: /Edit/ }));
    await utilDelay(100);
  });

  test("현재 나의 키워드 get 요청 테스트", async () => {
    const expectedItemCount = 14;
    const items = await screen.findAllByTestId(/myCategory/);
    expect(items.length).toBe(expectedItemCount);
  });

  test("실시간 인기 키워드 get 요청 테스트", async () => {
    const expectedItemCount = 12;
    const items = await screen.findAllByTestId(/trendCategory/);
    expect(items.length).toBe(expectedItemCount);
  });

  test("실시간 검색 get 요청 테스트", async () => {
    const input = await screen.findByTestId("realTimeInput");
    expect(input).toBeInTheDocument();
    input.focus();
    expect(screen.queryByText("리액트네이티브")).not.toBeInTheDocument();
    await userEvent.type(input, "리액트");
    expect(await screen.findByText("리액트네이티브")).toBeInTheDocument();
  });
});

describe("실시간 검색 기능 테스트", () => {
  beforeEach(async () => {
    render(
      <RootLayout>
        <Home />
      </RootLayout>,
    );
    await userEvent.click(screen.getByRole("button", { name: /Edit/ }));
    await utilDelay(100);
    await userEvent.type(await screen.findByTestId("realTimeInput"), "리액트");
  });

  test("실시간 검색 모달 여닫기 테스트", async () => {
    await userEvent.click(await screen.findByTestId("realTimeInput"));
    expect(await screen.findByText("리액트네이티브")).toBeInTheDocument();
    await userEvent.click(screen.getByText("Add my keywords"));
    expect(screen.queryByText("리액트네이티브")).not.toBeInTheDocument();
  });
});
