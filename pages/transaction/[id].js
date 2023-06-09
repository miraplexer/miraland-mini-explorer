import Head from 'next/head';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import TransactionListDetail from '../../components/TransactionListDetail';

export default function TransactionDetail() {
    const [loading, setLoading] = useState(false);
    const [transactionData, setTransactionData] = useState();
    const [errorMessage, setErrorMessage] = useState('');
    const router = useRouter();

    useEffect(() => {
        const getTransaction = async () => {
            try {
                setLoading(true);
                setErrorMessage('');

                if (!router.query?.id) {
                    return;
                }
                const response = await axios.post('/api/transaction', {
                    transactionHash: router.query?.id,
                    cluster: router.query?.cluster ? router.query.cluster : 'mainnet-mln'
                });

                if (response.status === 200) {
                    setTransactionData(response.data.transaction);
                }
            } catch (error) {
                console.error("Error caught in getTransaction()", error);
                setErrorMessage(
                    error?.response?.data?.message || 'Unable to fetch transaction. Please try again later.'
                );
            } finally {
                setLoading(false);
            }
        };

        getTransaction();
    }, [router.query?.id, router.query?.cluster, router.query?.numTx]);

    return (
        <>
            <Head>
                <title>Miraland Mini Explorer: Transaction</title>
            </Head>
            <main className='w-full h-full p-6 flex flex-col items-center justify-between gap-6 mx-auto relative'>
                <h1 className='text-2xl'>Transaction</h1>
                {errorMessage && <p className='text-red-600 text-base text-center my-1'>{errorMessage}</p>}

                <TransactionListDetail loading={loading} transactionData={transactionData} />

                {loading && (
                    <div className='absolute inset-0 bg-white/70 flex items-center justify-center'>Loading</div>
                )}
            </main>
        </>
    );
}
