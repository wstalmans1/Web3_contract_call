require('dotenv').config({ path: '../.env' });
const { Web3 } = require('web3');

async function main() {
    // Setup provider with Infura
    const web3 = new Web3(new Web3.providers.HttpProvider(`https://sepolia.infura.io/v3/${process.env.INFURA_API_KEY}`));

    // Create contract instance
    const contract = new web3.eth.Contract(
        [{"inputs":[],"name":"count","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"decr","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"get","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"inc","outputs":[],"stateMutability":"nonpayable","type":"function"}],
        '0xF98569F595Df44242c34329c6F4d17221c71107b'
    );

    // Account setup
    const account = web3.eth.accounts.privateKeyToAccount(process.env.PRIVATE_KEY);
    web3.eth.accounts.wallet.add(account);

    // Send a transaction to the inc() function
    console.log('waiting for the increment transaction to confirm ...');
    await contract.methods.inc().send({ from: account.address });

    // Read the value of the count variable (through a call to the get() function)
    const count = await contract.methods.get().call();
    console.log(count.toString());
}

main();