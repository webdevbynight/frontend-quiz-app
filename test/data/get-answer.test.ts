import { afterEach, beforeEach, expect, it, vi } from "vitest";

import { getAnswer } from "../../ts/data/get-answer.js";
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
  expect(getAnswer("non-existent-quiz", 1)).rejects.toThrowError("Quiz with id `non-existent-quiz` not found");
});
it("should throw an error if the question is not found", () => {
  expect(getAnswer("sample-quiz", 999)).rejects.toThrowError("Question 999 not found in quiz `sample-quiz`");
});
it("should throw an error if the answer is not found", () => {
  expect(getAnswer("fake-quiz", 1)).rejects.toThrowError("Answer not found for question 1 in quiz `fake-quiz`");
});
it("should return the question title and options if the question is found", async () => {
  expect(await getAnswer("sample-quiz", 1)).toBe(0);
});
