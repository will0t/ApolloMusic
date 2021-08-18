import React from 'react';
import Content from '../components/content.js';
// Ant Design CSS
import 'antd/dist/antd.css';
import '../css/homepage.css'
import { Button } from 'antd';
import Tabs from '../components/Tabs.js'; 
import { AiOutlineClose, AiOutlineCheck } from "react-icons/ai";  
import ReactScrollableList from 'react-scrollable-list';

// define invitation item
let invitations = []
for (let i = 0; i < 10; i++) {
  invitations.push({ id: i, 
    content: 
    <div label="Invitations"> 
    <div class="event-header"> EDC - Insomniac Events </div>
    <div class="box">
        <div> When: 
            <div class="date-text"> 09/08/2021 </div>
        </div> 
        <div class="fee-header"> Fee: 
            <div class="fee-text"> $21,350 </div>
        </div>
        <div class="duration-header"> Duration:
            <div class="duration-text"> 60 Minutes </div>
        </div> 
        <div class="where-header"> Where: 
            <div class="where-text"> Empire Polo Club, California </div>
        </div> 
        <Button type="primary" size='small' className="declineButton">
            <AiOutlineClose className="sideIcon"/>
        </Button>
        <Button type="primary" size='small' className="acceptButton">
            <AiOutlineCheck className="sideIcon"/>
        </Button>
    </div>
    </div>
    })
}

// define contract item
let contracts = []
for (let i = 0; i < 3; i++) {
  contracts.push({ id: i, 
    content: 
    <div label="Invitations"> 
    <div class="event-header"> EDC - Insomniac Events </div>
    <div class="box">
        <div> When: 
            <div class="date-text"> 09/08/2021 </div>
        </div> 
        <div class="fee-header"> Fee: 
            <div class="fee-text"> $21,350 </div>
        </div>
        <div class="duration-header"> Duration:
            <div class="duration-text"> 60 Minutes </div>
        </div> 
        <div class="where-header"> Where: 
            <div class="where-text"> Empire Polo Club, California </div>
        </div> 
    </div>
    </div>
    })
}

class Homepage extends React.Component{
    render() {
        return(
            <Content heading="Homepage">
                <div>
                    <Button type="primary" size='large' href="/metamask">
                        Proceed to setup Metamask
                    </Button>
                </div>
                <Tabs> 
                {/* Invitations tab */}
               <div label="Invitations"> 
               {/* scrollable list of invitations */}
                <ReactScrollableList
                    listItems={invitations}
                    heightOfItem={30}
                    maxItemsToRender={20}
                    style={{ color: '#333' }}
                />
               </div>
               {/* Contracts tab */}
               <div label="Contracts"> 
                {/* scrollable list of contracts */}
                <ReactScrollableList
                    listItems={contracts}
                    heightOfItem={30}
                    maxItemsToRender={20}
                    style={{ color: '#333' }}
                />
               </div> 
             </Tabs> 
            </Content>
        )
    }
}

export default Homepage;
