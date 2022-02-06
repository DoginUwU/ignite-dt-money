import React from 'react';
import ReactDOM from 'react-dom';
import { createServer, Model } from 'miragejs';

import { App } from './App';

createServer({
  models: {
    transaction: Model,
  },

  seeds(server) { 
    server.db.loadData({
      transactions: [
        {
          id: 1,
          title: 'Desenvolvimento de Front-End',
          value: 12000,
          type: 'deposit',
          category: 'Desenvolvimento',
          createdAt: new Date(2020, 1, 5),
        },
        {
          id: 2,
          title: 'Mercado',
          value: 525,
          type: 'withdraw',
          category: 'Casa',
          createdAt: new Date(2020, 1, 4),
        }
      ]
    });
  },

  routes() {
    this.namespace = 'api';

    this.get('/transactions', () => {
      return this.schema.all('transaction');
    });

    this.post('/transactions', (_, request) => { 
      const data = JSON.parse(request.requestBody);

      return this.schema.create("transaction", data);
    });
  }
});

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);