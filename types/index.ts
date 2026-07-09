export interface Transaction {
  id: string;
  type: "recharge" | "withdraw" | "bonus" | "win" | "loss";
  amount: number;
  status: "success" | "pending" | "failed";
  description: string;
  date: string;
}

export interface WalletData {
  wallet: number;
  bonus: number;
  winnings: number;
}

export interface GameItem {
  title: string;
  description: string;
  gradient: string;
  badge?: string;
}
