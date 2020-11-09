import React, { useEffect } from 'react';

const TITLE = "Truth or Drink";

function Home() {

    const myRef = React.createRef();

    useEffect(() => {
        document.title = TITLE;
        myRef.current.scrollTo(0, 0);
    }, [])

    return (
        <>
            <div className="home" ref={myRef}>
            <cite className="quote">Pull up a seat, pal. You’ve got a choice: tell the sober truth, or drink up. By the end of the night, we’ll all be better friends 
            after asking the questions we’ve never dared to ask out loud. If anything, it’s worth a shot. </cite>
                <div className="odabirWrapper">
                    <h1>Choose category:</h1>
                    <div className="odabir">
                        <a className="cat" href="/extradirty">EXTRA DIRTY</a>
                        <a className="cat" href="/happyhour">HAPPY HOUR</a>
                        <a className="cat" href="/lastcall">LAST CALL</a>
                        <a className="cat" href="/ontherocks">ON THE ROCKS</a>
                    </div>
                </div>
            </div>
        </>
    );
    
}

export default Home;
