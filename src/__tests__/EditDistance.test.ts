import minimalDistance from "../EditDistance";

describe("Edit distance", () => {
  it("when first word has more symbols than second should correctly calculate result", async () => {
    const firstWord = "test_word";
    const secondWord = "word";

    const [distance, word] = minimalDistance(firstWord, secondWord);

    expect(distance).toEqual(5);
    expect(word).toEqual(secondWord);
  });

  it("when first word has less symbols than second should correctly calculate result", async () => {
    const firstWord = "word";
    const secondWord = "test_word";
    const [distance, word] = minimalDistance(firstWord, secondWord);

    expect(distance).toEqual(5);
    expect(word).toEqual(secondWord);
  });

  it("when first word has equal number of symbols than second should correctly calculate result", async () => {
    const firstWord = "test_word_1";
    const secondWord = "test_word_2";

    const [distance, word] = minimalDistance(firstWord, secondWord);

    expect(distance).toEqual(1);
    expect(word).toEqual(secondWord);
  });

  it("when first word is identical to second should correctly calculate result", async () => {
    const firstWord = "test_word";
    const secondWord = "test_word";

    const [distance, word] = minimalDistance(firstWord, secondWord);

    expect(distance).toEqual(0);
    expect(word).toEqual(secondWord);
  });

  it("when first word is identical to second should correctly calculate result", async () => {
    const firstWord = "test_word";
    const secondWord = "test_word";

    const [distance, word] = minimalDistance(firstWord, secondWord);

    expect(distance).toEqual(0);
    expect(word).toEqual(secondWord);
  });

  it("when first word has space inside should correctly calculate result", async () => {
    const firstWord = "test _ word";
    const secondWord = "test_word";

    const [distance, word] = minimalDistance(firstWord, secondWord);

    expect(distance).toEqual(2);
    expect(word).toEqual(secondWord);
  });
});
