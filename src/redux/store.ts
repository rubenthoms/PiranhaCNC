import { Middleware, configureStore } from "@reduxjs/toolkit";

import { createLogger } from "redux-logger";

import { settingsSlice } from "./reducers/settings";

const middlewares: Middleware[] = [];

if (process.env.NODE_ENV === `development`) {
    const reduxLoggerMiddleware = createLogger({
        predicate: () => true,
        collapsed: (_, __, logEntry) => !logEntry?.error
    });

    middlewares.push(reduxLoggerMiddleware);
}

const store = configureStore({
    reducer: {
        settings: settingsSlice.reducer
    },
    middleware: (getDefaultMiddleware) => [...getDefaultMiddleware().concat(middlewares)]
});

// eslint-disable-next-line no-undef
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
