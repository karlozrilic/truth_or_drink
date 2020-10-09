import React, {useState, useEffect} from 'react';
import axios from 'axios';
import ReactLoading from 'react-loading';
import moment from 'moment';
import { Row, Col, Card, Alert } from 'react-bootstrap';

const TITLE = "My Suggestions";

function MySuggestions() {

    const [data, setData] = useState([]);
    const [state, setState] = useState({
        isLoading: true
    });
    const [order, setOrder] = useState({
        state: "FROM_NEWEST"
    });
    const [rerender, setRerender] = useState(false);

    useEffect(() => {
        document.title = TITLE;
        getSuggestions();
    }, [order]);

    const getSuggestions = async (e) => {
        const data = {
            "token": localStorage.token,
            "order": order.state
        }
        const config = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'}
        };
        const res = await axios.post(
            'https://zrilich.pythonanywhere.com/api/v1/my-suggestions', data, config
        );
        if (res.data.suggestions) {
            setData(res.data.suggestions)
            setState({
                isLoading: false
            })
        } else {
            setState({
                isLoading: false
            })
        }
    }

    const orderBy = (event) => {
        setOrder({
            state: event.target.value
        });
    };

    const renderCatBorder = (cat) => {
        switch(cat) {
            case "extraDirty":
                return "extraDirtyBorder";
            case "happyHour":
                return "happyHourBorder"
            case "lastCall":
                return "lastCallBorder";
            case "onTheRocks":
                return "onTheRocksBorder";
            default:
                return "";
        }
    };

    const renderCat = (cat) => {
        switch(cat) {
            case "extraDirty":
                return "Extra Dirty";
            case "happyHour":
                return "Happy Hour"
            case "lastCall":
                return "Last Call";
            case "onTheRocks":
                return "On The Rocks";
            default:
                return "No Category!";
        }
    };

    const isReviewed = (status) => {
        switch(status) {
            case "NOT_REVIEWED":
                return false;
            default:
                return true;
        }
    };

    const checkIfWithin24hrs = (timesString) => {
        const timestampOld = Math.floor(new Date(timesString) / 1000);
        const date = new Date();
        const currentTime = Math.floor(new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds())/1000);
        const timestamp24hrsAgoFromNow = currentTime - (24 * 3600);
        const within24hrsAgo = timestamp24hrsAgoFromNow <= timestampOld;
        return within24hrsAgo;
    };

    if (state.isLoading) {
        return (
            <>
                <div className="dashboard-component-loading">
                    <ReactLoading type={"spin"} color={"grey"} />
                    <h6>Loading my suggestions...</h6>
                </div>
            </>
        )
    } else {
        return (
            <>
                <div className="dashboard-component">
                    <h1>My suggestions</h1>
                    <hr />
                    <select id="select" value={order.state} onChange={orderBy}>
                        <option value="FROM_NEWEST" defaultValue>From newest</option>
                        <option value="FROM_OLDEST">From oldest</option>
                        <option value="FROM_OLDEST3">From oldest3</option>
                    </select>
                    <Row>
                    {data.length > 0 ?
                        <>
                            {data.map((dat) => 
                                <>
                                    <Col md={6} xl={4}>
                                        <Card className={renderCatBorder(dat.category)}>
                                            <Card.Header>Category: {renderCat(dat.category)}</Card.Header>
                                            <Card.Body>
                                                <Card.Text>
                                                    <p>Number of questions: {dat.questions}</p>
                                                    {dat.questions == 2 ?
                                                        <>
                                                            <p>Question 1:<br /><small className="text-muted">{dat.question1}</small></p>
                                                            <p>Question 2:<br /><small className="text-muted">{dat.question2}</small></p>
                                                        </>
                                                    :
                                                        <>
                                                            <p>Question:<br /><small className="text-muted">{dat.question}</small></p>
                                                        </>
                                                    }
                                                    <p>Review status: {dat.review_status}</p>
                                                    {isReviewed(dat.review_status) && <p>Approved: {dat.approved ? <i className="fal true fa-check"></i> : <i className="fal false fa-times"></i>}</p>}
                                                </Card.Text>
                                            </Card.Body>
                                            <Card.Footer>
                                                {checkIfWithin24hrs(dat.added) ?
                                                    <>
                                                        <small className="text-muted">Created {moment(dat.added).fromNow()}</small>
                                                    </>
                                                :
                                                    <>
                                                        <small className="text-muted">Created at: {moment(dat.added).format("DD/MM/YYYY, HH:mm:ss")}</small>
                                                    </>
                                                }  
                                            </Card.Footer>
                                        </Card>
                                    </Col>
                                </>
                            )}
                        </>
                    :
                        <>
                            <h6>You didn't make any suggestions yet! Make some in <Alert.Link href="/dashboard/suggest-question">Suggest question</Alert.Link> tab!</h6>
                        </>
                    }
                    </Row>
                </div>
            </>
            )
    }

}

export default MySuggestions