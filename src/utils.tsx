import { Dispatch, SetStateAction } from "react";

// --------------------------------//
// Data Awal Domino
// --------------------------------//
export const initialDominoes = [
  [6, 1],
  [4, 3],
  [5, 1],
  [3, 4],
  [1, 1],
  [3, 4],
  [1, 2],
  [6, 3],
  [1, 2],
];

// --------------------------------//
// Komponen Domino
// --------------------------------//
export const Domino = ({
  values,
  index,
  updateDomino,
}: {
  values: number[];
  index: number;
  updateDomino: (index: number, newValues: number[]) => void;
}) => {
  const handleClick = () => {
    const newValues = [getRandomNumber(1, 6), getRandomNumber(1, 6)];
    updateDomino(index, newValues);
  };

  const isSameNumber = values[0] === values[1];
  const cardColor = isSameNumber ? 'bg-red-500' : 'bg-white';
  const dotColor = isSameNumber ? 'bg-white' : 'bg-black';

  return (
    <div
      className={`flex flex-col items-center justify-center border-2 border-black w-16 h-32 m-2 ${cardColor} rounded-lg shadow-lg cursor-pointer hover:bg-gray-100`}
      onClick={handleClick}
    >
      <div className="flex-1 flex items-center justify-center">
        {generateDots(values[0], dotColor)}
      </div>
      <div className="border-t-2 border-black w-full"></div>
      <div className="flex-1 flex items-center justify-center">
        {generateDots(values[1], dotColor)}
      </div>
    </div>
  );
};
// --------------------------------//
// Function2 Utility
// --------------------------------//


// Angka Random
// --------------------------------//
export const getRandomNumber = (min: number, max: number): number =>
  Math.floor(Math.random() * (max - min + 1)) + min;

// Generate dots
// --------------------------------//
export const generateDots = (value: number, dotColor: string) => {
  const dots = Array.from({ length: value }, (_, i) => (
    <div key={i} className={`w-2 h-2 ${dotColor} rounded-full m-1`}></div>
  ));
  return <div className="flex flex-wrap justify-center">{dots}</div>;
};

// Undo
// --------------------------------//
export const undo = (
  dominoes: number[][],
  setDominoes: Dispatch<SetStateAction<number[][]>>,
  undoStack: number[][][],
  setUndoStack: Dispatch<SetStateAction<number[][][]>>,
  redoStack: number[][][],
  setRedoStack: Dispatch<SetStateAction<number[][][]>>
) => {
  if (undoStack.length === 0) return;
  const previousState = undoStack[undoStack.length - 1];
  setUndoStack(undoStack.slice(0, -1));
  setRedoStack([...redoStack, dominoes]);
  setDominoes(previousState);
};

// Redo
// --------------------------------//
export const redo = (
  dominoes: number[][],
  setDominoes: Dispatch<SetStateAction<number[][]>>,
  undoStack: number[][][],
  setUndoStack: Dispatch<SetStateAction<number[][][]>>,
  redoStack: number[][][],
  setRedoStack: Dispatch<SetStateAction<number[][][]>>
) => {
  if (redoStack.length === 0) return;
  const nextState = redoStack[redoStack.length - 1];
  setRedoStack(redoStack.slice(0, -1));
  setUndoStack([...undoStack, dominoes]);
  setDominoes(nextState);
};

// --------------------------------//
// Fungsi2 Manipulasi Domino
// --------------------------------//

// Memperbarui Domino
// --------------------------------
export const updateDomino = (
  dominoes: number[][],
  setDominoes: Dispatch<SetStateAction<number[][]>>,
  index: number,
  newValues: number[]
) => {
  const newDominoes = [...dominoes];
  newDominoes[index] = newValues;
  setDominoes(newDominoes);
};

export const handleInputChange = (
  dominoes: number[][],
  setDominoes: Dispatch<SetStateAction<number[][]>>,
  index: number,
  valueIndex: number,
  newValue: number,
  undoStack: number[][][],
  setUndoStack: Dispatch<SetStateAction<number[][][]>>,
  setRedoStack: Dispatch<SetStateAction<number[][][]>>
) => {
  setUndoStack([...undoStack, dominoes]);
  setRedoStack([]);
  const newDominoes = [...dominoes];
  newDominoes[index] = [...newDominoes[index]];
  newDominoes[index][valueIndex] = newValue;
  setDominoes(newDominoes);
};


export const addField = (
  dominoes: number[][],
  setDominoes: Dispatch<SetStateAction<number[][]>>,
  newField: number[],
  undoStack: number[][][],
  setUndoStack: Dispatch<SetStateAction<number[][][]>>,
  setRedoStack: Dispatch<SetStateAction<number[][][]>>
) => {
  setUndoStack([...undoStack, dominoes]);
  setRedoStack([]);
  const newDominoes = [...dominoes, newField];
  setDominoes(newDominoes);
};

