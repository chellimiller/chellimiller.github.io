const {
  toNumberish,
  parseTitle,
  parseDate,
  generatePostId,
  generateCorrectMarkdown,
} = require("./util");

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
    expect(result).toBe("Q7LkbzYbLLO7Ygr");
  });
  it("should convert similar post titles differently", () => {
    // Arrange
    const postTitle = "2022-02-23-this-is-it-yo-wow";

    // Act
    const result = generatePostId(postTitle);

    // Assert
    expect(result).toBe("GYpDOqAbLLO7Ygr");
  });
});

describe("generateCorrectMarkdown", () => {
  it("should add permalink", () => {
    // Arrange
    const title = "2022-02-23-this-is-wow";
    const markdown = `---
title: Just hack'n
description: Nothing to see here
---
 
This is some text about some stuff that happened sometime ago`;

    // Act
    const result = generateCorrectMarkdown(title, markdown);

    // Assert
    expect(result).toBe(`---
permalink: /articles/Q7LkbzYbLLO7Ygr/
title: Just hack'n
description: Nothing to see here
---
 
This is some text about some stuff that happened sometime ago`);
  });
});
