const {NON_ALPHANUMERIC} = require("./regex");

describe("NON_ALPHANUMERIC", () => {
  it("should match underscores", () => {
    // Act
    const result = "hello_world".match(NON_ALPHANUMERIC);

    // Assert
    expect(result).toEqual(["_"]);
  });
});
