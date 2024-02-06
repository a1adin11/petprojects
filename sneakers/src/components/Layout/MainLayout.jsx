import React from 'react'
import Header from '../defaultComponents/Header/Header'
import { Outlet } from 'react-router'

const MainLayout = () => {
  return (
    <>
    <Header/>
    <Outlet/>
    </>
  )
}

export default MainLayout