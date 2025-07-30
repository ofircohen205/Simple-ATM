import { useForm } from "react-hook-form";
import { Stack, TextField, Button } from "@mui/material";

export type FormData = {
  account: string;
  amount: number;
};

type Props = {
  onSubmit: (data: FormData, type: "deposit" | "withdraw") => void;
  onBalance: (account: string) => void;
};

export default function AccountForm({ onSubmit, onBalance }: Props) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>();

  const account = watch("account");

  return (
    <Stack spacing={2}>
      <TextField
        label="Account Number"
        {...register("account", {
          required: "Account is required",
          pattern: {
            value: /^[0-9]+$/,
            message: "Must be numeric",
          },
        })}
        error={!!errors.account}
        helperText={errors.account?.message}
      />

      <TextField
        label="Amount"
        type="number"
        {...register("amount", {
          required: "Amount is required",
          min: {
            value: 0.01,
            message: "Must be positive",
          },
        })}
        error={!!errors.amount}
        helperText={errors.amount?.message}
      />

      <Stack direction="row" spacing={2}>
        <Button
          variant="contained"
          onClick={handleSubmit((data) => onSubmit(data, "deposit"))}
        >
          Deposit
        </Button>
        <Button
          variant="contained"
          color="error"
          onClick={handleSubmit((data) => onSubmit(data, "withdraw"))}
        >
          Withdraw
        </Button>
        <Button variant="outlined" onClick={() => onBalance(account)}>
          Get Balance
        </Button>
      </Stack>
    </Stack>
  );
}