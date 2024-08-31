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
  removeField,
  addField,
} from "./utils";
import {
  FaBars,
  FaCheck,
  FaDice,
  FaMinus,
  FaPaperPlane,
  FaPlus,
  FaSortAmountDown,
  FaSortAmountUp,
} from "react-icons/fa";
import { GiDominoTiles } from "react-icons/gi";
import { FaShuffle } from "react-icons/fa6";
import { LuRedo, LuUndo } from "react-icons/lu";
import {
  handleDragStart,
  handleDrop,
  handleDragOver,
  handleDragEnd,
} from "./utils";

export default function App() {
  const [dominoes, setDominoes] = useState(initialDominoes);
  const [undoStack, setUndoStack] = useState<number[][][]>([]);
  const [redoStack, setRedoStack] = useState<number[][][]>([]);

  const [isEditMode, setIsEditMode] = useState(false);
  const [inputNumber, setInputNumber] = useState("");
  const [doubleNumbersCount, setDoubleNumbersCount] = useState<number>(0);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  useEffect(() => {
    setDoubleNumbersCount(countDoubleNumbers(dominoes));
  }, [dominoes]);

  return (
    <div className="min-h-screen  flex flex-col items-center bg-gray-50 px-4 md:px-6">
      <h1 className="text-3xl text-center font-semibold my-6 text-blue-700">
        Purwadhika's Dominoes Selection Test
      </h1>
      <p className="mb-8 text-gray-600 text-center">
        Click on a domino to randomize its values, drag and drop to reorder, and
        use the functionalities below to manipulate the data.
      </p>

      <div className="w-full flex flex-col items-center gap-8">
        <div className="w-full flex flex-col md:flex-row items-center justify-between">
          <div className="hidden md:block w-1/3" />
          <div className="flex max-w-4xl flex-wrap justify-center w-1/3">
            {dominoes.map((values, index) => (
              <div
                key={index}
                draggable
                onDragStart={handleDragStart(index, setDraggedIndex)}
                onDrop={handleDrop(
                  index,
                  dominoes,
                  setDominoes,
                  setDraggedIndex,
                  undoStack,
                  setUndoStack,
                  setRedoStack
                )}
                onDragOver={handleDragOver}
                onDragEnd={handleDragEnd(setDraggedIndex)}
                className={`m-2 p-2 ${
                  draggedIndex !== null && draggedIndex !== index
                    ? "bg-red-100 border-red-500  border rounded"
                    : ""
                }`}
              >
                <Domino
                  values={values}
                  index={index}
                  updateDomino={(index, newValues) =>
                    updateDomino(dominoes, setDominoes, index, newValues)
                  }
                />
              </div>
            ))}
          </div>
          <div className="flex md:hidden items-center text-gray-700">
            <span className="mr-2">Double numbers count:</span>
            <span className="font-bold text-lg">{doubleNumbersCount}</span>
          </div>
          <div className="w-full md:w-1/3 flex justify-center mt-8 md:mt-0">
            <div className="w-full md:w-3/4 lg:w-1/2 p-4 h-fit bg-white border border-gray-300 rounded-lg shadow-md">
              <h2 className="text-justify text-wrap text-xl font-semibold mb-4 text-black">
                Functionalities List
              </h2>
              <ul className="list-none space-y-2">
                <li className="flex items-center space-x-2 hover:text-black">
                  <FaDice className="text-green-500 hover:text-black" />
                  <span>Randomize Number</span>
                </li>
                <li className="flex items-center space-x-2 hover:text-black">
                  <FaShuffle className="text-blue-500 hover:text-black" />
                  <span>Shuffle</span>
                </li>

                <li className="flex items-center space-x-2 hover:text-black">
                  <GiDominoTiles className="text-green-500 hover:text-black" />
                  <span>Flip</span>
                </li>
                <li className="flex items-center space-x-2 hover:text-black">
                  <FaSortAmountUp className="text-yellow-500 hover:text-black" />
                  <span>Sort Ascending</span>
                </li>
                <li className="flex items-center space-x-2 hover:text-black">
                  <FaSortAmountDown className="text-orange-500 hover:text-black" />
                  <span>Sort Descending</span>
                </li>
                <li className="flex items-center space-x-2 hover:text-black">
                  <LuUndo className="text-red-500 hover:text-black" />
                  <span>Undo</span>
                </li>
                <li className="flex items-center space-x-2 hover:text-black">
                  <LuRedo className="text-purple-500 hover:text-black" />
                  <span>Redo</span>
                </li>
                <li className="flex items-center space-x-2 hover:text-black">
                  <MdModeEditOutline className="text-indigo-500 hover:text-black" />
                  <span>Edit Mode</span>
                </li>
                <li className="flex items-center space-x-2 hover:text-black">
                  <FaPlus className="text-pink-500 hover:text-black" />
                  <span>Add Field</span>
                </li>
                <li className="flex items-center space-x-2 hover:text-black">
                  <FaMinus className="text-teal-500 hover:text-black" />
                  <span>Remove Field</span>
                </li>

                <li className="flex items-center space-x-2 hover:text-black">
                  <FaBars className="text-gray-500 hover:text-black" />
                  <span>Drag and Drop</span>
                </li>
                <li className="flex items-center space-x-2 hover:text-black">
                  <MdOutlinePlaylistRemove className="text-lime-500 hover:text-black" />
                  <span>Remove Duplicates</span>
                </li>
                <li className="flex items-center space-x-2 hover:text-black">
                  <FaPaperPlane className="text-amber-500 hover:text-black" />
                  <span>Remove by total</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="hidden md:flex items-center text-gray-700">
          <span className="mr-2">Double numbers count:</span>
          <span className="font-bold text-lg">{doubleNumbersCount}</span>
        </div>

        <div className="w-full bg-white p-4 rounded-lg shadow-md border">
          <div className="flex flex-col md:flex-row justify-between items-center mb-4">
            <h2 className="text-lg font-bold text-gray-800 mb-4 md:mb-0">
              Data Manipulations
            </h2>
            <div className="flex flex-wrap gap-4 items-center">
              <div className="flex items-center w-full md:w-auto">
                <input
                  type="number"
                  value={inputNumber}
                  min={0}
                  onChange={(e) => setInputNumber(e.target.value)}
                  placeholder="Remove by total"
                  className="border-gray-300 rounded-md px-2 w-full md:w-auto h-fit"
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
                  className="text-red-500 hover:text-red-700 cursor-pointer ml-3 md:ml-0"
                  title="Submit"
                />
              </div>
              <div className="h-6 w-[2px] bg-gray-300 hidden md:block" />
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
            <div className="w-full text-sm text-gray-700">
              <div>[</div>
              {dominoes.map((domino, index) => (
                <div
                  key={index}
                  className={`flex items-center mb-2 ${
                    draggedIndex !== null && draggedIndex !== index
                      ? "bg-red-100 border-red-500"
                      : ""
                  }`}
                  onDrop={handleDrop(
                    index,
                    dominoes,
                    setDominoes,
                    setDraggedIndex,
                    undoStack,
                    setUndoStack,
                    setRedoStack
                  )}
                  onDragOver={handleDragOver}
                >
                  <span
                    className="cursor-pointer mr-2 hover:text-green-500 "
                    draggable
                    onDragStart={handleDragStart(index, setDraggedIndex)}
                    onDragEnd={handleDragEnd(setDraggedIndex)}
                  >
                    <FaBars />
                  </span>
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
                        0,
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
                  <span>{index < dominoes.length - 1 && ","}</span>
                  <FaMinus
                    className="text-blue-500 hover:text-red-500 cursor-pointer ml-2"
                    onClick={() =>
                      removeField(
                        dominoes,
                        setDominoes,
                        index,
                        undoStack,
                        setUndoStack,
                        setRedoStack
                      )
                    }
                    title="Remove Field"
                  />
                </div>
              ))}
              <FaPlus
                className="text-blue-500 mr-auto ml-14 hover:text-green-500 cursor-pointer mt-3"
                onClick={() =>
                  addField(
                    dominoes,
                    setDominoes,
                    [0, 0],
                    undoStack,
                    setUndoStack,
                    setRedoStack
                  )
                }
                title="Add Field"
              />
              <div>]</div>
            </div>
          ) : (
            <div>
              <div className="overflow-auto pt-4 font-bold md:pt-0 text-gray-700">
                Source:
              </div>

              <div className="overflow-auto pt-4 md:pt-0 text-gray-700">
                {JSON.stringify(dominoes)}
              </div>
            </div>
          )}
          <div className="flex flex-wrap gap-3 items-center justify-center md:justify-between text-xl mt-4 md:mt-0">
            <LuUndo
              className="cursor-pointer mt-3 text-blue-500 hover:text-green-500"
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
              className="cursor-pointer mt-3 text-blue-500 hover:text-green-500"
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
