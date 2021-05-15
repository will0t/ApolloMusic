import React from 'react';
// Ant Design CSS
import 'antd/dist/antd.css';
import { Button } from 'antd';

class Metamask extends React.Component {
    render() {
        return(
            <div>
                <h1>
                    Metamask Wallet integrated successfully.
                </h1>
                <div>
                    <Button type="primary" size='large' href="/create">
                    Create Smart Contract
                    </Button>
                </div>
            </div>
        )
    }
}

export default Metamask;
