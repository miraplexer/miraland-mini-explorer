import React from 'react';
import { fromUnixTime, format } from 'date-fns';
// import ReactJson from 'react-json-view'
import loadable from '@loadable/component';
const ReactJson = loadable(() => import('react-json-view'));

const TransactionListDetail = ({ loading, transactionData }) => {
    return (
        <div className='w-full'>
            {!loading && transactionData && (
                <div className='rounded-lg border max-w-xl overflow-x-auto mx-auto'>
                    <table className='table-auto w-full border-collapse p-4'>
                        <tbody className='overflow-x-scroll'>
                            <tr className='border-b'>
                                <td className='font-medium text-sm p-4'>Signature</td>
                                <td className='p-4'>{transactionData.transaction.signatures[0]}</td>
                            </tr>
                            <tr className='border-b'>
                                <td className='font-medium text-sm p-4'>Timestamp</td>
                                <td className='p-4'>
                                    {format(
                                        fromUnixTime(transactionData?.blockTime),
                                        // "MMMM d, yyyy 'at' HH:mm:ss OOOO"
                                        "yyyy-MM-dd  HH:mm:ss OOOO"
                                    )}
                                </td>
                            </tr>
                            <tr className='border-b'>
                                <td className='font-medium text-sm p-4'>Recent Blockhash</td>
                                <td className='p-4'>{transactionData.transaction.message.recentBlockhash}</td>
                            </tr>
                            <tr className='border-b'>
                                <td className='font-medium text-sm p-4'>Slot</td>
                                <td className='p-4'>{Intl.NumberFormat().format(transactionData.slot)}</td>
                            </tr>
                            <tr className='border-b'>
                                <td className='font-medium text-sm p-4'>Fee</td>
                                <td className='p-4'>𝇊{transactionData.meta.fee / 1_000_000_000}</td>
                            </tr>
                            <tr className='border-b'>
                                <td className='font-medium text-sm p-4'>Amount</td>
                                <td className='p-4'>
                                    𝇊
                                    {transactionData.transaction.message.instructions[0].parsed.info.lamports /
                                        1_000_000_000}
                                </td>
                            </tr>
                            <tr className='border-b'>
                                <td className='font-medium text-sm p-4'>📎</td>
                                <td className='p-4'>
                                    🔦 Transaction Full Details 📑
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <React.Fragment>
                        <ReactJson collapsed='true' src={transactionData} />
                    </React.Fragment>
                </div>
            )}
            {!loading && !transactionData && <p className='text-center'>No transaction to display</p>}
        </div>
    );
};

export default TransactionListDetail;
