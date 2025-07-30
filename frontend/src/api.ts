import axios from "axios";


export const getBalance = async (account: string) => {
  const res = await axios.get(`${process.env.REACT_APP_API}/accounts/${account}/balance`);
  return res.data.balance;
};

export const performTransaction = async (
  account: string,
  amount: number,
  type: "deposit" | "withdraw"
) => {
  await axios.post(`${process.env.REACT_APP_API}/accounts/${account}/${type}`, { amount });
};