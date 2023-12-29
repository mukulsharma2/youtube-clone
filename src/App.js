import React, { lazy, Suspense } from "react";
import Body from "./components/Body.js";
import VideoContainer from "./components/VideoContainer.js";
import { Provider } from "react-redux";
import store from "./utils/store.js";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ShimmerSearchPage from "./components/ShimmerSearchPage.js";
import Login from "./components/Login.js";

// Lazy loading
const WatchPage = lazy(() => import("./components/WatchPage.js"));
const SearchPage = lazy(() => import("./components/SearchPage.js"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/home",
    element: <Body />,
    children: [
      {
        path: "/home",
        element: <VideoContainer />,
      },
      {
        path: "watch",
        element: (
          <Suspense>
            <WatchPage />
          </Suspense>
        ),
      },
      {
        path: "results",
        element: (
          <Suspense fallback={<ShimmerSearchPage />}>
            <SearchPage />
          </Suspense>
        ),
      },
    ],
  },
]);

function App() {
  return (
    // redux store provider
    <Provider store={store}>
      <div className="flex flex-row">
        {/* react-router provider */}
        <RouterProvider router={router} />
      </div>
    </Provider>
  );
}

export default App;
