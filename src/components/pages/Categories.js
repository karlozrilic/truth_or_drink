import React, {useState, useEffect} from 'react';

const TITLE = "Categories";

function Categories() {

    useEffect(() => {
        document.title = TITLE;
    }, []);

    return (
        <>
            <div className="categories">
                <div className="paper">
                    <h5><b>ON THE ROCKS:</b></h5>
                    <p>
                        Chill questions for mixed company—with just enough of a
                        bite to help you loosen up together.
                    </p>
                    <h5><b>EXTRA DIRTY:</b></h5>
                    <p>
                        Cringeworthy, adult-themed questions that pair nicely
                        with adult beverages.
                        <br />
                        <small className="text-danger">
                            NSFW—this one is all about sex in great detail. Skip
                            printing this one if you don’t want that.
                        </small>
                    </p>
                    <h5><b>HAPPY HOUR:</b></h5>
                    <p>
                        Only good times allowed with these feel-good questions
                        for you and your drinking buddies. 
                    </p>
                    <h5><b>LAST CALL:</b></h5>
                    <p>
                        <i>Warning:</i> do <i>not</i> play these questions unless it’s <i>very late</i> and you’ve got nothing left to lose.
                        <br />
                        <small className="text-danger">
                            NSFW—there’s swears in this one too.
                        </small>
                    </p>
                    {/* 
                    <h5><b>WITH A TWIST:</b></h5>
                    <p>
                        Cut through the hard-to-swallow questions with these
                        zesty, strategic twists in the gameplay. <b>Optional!</b>
                    </p>
                    */}
                </div>
            </div>
        </>
    )

}

export default Categories