const express = require('express');
const bodyParser = require('body-parser');
const openai = require('openai'); // Import OpenAI SDK

const app = express();
const port = 3000;

app.use(bodyParser.json());

// Initialize OpenAI API client
const openaiClient = new openai.OpenAIApi('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');
import OpenAI from "openai";

const openai = new OpenAI();

// async function main() {
//   const completion = await openai.chat.completions.create({
//     messages: [
//       {
//         role: "system",
//         content: "You are a helpful assistant designed to output JSON.",
//       },
//       { role: "user", content: "Who won the world series in 2020?" },
//     ],
//     model: "gpt-3.5-turbo-0125",
//     response_format: { type: "json_object" },
//   });
//   console.log(completion.choices[0].message.content);
// }

// main();
// Handle incoming questions
// app.post('/ask', async (req, res) => {
//     const question = req.body.question;

//     try {
//         // Send question to OpenAI's chatbot
//         const response = await openaiClient.chat({ messages: [{ role: 'user', content: question }] });

//         // Extract response from chatbot
//         const answer = response.data.choices[0].message.content;

//         // Send answer back to frontend
//         res.json({ answer });
//     } catch (error) {
//         console.error('Error:', error);
//         res.status(500).json({ error: 'Internal server error' });
//     }
// });

// Serve the index.html file
app.use(express.static('public'));

// Start server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

