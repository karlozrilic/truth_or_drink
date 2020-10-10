import React, {useState, useEffect} from 'react';
import axios from 'axios';
import ReactLoading from 'react-loading';
import { Form, Button, Col, Alert, Fade } from 'react-bootstrap';

const TITLE = "Suggest question";

function SuggestQuestion(props) {

    const [twoPart, setTwoPart] = useState(true);
    const [sending, setSending] = useState(false);
    const [sent, setSent] = useState(false);
    const [response, setResponse] = useState();

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

    const sendOneQuestion = async () => {
        if (!sent) {
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
            setSending(false);
            setResponse(resp.data);
            setSent(true)
        }
        
    };

    const sendTwoQuestion = async () => {
        if (!sent) {
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
                'https://zrilich.pythonanywhere.com/api/v1/send-two-questions', data, config
            );
            setSending(false);
            setResponse(resp.data);
            setSent(true)
        }
    };
        

    if (sending) {
        return (
            <>
                <div className="dashboard-component-loading">
                    <ReactLoading type={"spin"} color={"grey"} />
                    <h6>Sending your suggestion...</h6>
                </div>
            </>
        )
    } else {
        if (twoPart) {
            return (
                <>
                    <div className="dashboard-component">
                        <Button className="toggle-questions-button" onClick={toggleTwoPart} variant="outline-success" type="submit">
                                One question
                        </Button>
                        {sent &&
                            <>
                            {response.error ?
                                <Alert variant="danger" onClose={() => setSent(false)} dismissible transition={Fade}>
                                    <Alert.Heading>There was an error while trying to send your suggestion. Please try again later.</Alert.Heading>
                                    <p>
                                        Error: {response.error}
                                    </p>
                                </Alert>
                            :
                                <Alert variant="success" onClose={() => setSent(false)} dismissible transition={Fade}>
                                    <Alert.Heading>{response.message}</Alert.Heading>
                                    <p>
                                        Your question has been recieved and its waiting to be reviewed.
                                        You can see your question status under <Alert.Link href="/dashboard/my-suggestions">My suggestions</Alert.Link> tab.
                                    </p>
                                </Alert>
                            }   
                            </>
                        }
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
                        {sent &&
                            <>
                            {response.error ?
                                <Alert variant="danger" onClose={() => setSent(false)} dismissible transition={Fade}>
                                    <Alert.Heading>There was an error while trying to send your suggestion. Please try again later.</Alert.Heading>
                                    <p>
                                        Error: {response.error}
                                    </p>
                                </Alert>
                            :
                                <Alert variant="success" onClose={() => setSent(false)} dismissible transition={Fade}>
                                    <Alert.Heading>{response.message}</Alert.Heading>
                                    <p>
                                        Your question has been recieved and its waiting to be reviewed.
                                        You can see your question status under <Alert.Link href="/dashboard/my-suggestions">My suggestions</Alert.Link> tab.
                                    </p>
                                </Alert>
                            }   
                            </>
                        }
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
    

}

export default SuggestQuestion