from web3 import Web3
import json

# Local blockchain
w3 = Web3(Web3.HTTPProvider('http://127.0.0.1:8545'))
# For production use Infura node
# https://mainnet.infura.io/v3/8ad2f6e1f8494bdd91efd5b3937e0537
# https://ropsten.infura.io/v3/8ad2f6e1f8494bdd91efd5b3937e0537

# Apollo Admin private key (index 9 user in Ganache)
# In production, Apollo Admin will need to create their own account
public_key = "0x38A44f311e638EA964431b50edeeD58d7BE33326";
private_key = "64f2650f1e0e24412245395923d0a3dc97f5d51e465cbaf4ae30849f2bd6bb4a";
nonce = w3.eth.get_transaction_count(public_key)

# Get contract instance with address and ABI
address = "0x0f534D8E7cd5dcC1801C18Af2173502572d798DA"
with open('abi.json') as json_file:
    abi = json.load(json_file)
contract = w3.eth.contract(address=address, abi=abi);

# Build transaction with specified function
txn = contract.functions.createAgreement(
    1627990339,
    ["0x032453949e06e6C2e4A9E97aEB9acdC832C0B3c2"]
).buildTransaction({
    'value': 1000000000000000000, # payment to smart contract in Wei
    'gasPrice': w3.eth.gasPrice,
    'gas': w3.eth.getBlock("latest").gasLimit,
    'nonce': nonce
})

# Sign transaction with private key
signed_txn = w3.eth.account.sign_transaction(txn, private_key=private_key)

# Send transaction and get receipt
txn_hash = w3.eth.send_raw_transaction(signed_txn.rawTransaction)
txn_receipt = w3.eth.getTransactionReceipt(txn_hash)

print(txn_receipt)

# Use the same template above for other functions
# Things to do:
# 1. Check which agreement is due and payout agreement
# 2. Reverse payment in cases of dispute
# Promoter pay total amount = (pay to performer + oracle fees + commission to Apollo)
