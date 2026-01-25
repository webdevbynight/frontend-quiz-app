import { STORAGE_ITEM_NAME } from "./constants.js";

/**
 * Gets the storage for the app from `localStorage`.
 * @return The stringified storage data if they exist, `null` otherwise.
 */
export const getStorage = (): string | null => localStorage.getItem(STORAGE_ITEM_NAME);
