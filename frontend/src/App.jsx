/* eslint-disable no-unused-vars */
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import LoginPage from './Login'
import RegisterPage from './Register'
import DashboardAdmin from './pages/dashboard/dashboardAdmin'
import DashboardPelanggan from './pages/dashboardpelanggan/dashboardPelanggan'
import DataBukuAdmin from './pages/dashboard/databuku/indexbuku'
import FormTambahBuku from './pages/dashboard/databuku/tambahdatabuku'
import FormUbahBuku from './pages/dashboard/databuku/ubahdatabuku'
import DataUser from './pages/dashboard/datauser/indexuser'
import ListBuku from './pages/dashboardpelanggan/listbuku'
import DetailBuku from './pages/dashboardpelanggan/detailbuku'

function App() {

  return (
    <BrowserRouter>
        <Routes>
        <Route path='/' element={<Navigate to="/login" replace/>}></Route>
        <Route path='/login' element={<LoginPage/>}></Route>
        <Route path='/register' element={<RegisterPage/>}></Route>
        <Route path='/admin/dashboardadmin' element={<DashboardAdmin/>}></Route>
        <Route path='/admin/databuku' element={<DataBukuAdmin/>}></Route>
        <Route path='/admin/tambahdatabuku' element={<FormTambahBuku/>}></Route>
        <Route path='/admin/ubahdatabuku/:id_buku' element={<FormUbahBuku/>}></Route>
        <Route path='/admin/datauser' element={<DataUser/>}></Route>
        <Route path='/pelanggan/dashboardpelanggan' element={<DashboardPelanggan/>}></Route>
        <Route path='/pelanggan/listbuku' element={<ListBuku/>}></Route>
        <Route path='/pelanggan/detailbuku/:id_buku' element={<DetailBuku/>}></Route>
        </Routes>
    </BrowserRouter>
  )
}

export default App
