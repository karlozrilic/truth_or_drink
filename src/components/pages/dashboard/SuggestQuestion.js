import React, {useState, useEffect} from 'react';
import axios from 'axios';
import jwt_decode from "jwt-decode";
import ReactLoading from 'react-loading';
import { Form, Button } from 'react-bootstrap';
import moment from 'moment';

const TITLE = "Suggest question";

function SuggestQuestion(props) {

    const [data, setData] = useState([]);
    const [dates, setDates] = useState({
        created_at: "",
        updated_at: ""
    });
    const [state, setState] = useState({
        isLoading: true
    });

    useEffect(() => {
        document.title = TITLE;
    }, []);
        


    return (
        <>
            <div className="dashboard-component">
                <Form>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" />
                        <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" />
                    </Form.Group>
                    <Form.Group controlId="formBasicCheckbox">
                        <Form.Check type="checkbox" label="Check me out" />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </div>
        </>
    )

}

export default SuggestQuestion