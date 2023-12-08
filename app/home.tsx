"use client";
import endent from "endent";
import BankMatch, { UserInput } from "./components/bank_match";
import OpenAI from "openai";
import { MessageCreateParams } from "openai/resources/beta/threads/messages/messages.mjs";
import { useState } from "react";
import { BankEntry, getEntryById } from "./models";
import BankSuggestions from "./components/bank_suggestions";
import { CircularProgress, Typography } from "@mui/material";

const client = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

export default function SavingsAccount() {
  const [isLoading, setIsLoading] = useState(false);
  const [bankSuggestions, setBankSuggestions] = useState<BankEntry[]>([]);
  const [userData, setUserData] = useState<UserInput>({
    birthYear: "",
    initialDeposit: "",
    monthlySavings: "",
    investmentPeriod: "",
    municipality: "",
    status: "",
    expectedWithdrawals: "",
    accountPurpose: "",
  });

  const handleSearch = async (
    input: UserInput,
    tries: number = 0,
    previousThread?: OpenAI.Beta.Threads.Thread
  ) => {
    setUserData(input);
    setIsLoading(true);
    if (tries > 3) {
      setIsLoading(false);
      return;
    }
    const thread = previousThread ?? (await client.beta.threads.create());
    const message: MessageCreateParams = {
      role: "user",
      content: endent`
          User data:
          age: ${2023 - Number(input.birthYear)}
          initial investment: ${input.initialDeposit} NOK 
          monthly planned investment: ${input.monthlySavings} NOK
          investment horizon: ${input.investmentPeriod}
          municipality: ${input.municipality}
          isstudent: ${input.status === "Student" ? "true" : "false"}
          isretiree: ${input.status === "Retiree" ? "true" : "false"}
          expected annual withdrawals: ${input.expectedWithdrawals}
          savingspurpose: ${input.accountPurpose}
          Never include sources or links in your message.
          Respond only with the JSON, nothing else. This is very important.`,
    };
    /// add message to thread
    await client.beta.threads.messages.create(thread.id, message);

    const run = await client.beta.threads.runs.create(thread.id, {
      assistant_id: "asst_1jqXe27ebdTrW9y5YugCN4eH",
    });

    async function getRunStatus(threadId: string, runId: string) {
      const status = await client.beta.threads.runs.retrieve(threadId, runId);
      if (status.status === "completed") {
        const messageList = await client.beta.threads.messages.list(threadId);
        const dataList = messageList.data;
        // OpenAI.Beta.Threads.Messages.MessageContentText
        if (dataList.length === 1) {
          handleSearch(input, tries + 1);
        } else {
          const content = dataList[0]
            .content[0] as OpenAI.Beta.Threads.Messages.MessageContentText;

          const contentTextValue = content.text.value;
          cleanResponse(contentTextValue);
        }
      } else {
        setTimeout(() => getRunStatus(threadId, runId), 1000);
      }
    }

    getRunStatus(thread.id, run.id);
  };

  function cleanResponse(response: string) {
    // Cleaning the response string
    const cleanedResponse = response.replace(/```json\n|\n```|\\n/g, "");

    // Parsing the JSON string to an object
    try {
      const parsedResponse = JSON.parse(cleanedResponse);
      const bankEntries: BankEntry[] = [];
      for (var i = 0; i < parsedResponse.length; i++) {
        const element = parsedResponse[i];
        const bankEntry = getEntryById(element.id);

        if (bankEntry) {
          bankEntry.description = element.explanation;
          bankEntry.rank = i + 1;
          bankEntries.push(bankEntry);
        }
      }
      setBankSuggestions(bankEntries);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  }

  if (bankSuggestions.length > 0) {
    return (
      <BankSuggestions
        banks={bankSuggestions}
        goBack={() => setBankSuggestions([])}
      />
    );
  } else if (isLoading) {
    /// Display spinner and text saying henter de beste bankene for deg
    return (
      <div style={{ padding: "40px", maxWidth: "500px", margin: "auto" }}>
        <Typography
          variant="h4"
          style={{ textAlign: "center", marginBottom: "20px" }}
        >
          Vennligst vent mens vår AI henter de beste bankene for deg
        </Typography>
        {/* center spinner */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress />
        </div>
      </div>
    );
  }

  return <BankMatch onSearch={handleSearch} userInput={userData} />;
}
