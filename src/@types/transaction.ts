interface Transaction {
  id: string;
  title: string;
  value: number;
  type: 'deposit' | 'withdraw';
  category: string;
  createdAt: string;
}

export type { Transaction };