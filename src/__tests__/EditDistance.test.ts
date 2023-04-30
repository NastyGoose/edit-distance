import minimalDistance from "../EditDistance";

describe("Edit distance", () => {
  it("when first word has more symbols than second", async () => {
    const firstWord = "test_word";
    const secondWord = "word";

    const distance = minimalDistance(firstWord, secondWord);

    expect(distance).toEqual(5)
  });

  it("when first word has less symbols than second", async () => {
    const firstWord = "word";
    const secondWord = "test_word";
    const distance = minimalDistance(firstWord, secondWord);

    expect(distance).toEqual(5)
  });

  it("when first word has equal number of symbols than second", async () => {
    const firstWord = "test_word_1";
    const secondWord = "test_word_2";

    const distance = minimalDistance(firstWord, secondWord);

    expect(distance).toEqual(1)
  });

  it("when first word is identical to second", async () => {
    const firstWord = "test_word";
    const secondWord = "test_word";

    const distance = minimalDistance(firstWord, secondWord);

    expect(distance).toEqual(0)
  });
});
