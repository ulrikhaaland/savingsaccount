"use client";
import React, { useState } from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  SelectChangeEvent,
  TextField,
  Button,
} from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledFormControl = styled(FormControl)({
  margin: "20px 0",
  minWidth: 120,
});

// Define a type for user input data
export type UserInput = {
  birthYear: string;
  initialDeposit: string;
  monthlySavings: string;
  investmentPeriod: string;
  municipality: string;
  status: string;
  expectedWithdrawals: string;
  accountPurpose: string;
};

const investmentPeriodOptions = [
  "1 år",
  "2 år",
  "3 år",
  "5 år",
  "10 år",
  "20 år",
  "30 år",
];

interface BankMatchProps {
  onSearch: (input: UserInput) => void;
  userInput: UserInput;
}

const BankMatch = (props: BankMatchProps) => {
  const { onSearch, userInput } = props;
  /// min age 13 for bank account creation
  const currentYear = new Date().getFullYear() - 13;
  const [userData, setUserData] = useState<UserInput>(userInput);

  const handleBirthYearChange = (event: SelectChangeEvent<string>) => {
    setUserData({ ...userData, birthYear: event.target.value });
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({ ...userData, [event.target.name]: event.target.value });
  };

  const handleSelectChange = (event: SelectChangeEvent<string>) => {
    setUserData({ ...userData, [event.target.name]: event.target.value });
  };
  const generateYearOptions = () => {
    const years = [];
    for (let year = currentYear; year >= currentYear - 100; year--) {
      years.push(year);
    }
    return years;
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    // Call the onSearch callback with the userData state
    onSearch(userData);
  };

  return (
    <div style={{ padding: "40px", maxWidth: "500px", margin: "auto" }}>
      <form onSubmit={handleSubmit}>
        <Typography
          variant="h4"
          style={{ textAlign: "center", marginBottom: "20px" }}
        >
          Finn den beste sparekontoen for deg
        </Typography>
        <Typography
          variant="body1"
          style={{ textAlign: "center", marginBottom: "20px" }}
        >
          Vårt mål er å matche deg med riktig bank. For å gjøre dette er det
          derfor viktig at du deler litt informasjon om deg selv, helt anonymt,
          så vi kan finne den beste banken for deg og dine penger.
        </Typography>

        <StyledFormControl fullWidth>
          <InputLabel id="birth-year-select-label">Fødselsår</InputLabel>
          <Select
            labelId="birth-year-select-label"
            id="birth-year-select"
            value={userData.birthYear}
            label="Når er du født?"
            onChange={handleBirthYearChange}
          >
            {generateYearOptions().map((year) => (
              <MenuItem key={year} value={year}>
                {year}
              </MenuItem>
            ))}
          </Select>
        </StyledFormControl>

        <TextField
          label="Innledende innskudd (NOK)"
          variant="outlined"
          name="initialDeposit"
          value={userData.initialDeposit}
          onChange={handleInputChange}
          fullWidth
          style={{ marginBottom: "20px" }}
          helperText="Angi hvor mye du planlegger å sette inn når du åpner kontoen."
        />

        <TextField
          label="Månedlig sparing (NOK)"
          variant="outlined"
          name="monthlySavings"
          value={userData.monthlySavings}
          onChange={handleInputChange}
          fullWidth
          style={{ marginBottom: "20px" }}
          helperText="Angi hvor mye du planlegger å spare hver måned."
        />

        <StyledFormControl fullWidth>
          <InputLabel id="investment-period-select-label">
            Investeringsperiode
          </InputLabel>
          <Select
            labelId="investment-period-select-label"
            id="investment-period-select"
            name="investmentPeriod"
            value={userData.investmentPeriod}
            label="Investeringsperiode"
            onChange={handleSelectChange}
          >
            {investmentPeriodOptions.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </StyledFormControl>
        <TextField
          label="Kommune"
          variant="outlined"
          name="municipality"
          value={userData.municipality}
          onChange={handleInputChange}
          fullWidth
          style={{ marginBottom: "20px" }}
          helperText="Skriv inn kommunen du bor i eller har planer om å flytte til."
        />
        <StyledFormControl fullWidth>
          <InputLabel id="status-select-label">Status</InputLabel>
          <Select
            labelId="status-select-label"
            id="status-select"
            name="status"
            value={userData.status}
            label="Status"
            onChange={handleSelectChange}
          >
            <MenuItem value="Student">Student</MenuItem>
            <MenuItem value="Retiree">Pensjonist</MenuItem>
            <MenuItem value="Non">Annen</MenuItem>
          </Select>
        </StyledFormControl>

        <TextField
          label="Antall forventede uttak i året"
          variant="outlined"
          name="expectedWithdrawals"
          value={userData.expectedWithdrawals}
          onChange={handleInputChange}
          type="number"
          fullWidth
          style={{ marginBottom: "20px" }}
          helperText="Angi hvor mange ganger du forventer å ta ut penger fra kontoen i løpet av et år."
        />
        <StyledFormControl fullWidth>
          <InputLabel id="account-purpose-select-label">
            Formål med kontoen
          </InputLabel>
          <Select
            labelId="account-purpose-select-label"
            id="account-purpose-select"
            name="accountPurpose"
            value={userData.accountPurpose}
            label="Formålet med sparekontoen"
            onChange={handleSelectChange}
          >
            <MenuItem value="Generall Sparing">Generell Sparing</MenuItem>
            <MenuItem value="BSU">BSU (bolig sparing for unge)</MenuItem>
            <MenuItem value="Bufferkonto">Bufferkonto</MenuItem>
            <MenuItem value="Sparing for utdannelse">Utdannelse</MenuItem>
            <MenuItem value="Annen">Annen</MenuItem>
          </Select>
        </StyledFormControl>
        <Button
          type="submit"
          variant="contained"
          color="secondary"
          style={{ marginTop: "20px", backgroundColor: "blue" }}
        >
          Finn Beste Konto
        </Button>
      </form>
    </div>
  );
};

export default BankMatch;
