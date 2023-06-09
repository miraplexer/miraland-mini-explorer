import * as miralandWeb3 from '@solarti/web3.js';

const DEVNET = miralandWeb3.clusterApiUrl('devnet-mln');
const miralandConnection = new miralandWeb3.Connection(DEVNET);

const handler = async (req, res) => {
    const transactionHash = req.body.transactionHash;
    if (!transactionHash) {
        return res.status(401).json({
            error: 'Invalid transaction hash. Please check transaction hash provided.',
        });
    }
    try {
        const transaction = await miralandConnection.getParsedTransaction(transactionHash);
        return res.status(200).json({ transaction });
    } catch (error) {
        console.log('Error:', error);
        return res.status(500).json({
            error: 'Server error',
        });
    }
};

export default handler;
