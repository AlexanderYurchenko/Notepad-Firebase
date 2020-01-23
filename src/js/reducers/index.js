import { SELECT_NOTE } from "../constants/action-types";

const initialState = {
  selectedNoteIndex: null,
  selectedNote: null,
  notes: null
};

function rootReducer(state = initialState, action) {
  if (action.type === SELECT_NOTE) {
    console.log(action);
    return Object.assign({}, state, {
      selectedNoteIndex: action.payload.selectedNoteIndex,
      selectedNote: action.payload.selectedNote
    });
  }

  return state;
};

export default rootReducer;