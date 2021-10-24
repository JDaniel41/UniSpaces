import React from "react";
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel'
import Col from 'react-bootstrap/Form';

export default function InputForm(props) {

    return(
        <div key={`innerDiv`+props.index} className="InputForm">
            <FloatingLabel key={`label`+props.index} controlId="floatingSelect" label="Select One">
                <Form.Select key={`select`+props.index} id={props.id} onChange={props.onSelectChange}>
                    <option value={`${props.Index}option0`}>none</option>
                   {props.options.map((option, index) => (
                    <option key={`${props.Index}option${index}` +  index} value={index+1} >{option}</option>
                    ))}
                </Form.Select>
                </FloatingLabel>
        </div>
    )
}

// key={`${props.Index}` +  index} key={`innerDiv`+props.index} key={`label`+props.index} key={`select`+props.index}