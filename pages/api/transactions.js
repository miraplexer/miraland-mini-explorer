import * as miralandWeb3 from '@solarti/web3.js';

const DEVNET = miralandWeb3.clusterApiUrl('devnet-mln');
const miralandConnection = new miralandWeb3.Connection(DEVNET);

const getAddressInfo = async (address, numTx = 3) => {
    const pubKey = new miralandWeb3.PublicKey(address);
    const transactionList = await miralandConnection.getSignaturesForAddress(pubKey, { limit: numTx });
    const accountBalance = await miralandConnection.getBalance(pubKey);

    return { transactionList, accountBalance };
};

const handler = async (req, res) => {
    const queryAddress = req.query?.address;
    // MI, regex: [1-9A-HJ-NP-Za-km-z]{32,44}, THIS IS NOT sufficient on its own
    // ref: https://docs.solana.com/integrations/exchange
    if (!queryAddress || !/[1-9A-HJ-NP-Za-km-z]{32,44}/.test(queryAddress)) {
        return res.status(401).json({
            message: 'Invalid address',
        });
    }
    try {
        const { accountBalance, transactionList } = await getAddressInfo(queryAddress);
        return res.status(200).json({ transactionList, accountBalance });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Something went wrong. Please try again later',
        });
    }
};

export default handler;
