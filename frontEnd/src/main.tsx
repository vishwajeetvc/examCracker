import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router'
import './index.css'
import App from './App.tsx'
import Mcq from './pages/mcq.tsx'
import NavContextProvider from './contexts/navContext.tsx'
import CatalogueContextProvider from './contexts/catalogueContext.tsx'
import AuthCard from './pages/authcard.tsx'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CatalogueContextProvider>
      <NavContextProvider>
        <BrowserRouter>
          <Routes>
            <Route index element={<App />} />
            <Route path="/mcq/:id" element={<Mcq/>} />
            <Route path="/account" element={<AuthCard/>} />
          </Routes>
        </BrowserRouter>
      </NavContextProvider>
    </CatalogueContextProvider>
  </StrictMode>,
)


