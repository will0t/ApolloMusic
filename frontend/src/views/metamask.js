import React from 'react';
import { Link } from 'react-router-dom';

class Metamask extends React.Component {
    render() {
        return(
            <div>
                <p>
                    Metamask Wallet integrated successfully. 
                </p>
                <div>
                    <Link to = "/create">Create a Smart Contract Here.</Link>
                </div>
            </div>
        )
    }
}

export default Metamask;