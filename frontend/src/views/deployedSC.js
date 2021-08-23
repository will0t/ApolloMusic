import React from 'react';
import Content from '../components/content.js'
import { Button } from 'antd';

class DeployedSC extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        let contractId = this.props.location.state.contractId
        return (
            <Content heading="Smart Contract Deployment Completed">
                Congratulations, your Smart Contract has been deployed succesfully to the blockchain network.
                <br/>
                <br/>
                <Button href={`/detail/${contractId}`} style={{"background": "#3B86FF", "border-color": "#3B86FF", "color": "#FFFFFFDE"}}>
                    View your Smart Contract
                </Button>
            </Content>
        )
    }
}

export default DeployedSC;