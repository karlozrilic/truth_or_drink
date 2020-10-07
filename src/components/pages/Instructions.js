import React, {useState, useEffect} from 'react';

const TITLE = "Instructions";

function Instructions() {

    useEffect(() => {
        document.title = TITLE;
    }, []);

    return (
        <>
            <div className="instructions">
                <div className="paper">
                    <div className="with-img">
                        <img src={process.env.PUBLIC_URL + 'imgs/card-1.png'} width="150" />
                        <p>
                            The dealer draws a question card and assigns two fellow players to interview each
                            other. To start the round, hand either player the question card and
                            instruct them which question to ask.
                        </p>
                        <p>
                            After the first player answers or passes, the interviewees switch
                            positions and ask the remaining question. 
                        </p>
                    </div>
                    <p>
                        <b>Answer the question, or take a drink!</b>
                        <br />
                        Drink and you forfeit your chance at winning the round, but you’ll get to guard
                        your secret forever. No booze? Just answer—the truth is also hard to swallow.
                    </p>
                    <p>
                        If both questions have been answered, the dealer judges which interviewee gave
                        the most satisfying answer, and awards that person the question card as a point.
                        (If you’re playing with alcohol, the loser takes a drink.) 
                    </p>
                    <p>
                        Play continues clockwise—the next dealer draws a new question card, and picks
                        any two people to answer. We trust you to be a good sport; try not to ask one
                        person twice before everyone else has been asked once. 
                    </p>
                    <p>
                        <b>THIS ROUND’S ON ME CARDS:</b>
                        <br />
                        Everyone except the dealer must answer these questions. The dealer then judges
                        whose story is best and awards them the point. If you’re playing with alcohol, all
                        losing players must then take a drink.
                    </p>
                    <p>
                        <b>3–4 players:</b> The first to collect 5 question cards wins.
                        <br />
                        <b>5–7 players:</b> The first to collect 4 question cards wins.
                        <br />
                        <b>8+ players:</b> The first to collect 3 question cards wins.
                    </p>
                </div>
            </div>
        </>
    )

}

export default Instructions