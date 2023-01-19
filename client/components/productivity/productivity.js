import React, { useState, useEffect } from "react";

const quotePrompt = "Give me a random productivity quote";
const taskPrompt =
  "Give me a random task that enhances well-being or productivity";

function Productivity() {
  const [quote, setQuote] = useState("");
  const [task, setTask] = useState("");

  useEffect(() => {
    Promise.all([
      fetch("https://api.openai.com/v1/engines/davinci/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${YOUR_API_KEY}`,
        },
        body: JSON.stringify({
          prompt: quotePrompt,
          max_tokens: 100,
          temperature: 0.5,
        }),
      }),
      fetch("https://api.openai.com/v1/engines/davinci/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${YOUR_API_KEY}`,
        },
        body: JSON.stringify({
          prompt: taskPrompt,
          max_tokens: 100,
          temperature: 0.5,
        }),
      }),
    ])
      .then(([quoteRes, taskRes]) => {
        return Promise.all([quoteRes.json(), taskRes.json()]);
      })
      .then(([quoteData, taskData]) => {
        const quote = quoteData.choices[0].text;
        const task = taskData.choices[0].text;
        setQuote(quote);
        setTask(task);
      });
  }, []);

  return (
    <div>
      <p>{quote}</p>
      <p>{task}</p>
    </div>
  );
}

export default Productivity;
