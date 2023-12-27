import React, { lazy, Suspense } from "react";
import Body from "./components/Body.js";
import VideoContainer from "./components/VideoContainer.js";
import { Provider } from "react-redux";
import store from "./utils/store.js";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ShimmerSearchPage from "./components/ShimmerSearchPage.js";

const WatchPage = lazy(()=> import("./components/WatchPage.js"))
const SearchPage = lazy(()=> import("./components/SearchPage.js"))

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
        element: <Suspense><WatchPage /></Suspense>,
      },
      {
        path: "results",
        element: <Suspense fallback={<ShimmerSearchPage />}><SearchPage /></Suspense>,
      },
    ],
  },
]);

function App() {
  return (
    <Provider store={store}>
      <>
          <div className="flex flex-row">
            <RouterProvider router={router} />
          </div>
      </>
    </Provider>
  );
}

export default App;
