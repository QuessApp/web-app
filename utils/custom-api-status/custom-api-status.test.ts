import { customAPIError, customAPISuccess } from "./custom-api-status"

describe("Custom API Status", () => {
  describe("Custom API Errors", () => {
    it("should handle errors correctly", () => {
      expect(customAPIError(new Error("foobar"))).toMatchObject({
        ok: false,
        message: "foobar",
        data: null,
      })

      expect(customAPIError({ message: "my error" })).toMatchObject({
        ok: false,
        message: "my error",
        data: null,
      })

      expect(
        customAPIError({
          response: {
            data: {
              message: "custom error",
            },
          },
        })
      ).toMatchObject({
        ok: false,
        message: "custom error",
        data: null,
      })
    })

    it("throw a default error if function can not handle error", () => {
      expect(customAPIError({})).toMatchObject({
        ok: false,
        message: "An Internal Error has Occurred",
        data: null,
      })

      expect(customAPIError("blabla")).toMatchObject({
        ok: false,
        message: "An Internal Error has Occurred",
        data: null,
      })
    })
  })

  describe("Custom API Success", () => {
    it("should return data correctly", () => {
      expect(customAPISuccess("foobar")).toMatchObject({
        ok: true,
        message: null,
        data: "foobar",
      })

      expect(customAPISuccess({ foo: true })).toMatchObject({
        ok: true,
        message: null,
        data: {
          foo: true,
        },
      })

      expect(customAPISuccess({ items: [1, 3, 2] })).toMatchObject({
        ok: true,
        message: null,
        data: {
          items: [1, 3, 2],
        },
      })
    })

    it("should return data as undefined if no data is passed", () => {
      expect(customAPISuccess(undefined)).toMatchObject({
        ok: true,
        message: null,
        data: undefined,
      })
    })
  })
})
