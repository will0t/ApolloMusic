import React from 'react'
import 'antd/dist/antd.css';
import { Button } from 'antd';

class FinishedSC extends React.Component {
    render() {
        return (
            <div>
                <h1>Smart Contract being deployed</h1>
                <Button href="/">
                    Click here to go back home
                </Button>
            </div>
        )
    }
}

export default FinishedSC