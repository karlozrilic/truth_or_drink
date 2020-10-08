import React, {useState, useEffect} from 'react';
import axios from 'axios';
import jwt_decode from "jwt-decode";
import ReactLoading from 'react-loading';
import { Form, Button, Col } from 'react-bootstrap';
import moment from 'moment';

const TITLE = "Suggest question";

function SuggestQuestion(props) {

    const [twoPart, setTwoPart] = useState(true);
    const [sending, setSending] = useState(false);

    useEffect(() => {
        document.title = TITLE;

    }, []);
        
    const toggleTwoPart = () => {
        if (twoPart) {
            setTwoPart(false);
        } else {
            setTwoPart(true);
        }
    };

    const sendOneQuestion = async (e) => {
        setSending(true);
        const data = {
            "question": document.getElementById("question").value,
            "category": document.getElementById("category1").value,
            "token": localStorage.token
        };
        const config = {
            method: 'POST',
            headers: {'Content-Type': 'application/json', 'Accept': 'application/json',}
        };
        const resp = await axios.post(
            'https://zrilich.pythonanywhere.com/api/v1/send-one-question', data, config
        );
        console.log(resp.message)
        if (resp.message) {
            setSending(false);
        }
        e.preventDefault();
    };

    const sendTwoQuestion = async (e) => {
        setSending(true);
        const data = {
            "question1": document.getElementById("question1").value,
            "question2": document.getElementById("question2").value,
            "category": document.getElementById("category").value,
            "token": localStorage.token
        };
        const config = {
            method: 'POST',
            headers: {'Content-Type': 'application/json', 'Accept': 'application/json',}
        };
        const resp = await axios.post(
            'http://127.0.0.1:5000/api/v1/send-two-questions', data, config
        );
        console.log(resp.message)
        if (resp.message) {
            setSending(false);
        }
        e.preventDefault();
    };

    if (twoPart) {
        return (
            <>
                <div className="dashboard-component">
                    <Button className="toggle-questions-button" onClick={toggleTwoPart} variant="outline-success" type="submit">
                            One question
                    </Button>
                    <Form className="text-center">
                        <Form.Row>
                            <Col md={6}>
                                <Form.Group className="left-text">
                                    <Form.Label>First question:</Form.Label>
                                    <Form.Control id="question1" required as="textarea" rows="3" />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="left-text">
                                    <Form.Label>Second question:</Form.Label>
                                    <Form.Control id="question2" required as="textarea" rows="3" />
                                </Form.Group>
                            </Col>
                        </Form.Row>

                        <Form.Group className="left-text">
                            <Form.Label>Select category</Form.Label>
                            <Form.Control id="category" required as="select">
                                <option value="">---------</option>
                                <option value="extraDirty">Extra Dirty</option>
                                <option value="happyHour">Happy Hour</option>
                                <option value="lastCall">Last Call</option>
                                <option value="onTheRocks">On The Rocks</option>
                            </Form.Control>
                        </Form.Group>
    
                        <Button onClick={sendTwoQuestion} variant="outline-primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                </div>
            </>
        )
    } else {
        return (
            <>
                <div className="dashboard-component">
                    <Button className="toggle-questions-button" onClick={toggleTwoPart} variant="outline-success" type="submit">
                            Two questions
                    </Button>
                    <Form className="text-center">
                        <Form.Group className="left-text">
                            <Form.Label>Question:</Form.Label>
                            <Form.Control id="question" required as="textarea" rows="3" />
                        </Form.Group>

                        <Form.Group className="left-text">
                            <Form.Label>Select category</Form.Label>
                            <Form.Control id="category1" required as="select">
                                <option value="">---------</option>
                                <option value="extraDirty">Extra Dirty</option>
                                <option value="happyHour">Happy Hour</option>
                                <option value="lastCall">Last Call</option>
                                <option value="onTheRocks">On The Rocks</option>
                            </Form.Control>
                        </Form.Group>
    
                        <Button onClick={sendOneQuestion} variant="outline-primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                </div>
            </>
        )
    }

}

export default SuggestQuestion