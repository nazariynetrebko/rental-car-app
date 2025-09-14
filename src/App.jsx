import { lazy, Suspense } from "react";

import Layout from "./components/layout/Layout/Layout";
import { Route, Routes } from "react-router-dom";
import Loader from "./components/ui/Loader/Loader";

const MainPage = lazy(() => import("./pages/MainPage/MainPage"));
const CatalogPage = lazy(() => import("./pages/CatalogPage/CatalogPage"));
const VehiclePage = lazy(() => import("./pages/VehiclePage/VehiclePage"));

function App() {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<MainPage />} />
          <Route path="catalog" element={<CatalogPage />} />
          <Route path="catalog/:id" element={<VehiclePage />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
