import { BrowserRouter, Routes, Route, useLocation } from 'react-router'
import { useEffect } from 'react'
import './App.css'
import MainLayout from './components/layout/MainLayout'
import Homepage from './pages/homepage/Homepage'
import ProductPage from './pages/product-page/ProductPage'
import ProductCategoryPage from './pages/product-category-page/ProductCategoryPage'
import NotFoundPage from './pages/NotFoundPage'

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />

      <Routes>
        <Route element={<MainLayout />} >
          <Route index element={<Homepage />} />
          <Route path='products/:productSlug' element={<ProductPage />} />
          <Route path='department/:department' element={<ProductCategoryPage />} />
          <Route path='*' element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
