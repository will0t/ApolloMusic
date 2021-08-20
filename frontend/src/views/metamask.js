// Imports
import React from 'react';
import Web3 from 'web3';
import { Button } from 'antd';
import Content from '../components/content.js';

// CSS
import '../App.css';
import 'antd/dist/antd.css';
import '../css/metamask.css';

// Misc.
import Apollo from '../contracts/ApolloAgreement.json';
class Metamask extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            web3: 'undefined',
            account: '',
            apollo: null,
            balance: 0,
            result: null,
            formAmount: 0,
            formPayoutTime: 0,
            formDestination: ''
        }
        this.handleInput = this.handleInput.bind(this);
        this.createContract = this.createContract.bind(this);
        this.getAgreementsByPromoter = this.getAgreementsByPromoter.bind(this);
        this.connectMetamask = this.connectMetamask.bind(this);
    }

    async componentWillMount() {
        await this.loadBlockchainData()
    }

    connectMetamask() {
        window.ethereum.request({
            method: 'eth_requestAccounts'
        })
        .then(
            setInterval(() => {
                const web3 = new Web3(window.ethereum)
                web3.eth.getAccounts().then(r => {
                    if (r.length > 0) { 
                        window.location.reload()
                    }
                })
            }, 1000)
        )
        .catch(error => {
            console.log(error);
            if (error.code === "-32002") {
                window.alert('Metamask is currently in action, close window')
            }
        })
    }

    createContract() {
        let amount = this.state.formAmount;
        let payoutTime = this.state.formPayoutTime;
        let destination = this.state.formDestination;
        // Convert ETH to gwei
        amount = amount * 10**18
        this.createAgreement(payoutTime, destination, amount)
    }

    handleInput(e) {
        let value = e.target.value;
        let name = e.target.name;
        this.setState({
            [name]: value
        })
    }

    async loadBlockchainData() {
        if (typeof window.ethereum !== 'undefined') {
            const web3 = new Web3(window.ethereum)
            const netId = await web3.eth.net.getId()
            const accounts = await web3.eth.getAccounts()

            // Subscribe to events
            // var newAgreementSub = web3.eth.subscribe("NewAgreement") = () => {
            //     if (!error) {console.log(result)}
            // }
            // var paidAgreementSub = web3.eth.subscribe("PaidAgreement") = () => {
            //     if (!error) {console.log(result)}
            // }

            // Load Balance
            if (typeof accounts[0] !== 'undefined') {
                const balance = await web3.eth.getBalance(accounts[0])
                this.setState({
                    account: accounts[0], 
                    balance: balance, 
                    web3: web3
                })
            } else {
                // window.alert('Please login and connect your Metamask account')
            }

            // Load Contracts
            try {
                const apollo = new web3.eth.Contract(Apollo.abi, Apollo.networks[netId].address)
                this.setState({
                    apollo: apollo
                })
            } catch (e) {
                console.log('Error', e)
                window.alert('Contracts are not deployed to the current network')
            }

        } else {
            window.alert('Metamask has not been installed. Please install Metamask.')
        }     
    }

    async createAgreement(payoutTime, destination, amount) {
        if (this.state.apollo !== 'undefined') {
            try {
                await this.state.apollo.methods.createAgreement(payoutTime, [destination]).send({from: this.state.account, value: amount})
                    .then(receipt => {console.log(receipt)})
                    .catch(error => {console.log(error)})
            } catch (e) {
                console.log('Error, createAgreement: ', e)
            }
        }
    }

    async getAgreementsByPromoter() {
        if (this.state.apollo !== 'undefined') {
            try {
                const result = await this.state.apollo.methods.getAgreementsByPromoter(this.state.account).call()
                this.setState({
                    result: result
                })
            } catch(e) {
                console.log('Error, getAgreementsByPromoter: ', e)
            }
        }
    }

    render() {
        var connectMetamaskButton = ""
        var createSCButton = ""
        if (this.state.account === "") {
            connectMetamaskButton = 
            <Button onClick = {this.connectMetamask} style={{"background": "#3B86FF", "border-color": "#3B86FF", "color": "#FFFFFFDE"}}>
                Connect Metamask
            </Button>
        } else {
            createSCButton = 
            <Button href="/create" style={{"background": "#3B86FF", "border-color": "#3B86FF", "color": "#FFFFFFDE"}}>
                Create Smart Contract
            </Button>
        }

        // CHANGE: only shows the first address for now
        var agreements = ""
        if (this.state.result) {
            console.log(this.state.result)
            agreements = (
                this.state.result.map((agreement, key) => (
                    <div className = "content-wrapper">
                        Agreement Number: {key+1}
                        <br/>
                        Amount: {agreement.payoutAmount}
                        <br/>
                        Payout Time: {agreement.payoutTime}
                        <br/>
                        Payout Destination: {agreement.payoutDestination[0]}
                    </div>
                ))
            )
        }

        // Text to show in body
        var text = <span>
            Your Metamask Account is currently <span className="pending">NOT CONNECTED</span> to the Apollo Client. <br/> 
            <br/>
            To connect your Metamask Account, follow these steps: <br/>
            1. Click {connectMetamaskButton} which will open your Metamask plugin <br/>
            2. On the plugin, connect (only one) Metamask Account <br/>
            3. On page refresh, this text should disappear and you should see the Account Address connected displayed instead.
        </span>

        if (this.state.account !== "") {
            text = <span>
                Your Metamask Account is currently <span className="confirm">CONNECTED</span> to the Apollo Client: {this.state.account}<br/>
                <br/>
                With a connected account, you may proceed to {createSCButton}
            </span>
        }

        return (
            <Content heading="Metamask Integration">
                {text}

                <div>
                    <h1> Agreements </h1>
                    <Button onClick = {this.getAgreementsByPromoter}>
                        Retrieve Agreements    
                    </Button>
                    {agreements}

                </div>
            </Content>
        )

    }

}

export default Metamask;
