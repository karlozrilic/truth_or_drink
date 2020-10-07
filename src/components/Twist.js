import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { Card } from 'react-bootstrap';
import ReactLoading from 'react-loading';

function Twist(props) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [opened, setOpened] = useState(false);

    const fetchData = async () => {
        const result = await axios(
            'https://zrilich.pythonanywhere.com/api/v1/twist/random?num=3'
        );
        setData(result.data);
        setLoading(false);
    };


    const toggleTwist = () => {
        if (opened) {
            setData([]);
            setLoading(true);
            setOpened(false);
        } else {
            setOpened(true);
        }
    }

    if (opened) {
        if (loading) {
            return (
                <>
                    <div className="twist-wrap">
                        <div className="open-twist opened">
                            <a onClick={toggleTwist}>Open Twist</a>
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
                            <a onClick={toggleTwist}>Open Twist</a>
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
        return (
            <>
                <div className="open-twist closed">
                    <a onClick={() => { toggleTwist(); fetchData(); }}>Open Twist</a>
                </div>
            </>
        )
    }

}

export default Twist