/* eslint-disable no-unused-vars */
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import LoginPage from './Login'
import RegisterPage from './Register'
import DashboardAdmin from './pages/dashboard/dashboardAdmin'
import DashboardPelanggan from './pages/dashboardpelanggan/dashboardPelanggan'
import DataBukuAdmin from './pages/dashboard/databuku/indexbuku'

function App() {

  return (
    <BrowserRouter>
        <Routes>
        <Route path='/' element={<Navigate to="/login" replace/>}></Route>
        <Route path='/login' element={<LoginPage/>}></Route>
        <Route path='/register' element={<RegisterPage/>}></Route>
        <Route path='/admin/dashboardadmin' element={<DashboardAdmin/>}></Route>
        <Route path='/admin/databuku' element={<DataBukuAdmin/>}></Route>
        <Route path='/pelanggan/dashboardpelanggan' element={<DashboardPelanggan/>}></Route>
        </Routes>
    </BrowserRouter>
  )
}

export default App
