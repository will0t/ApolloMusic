import React from 'react'
import 'antd/dist/antd.css';
import Sharelink from '../components/sharelink.js';
import { Button } from 'antd';
import Content from '../components/content.js';
import { withAuth0 } from "@auth0/auth0-react";

class ShareSC extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        const authContext = this.props.auth0;

        return (
            <Content heading="Smart Contract being deployed">
                <Sharelink receiver={this.props.location.state.name} sender={authContext.user.nickname}/>
                <Button href="/">
                    Click here to go back home
                </Button>
            </Content>
        )
    }
}

export default withAuth0(ShareSC);
