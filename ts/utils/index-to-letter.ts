import { UPPERCASE_MIN_CHAR_CODE } from "./constants.js";

export const indexToLetter = (index: number): string => String.fromCharCode(index + UPPERCASE_MIN_CHAR_CODE);
