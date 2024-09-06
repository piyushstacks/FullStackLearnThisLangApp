const express = require('express');
const bodyParser = require('body-parser');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const dotenv = require('dotenv');
const cors = require('cors');

const mongoose = require('mongoose');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const jwt = require('jsonwebtoken');
const User = require('./models/User');


// Load environment variables from .env file
dotenv.config();
const app = express();

app.use(cors());
const PORT = 5000;

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: '/auth/google/callback'
}, async (accessToken, refreshToken, profile, done) => {
  try {
    // Find existing user in database
    let user = await User.findOne({ googleId: profile.id });
    
    if (!user) {
      // If the user doesn't exist, create a new one
      user = await User.create({
        googleId: profile.id,
        name: profile.displayName,
        email: profile.emails[0].value,
        avatar: profile.photos[0].value
      });
    }

    // Pass the user data to the done callback
    return done(null, user);
  } catch (error) {
    return done(error, false);
  }
}));

// Serialize user into the session
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserialize user from the session
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error, false);
  }
});

// Route to initiate Google login
app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Google callback route
app.get('/auth/google/callback', passport.authenticate('google', { session: false }), (req, res) => {
  // Generate a JWT for the user
  const token = jwt.sign({ id: req.user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

  // Redirect back to the client with the token
  res.redirect(`http://localhost:3000?token=${token}`);
});


app.use(bodyParser.json());

const MODEL_NAME = "gemini-1.0-pro";
const API_KEY = process.env.GOOGLE_API_KEY;

// const someFunction = () => {
//   console.log(`API URL: ${API_KEY}`);
// };
// someFunction();



if (!API_KEY) {
  throw new Error("Missing API key. Set the GOOGLE_API_KEY environment variable.");
}

const customPrompt = `You are LearnThisLang, an engaging and knowledgeable language assistant bot. Your primary role is to help users with various language-related tasks, including translations, grammar explanations, vocabulary building, and cultural insights.

Key guidelines:
- Be friendly, encouraging, and patient to foster a positive learning environment.
- Provide concise yet comprehensive answers, limited to 300 words.
- Use bullet points or numbered lists for clarity when appropriate.
- Include proper line breaks and spacing for readability.
- If a question is vague, politely ask for clarification.
- Tailor your language level to the user's apparent proficiency.
- Offer additional related information to spark curiosity and continued learning.
- For English queries, assume the user has basic English knowledge.
- Incorporate occasional language learning tips or fun facts to enhance engagement.
- Be confident and polite in your responses, but avoid being overly formal.
- Encourage users to contact you directly for personalized guidance and support.
- Don't promote any third party apps like duolingo. 
- To answer questions that are not related to language assistance, respond in a creative way by suggesting how learning a language could relate to or enhance the topic in a polite manner.

Remember, your goal is to make language learning enjoyable and addictive, encouraging users to interact more and expand their linguistic skills. Always treat the last line of input as the user's prompt.`;

async function runChat(prompt) {

  const fullPrompt = `${customPrompt}${prompt}`;

  const genAI = new GoogleGenerativeAI(API_KEY);
  const model = genAI.getGenerativeModel({ model: MODEL_NAME });

  const generationConfig = {
    temperature: 0.5,
    topK: 1,
    topP: 1,
    maxOutputTokens: 300,
  };

  const safetySettings = [
    {
      category: "HARM_CATEGORY_HARASSMENT",
      threshold: "BLOCK_MEDIUM_AND_ABOVE",
    },
    {
      category: "HARM_CATEGORY_HATE_SPEECH",
      threshold: "BLOCK_MEDIUM_AND_ABOVE",
    },
    {
      category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
      threshold: "BLOCK_MEDIUM_AND_ABOVE",
    },
    {
      category: "HARM_CATEGORY_DANGEROUS_CONTENT",
      threshold: "BLOCK_MEDIUM_AND_ABOVE",
    },
  ];

  try {
    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: fullPrompt }] }],
      generationConfig,
      safetySettings,
    });

    const response = result.response;

    // Log the full response for debugging
    console.log("Full response:", response);
  
  // Extract the generated text content
  let responseText = await response.text();

  responseText = responseText
  .split('\n')
  .map(line => line.trim())
  .filter(line => line)
  .join('<br><br>');


  
    console.log(responseText);
    return responseText;
  } catch (error) {
    console.error("Error running chat:", error.message);
    throw error;
  }
}

app.post('/runChat', async (req, res) => {
  const { prompt } = req.body;
  if (!prompt) {
    return res.status(400).send("Prompt is required");
  }

  try {
    const response = await runChat(prompt);
    res.json({ response });
  } catch (error) {
    res.status(500).send(error.message);
  }
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});