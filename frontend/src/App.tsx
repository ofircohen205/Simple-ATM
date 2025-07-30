import { Container, Typography } from "@mui/material";
import { useState } from "react";
import AccountForm, { FormData } from "./components/AccountForm";
import BalanceDisplay from "./components/BalanceDisplay";
import ErrorAlert from "./components/ErrorAlert";
import { getBalance, performTransaction } from "./api";

export default function App() {
    const [account, setAccount] = useState<string | null>(null);
  const [balance, setBalance] = useState<number | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = async (data: FormData, type: "deposit" | "withdraw") => {
    try {
      await performTransaction(data.account, data.amount, type);
      const newBalance = await getBalance(data.account);
      setAccount(data.account);
      setBalance(newBalance);
      setMessage(null);
    } catch (err: any) {
      setMessage(err.response?.data?.detail || "Request failed");
    }
  };

  const handleBalance = async (account: string) => {
    try {
      const newBalance = await getBalance(account);
      setBalance(newBalance);
      setMessage(null);
    } catch {
      setMessage("Failed to fetch balance");
    }
  };

  return (
    <Container maxWidth="sm" sx={{ py: 5 }}>
      <Typography variant="h4" gutterBottom>
        🏦 ATM Client
      </Typography>

      <AccountForm onSubmit={handleSubmit} onBalance={handleBalance} />
      <BalanceDisplay balance={balance} account={account} />
      <ErrorAlert message={message} />
    </Container>
  );
}