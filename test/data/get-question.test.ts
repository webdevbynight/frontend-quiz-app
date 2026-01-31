import { afterEach, beforeEach, expect, it, vi } from "vitest";

import { getQuestion } from "../../ts/data/get-question.js";
import { requestData } from "../../ts/data/request-data.js";
import { mockedData } from "./fixtures/mocked-data.js";

beforeEach(() => {
  vi.mock("../../ts/data/request-data.js", () => ({ requestData: vi.fn() }));
  vi.mocked(requestData).mockResolvedValue({ quizzes: mockedData });
});
afterEach(() => {
  vi.clearAllMocks();
});

it("should throw an error if the quiz is not found", () => {
  expect(getQuestion("non-existent-quiz", 1)).rejects.toThrowError("Quiz with id `non-existent-quiz` not found");
});
it("should throw an error if the question is not found", () => {
  expect(getQuestion("sample-quiz", 999)).rejects.toThrowError("Question 999 not found in quiz `sample-quiz`");
});
it("should return the question title and options if the question is found", async () => {
  expect(await getQuestion("sample-quiz", 1)).toEqual({ title: "What is this question?", options: ["Foo", "Bar", "Baz", "Qux"] });
});
