import { afterEach, beforeEach, expect, it, vi } from "vitest";

import { getAllSubjects } from "../../ts/data/get-all-subjects.js";
import { requestData } from "../../ts/data/request-data.js";
import { mockedData } from "./fixtures/mocked-data.js";

beforeEach(() => {
  vi.mock("../../ts/data/request-data.js", () => ({ requestData: vi.fn() }));
});
afterEach(() => {
  vi.clearAllMocks();
});

it("should get all subjects", async () => {
  const expected = [
    { id: "sample-quiz", title: "Sample Quiz", icon: "./images/icon-sample-quiz.svg", themeColour: "#123456", questions: 2 },
    { id: "fake-quiz", title: "Fake Quiz", icon: "./images/icon-fake-quiz.svg", themeColour: "#abcdef", questions: 1 }
  ];
  vi.mocked(requestData).mockResolvedValue({ quizzes: mockedData });
  expect(await getAllSubjects()).toEqual(expected);
});
