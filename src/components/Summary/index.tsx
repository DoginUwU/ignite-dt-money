import React from 'react';
import incomeImg from '../../assets/income.svg';
import outcomeImg from "../../assets/outcome.svg";
import totalImg from "../../assets/total.svg";
import { useTransactions } from '../../contexts/useTransactionsContext';

import { Container } from './styles';

const Summary: React.FC = () => {
  const { transactions } = useTransactions();

  const summary = transactions.reduce((accumulator, transaction) => { 
    switch (transaction.type) {
      case "deposit":
        accumulator.deposits += transaction.value;
        accumulator.total += transaction.value;
        break;
      case "withdraw":
        accumulator.withdraws += transaction.value;
        accumulator.total -= transaction.value;
        break;
    }

    return accumulator;
  }, {
    deposits: 0,
    withdraws: 0,
    total: 0,
  });

  return (
    <Container>
      <div>
        <header>
          <p>Entradas</p>
          <img src={incomeImg} alt="Entradas" />
        </header>
        <strong>
          {new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          }).format(summary.deposits)}
        </strong>
      </div>
      <div>
        <header>
          <p>Saidas</p>
          <img src={outcomeImg} alt="Saidas" />
        </header>
        <strong>
          - {new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          }).format(summary.withdraws)}
        </strong>
      </div>
      <div className="hightlight-background">
        <header>
          <p>Total</p>
          <img src={totalImg} alt="Total" />
        </header>
        <strong>
          {new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          }).format(summary.total)}
        </strong>
      </div>
    </Container>
  );
}

export { Summary  };