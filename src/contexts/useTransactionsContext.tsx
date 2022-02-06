import React, { createContext, useContext, useEffect, useState } from 'react';
import { Transaction } from '../@types/transaction';
import { api } from '../services/api';

interface ContextProps {
  transactions: Transaction[];
  createTransaction: (transaction: Transaction) => Promise<void>;
}

const TransactionsContext = createContext<ContextProps>({} as ContextProps);

const TransactionsProvider: React.FC = ({ children }) => { 
    const [transactions, setTransactions] = useState<Transaction[]>([]);

    useEffect(() => {
        api.get('/transactions').then(response => { 
            setTransactions(response.data.transactions);
        });
    }, []);

    const createTransaction = async (transactionInput: Transaction) => { 
        const respose = await api.post("/transactions", {
            ...transactionInput,
            createdAt: new Date(),
        });
        const { transaction } = respose.data;

        setTransactions([...transactions, transaction]);
    };

    return (
      <TransactionsContext.Provider value={{ transactions, createTransaction }}>
        {children}
      </TransactionsContext.Provider>
    );
};

const useTransactions = (): ContextProps => {
    const context = useContext(TransactionsContext);

    if (!context) {
        throw new Error('useTransactions must be used within a TransactionsProvider');
    }

    return context;
};

export { TransactionsProvider, useTransactions };