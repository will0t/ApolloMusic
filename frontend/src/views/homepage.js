import React from 'react';
import { Link } from 'react-router-dom';

class Homepage extends React.Component{
    render() {
        return(
            <div>
                <p>
                    This is your Homepage. APOLLO.
                </p>
                <div>
                    <Link to = "/metamask">Integrate Metamask Wallet Here.</Link>
                </div>
            </div>
        )
    }
}

export default Homepage;