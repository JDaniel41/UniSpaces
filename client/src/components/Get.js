import React, {useEffect} from "react";
import {useState} from "react";
import InputForm from "./InputForm.js"
import Button from 'react-bootstrap/Button'

export default function Get(props) {
    const axios = require('axios');

    const [schools, setSchools] = useState(["None"]);
    const [selectedSchool, setSelectedSchool] = useState(0);

    const [data, setData] = useState(["None"]);
    const [selectedData, setSelectedData] = useState(0);

    const [data2, setData2] = useState(null); //useState({responses: [{name:"", choices: ["none"]}], school: "", building: "none"});
    // const [selectedData2, setSelectedData2] = useState();
    const [output, setOutput] = useState([]);


    
    
    function handleChange1(evt){
        console.log("hello");
        console.log(props.schools[evt.target.value-1]);
        setSelectedSchool(props.schools[evt.target.value-1]);
        console.log(selectedSchool);
    }
    function handleChange2(evt){
        setSelectedData(data[evt.target.value-1]);
        console.log(selectedData);
    }
    function handleChange3(evt){
        
        let responses = data2.responses;
        let tmp = new Object;

        tmp = { promptId: `${responses[evt.target.id-1].promptId}`, choice: `${data2.responses[evt.target.id-1].choices[evt.target.value-1]}`};
        output[evt.target.id-1] = tmp;

        
    }


    function handleSubmit(){
        async function postSubmission(){
            axios.post(`https://hackgt-unispaces.herokuapp.com/stats/${selectedSchool}/${selectedData}/`, output)
              .then(function (response) {
                console.log(response);
              })
              .catch(function (error) {
                console.log(error);
              })
  
            }
        console.log(output);
        postSubmission();
    }


    useEffect(() => {
        async function updateSchools(){
            setSchools(props.schools);
        }
        updateSchools();
    }, [props]);


  useEffect(() => {
      async function getBuildings(){
          axios.get(`https://hackgt-unispaces.herokuapp.com/schools/${selectedSchool}`)
        .then(function (response) {
          if (response.status === 200){
            console.log(response);
            setData(response.data);
            }
        })
        .catch(function (error) {
          console.log(error);
        })
        .then(function () {
          // always executed
        });  
      }
        if(selectedSchool !== 0){
            getBuildings();
        }
        

        return () => {
            setData(["none"]);
        }
    }, [axios, selectedSchool])

    useEffect(() => {
        async function getBuildings(){
            axios.get(`https://hackgt-unispaces.herokuapp.com/stats/${selectedSchool}/${selectedData}`)
            .then(function (response) {
                if (response.status === 200 && selectedSchool !== 0){
                console.log(response);
                setData2(response.data);
                let tmp = new Object;
                let newOutput = new Array();
                for(let i = 0; i < response.data.responses.length; i++){
                    tmp = {promptId : "none", choice: "none"};
                    newOutput.push(tmp)
                    setOutput(newOutput);
                    
                }
                console.log(`error message; school: ${selectedSchool} `);
            } 
          })
          .catch(function (error) {
            console.log(error);
          })
          .then(function () {
            // always executed
          });  
        }
  
          getBuildings();
  
          return () => {
              setData2(null);
          }
      }, [axios, selectedData])

    //   useEffect(() => {
    //     setData2({responses: [{name:"none", choices: ["none"]}], school: "none", building: "none"});
    //   }, [])

    return (
        <div>
            <h2>College Campus</h2>
            <InputForm options={schools} onSelectChange={handleChange1}/>
            <br/>
            {/* <SelectedSchoolFunction /> */}
            {
            data !== null &&
            <InputForm options={data} onSelectChange={handleChange2}/>
            }
            
            <hr/>
            {data2 !== null &&
            <div>
                    <h1>{data2.schoolName}</h1>
                    <h2>{data2.buildingName}</h2>
                    {data2.responses.map((info, index) =>(
                        <div key={`div`+index}>
                            <h3 key={`h3`+index} >{info.questionText}</h3>
                            {/* {console.log(info.choices)} */}
                            <InputForm key={`Input`+ index} options={info.choices} id={index+1} onSelectChange={handleChange3}/>
                        </div>
                    ))}
                    <Button onClick={handleSubmit} variant="outline-primary">Submit</Button>{' '}
                </div>}


            
        </div>
    );
  }