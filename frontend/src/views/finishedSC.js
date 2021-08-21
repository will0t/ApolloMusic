import React from 'react'
import 'antd/dist/antd.css';
import Sharelink from '../components/sharelink.js';
import { Button } from 'antd';
import Content from '../components/content.js';

class FinishedSC extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        }
    }
    
    render() {
        //data from create contract
        let data = this.props.location.state.values;
        console.log(data)

        return (
            <Content heading="Smart Contract being deployed">
                <Sharelink/>
                <Button href="/">
                    Click here to go back home
                </Button>
            </Content>
        )
    }
}

export default FinishedSC
