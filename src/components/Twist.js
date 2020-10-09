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
    const [current, setCurrent] = useState(0);

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

    const previous = () => {
        if (current == 0) {
            setCurrent(2);
        } else {
            setCurrent(current-1)
        }
    };

    const next = () => {
        if (current == 2) {
            setCurrent(0);
        } else {
            setCurrent(current+1)
        }
    };

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
                        <>
                            <Card className={loadingTwist.isLoading ? "twist-kartica loading":"twist-kartica"}>
                                {loadingTwist.index != null && loadingTwist.index === current ? 
                                <>
                                    <ReactLoading type={"spin"} color={"#bfd430"} />
                                </>
                                :
                                <Card.Body>
                                        <Card.Title as="h6" className="bolder text-muted">{data[current].title}</Card.Title>
                                        <Card.Text>
                                        {data[current].text}
                                        </Card.Text>
                                        {data[current].additional_points.length > 0 &&
                                            <Card.Footer className="text-muted">
                                                {data[current].additional_points.map((el) =>
                                                    <>
                                                        <ul>
                                                            <li>{el}</li>
                                                        </ul>
                                                    </>
                                                )}
                                            </Card.Footer>
                                        }
                                        <Button variant="outline-primary" onClick={() => ispisi(current)}>Select</Button>
                                    </Card.Body>
                                }  
                            </Card>
                            <div className="prevNext">
                                <button className="btn btn-outline-primary" onClick={previous}><i className="fal fa-caret-left"></i></button>
                                <button className="btn btn-outline-primary" onClick={next}><i className="fal fa-caret-right"></i></button>
                            </div>
                        </>
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