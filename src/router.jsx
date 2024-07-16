import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

const MainPage = lazy(() => import("./pages/mainPage/index"));

export function Router() {
  return (
    <Suspense fallback="...">
      <Routes>
        <Route path="/" element={<MainPage />} />
      </Routes>
    </Suspense>
  );
}
