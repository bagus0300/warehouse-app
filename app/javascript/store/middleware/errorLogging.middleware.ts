import { isRejectedWithValue, Middleware } from "@reduxjs/toolkit";
import { notificationController } from "../../controllers/notificationController";

/**
 * Log a warning and show a toast!
 */
export const errorLoggingMiddleware: Middleware = () => (next) => (action) => {
  if (isRejectedWithValue(action)) {
    // notificationController.error({ message: action.payload });
    alert("error");
  }

  return next(action);
};