export const removeField = (
  dominoes: number[][],
  setDominoes: Dispatch<SetStateAction<number[][]>>,
  index: number,
  undoStack: number[][][],
  setUndoStack: Dispatch<SetStateAction<number[][][]>>,
  setRedoStack: Dispatch<SetStateAction<number[][][]>>
) => {
  setUndoStack([...undoStack, dominoes]);
  setRedoStack([]);
  const newDominoes = dominoes.filter((_, i) => i !== index);
  setDominoes(newDominoes);
};
// Mereset Domino
// ---------------------------
export const resetDominoes = (
  setDominoes: Dispatch<SetStateAction<number[][]>>,
  setIsEditMode: Dispatch<SetStateAction<boolean>>,
  setInputNumber: Dispatch<SetStateAction<string>>,
  setUndoStack: Dispatch<SetStateAction<number[][][]>>,
  setRedoStack: Dispatch<SetStateAction<number[][][]>>
) => {
  setDominoes(initialDominoes);
  setIsEditMode(false);
  setInputNumber("");
  setUndoStack([]);
  setRedoStack([]);
};

export const toggleEditMode = (
  isEditMode: boolean,
  setIsEditMode: Dispatch<SetStateAction<boolean>>
) => setIsEditMode(!isEditMode);

// Mengacak Domino
// ----------------------------
export const randomizeDominoes = (
  dominoes: number[][],
  setDominoes: Dispatch<SetStateAction<number[][]>>,
  undoStack: number[][][],
  setUndoStack: Dispatch<SetStateAction<number[][][]>>,
  setRedoStack: Dispatch<SetStateAction<number[][][]>>
) => {
  setUndoStack([...undoStack, dominoes]);
  setRedoStack([]);
  const getRandomValue = () => Math.floor(Math.random() * 6) + 1;
  const newDominoes = dominoes.map(() => [getRandomValue(), getRandomValue()]);
  setDominoes(newDominoes);
};

export const shuffleDominoes = (
  dominoes: number[][],
  setDominoes: Dispatch<SetStateAction<number[][]>>,
  undoStack: number[][][],
  setUndoStack: Dispatch<SetStateAction<number[][][]>>,
  setRedoStack: Dispatch<SetStateAction<number[][][]>>
) => {
  setUndoStack([...undoStack, dominoes]);
  setRedoStack([]);
  const shuffledDominoes = [...dominoes].sort(() => Math.random() - 0.5);
  setDominoes(shuffledDominoes);
};

// Mengurutkan Domino
// -------------------------------
export const sortDominoes = (
  dominoes: number[][],
  setDominoes: Dispatch<SetStateAction<number[][]>>,
  sortOrder: "asc" | "desc",
  undoStack: number[][][],
  setUndoStack: Dispatch<SetStateAction<number[][][]>>,
  setRedoStack: Dispatch<SetStateAction<number[][][]>>
) => {
  setUndoStack([...undoStack, dominoes]);
  setRedoStack([]);

  const sortedDominoes = [...dominoes].sort((a, b) => {
    const totalA = a[0] + a[1];
    const totalB = b[0] + b[1];
    if (totalA !== totalB) {
      return sortOrder === "asc" ? totalA - totalB : totalB - totalA;
    }
    return sortOrder === "asc" ? a[0] - b[0] : b[0] - a[0];
  });
  setDominoes(sortedDominoes);
};

// Memfilter Domino
// -----------------------------
export const removeDuplicates = (
  dominoes: number[][],
  setDominoes: Dispatch<SetStateAction<number[][]>>,
  undoStack: number[][][],
  setUndoStack: Dispatch<SetStateAction<number[][][]>>,
  setRedoStack: Dispatch<SetStateAction<number[][][]>>
) => {
  setUndoStack([...undoStack, dominoes]);
  setRedoStack([]);

  const seen = new Set<string>();
  const toRemove = new Set<string>();

  dominoes.forEach((domino) => {
    const sortedDomino = domino.slice().sort((a, b) => a - b);
    const dominoString = sortedDomino.join(",");
    if (seen.has(dominoString)) {
      toRemove.add(dominoString);
    } else {
      seen.add(dominoString);
    }
  });

  const uniqueDominoes = dominoes.filter((domino) => {
    const sortedDomino = domino.slice().sort((a, b) => a - b);
    const dominoString = sortedDomino.join(",");
    return !toRemove.has(dominoString);
  });

  setDominoes(uniqueDominoes);
};

export const removeByInput = (
  dominoes: number[][],
  setDominoes: Dispatch<SetStateAction<number[][]>>,
  inputNumber: string,
  undoStack: number[][][],
  setUndoStack: Dispatch<SetStateAction<number[][][]>>,
  setRedoStack: Dispatch<SetStateAction<number[][][]>>
) => {
  setUndoStack([...undoStack, dominoes]);
  setRedoStack([]);

  const numberToRemove = parseInt(inputNumber, 10);
  const filteredDominoes = dominoes.filter((domino) => {
    const sum = domino.reduce((acc, val) => acc + val, 0);
    return sum !== numberToRemove;
  });
  setDominoes(filteredDominoes);
};

// Membalik Domino
// ----------------------------
export const flipDominoes = (
  dominoes: number[][],
  setDominoes: Dispatch<SetStateAction<number[][]>>,
  undoStack: number[][][],
  setUndoStack: Dispatch<SetStateAction<number[][][]>>,
  setRedoStack: Dispatch<SetStateAction<number[][][]>>
) => {
  setUndoStack([...undoStack, dominoes]);
  setRedoStack([]);
  const flippedDominoes = dominoes.map((domino) => [domino[1], domino[0]]);
  setDominoes(flippedDominoes);
};

// Menghitung Domino angka sama
// ------------------------------------
export const countDoubleNumbers = (dominoes: number[][]): number =>
  dominoes.filter((domino) => domino[0] === domino[1]).length;

