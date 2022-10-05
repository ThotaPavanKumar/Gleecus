import React from 'react'
import {Routes,Route} from "react-router-dom"
import { TablePendingOrders } from '../components/Orders/TablePendingOrders'
import { Plotly } from '../components/Plotly/Plotly'

export const MyRoutes = () => {
  return (
    <div>
        <Routes>
            <Route path="/" element={<Plotly />} />
            <Route path="/pendingorders/tobesent" element={<TablePendingOrders />} />
        </Routes>
    </div>
  )
}

