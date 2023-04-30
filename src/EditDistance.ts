const getActionCost = (i: number, j: number, dpMatrix: number[][]): number => {
  if (i < 0 && j < 0) return 0;
  if (i < 0) return j + 1;
  if (j < 0) return i + 1;
  return dpMatrix[i][j];
};

const buildWord = (
  matrix: number[][],
  stepsNumToPerform: number,
  words: {
    originalWord: string;
    targetWord: string;
  }
): string => {
  const { targetWord, originalWord } = words;

  let curI = targetWord.length - 1;
  let curJ = originalWord.length - 1;

  // Use object instead of array because indexes may be negative integers
  let curWordObject = Array.from(originalWord).reduce((acc, char, index) => {
    acc[index] = char;

    return acc;
  }, {});

  // Build word using DP matrix
  while (stepsNumToPerform > 0) {
    // Delete operation cost in matrix will always be at the top of current cursor position
    const deleteActionCost = getActionCost(curI, curJ - 1, matrix);
    // Insert operation cost in matrix will always be at the left of current cursor position
    const insertActionCost = getActionCost(curI - 1, curJ, matrix);
    // Replace operation cost in matrix will always be at the top left of current cursor position
    const replaceActionCost = getActionCost(curI - 1, curJ - 1, matrix);

    if (replaceActionCost < stepsNumToPerform) {
      curWordObject[curJ] = targetWord[curI];

      // Put cursor to new position in matrix
      curI -= 1;
      curJ -= 1;

      stepsNumToPerform = replaceActionCost;
    } else if (deleteActionCost < stepsNumToPerform) {
      curWordObject[curJ] = "";

      // Put cursor to new position in matrix
      curJ -= 1;

      stepsNumToPerform = deleteActionCost;
    } else if (insertActionCost < stepsNumToPerform) {
      curWordObject[curJ + 1] = targetWord[curI];

      // Put cursor to new position in matrix
      curI -= 1;

      stepsNumToPerform = insertActionCost;
    } else {
      // If no action with lower cost that current steps number is found move cursor to the top left in matrix
      // and repeat the flow
      curI -= 1;
      curJ -= 1;
    }
  }

  const finalWord = Object.keys(curWordObject)
    // Sort keys as they are indexes of the final word
    .sort((a, b) => Number(a) - Number(b))
    // Map indexes to actual chars
    .map((key) => curWordObject[key])
    // Join into single word
    .join("");

  return finalWord;
};

const minimalDistance = (
  inputWord1: string,
  inputWord2: string
): [number, string] => {
  const originalWordLength = inputWord1.length;
  const targetWordLength = inputWord2.length;

  // Initializing empty array with length equal to first word length
  const dpMatrix = Array(targetWordLength);

  // Initializng DP matrix, calcualting and filling it with values
  // Columns are standing for the first word letters
  for (let i = 0; i < targetWordLength; i++) {
    dpMatrix[i] = Array(originalWordLength);

    // Rows are standing for the second word letters
    for (let j = 0; j < originalWordLength; j++) {
      // Filling the DP matrix with values
      dpMatrix[i][j] = Math.min(
        // Caculate insert action cost
        getActionCost(i - 1, j, dpMatrix) + 1,
        // Caculate delete action cost
        getActionCost(i, j - 1, dpMatrix) + 1,
        // Caculate replacement action cost
        getActionCost(i - 1, j - 1, dpMatrix) +
          (inputWord1[j] === inputWord2[i] ? 0 : 1)
      );
    }
  }

  const resultDistance = getActionCost(
    targetWordLength - 1,
    originalWordLength - 1,
    dpMatrix
  );

  // As this functionality is not requested in original task definition but was already implented
  // it was utilized to separate function
  const rebuildedWord = buildWord(dpMatrix, resultDistance, {
    originalWord: inputWord1,
    targetWord: inputWord2,
  });

  console.log("\n");
  console.log("Result word: ", rebuildedWord);
  console.log("Result distance: ", resultDistance);

  return [resultDistance, rebuildedWord];
};

export default minimalDistance;
