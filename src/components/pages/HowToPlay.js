import React, {useState, useEffect} from 'react';

const TITLE = "How to play";

function HowToPlay() {

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
                            The dealer draws a question and assigns two fellow players to interview each
                            other. To start the round, show either player the question and
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
                        the most satisfying answer, and awards that person with a point.
                        (If you’re playing with alcohol, the loser takes a drink.) 
                    </p>
                    <p>
                        Play continues clockwise—the next dealer draws a new question, and picks
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
                    <div className="with-img">
                        <img src={process.env.PUBLIC_URL + 'imgs/card-2.png'} width="150" />
                        <p>
                            The “With a Twist” deck squeezes a brisk squirt of additional
                            flavor into the game. Every player has 3 <b>Twist Cards!</b> Players can use these cards to either redirect
                            an incoming question to a different person, or change something
                            about the question. 
                        </p>
                        <p>
                            Multiple twist cards can be played in a single round! After each
                            round, draw more Twist Cards until you have three in your hand.
                        </p>
                    </div>
                    <div className="text-center">
                        <p>
                            <img src={process.env.PUBLIC_URL + 'imgs/icon-1.png'} width="40" /><i>Can be played whenever <b>you</b> are asked a question.</i>
                        </p>
                        <p>
                            <img src={process.env.PUBLIC_URL + 'imgs/icon-2.png'} width="40" /> <i>Can be played at any time, even during someone else’s turn.</i>
                        </p>
                    </div>
                </div>
            </div>
        </>
    )

}

export default HowToPlay