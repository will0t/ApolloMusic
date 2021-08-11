import React from 'react';
import Content from '../components/content.js';
// Ant Design CSS
import 'antd/dist/antd.css';
import { Button } from 'antd';

class Homepage extends React.Component{
    render() {
        return(
            <Content heading="Homepage">
                <div>
                    <Button type="primary" size='large' href="/metamask">
                        Proceed to setup Metamask
                    </Button>
                </div>
            </Content>
        )
    }
}

export default Homepage;
