import { lazy } from "react";
import { createBrowserRouter } from "react-router";

import App from "../App.js";
import ErrorPage from "./Error.js";
import Home from "./Home.js";

// Lazy-load all page components to reduce initial bundle size
const TtcAlertList = lazy(() => import("../components/alerts/AlertsPage.js"));
const BookmarkPage = lazy(() =>
  import("../components/bookmarks/Bookmark.js").then((m) => ({
    default: m.BookmarkPage,
  }))
);
const Nearby = lazy(() => import("../components/nearby/Nearby.js"));
const Settings = lazy(() =>
  import("../components/settings/Settings.js").then((m) => ({
    default: m.Settings,
  }))
);
const YRTHeader = lazy(() => import("../components/yrt/YRTheader.js"));
const YRTLine = lazy(() => import("../components/yrt/YRTline.js"));
const YRTLines = lazy(() => import("../components/yrt/YRTlines.js"));
const YRTStop = lazy(() => import("../components/yrt/YRTstop.js"));
const About = lazy(() => import("./About.js"));
const Line = lazy(() => import("./Line.js"));
const LineSearch = lazy(() => import("./LineSearch.js"));
const LineStopPrediction = lazy(() => import("./LineStopPrediction.js"));
const RelativeVehiclePosition = lazy(
  () => import("./RelativeVehiclePosition.js")
);
const StopPrediction = lazy(() => import("./StopPrediction.js"));
const LiveMap = lazy(() => import("../components/map/LiveMap.js"));
const Legacy = lazy(() => import("./Legacy.js"));

const ttcPages = [
  {
    path: "lines",
    children: [
      { index: true, Component: LineSearch },
      {
        path: ":lineId",
        children: [
          { index: true, Component: Line },
          {
            path: ":stopNum",
            children: [
              {
                index: true,
                Component: LineStopPrediction,
              },
              {
                path: ":vehicle",
                Component: RelativeVehiclePosition,
              },
            ],
          },
        ],
      },
    ],
    errorElement: <ErrorPage />,
  },
  {
    path: "stops/:stopId",
    children: [
      { index: true, Component: StopPrediction },
      {
        path: ":vehicle",
        Component: RelativeVehiclePosition,
      },
    ],
    errorElement: <ErrorPage />,
  },
];

export const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      { index: true, Component: Home },
      { path: "about", Component: About },
      { path: "bookmarks", Component: BookmarkPage },
      { path: "nearby", Component: Nearby },
      { path: "alerts", Component: TtcAlertList },
      { path: "settings", Component: Settings },
      {
        path: "yrt",
        Component: YRTHeader,
        children: [
          { index: true, Component: YRTLines },
          { path: "lines/:lineId", Component: YRTLine },
          {
            path: "stops/:stopId",
            Component: YRTStop,
          },
        ],
        errorElement: <ErrorPage />,
      },
      {
        path: "ttc",
        children: [{ index: true, Component: LineSearch }, ...ttcPages],
        errorElement: <ErrorPage />,
      },
      ...ttcPages,
      { path: "map", Component: LiveMap },
      { path: "legacy", Component: Legacy },
      { path: "*", Component: ErrorPage },
    ],
  },
]);
