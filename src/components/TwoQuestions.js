import React from 'react';
import { Card } from 'react-bootstrap';

function TwoQuestions(props) {
    const {questions, question1, question2} = props.inp;
    const redni = props.redniBroj;
    const flare = props.flare;
    const addClass = props.addClass;
    return (
        <>
        <Card className={`kartica ${addClass}`} flare={flare}>
            <Card.Header as="h5">Question #{redni}</Card.Header>
            <Card.Body>
                <Card.Title as="h6" className="bolder text-muted">A</Card.Title>
                <Card.Text>
                {question1}
                </Card.Text>
                <hr/>
                <Card.Title as="h6" className="bolder text-muted">B</Card.Title>
                <Card.Text>
                {question2}
                </Card.Text>
            </Card.Body>
        </Card>
        </>
    )
};

export default TwoQuestions