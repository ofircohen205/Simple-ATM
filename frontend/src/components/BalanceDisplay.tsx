import { Alert } from "@mui/material";

type Props = {
    account: string | null;
    balance: number | null;
};

export default function BalanceDisplay({ account, balance }: Props) {
  if (balance === null) return null;
  return <Alert severity="info">Account {account}, Balance: {balance.toFixed(2)}</Alert>;
}