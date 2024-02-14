import { useEffect, useState } from "react";

const Memos = ({ state }) => {
    const [memos, setMemos] = useState([]); 
    const { contract } = state;

    useEffect (() => {
        const fetchMemos = async () => {
            if (contract) {
                const memos = await contract.getMemo();
                setMemos(memos);
            }
        };
        fetchMemos();
    }, [contract]);

    return ( 
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginLeft: '35px', marginTop: '15px' }}>       
            <table style={{ textAlign: 'center' }}>
                <tbody>
                    {memos.map((memo) => (
                        <tr key={memo.time} style={{ marginRight: '15px', backgroundColor: '#3498db ' }}>
                            <td><p style={{ marginRight: '15px', backgroundColor: ' #F0F0F0', textAlign: 'center' }}>{memo.name}</p></td>
                            <td><p style={{ marginRight: '15px', backgroundColor: ' #F0F0F0', textAlign: 'center' }}>{memo.message}</p></td>
                            <td><p style={{ marginRight: '15px', backgroundColor: ' #F0F0F0', textAlign: 'center' }}>{memo.time.toString()}</p></td>
                            <td><p style={{ marginRight: '15px', backgroundColor: ' #F0F0F0', textAlign: 'center' }}>{memo.from}</p></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Memos;
