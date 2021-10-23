import React, {useEffect} from "react";
import {useState} from "react";
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel'

export default function Get(props) {
    const [schools, setSchools] = useState(["temp", "test"]);
    const [selectedSchool, setSelectedSchool] = useState(0);
    const axios = require('axios');
    const [data, setData] = useState(["test1", "temp1"]);

    useEffect(() => {
        async function updateSchools(){
            setSchools(props.schools);
        }
        updateSchools();
    }, [props]);

    function handleOnChange(val){
        setSelectedSchool(val);

        

//   useEffect(() => {
//       async function getBuildings(){
//           axios.get('https://hackgt-unispaces.herokuapp.com/schools')
//         .then(function (response) {
//           console.log(response);
//           setData(response.data);
//         })
//         .catch(function (error) {
//           console.log(error);
//         })
//         .then(function () {
//           // always executed
//         });  
//       }

//         getBuildings();
//     }, [axios])
    }

    return (
        <div>
            <h2>Post</h2>
            <FloatingLabel controlId="floatingSelect" label="Works with selects">
            <Form.Select aria-label="Floating label select example" onChange = {handleOnChange(this.value)}>
            {schools.map(school => (
                <option>{school}</option>
            ))}
            </Form.Select>
            </FloatingLabel>
           {selectedSchool}

            
        </div>
    );
  }