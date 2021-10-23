
import React, {useEffect} from "react";
import {useState} from "react";
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel'
 
export default function Post(props) {
   
    const [schools, setSchools] = useState(["temp", "test"]);
   

    useEffect(() => {
        async function updateSchools(){
            setSchools(props.schools);
        }
        updateSchools();
    }, [props]);

   


    return (
        <div>
            <h2>Post</h2>
            <FloatingLabel controlId="floatingSelect" label="Works with selects">
            <Form.Select aria-label="Floating label select example" >
            {schools.map(school => (
                <option>{school}</option>
            ))}
            </Form.Select>
            </FloatingLabel>

            
        </div>
    );
  }