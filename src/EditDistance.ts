const minimalDistance = (word1: string, word2: string): number => {
  console.log(word1, word2);

  const firstWordLength = word1.length;
  const secondWordLength = word2.length;

  // Initializing empty array with length equal to first word length
  const firstWordArray = Array(firstWordLength);

  const insertIntoArray = (arr: string[], index: number, newItem: string) => [
    // part of the array before the specified index
    ...arr.slice(0, index),
    // inserted item
    newItem,
    // part of the array after the specified index
    ...arr.slice(index),
  ];

  const getActionCost = (i: number, j: number, firstWordArray: number[]) => {
    if (i < 0 && j < 0) return 0;
    if (i < 0) return j + 1;
    if (j < 0) return i + 1;
    return firstWordArray[i][j];
  };

  // Initializng DP matrix, calcualting and filling it with values
  // Columns are standing for the first word letters
  for (let i = 0; i < firstWordLength; i++) {
    firstWordArray[i] = Array(secondWordLength);
    // Rows are standing for the second word letters
    for (let j = 0; j < secondWordLength; j++) {
      // Filling the DP matrix with values
      firstWordArray[i][j] = Math.min(
        // Caculate insert action cost
        getActionCost(i - 1, j, firstWordArray) + 1,
        // Caculate delete action cost
        getActionCost(i, j - 1, firstWordArray) + 1,
        // Caculate replacement action cost
        getActionCost(i - 1, j - 1, firstWordArray) +
          (word1[i] === word2[j] ? 0 : 1)
      );
    }
  }

  let stepsToPerform = getActionCost(
    firstWordLength - 1,
    secondWordLength - 1,
    firstWordArray
  );

  // Save the result distance into const to return it
  const resultDistance = stepsToPerform;

  console.log("Steps to perform: ", stepsToPerform);

  let curI = firstWordLength - 1;
  let curJ = secondWordLength - 1;
  let curWord = Array.from(word2);

  while (stepsToPerform > 0) {
    const deleteActionCost = getActionCost(curI, curJ - 1, firstWordArray);
    const insertActionCost = getActionCost(curI - 1, curJ, firstWordArray);
    const replaceActionCost = getActionCost(curI - 1, curJ - 1, firstWordArray);

    if (replaceActionCost < stepsToPerform) {
      console.log("Replace operation");

      curWord[curJ] = word1[curI];
      curI -= 1;
      curJ -= 1;
      stepsToPerform = replaceActionCost;
      console.log(curWord.join(""));
    } else if (deleteActionCost < stepsToPerform) {
      console.log("Delete operation");

      curWord[curJ] = "";
      curJ -= 1;
      stepsToPerform = deleteActionCost;
      console.log(curWord.join(""));
    } else if (insertActionCost < stepsToPerform) {
      console.log("Insert operation");

      curWord = insertIntoArray(curWord, curJ + 1, word1[curI]);
      curI -= 1;
      stepsToPerform = insertActionCost;
      console.log(curWord.join(""));
    } else {
      curI -= 1;
      curJ -= 1;
    }
  }

  console.log("Final word: ", curWord, curWord[-1]);

  return resultDistance;
};

export default minimalDistance;
