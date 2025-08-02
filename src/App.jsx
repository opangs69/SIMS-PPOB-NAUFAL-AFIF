import { useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router'
import Login from './pages/Login'
import Registration from './pages/Registration'
import Dashboard from './pages/Dashboard'
import DashboardLayout from './pages/DashboardLayout'
import TopUp from './pages/TopUp'
import Akun from './pages/Akun'
import Transaction from './pages/Transaction'
import Pembayaran from './pages/Pembayaran'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/registration' element={<Registration/>}/>

        <Route element={<DashboardLayout/>}>
          <Route path='/dashboard' element={<Dashboard/>}/>
          <Route path='/topup' element={<TopUp/>}/>
          <Route path='/akun' element={<Akun/>}/>
          <Route path='/transaction' element={<Transaction/>}/>
          <Route path='/pembayaran' element={<Pembayaran/>}/>

        </Route>
        
        
      </Routes>
    </>
  )
}

export default App
