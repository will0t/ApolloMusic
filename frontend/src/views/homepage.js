import React from 'react';
// Ant Design CSS
import 'antd/dist/antd.css';
import { Button } from 'antd';

class Homepage extends React.Component{
    render() {
        return(
            <div>
                <h1>
                    Homepage
                </h1>
                <div>
                    <Button type="primary" size='large' href="/metamask">
                    Setup MetaMask
                    </Button>
                </div>
            </div>
        )
    }
}

export default Homepage;
