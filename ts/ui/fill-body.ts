import type { DataContext } from "../types.js";

import { setHeader } from "./set-header.js";
import { setMainContent } from "./set-main-content.js";

/**
 * Fills the body with the main content and the header.
 * @param body - The body element.
 * @param dataContext - The current data context.
 */
export const fillBody = async (body: HTMLElement, dataContext: DataContext): Promise<void> => {
  body.insertAdjacentElement("afterbegin", await setMainContent(dataContext));
  body.insertAdjacentElement("afterbegin", setHeader(dataContext));
};
