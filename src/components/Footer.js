import React from 'react';
import './Footer.css';

function Footer() {
    return (
        <div className="footer-container">
            <section className="footer-subscription">
                <p>
                    This is a fan made/student project on which I learnt React.
                </p>
                <p>
                    <b>DISCLAMER:</b> I did not come up with these questions, names of categories or logo.
                </p>
                <p>Idea and questions came from youtube channel <a href="https://www.youtube.com/cut">Cut</a> and their version of the game Truth or Drink.</p>
            </section>
        </div>
    );
}

export default Footer