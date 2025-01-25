let dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const OpenAIApi = require("openai");
const xss = require("xss");
const cors = require("cors");

const app = express();
const port = 3000;
const api_key = process.env.NEXT_API_KEY;

app.use(express.json());
app.use(cors({
    origin: "http://localhost:5173",
    methods: ["POST"],
}));

const openai = new OpenAIApi.OpenAI({
    apiKey: api_key
});

app.post("/api/summarize", async (req,res) => {
    if(req.method === "POST") {
        const inputText = xss(req.body.inputText);

        try {
            const prompt = await openai.chat.completions.create({
                messages: [
                    {"role":"system", "content":"Résume le texte suivant en une seule phrase concise, en conservant les informations essentielles et en évitant tout détail superflu. Le résumé doit être universel et compréhensible quel que soit le sujet."},
                    {"role":"user", "content":`Voici un texte que tu dois résumer : ${inputText}. Résume-le en une seule phrase concise en conservant le sens principal et en évitant les détails inutiles, ni paraphrases, ni phrases à la rallonge.`}
                ],
                model: "gpt-3.5-turbo"
            });

            res.status(200).json({ summary: prompt.choices[0].message.content });
        }
        catch(error) {
            res.status(500).json({ error: "Error calling OPENAI." })
        }
    }
    else {
        res.status(405).json({ error: "Method not supported." });
    }
});

app.listen(port, () => console.log(`The server listen on the port ${port}.`));