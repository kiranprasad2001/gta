import { lazy } from "react";
import { createBrowserRouter } from "react-router";

import App from "../App.js";
import TtcAlertList from "../components/alerts/AlertsPage.js";
import { BookmarkPage } from "../components/bookmarks/Bookmark.js";
import Nearby from "../components/nearby/Nearby.js";
import { Settings } from "../components/settings/Settings.js";
import YRTHeader from "../components/yrt/YRTheader.js";
import YRTLine from "../components/yrt/YRTline.js";
import YRTLines from "../components/yrt/YRTlines.js";
import YRTStop from "../components/yrt/YRTstop.js";
import About from "./About.js";
import ErrorPage from "./Error.js";
import Home from "./Home.js";
import Line from "./Line.js";
import LineSearch from "./LineSearch.js";
import LineStopPrediction from "./LineStopPrediction.js";
import RelativeVehiclePosition from "./RelativeVehiclePosition.js";
import StopPrediction from "./StopPrediction.js";

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
