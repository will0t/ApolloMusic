import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Apollo Music x Ethereum
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;

<head>
  <script language="javascript" type="text/javascript" src="web3.min.js"></script>
  <script language="javascript" type="text/javascript" src="cryptozombies_abi.js"></script>
</head>
<body>
  <scrip>
  window.addEventListener('load', function() {

          // Checking if Web3 has been injected by the browser (Mist/MetaMask)
          if (typeof web3 !== 'undefined') {
            // Use Mist/MetaMask's provider
            web3js = new Web3(web3.currentProvider);
          } else {
            // Handle the case where the user doesn't have Metamask installed
            // Probably show them a message prompting them to install Metamask
          }

          // Now you can start your app & access web3 freely:
          startApp()

        })

  var mySmartContract;
  var userAccount;

  function startApp() {
    var mySmartContractAddress = "YOUR_CONTRACT_ADDRESS";
    mySmartContract = new web3js.eth.Contract(cryptoZombiesABI, cryptoZombiesAddress);

    var accountInterval = setInterval(function() {
      // Check if account has changed
      if (web3.eth.accounts[0] !== userAccount) {
        userAccount = web3.eth.accounts[0];
        // Call a function to update the UI with the new account
        getZombiesByOwner(userAccount)
        .then(displayZombies);
      }
    }, 100);

    // Start here
  }
  </scrip>
</body>