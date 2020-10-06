import React from 'react';
import { Card } from 'react-bootstrap';

function OneQuestion(props) {
    const {questions, question} = props.inp;
    const redni = props.redniBroj;
    const flare = props.flare;
    const addClass = props.addClass;
    return (
        <>
        <Card className={`kartica ${addClass}`} flare={flare}>
            <Card.Header as="h5">Question #{redni}</Card.Header>
            <Card.Body>
                <Card.Title as="h6" className="bolder text-muted">THIS ROUND’S ON ME</Card.Title>
                <Card.Text>
                {question}
                </Card.Text>
            </Card.Body>
            <Card.Footer className="text-muted">Everybody else answers.</Card.Footer>
        </Card>
        </>
    )
};

export default OneQuestion