import React from 'react';
import { Link } from 'react-router-dom';

class CreateSC extends React.Component {
    render() {
        return(
            <div>
                <p>
                    Create Smart Contract.
                </p>
                <Link to = "/confirm">Click here to confirm Smart Contract creation.</Link>
            </div>
        )
    }
}

export default CreateSC;