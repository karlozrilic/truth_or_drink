import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';

class Home extends React.Component {
    constructor(props) {
        super(props)
        this.myRef = React.createRef()
        this.spremiUSession = this.spremiUSession.bind(this);
        this.state = {
            izSessiona: ""
        }
    }

    componentDidMount() {
        this.myRef.current.scrollTo(0, 0);
        this.setState({
            izSessiona: localStorage.getItem('session')
        });
    }
    
    spremiUSession() {
        localStorage.setItem('session', "Spremljeno u session1!");
        window.location.reload();
    }

    render() {
        return (
            <>
                <Helmet>
                    <title>Home</title>
                </Helmet>
                <div className="home" ref={this.myRef}>
                <cite className="quote">Pull up a seat, pal. You’ve got a choice: tell the sober truth, or drink up. By the end of the night, we’ll all be better friends 
                after asking the questions we’ve never dared to ask out loud. If anything, it’s worth a shot. </cite>
                    <div className="odabirWrapper">
                        <h1>Choose category:</h1>
                        <div className="odabir">
                            <a href="/extradirty">EXTRA DIRTY</a>
                            <a href="/happyhour">HAPPY HOUR</a>
                            <a href="/lastcall">LAST CALL</a>
                            <a href="/ontherocks">ON THE ROCKS</a>
                        </div>
                    </div>
                    <button onClick={this.spremiUSession}>Klikni me!</button>
                    <p>{this.state.izSessiona}</p>
                </div>
            </>
        );
    }
    
}

export default Home;