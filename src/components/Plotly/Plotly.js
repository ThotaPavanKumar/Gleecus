import React, { useEffect, useState } from 'react'
import Plot from "react-plotly.js"
import axios from "axios"
import {useNavigate} from "react-router-dom";
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import "./Plotly.css"

export const  Plotly = () => {

    const [users,setUsers] = useState({})
    const navigate = useNavigate()
  
        const traces = [];
        const xAxis = [];
        const yAxis = [];
        const yModify = []
       
        for(let key in users) {
            xAxis.push(users[key].counts)
            yModify.push(users[key].CLINICIAN_NAME)
        }
              

        yModify.forEach((ele) => {
          const [a,b] = ele.split(",");
          const value = `${a}<br>${b}`
          yAxis.push(value)
        })

        
        traces.push({
            x: xAxis,
            y:yAxis,
            type: 'bar',
            marker: {color: '#4c78a8'},
            orientation:"h",
            name:"Pending"
        });



    useEffect(() => {
      axios(`https://5b9f8640f5036f00142e4a2c.mockapi.io/v1/users-count`,{
        method:"GET"
      })
      .then((data) => {
        setUsers(data.data)
      })
      .catch((error) => {
        console.log(error)
      })
    }, [])

    const handleClick = () => {
        navigate("/pendingorders/tobesent")
    }

    const staticData = [
      {
      name : "Inhouse Processing",
      text1:"Orders",
      value1:10,
      text2:"Episodes",
      value2:10,
      text3:"Revenue on hold",
      value3:"$1000",
      button :"View Details"
    },
    {
      name : "Pending Signatures",
      text1:"Orders",
      value1:15,
      text2:"Episodes",
      value2:15,
      text3:"Revenue on hold",
      value3:"$1000",
      button :"View Details"
    },
    {
      name : "To be Sent",
      text1:"Orders",
      value1:20,
      text2:"Episodes",
      value2:20,
      text3:"Revenue on hold",
      value3:"$1000",
      button :"View Details"
    },
    {
      name : "Received Orders",
      text1:"Orders",
      value1:15,
      text2:"Episodes",
      value2:15,
      text3:"Revenue on hold",
      value3:"$1000",
      button :"View Details"
    }
  ]
    

  return (
    <div className='mainContainer'>

        <div className="track">
          <div id="trackText1">Admin</div>
          <ArrowRightAltIcon />
          <div  onClick={handleClick} id="trackText" className='textColor hover'>Pending Orders</div>
        </div>

        <h1>Pending Orders</h1>



      <div>
       <div className=''>
            <Plot data={traces} 
                  layout={{
                  title: 'Pending Orders Title',
                  autosize: true,
                  xaxis:{
                    title : "Histogram"
                  },
                  yaxis:{
                    title:"Pending Orders"
                  }
                  }}
                  useResizeHandler={true}
                  style={{width: "100%",height:"2000px"}}
            />
        </div>

        <div className='right'>
              <div></div>
              <div className='track'>
                <div>
                    <span>Pending Orders</span>
                    <br />
                    <span id="bold">90</span>
                </div>
                <div>
                  <span>Revenue on hold</span>
                  <br />
                  <span id="bold">$3000</span>
                </div>
              </div>
              <div className='grid'>
              {
                staticData.map((ele) => {
                  return (
                    <div className='box'>
                      <h3 id="bold">{ele.name}</h3>
                      <div className='track'>
                          <div className='space'>
                            <span>{ele.text1}</span>
                            <br />
                            <span id="bold">{ele.value1}</span>
                          </div>
                          <div className='space'>
                          <span>{ele.text2}</span>
                            <br />
                            <span id="bold">{ele.value2}</span>
                          </div>
                          <div className='space'>
                          <span>{ele.text3}</span>
                            <br />
                            <span id="bold">{ele.value3}</span>
                          </div>
                      </div>
                      <div><hr style={{fontWeight:"normal",backgrounColor:"lightgrey"}}/></div>
                      <div className='btn'  onClick={handleClick}><button className='button'>{ele.button}</button></div>
                      
                  </div>
                  )
                })
              }
              </div>
              
        </div>

      </div>
       
    </div>
   
  )
}

