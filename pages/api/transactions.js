import * as miralandWeb3 from '@solarti/web3.js';

// const DEVNET = miralandWeb3.clusterApiUrl('devnet-mln');
// const CLUSTER = router.query?.cluster ? router.query.cluster : 'mainnet-mln';
// const miralandConnection = new miralandWeb3.Connection(CLUSTER);

const getAddressInfo = async (cluster, address, numTx = 5) => {
    const CLUSTER = miralandWeb3.clusterApiUrl(cluster);
    const miralandConnection = new miralandWeb3.Connection(CLUSTER);
    const pubKey = new miralandWeb3.PublicKey(address);
    const transactionList = await miralandConnection.getSignaturesForAddress(pubKey, { limit: numTx });
    const accountBalance = await miralandConnection.getBalance(pubKey);

    return { transactionList, accountBalance };
};

const handler = async (req, res) => {
    const cluster = req.query?.cluster ? req.query.cluster : 'mainnet-mln';
    const queryAddress = req.query?.address;
    const numTx = req.query?.numTx ? req.query.numTx : 10; // MI
    // MI, regex: [1-9A-HJ-NP-Za-km-z]{32,44}, THIS IS NOT sufficient on its own
    // ref: https://docs.solana.com/integrations/exchange
    if (!queryAddress || !/[1-9A-HJ-NP-Za-km-z]{32,44}/.test(queryAddress)) {
        return res.status(401).json({
            message: 'Invalid address',
        });
    }
    try {
        const { accountBalance, transactionList } = await getAddressInfo(cluster, queryAddress, numTx);
        return res.status(200).json({ transactionList, accountBalance });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Something went wrong. Please try again later',
        });
    }
};

export default handler;
