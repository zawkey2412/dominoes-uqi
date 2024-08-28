import { useState, useEffect } from "react";
import { MdModeEditOutline, MdOutlinePlaylistRemove } from "react-icons/md";
import {
  updateDomino,
  handleInputChange,
  resetDominoes,
  Domino,
  initialDominoes,
  randomizeDominoes,
  sortDominoes,
  removeDuplicates,
  removeByInput,
  toggleEditMode,
  flipDominoes,
  countDoubleNumbers,
  shuffleDominoes,
  undo,
  redo,
} from "./utils";
import {
  FaCheck,
  FaDice,
  FaPaperPlane,
  FaSortAmountDown,
  FaSortAmountUp,
} from "react-icons/fa";
import { GiDominoTiles } from "react-icons/gi";
import { FaShuffle } from "react-icons/fa6";
import { LuRedo, LuUndo } from "react-icons/lu";

export default function App() {
  const [dominoes, setDominoes] = useState(initialDominoes);
  const [undoStack, setUndoStack] = useState<number[][][]>([]);
  const [redoStack, setRedoStack] = useState<number[][][]>([]);

  const [isEditMode, setIsEditMode] = useState(false);
  const [inputNumber, setInputNumber] = useState("");
  const [doubleNumbersCount, setDoubleNumbersCount] = useState<number>(0);

  useEffect(() => {
    setDoubleNumbersCount(countDoubleNumbers(dominoes));
  }, [dominoes]);

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-50 p-6">
      <h1 className="text-3xl font-semibold mb-6 text-blue-700">
        Dominoes Selection Test
      </h1>
      <p className="mb-8 text-gray-600 text-center">
        Click on a domino to randomize its values, or use the controls below.
      </p>

      <div className="w-full max-w-4xl flex flex-col items-center gap-8">
        <div className="flex flex-wrap justify-center w-1/2">
          {dominoes.map((values, index) => (
            <Domino
              key={index}
              values={values}
              index={index}
              updateDomino={(index, newValues) =>
                updateDomino(dominoes, setDominoes, index, newValues)
              }
            />
          ))}
        </div>

        <div className="flex items-center text-gray-700">
          <span className="mr-2">Double numbers count:</span>
          <span className="font-bold text-lg">{doubleNumbersCount}</span>
        </div>

        <div className="w-full bg-white p-4 rounded-lg shadow-md border">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold text-gray-800">
              Data Manipulations
            </h2>
            <div className="flex gap-4 items-center">
              <input
                type="number"
                value={inputNumber}
                min={0}
                onChange={(e) => setInputNumber(e.target.value)}
                placeholder="Remove by total"
                className="border-gray-300 rounded-md px-2 w-fit h-fit"
              />
              <FaPaperPlane
                onClick={() => {
                  removeByInput(
                    dominoes,
                    setDominoes,
                    inputNumber,
                    undoStack,
                    setUndoStack,
                    setRedoStack
                  );
                  setInputNumber("");
                }}
                className="text-red-500 hover:text-red-700 cursor-pointer"
                title="Submit"
              />
              <div className="h-6 w-[2px] bg-gray-300" />
              <MdOutlinePlaylistRemove
                className="text-blue-500 hover:text-red-500 cursor-pointer"
                onClick={() =>
                  removeDuplicates(
                    dominoes,
                    setDominoes,
                    undoStack,
                    setUndoStack,
                    setRedoStack
                  )
                }
                title="Remove Duplicates"
              />
              <FaDice
                className="text-blue-500 hover:text-green-500 cursor-pointer"
                onClick={() =>
                  randomizeDominoes(
                    dominoes,
                    setDominoes,
                    undoStack,
                    setUndoStack,
                    setRedoStack
                  )
                }
                title="Randomize"
              />
              <FaShuffle
                className="text-blue-500 hover:text-green-500 cursor-pointer"
                onClick={() =>
                  shuffleDominoes(
                    dominoes,
                    setDominoes,
                    undoStack,
                    setUndoStack,
                    setRedoStack
                  )
                }
                title="Shuffle"
              />
              <GiDominoTiles
                onClick={() =>
                  flipDominoes(
                    dominoes,
                    setDominoes,
                    undoStack,
                    setUndoStack,
                    setRedoStack
                  )
                }
                className="text-blue-500 hover:text-green-500 cursor-pointer"
                title="Flip"
              />
              <FaSortAmountUp
                className="text-blue-500 hover:text-green-500 cursor-pointer"
                onClick={() =>
                  sortDominoes(
                    dominoes,
                    setDominoes,
                    "asc",
                    undoStack,
                    setUndoStack,
                    setRedoStack
                  )
                }
                title="Sort Ascending"
              />
              <FaSortAmountDown
                className="text-blue-500 hover:text-green-500 cursor-pointer"
                onClick={() =>
                  sortDominoes(
                    dominoes,
                    setDominoes,
                    "desc",
                    undoStack,
                    setUndoStack,
                    setRedoStack
                  )
                }
                title="Sort Descending"
              />
              {!isEditMode ? (
                <MdModeEditOutline
                  className="text-blue-500 hover:text-green-500 cursor-pointer"
                  onClick={() => toggleEditMode(isEditMode, setIsEditMode)}
                  title="Edit"
                />
              ) : (
                <FaCheck
                  className="text-green-500 hover:text-blue-500 cursor-pointer"
                  onClick={() => toggleEditMode(isEditMode, setIsEditMode)}
                  title="Save"
                />
              )}
            </div>
          </div>
          {isEditMode ? (
            <div className="text-sm text-gray-700">
              <div>[</div>
              {dominoes.map((domino, index) => (
                <div key={index} className="flex items-center mb-2">
                  <span>[</span>
                  <input
                    type="number"
                    value={domino[0]}
                    min={1}
                    max={6}
                    onChange={(e) =>
                      handleInputChange(
                        dominoes,
                        setDominoes,
                        index,
                        0, // Correct index for the first input
                        parseInt(e.target.value),
                        undoStack,
                        setUndoStack,
                        setRedoStack
                      )
                    }
                    className="w-12 mx-1 p-1 border rounded"
                  />
                  <span>,</span>
                  <input
                    type="number"
                    value={domino[1]}
                    min={1}
                    max={6}
                    onChange={(e) =>
                      handleInputChange(
                        dominoes,
                        setDominoes,
                        index,
                        1,
                        parseInt(e.target.value),
                        undoStack,
                        setUndoStack,
                        setRedoStack
                      )
                    }
                    className="w-12 mx-1 p-1 border rounded"
                  />
                  <span>],</span>
                </div>
              ))}
              <div>]</div>
            </div>
          ) : (
            <div className="overflow-auto text-gray-700">
              {JSON.stringify(dominoes)}
            </div>
          )}
          <div className="flex gap-3 items-center text-xl">
            <LuUndo
              className="cursor-pointer mt-2 hover:text-blue-500"
              onClick={() =>
                undo(
                  dominoes,
                  setDominoes,
                  undoStack,
                  setUndoStack,
                  redoStack,
                  setRedoStack
                )
              }
            />
            <button
              className="mt-4 p-2 w-24 bg-blue-500 text-white rounded hover:bg-blue-600"
              onClick={() => {
                resetDominoes(
                  setDominoes,
                  setIsEditMode,
                  setInputNumber,
                  setUndoStack,
                  setRedoStack
                );
              }}
            >
              Reset
            </button>
            <LuRedo
              className="cursor-pointer mt-2 hover:text-blue-500"
              onClick={() =>
                redo(
                  dominoes,
                  setDominoes,
                  undoStack,
                  setUndoStack,
                  redoStack,
                  setRedoStack
                )
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
}
