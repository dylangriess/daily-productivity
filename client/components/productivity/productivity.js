import React from "react";

const quotePrompt = "Give me a random productivity quote";
const taskPrompt =
  "Give me a random task that enhances well-being or productivity";

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
    console.log(quote);
    console.log(task);
    // You can use the quote and task variables to display them in your React app
  });

function productivity() {
  return <div>productivity</div>;
}

export default productivity;
