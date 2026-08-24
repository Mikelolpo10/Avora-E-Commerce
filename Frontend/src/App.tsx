import { BrowserRouter, Routes, Route, useLocation } from "react-router";
import { useEffect, lazy, Suspense } from "react";
import MainLayout from "./components/layout/MainLayout";
import Homepage from "./pages/homepage/Homepage";
import "./App.css";

const ProductPage = lazy(() => import("./pages/product-page/ProductPage"));
const ProductCategoryPage = lazy(() => import("./pages/product-category-page/ProductCategoryPage"))
const ErrorPage = lazy(() => import("components/ErrorPage"))

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />

      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route element={<MainLayout />}>
            <Route index element={<Homepage />} />
            <Route
              path="products/:productSlug"
              element={<ProductPage />}
            />
            <Route
              path="department/:department"
              element={<ProductCategoryPage />}
            />
            <Route path="*" element={<ErrorPage />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;