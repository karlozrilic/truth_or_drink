import React, {useState, useEffect} from 'react';
import axios from 'axios';
import ReactLoading from 'react-loading';
import { Form, Button, Col, Alert, Fade } from 'react-bootstrap';

const TITLE = "Suggest question";

function SuggestQuestion() {

    const [twoPart, setTwoPart] = useState(true);
    const [sending, setSending] = useState(false);
    const [sent, setSent] = useState(false);
    const [response, setResponse] = useState();
    const [oneQuestion, setOneQuestion] = useState({
        question: "",
        category: ""
    });
    const [twoQuestions, setTwoQuestions] = useState({
        question1: "",
        question2: "",
        category: ""
    });

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
        if (oneQuestion.question !== "" && oneQuestion.category !== "") {
            setSending(true);
            const data = {
                "question": oneQuestion.question,
                "category": oneQuestion.category,
                "token": localStorage.token
            };
            const config = {
                method: "POST",
                headers: {"Content-Type": "application/json", "Accept": "application/json",}
            };
            const resp = await axios.post(
                "https://zrilich.pythonanywhere.com/api/v1/send-one-question", data, config
            );
            setSending(false);
            setResponse(resp.data);
            setSent(true);
            setOneQuestion({
                question: "",
                category: ""
            });
        }
    };

    const sendTwoQuestion = async () => {
        if (twoQuestions.question1 !== "" && twoQuestions.question2 !== "" && twoQuestions.category !== "") {
            setSending(true);
            const data = {
                "question1": twoQuestions.question1,
                "question2": twoQuestions.question2,
                "category": twoQuestions.category,
                "token": localStorage.token
            };
            const config = {
                method: "POST",
                headers: {"Content-Type": "application/json", "Accept": "application/json",}
            };
            const resp = await axios.post(
                "https://zrilich.pythonanywhere.com/api/v1/send-two-questions", data, config
            );
            setSending(false);
            setResponse(resp.data);
            setSent(true);
            setTwoQuestions({
                question1: "",
                question2: "",
                category: ""
            });
        }
    };
        

    if (sending) {
        return (
            <>
                <div className="dashboard-component">
                    <h1>Suggest question/s</h1>
                    <hr />
                    <div className="dashboard-component-loading">
                        <ReactLoading type={"spin"} color={"grey"} />
                        <h6>Sending your suggestion...</h6>
                    </div>
                </div>  
            </>
        )
    } else {
        if (twoPart) {
            return (
                <>
                    <div className="dashboard-component">
                        <h1>Suggest question/s</h1>
                        <hr />
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
                                        <Form.Control required id="question1" as="textarea" rows="3" onChange={(e) => setTwoQuestions({...twoQuestions, question1: e.target.value})} />
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group className="left-text">
                                        <Form.Label>Second question:</Form.Label>
                                        <Form.Control required id="question2" as="textarea" rows="3" onChange={(e) => setTwoQuestions({...twoQuestions, question2: e.target.value})} />
                                    </Form.Group>
                                </Col>
                            </Form.Row>
    
                            <Form.Group className="left-text">
                                <Form.Label>Select category</Form.Label>
                                <Form.Control required id="category" as="select" onChange={(e) => setTwoQuestions({...twoQuestions, category: e.target.value})} >
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
                        <h1>Suggest question/s</h1>
                        <hr />
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
                                <Form.Control required id="question" as="textarea" rows="3" onChange={(e) => setOneQuestion({...oneQuestion, question: e.target.value})} />
                            </Form.Group>
    
                            <Form.Group className="left-text">
                                <Form.Label>Select category</Form.Label>
                                <Form.Control required id="category1" as="select" onChange={(e) => setOneQuestion({...oneQuestion, category: e.target.value})} >
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