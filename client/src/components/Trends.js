import React, {useEffect} from "react";
import {useState} from "react";
import InputForm from "./InputForm.js"
import {
    BarChart,
    Bar,
    Cell,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
} from "recharts";



// Makes sure that response data is the trended part of the response.
function Renderbarchart(props) {
    
    console.log(props.response)
    return (
        <BarChart key={props.id}
            width={500}
            height={300}
            data={props.response}
            margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
            }}
        >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="freq" fill="#8884d8" />
        </BarChart>
    );
}

export default function Trends(props) {
    const axios = require('axios');

    const [schools, setSchools] = useState(["None"]);
    const [selectedSchool, setSelectedSchool] = useState(0);

    const [data, setData] = useState(["None"]);
    const [selectedBuilding, setSelectedBuilding] = useState(0);

    const [data2, setData2] = useState(null);

    function handleChange1(evt){
        console.log("hello");
        console.log(props.schools[evt.target.value-1]);
        setSelectedSchool(props.schools[evt.target.value-1]);
        console.log(selectedSchool);
    }
    function handleChange2(evt){
        setSelectedBuilding(data[evt.target.value-1]);
        console.log(selectedBuilding);
    }

    useEffect(() => {
        async function updateSchools(){
            setSchools(props.schools);
        }
        updateSchools();
    }, [props]);

    useEffect (() => {
        function getBuildings (){
            axios.get(`https://hackgt-unispaces.herokuapp.com/schools/${selectedSchool}/`)
            .then(function (response) {
            if (response.status === 200){
                console.log(response);
                setData(response.data);
                }
            })
            .catch(function (error) {
            console.log(error);
            })
        }
        getBuildings();
        return () => {
            setData(["none"]);
        }
        
    }, [axios, selectedSchool])

    useEffect (() => {
        function getTrendData (){
            axios.get(`https://hackgt-unispaces.herokuapp.com/stats/${selectedSchool}/${selectedBuilding}`)
            .then(function (response) {
            if (response.status === 200){
                console.log(response);
                setData2(response);
                }
            })
            .catch(function (error) {
            console.log(error);
            })
        }
        getTrendData();
        
    }, [axios, selectedBuilding])

    return (
        <div className="Trend">
            <h1>Get The Latest Trends Of A Building On Your Campus</h1>
            <div className="get-margins">
            <h2>Location Selection</h2>
            <InputForm options={schools} onSelectChange={handleChange1}/>
            <br/>
            
            {
            data !== null &&
            <InputForm options={data} onSelectChange={handleChange2}/>
            }
            
            <hr/>

            { data2 !== null && 
            data2.data.responses.map((info, index) =>(
                <Renderbarchart id={index} response={info.trainedResponses}/>
            ))}
            
            </div>

            
        </div>
    );
}
