"use client";
import React from "react";
import { BankEntry } from "../models";
import { Typography, Button, List, ListItem, Paper, Box } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

interface BankSuggestionsProps {
  banks: BankEntry[];
  goBack: () => void;
}

const BankSuggestions = (props: BankSuggestionsProps) => {
  const { banks, goBack } = props;

  const handleBack = () => {
    goBack();
  };

  return (
    <Box sx={{ padding: "40px", maxWidth: "600px", margin: "auto" }}>
      <Button startIcon={<ArrowBackIcon />} onClick={handleBack} sx={{ mb: 2 }}>
        Tilbake
      </Button>
      <Typography variant="h4" sx={{ textAlign: "center", mb: 3 }}>
        De Beste bankene for deg
      </Typography>
      <Paper elevation={3} sx={{ padding: 2 }}>
        <List>
          {banks.map((bank, index) => (
            <ListItem
              key={index}
              sx={{ mb: 2, borderBottom: "1px solid #eee" }}
            >
              <Box>
                <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                  {bank.rank}. {bank.title} - {bank.leverandor_tekst}
                </Typography>
                <Typography variant="body1" sx={{ mb: 1 }}>
                  Interest Rate: {bank.rentesats1}%
                </Typography>
                <Typography variant="body2">{bank.description}</Typography>
              </Box>
            </ListItem>
          ))}
        </List>
      </Paper>
    </Box>
  );
};

export default BankSuggestions;
