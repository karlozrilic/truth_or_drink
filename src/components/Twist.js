import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { Card } from 'react-bootstrap';
import ReactLoading from 'react-loading';

function Twist(props) {
    const [data, setData] = useState([]);
    const [fetched, setFetched] = useState(false);
    const [loading, setLoading] = useState(true);
    const [opened, setOpened] = useState(false);
    const [text, setText] = useState("Open Twist");

    const fetchData = async () => {
        const result = await axios(
            'https://zrilich.pythonanywhere.com/api/v1/twist/random?num=3'
        );
        setData(result.data);
        setLoading(false);
        setFetched(true);
    };

    const toggleTwist = () => {
        if (opened) {
            setOpened(false);
            setText("Open Twist");
        } else {
            setOpened(true);
            setText("Hide Twist");
        }
    };

    const refresh = () => {
        setLoading(true);
        fetchData();
    };

    if (opened) {
        if (loading) {
            return (
                <>
                    <div className="twist-wrap">
                        <div className="open-twist opened">
                            <a onClick={toggleTwist}>{text}</a>
                            <a onClick={refresh}>Refresh</a>
                        </div>
                        <div className="twist-content-loading">
                            <ReactLoading type={"spin"} color={props.color} />
                        </div>
                    </div>
                </>
            )
        } else {
            return (
                <>
                    <div className="twist-wrap">
                        <div className="open-twist opened">
                            <a onClick={toggleTwist}>{text}</a>
                            <a onClick={refresh}>Refresh</a>
                        </div>
                        <div className="twist-content">
                        {data.map((dat) =>  
                            <>
                                <Card className="twist-kartica">
                                    <Card.Body>
                                        <Card.Title as="h6" className="bolder text-muted">{dat.title}</Card.Title>
                                        <Card.Text>
                                        {dat.text}
                                        </Card.Text>
                                        {dat.additional_points.length > 0 &&
                                            <Card.Footer className="text-muted">
                                                {dat.additional_points.map((el) =>
                                                    <>
                                                        <ul>
                                                            <li>{el}</li>
                                                        </ul>
                                                    </>
                                                )}
                                            </Card.Footer>
                                        }
                                        
                                    </Card.Body>
                                </Card>
                            </>
                        )}
                        </div>
                    </div>
                </>
            )
        }
    } else {
        if (fetched) {
            return (
                <>
                    <div className="open-twist closed">
                        <a onClick={toggleTwist}>{text}</a>
                    </div>
                </>
            )
        } else {
            return (
                <>
                    <div className="open-twist closed">
                        <a onClick={() => { toggleTwist(); fetchData(); }}>{text}</a>
                    </div>
                </>
            )
        }
    }

}

export default Twist