const {toNumberish, parseTitle, parseDate, generatePostId} = require("./index");

describe("parseTitle", () => {
  it("should remove date", () => {
    // Arrange
    const postTitle = "2022-02-23-this-is-wow";

    // Act
    const result = parseTitle(postTitle);

    // Assert
    expect(result).toBe("thisiswow");
  });

  it("should remove extension", () => {
    // Arrange
    const postTitle = "2022-02-23-this-is-wow.test";

    // Act
    const result = parseTitle(postTitle);

    // Assert
    expect(result).toBe("thisiswow");
  });
});

describe("toNumberish", () => {
  it("should convert string", () => {
    // Arrange
    const postTitle = "-this-is-wow";

    // Act
    const result = toNumberish(postTitle);

    // Assert
    expect(result).toBe(83185284822656);
  });
});

describe("parseDate", () => {
  it("should parse date from post title", () => {
    // Arrange
    const postTitle = "2022-02-23-this-is-wow";

    // Act
    const result = parseDate(postTitle);

    // Assert
    expect(result).toEqual({year: 2022, month: 2, day: 23});
  });
});

describe("generatePostId", () => {
  it("should convert post title", () => {
    // Arrange
    const postTitle = "2022-02-23-this-is-wow";

    // Act
    const result = generatePostId(postTitle);

    // Assert
    expect(result).toBe("9rrxcmhYH1V6qZx3j3");
  });
});
