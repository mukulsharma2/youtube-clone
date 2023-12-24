import React from "react";
import Body from "./components/Body.js";
import VideoContainer from "./components/VideoContainer.js";
import WatchPage from "./components/WatchPage.js";
import { Provider } from "react-redux";
import store from "./utils/store.js";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SearchPage from "./components/SearchPage.js";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Body />,
    children: [
      {
        path: "/",
        element: <VideoContainer />,
      },
      {
        path: "watch",
        element: <WatchPage />,
      },
      {
        path: "results",
        element: <SearchPage />,
      },
    ],
  },
]);

function App() {
  return (
    <Provider store={store}>
      <>
          <div className="flex flex-row overflow-hidden">
            <RouterProvider router={router} />
          </div>
      </>
    </Provider>
  );
}

export default App;
