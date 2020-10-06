import React, {useState, useEffect} from 'react';
import axios from 'axios';
import OneQuestion from '../OneQuestion';
import TwoQuestions from '../TwoQuestions';
import ReactLoading from 'react-loading';

const TITLE = "On The Rocks";

function OnTheRocks() {

    const [data, setData] = useState([]);
    const [state, setState] = useState({
        isLoading: true
    })

    const [current, setCurrent] = useState(0);

    useEffect(async () => {
        document.title = TITLE;
        const fetchData = async () => {
            const result = await axios(
                'https://zrilich.pythonanywhere.com/api/v1/onTheRocks/shuffle'
            );
            setData(result.data)
            setState({
                isLoading: false
            })
        };

        fetchData();
    }, []);

    function next() {
        setCurrent(current+1);
    }

    function previous() {
        setCurrent(current-1);
    }

    if (state.isLoading) {
        return (
            <>
            <div className="question">
                <ReactLoading type={"spin"} color={"#3b3d95"} />
            </div>
            </>
        )
    }
    return (
        <>
            <div className="question">
            {data[current].questions === 1 ?
                <OneQuestion inp={data[current]} redniBroj={current+1} flare="ON THE ROCKS" addClass="onTheRocks" />
            :
                <TwoQuestions inp={data[current]} redniBroj={current+1} flare="ON THE ROCKS" addClass="onTheRocks" />
            }
            <div className="prevNext">
                {current === data.length-1 ?
                <>
                    <button className="btn btn-outline-primary" onClick={previous}><i className="fal fa-caret-left"></i></button>
                    <button className="btn btn-outline-primary" onClick={next} disabled><i className="fal fa-caret-right"></i></button>
                </>
                : current === 0 ?
                <>
                    <button className="btn btn-outline-primary" onClick={previous} disabled><i className="fal fa-caret-left"></i></button>
                    <button className="btn btn-outline-primary" onClick={next}><i className="fal fa-caret-right"></i></button>
                </>
                : 
                <>
                    <button className="btn btn-outline-primary" onClick={previous}><i className="fal fa-caret-left"></i></button>
                    <button className="btn btn-outline-primary" onClick={next}><i className="fal fa-caret-right"></i></button>
                </>
                }
            </div>
            </div>
        </>
    );
}

export default OnTheRocks;