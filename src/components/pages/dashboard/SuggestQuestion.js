import React, {useState, useEffect} from 'react';
import axios from 'axios';
import jwt_decode from "jwt-decode";
import ReactLoading from 'react-loading';
import { Form, Button, Col } from 'react-bootstrap';
import moment from 'moment';

const TITLE = "Suggest question";

function SuggestQuestion(props) {

    const [twoPart, setTwoPart] = useState(true);

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
                                    <Form.Control required as="textarea" rows="3" />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="left-text">
                                    <Form.Label>Second question:</Form.Label>
                                    <Form.Control required as="textarea" rows="3" />
                                </Form.Group>
                            </Col>
                        </Form.Row>

                        <Form.Group className="left-text">
                            <Form.Label>Select category</Form.Label>
                            <Form.Control required as="select">
                                <option value="">---------</option>
                                <option value="extraDirty">Extra Dirty</option>
                                <option value="happyHour">Happy Hour</option>
                                <option value="lastCall">Last Call</option>
                                <option value="onTheRocks">On The Rocks</option>
                            </Form.Control>
                        </Form.Group>
    
                        <Button variant="outline-primary" type="submit">
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
                            <Form.Control required as="textarea" rows="3" />
                        </Form.Group>

                        <Form.Group className="left-text">
                            <Form.Label>Select category</Form.Label>
                            <Form.Control required as="select">
                                <option value="">---------</option>
                                <option value="extraDirty">Extra Dirty</option>
                                <option value="happyHour">Happy Hour</option>
                                <option value="lastCall">Last Call</option>
                                <option value="onTheRocks">On The Rocks</option>
                            </Form.Control>
                        </Form.Group>
    
                        <Button variant="outline-primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                </div>
            </>
        )
    }

}

export default SuggestQuestion