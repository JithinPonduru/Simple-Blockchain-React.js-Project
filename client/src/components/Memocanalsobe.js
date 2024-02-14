import React, { useEffect, useState } from "react";

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
        <div>
        {memos.map((memo) => (
            <div style={{textAlign: 'left',margin: '20px'}}>
                <React.Fragment key={memo.time}>
                    <div style={{ display: 'inline-block', marginRight: '10px' }}>
                        <span>{memo.name}</span>
                    </div>
                    <div style={{ display: 'inline-block', marginRight: '10px' }}>
                        <span>{memo.message}</span>
                    </div>
                    <div style={{ display: 'inline-block', marginRight: '10px' }}>
                        <span>{memo.from}</span>
                    </div>
                    <div style={{ display: 'inline-block' , marginRight: '10px'}}>
                        <span>{(memo.time).toString()}</span>
                    </div>
                </React.Fragment>
            </div>
        ))}
        </div>
        
    );
};

export default Memos;
