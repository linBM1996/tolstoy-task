import React, { useState } from 'react';

export default function Form() {

    //const [URLcounter, setURLcounter] = useState(0);


    return (
        <div>
            <form>
                <div>
                    <label>Url:</label>
                    <input
                        type="text"
                        required
                    />
                </div>
                <div>
                    <label>Url:</label>
                    <input
                        type="text"
                        required
                    />
                </div>
                <div>
                    <label>Url:</label>
                    <input
                        type="text"
                        required
                    />
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}
