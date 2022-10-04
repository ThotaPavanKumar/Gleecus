import React, { useEffect, useState } from 'react'
import Plot from "react-plotly.js"
import axios from "axios"

export const  Plotly = () => {

    const [users,setUsers] = useState({})
  
        const traces = [];
        const xAxis = [];
        const yAxis = [];
        const firstName = []
        const lastName = []
        var trial = []
       
        for(let key in users) {
            xAxis.push(users[key].counts)
            var [first,last] =  users[key].CLINICIAN_NAME.split(",")
            firstName.push(first);
            lastName.push(last)
            trial.push(users[key].CLINICIAN_NAME)
        }
        
        yAxis.push([firstName,lastName])

        console.log("y",yAxis,"x",xAxis,"trial",trial)
        
        traces.push({
            x: xAxis,
            // y: ["happy<br>friend","22happy<br>friend22","33happy<br>friend33"],
            y:trial,
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
    

  return (
    <div style={{width : "100%",height : "500px",border:"10px solid grey",overflowY:"scroll"}}>
        <Plot data={traces} 
         layout={{
            title: 'Pending Orders Title',
            autosize: true
        }}
        useResizeHandler={true}
        style={{width: "100%",height:"2000px"}}
         />
    </div>
  )
}

