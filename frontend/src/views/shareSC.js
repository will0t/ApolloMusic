import React from 'react'
import 'antd/dist/antd.css';
import Sharelink from '../components/sharelink.js';
import { Button } from 'antd';
import Content from '../components/content.js';
import { withAuth0 } from "@auth0/auth0-react";
import '../css/share_sc.css'

class ShareSC extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        let sender_name = ""
        if (this.props.auth0.user !== undefined) {
            sender_name = this.props.auth0.user.nickname
        }
        console.log("ID = ",this.props.location.state.contractId)

        return (
            <Content heading="Smart Contract Created">
                <div className="center">
                    <Sharelink 
                        receiver={this.props.location.state.name} 
                        sender={sender_name}
                        contractId={this.props.location.state.contractId}
                    />
                    <br/>
                    <br/>
                    <Button href={`/detail/${this.props.location.state.contractId}`} style={{"background": "#3B86FF", "border-color": "#3B86FF", "color": "#FFFFFFDE"}}>
                        View your Smart Contract
                    </Button>
                    &nbsp;&nbsp;
                    <Button href="/">
                        Click here to go back home
                    </Button>
                </div>
            </Content>
        )
    }
}

export default withAuth0(ShareSC);
