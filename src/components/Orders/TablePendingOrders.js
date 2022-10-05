import React, { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css"
import "ag-grid-community/dist/styles/ag-theme-alpine.css"
import axios from "axios";
import "./TablePendingOrders.css";
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import FilterListIcon from '@mui/icons-material/FilterList';

export const TablePendingOrders = () => {

  const [rowData,setRowData] = useState();
  console.log("rowD",rowData)

  useEffect(() => {
    axios(`https://5b9f8640f5036f00142e4a2c.mockapi.io/v1/users`,{
      method:"GET"
    })
    .then((data) => {
      setRowData(data.data)
    })
    .catch((error) => {
      console.log(error)
    })
  }, [])

  const columnDefs = [
    { field: 'id'},
    { field: 'name'},
    { field: 'phone' },
    { field: 'email'},
    { field: 'createdAt' },
    { field: 'avatar' },
  ];

  const defaultColDef = {
    flex:1,
    sortable:true,
    filter: 'agTextColumnFilter',
    // floatingFilter: true,
    resizable: true,
    cellStyle: { 'fontWeight': '400',"textAlign":"left" }
  }

  const staticData = [{
    name : "Orders",
    value:150
  },{
    name : "Episodes",
    value:100
  },{
    name : "Followups",
    value:25
  },{
    name : "Revenue",
    value:"$3000"
  }]


  return (
    <div className="main">

        <div className="track">
          <div id="trackText1">Admin</div>
          <ArrowRightAltIcon />
          <div id="trackText">Pending Orders</div>
          <ArrowRightAltIcon />
          <div id="trackText">To Be Sent</div>
        </div>

        <div className="filterContainer">
            <div><h1>To Be Sent</h1></div>
            
            <div className="filter">
              <FilterListIcon />
              <div className="filterColor">Filter</div>
            </div>
        </div>
        

        <div className="heading">
          <div id="headingText" className="filterColor">Email</div>
          <div id="headingText">Fax</div>
          <div id="headingText">Portal</div>
          <div id="headingText">HandCarried</div>
        </div>

        <hr />

        <div className="container">
        {
          staticData.map((ele => {
            return (
              <div className="box">
                  <div className="content">
                    <div >{ele.name}</div>
                    <ArrowRightAltIcon />
                  </div>
                  <div className="text">{ele.value}</div>
              </div>
            )
          }))
        }
        </div>
        <div className="ag-theme-alpine" style={{height:620}}>
            <AgGridReact rowData={rowData} columnDefs={columnDefs} defaultColDef={defaultColDef} />
        </div>
    </div>
  
  )
}