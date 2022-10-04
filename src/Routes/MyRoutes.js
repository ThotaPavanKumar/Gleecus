import React from 'react'
import {Routes,Route} from "react-router-dom"
import { Plotly } from '../components/Plotly/Plotly'

export const MyRoutes = () => {
  return (
    <div>
        <Routes>
            <Route path="" element={<Plotly />} />
        </Routes>
    </div>
  )
}

