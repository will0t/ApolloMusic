import React from 'react';
import 'antd/dist/antd.css';
import '../css/contracts.css'
import { Button } from 'antd';
import Tabs from '../components/Tabs.js'; 
import { AiOutlineClose, AiOutlineCheck } from "react-icons/ai";  
import ReactScrollableList from 'react-scrollable-list';

let invitations = []
for (let i = 0; i < 10; i++) {
  invitations.push({ id: i, 
    content: 
    <div label="Invitations"> 
    <h2>EDC - Insomniac Events</h2>
    When:
    09/08/2021
    Fee:
    $21,350
    Duration:
    30 Minutes
    Where:
    Empire Polo Club, California
    {/* decline button */}
    <Button type="primary" size='small' className="declineButton">
    <AiOutlineClose className="sideIcon"/>
    </Button>
    {/* accept button */}
    <Button type="primary" size='small' className="acceptButton">
    <AiOutlineCheck className="sideIcon"/>
    </Button>
    </div>
    })
}

let contracts = []
for (let i = 0; i < 3; i++) {
  contracts.push({ id: i, 
    content: 
    <div label="Invitations"> 
    <h2>Coachella</h2>
    09/08/2021
    Fee:
    $21,350
    Duration:
    30 Minutes
    Where:
    Empire Polo Club, California
    </div>
    })
}

class Contracts extends React.Component{
    
    render() {
        return (
            <div>
              <h1>Contracts</h1>
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
               <div label="Reviews"> 
                Review list goes here 
               </div> 
             </Tabs> 
            </div>
          );
        }
    }
        
export default Contracts;