import { SELECT_NOTE } from "../constants/action-types";

export function selectNote(payload) {
  return { type: SELECT_NOTE, payload }
};