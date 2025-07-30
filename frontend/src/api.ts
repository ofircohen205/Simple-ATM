import axios from "axios";

const API_URL = "http://localhost:8000";

export const getBalance = async (account: string) => {
  const res = await axios.get(`${API_URL}/accounts/${account}/balance`);
  return res.data.balance;
};

export const performTransaction = async (
  account: string,
  amount: number,
  type: "deposit" | "withdraw"
) => {
  await axios.post(`${API_URL}/accounts/${account}/${type}`, { amount });
};