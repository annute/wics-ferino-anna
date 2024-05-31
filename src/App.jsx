import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [transactions, setTransactions] = useState([]);
  const [label, setLabel] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');

  const addTransaction = (e) => {
    e.preventDefault();
    const newTransaction = { label, amount: parseFloat(amount), date: new Date(date) };
    setTransactions([...transactions, newTransaction]);
    setLabel('');
    setAmount('');
    setDate('');
  };

  const sortedTransactions = transactions.sort((a, b) => new Date(a.date) - new Date(b.date));

  const income = sortedTransactions.reduce((acc, curr) => curr.amount > 0 ? acc + curr.amount : acc, 0);
  const expenses = sortedTransactions.reduce((acc, curr) => curr.amount < 0 ? acc + curr.amount : acc, 0);

  return (
    <div>
      <form onSubmit={addTransaction}>
        <h2>Aggiungi</h2>
        <p>Etichetta</p>
        <input value={label} onChange={e => setLabel(e.target.value)} placeholder="Etichetta" required />
        <p>Importo</p>
        <input value={amount} onChange={e => setAmount(e.target.value)} placeholder="Importo" required />
        <p>Data</p>
        <input type="date" value={date} onChange={e => setDate(e.target.value)} required />
        <p> </p>
        <button type="submit">Aggiungi transazione</button>
      </form>
      <h2>Movimenti</h2>
      {sortedTransactions.map((transaction, index) => (
        <p key={index}>
          {transaction.amount + ' €'}, {transaction.label}, {new Intl.DateTimeFormat('it-IT').format(new Date(transaction.date))}
        </p>
      ))}
      <h2>Imponibile: {sortedTransactions.reduce((acc, curr) => acc + curr.amount, 0)} €</h2>
      <p>Entrate: {income} €</p>
      <p>Uscite: {expenses} €</p>
    </div>
  );
};

export default App;
