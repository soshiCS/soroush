const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const path = require('path');
const { Configuration, OpenAIApi } = require('openai');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(session({
  secret: 'your-unique-session-secret', // Replace with your unique session secret
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));

app.use(express.static(path.join(__dirname, 'public')));

const configuration = new Configuration({
  apiKey: process.env.AK, // Replace with your OpenAI API key
});
const openai = new OpenAIApi(configuration);

let resume = {
  "name": "Soroush Aghajani",
  "summary": "Computer Science graduate with hands-on experience in software development and machine learning. Proficient in Java, Python, Flask, MongoDB, and BERT. Skilled in developing comprehensive applications, automating tasks, and leading projects. Strong problem-solving abilities and a passion for continuous learning.",
  "contact": {
    "address": "17 Washington st, Malden, MA 02148",
    "phone": "(617) 435-9013",
    "email": "aghajanisoroush@gmail.com",
    "linkedin": "https://www.linkedin.com/in/soroush-aghajani-a94551119/"
  },
  "experience": [
    {
      "title": "Instructor",
      "company": "Codeadvantage, MA",
      "years": "Jan 2024 - PRESENT",
      "description": "Teaching robotics and python."
    },
    {
      "title": "Research intern",
      "company": "University of Massachusetts, Boston",
      "years": "Jul 2023 - Dec 2023",
      "description": "Developed an OCaml program featuring a parser for a basic language and a translator converting parsed input into a non-deterministic finite automaton (NFA), visually represented as a graph. Leveraged recursion and variant types in OCaml for efficient implementation."
    },
    {
      "title": "Software developer",
      "company": "Pliant.io , MA",
      "years": "April 2021 - July 2022",
      "description": "Automated workflows for efficiency. Developed a Retool app for instance management and a Node.js tool for JSON/CSV conversion. Contributed to cloud-based HR software, utilizing MySQL for user data storage and retrieval."
    },
    {
      "title": "Software engineer",
      "company": "Cool Green Power , MA",
      "years": "May 2020 - Aug 2020",
      "description": "Developed a RESTful API in Java/Spring Boot for Coolnomix device communication. Implemented setpoint adjustment, compressor control, scheduling, and log retrieval. Conducted testing and debugging for optimal performance."
    }
  ],
  "education": [
    {
      "degree": "BS in Computer Science",
      "institution": "University of Massachusetts, Boston",
      "years": "Dec 2020 - May 2024"
    }
  ],
  "skills": [
    "Java",
    "OCaml",
    "Python",
    "C",
    "C++",
    "Racket",
    "JavaScript",
    "NodeJS",
    "JavaFX",
    "MongoDB",
    "Spring boot",
    "Maven",
    "HTML",
    "CSS",
    "Problem Solving",
    "Object-Oriented Programming",
    "Functional Programming",
    "Android App Development",
    "Spring Boot",
    "MongoDB",
    "Database Management",
    "Linux",
    "JSON",
    "Android Studio",
    "Visual Studio",
    "IntelliJ",
    "Git",
    "GitHub",
    "Bash",
    "Jira"
  ],
  "courses": [
    "Honors Thesis",
    "Intro to Software Engineering",
    "Intro to the Theory of Computation",
    "Intro to Operating Systems",
    "Structure of Higher-Level Languages",
    "Advanced Data Structures and Algorithms",
    "Independent Study (Maxima Code Generator)"
  ],
  "projects": [
    {
      "name": "Comprehensive Web Application",
      "technologies": [
        "Flask",
        "MongoDB",
        "BERT"
      ],
      "description": "Developed a comprehensive web application using Flask, MongoDB, and BERT for sequence classification. The application allows users to sign up, sign in, manage profile settings, and submit weekly work with metadata. Fine-tuned a BERT model to classify artist-related data categories."   
    },
    {
      "name": "Banking(IoT)",
      "technologies": [
        "Flutter",
        "Dart"
      ],
      "description": "Led the development of 'Banking,' an IoT project simulating banking transactions using Flutter and Dart. Spanned from concept to delivery, ensuring stakeholder requirements were met with precision."
    },
    {
      "name": "Chess (1 vs 1)",
      "technologies": [
        "JavaFX",
        "MySQL"
      ],
      "description": "Developed a JavaFX-based chess program with multiplayer functionality, integrating MySQL for data storage. Conducted rigorous unit testing to ensure flawless performance."
    }
  ]
};

// Handle incoming questions
app.post('/ask', async (req, res) => {
  const question = req.body.question;

  try {
    const prompt = `As a representative of Soroush Aghajani, I can confirm that ${question}. Here is some information from his resume: ${JSON.stringify(resume, null, 2)}`;

    console.log('Sending request to OpenAI with prompt:', prompt);

    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: prompt }
      ]
    });

    const answer = response.data.choices[0].message.content.trim();
    res.json({ answer });
  } catch (error) {
    console.error('Error:', error.response ? error.response.data : error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
