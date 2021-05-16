import React from 'react';
import Web3 from 'web3';
import '../App.css';
import Apollo from '../contracts/ApolloAgreement.json';
import { Input } from 'reactstrap';
// Ant Design CSS
import 'antd/dist/antd.css';
import { Button } from 'antd';

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
    }

    connectMetamask() {
        window.ethereum.request({
            method: 'eth_requestAccounts'
        });
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

    async componentWillMount() {
        await this.loadBlockchainData()
    }

    async loadBlockchainData() {
        if (typeof window.ethereum !== 'undefined') {
            const web3 = new Web3(window.ethereum)
            const netId = await web3.eth.net.getId()
            const accounts = await web3.eth.getAccounts()

            // Load Balance
            if (typeof accounts[0] !== 'undefined') {
                const balance = await web3.eth.getBalance(accounts[0])
                this.setState({
                    account: accounts[0], 
                    balance: balance, 
                    web3: web3
                })
            } else {
                window.alert('Please login and connect your Metamask account')
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
        if (this.state.account === "") {
            connectMetamaskButton = 
            <Button onClick = {this.connectMetamask}>
                Connect Metamask
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

        return (
            <div className = "content-wrapper">
                <h1>Welcome to Apollo</h1>
                <h2>Account Connected: {this.state.account}</h2>
                {connectMetamaskButton}
                <br/>
                <div>
                    <h1>Enter Contract Details</h1>
                    <Input
                        type = "number"
                        placeholder = "Amount"
                        name = "formAmount"
                        value = {this.state.formAmount}
                        onChange = {this.handleInput}
                    />
                    <br/>
                    <Input
                        type = "number"
                        placeholder = "Payout Time"
                        name = "formPayoutTime"
                        value = {this.state.formPayoutTime}
                        onChange = {this.handleInput}
                    />
                    <br/>
                    <Input
                        type = "text"
                        placeholder = "Destination"
                        name = "formDestination"
                        value = {this.state.formDestination}
                        onChange = {this.handleInput}
                    />
                    <br/>
                    <Button onClick = {this.createContract}>
                        Submit Contract
                    </Button>
                </div>
                <br/>
                <br/>
                <br/>
                <div>
                    <h1> Agreements </h1>
                    <Button onClick = {this.getAgreementsByPromoter}>
                        Retrieve Agreements    
                    </Button>
                    {agreements}

                </div>
            </div>
        )

    }

}

export default Metamask;
