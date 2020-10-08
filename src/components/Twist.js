import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { Card, Button } from 'react-bootstrap';
import ReactLoading from 'react-loading';
import { TransitionGroup } from 'react-transition-group';

function Twist() {
    const [data, setData] = useState([]);
    const [fetched, setFetched] = useState(false);
    const [loading, setLoading] = useState(true);
    const [loadingTwist, setLoadingTwist] = useState({
        index: null,
        isLoading: false
    });
    const [opened, setOpened] = useState(false);
    const [text, setText] = useState("Show Twists");

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
            setText("Show Twists");
        } else {
            setOpened(true);
            setText("Hide Twists");
        }
    };

    const refresh = () => {
        setLoading(true);
        fetchData();
    };
    
    const ispisi = async (index) => {
        setLoadingTwist({
            index: index,
            isLoading: true
        });
        const result = await axios(
            'https://zrilich.pythonanywhere.com/api/v1/twist/random?num=1'
        );
        const temp = result.data[0];
        const temp2 = data;
        temp2[index] = temp;
        setTimeout(function() {
            setData(temp2);
        }, 3000); 
        
        setLoadingTwist({
            index: null,
            isLoading: false
        });
    }

    if (opened) {
        if (loading) {
            return (
                <>
                    <div className="twist-wrap">
                        <div className="open-twist opened">
                            <a onClick={toggleTwist}>{text}</a>
                            <a onClick={refresh}>Refresh all</a>
                        </div>
                        <div className="twist-content-loading">
                            <ReactLoading type={"spin"} color={"#bfd430"} />
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
                            <a onClick={refresh}>Refresh all</a>
                        </div>
                        
                        <div className="twist-content">
                        {data.map((dat, index) =>  
                            <>
                                <Card className="twist-kartica loading">
                                {loadingTwist.index != null && loadingTwist.index === index ? 
                                <>
                                    <ReactLoading type={"spin"} color={"#bfd430"} />
                                </>
                                :
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
                                        <Button variant="outline-primary" onClick={() => ispisi(index)}>Select</Button>
                                    </Card.Body>
                                }  
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
                    <div className="twist-wrap">
                        <div className="open-twist closed">
                            <a onClick={toggleTwist}>{text}</a>
                        </div>
                    </div>
                </>
            )
        } else {
            return (
                <>
                    <div className="twist-wrap">
                        <div className="open-twist closed">
                            <a onClick={() => { toggleTwist(); fetchData(); }}>{text}</a>
                        </div>
                    </div>
                </>
            )
        }
    }

}

export default Twist