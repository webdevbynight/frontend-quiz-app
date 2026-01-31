import { expect, it, vi } from "vitest";

import { requestData } from "../../ts/data/request-data.js";

global.fetch = vi.fn();

it("should throw an error if the requested data are not found", () => {
  vi.mocked(global.fetch).mockResolvedValue(
    new Response(JSON.stringify({ message: "Not Found" }), {
      status: 404,
      statusText: "Not Found"
    })
  );
  expect(requestData()).rejects.toThrowError("Failed to fetch data: 404: Not Found");
});
it("should return the requested data if found", async () => {
  const mockedData = { id: 1, name: "Test Data" };
  vi.mocked(global.fetch).mockResolvedValue(
    new Response(JSON.stringify(mockedData), {
      status: 200,
      statusText: "OK"
    })
  );
  expect(await requestData()).toEqual(mockedData);
});
