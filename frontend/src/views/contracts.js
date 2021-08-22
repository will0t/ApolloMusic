import React from 'react';
import 'antd/dist/antd.css';
import '../css/contracts.css'
import { Button } from 'antd';
import Tabs from '../components/Tabs.js'; 
import { AiOutlineClose, AiOutlineCheck } from "react-icons/ai";  
import ReactScrollableList from 'react-scrollable-list';
import Content from '../components/content.js';
import axios from 'axios';

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

class Contracts extends React.Component{

    constructor(props) {
        super(props)
        this.state = {
            contracts: null
        }
    }

    componentDidMount() {
        axios.post("http://127.0.0.1:8000/graphql/", {
            "query": `query allSmartContract {
                allSmartContract {
                    id
                    eventName
                    status
                    startTime
                    payoutTime
                    payAmount
                    creatorName
                    creatorEmail
                    receiverEmail
                    receiverName
                    receiverWalletAddress
                    duration
                    location
                }
            } 
            `,
            "variables": null,
            "operationName":"allSmartContract"
        })
        .then(response => {
            console.log(response)
            this.setState({
                contracts: response.data.data.allSmartContract
            })
        })
        .catch(error => {console.log(error)})
    }
    
    render() {
        if (this.state.contracts === null) {
            return <div>Loading</div>
        }

        // define contract items
        let contracts = this.state.contracts.map((contract, contract_key) => ({
            id: contract_key,
            content:            
            <div label="Invitations">
                <div class="event-header">
                    {contract.eventName}
                </div>
                <div class="box">
                    <div> When: 
                        <div class="date-text">{contract.startTime.substring(0,10)}</div>
                    </div> 
                    <div class="fee-header"> Fee: 
                        <div class="fee-text">{contract.payAmount} ETH</div>
                    </div>
                    <div class="duration-header"> Duration:
                        <div class="duration-text"> {contract.duration} Minutes </div>
                    </div> 
                    <div class="where-header"> Where: 
                        <div class="where-text"> {contract.location} </div>
                    </div> 
                    <Button href={`/detail/${contract.id}`}type="primary" size='medium' >
                        View Contract
                    </Button>
                </div>
            </div>
        })

        )




        return (
            <Content heading="Contracts">
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
            </Content>
          );
        }
    }
        
export default Contracts;