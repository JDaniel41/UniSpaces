import React from "react";
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel'

export default function InputForm(props) {

    return(
        <div >
            <FloatingLabel  controlId="floatingSelect" label="Select One">
                <Form.Select  id={props.id} onChange={props.onSelectChange}>
                    <option value="0">none</option>
                   {props.options.map((option, index) => (
                    <option value={index+1} >{option}</option>
                    ))}
                </Form.Select>
                </FloatingLabel>
        </div>
    )
}

// key={`${props.Index}` +  index} key={`innerDiv`+props.index} key={`label`+props.index} key={`select`+props.index}