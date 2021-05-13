import React from 'react';

class ConfirmSC extends React.Component {

    render() {

        let data = this.props.location.state.values;
        console.log(data)

        return(
            <div>
                <h2>
                    Smart Contract has been deployed.
                </h2>
            </div>
        )
    }
}

export default ConfirmSC;