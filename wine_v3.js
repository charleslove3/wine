// Set up OpenAI API endpoint and headers
const endpoint = 'https://api.openai.com/v1/chat/completions';
const VALIDATION_URL = 'https://api.openai.com/v1/models';
const headers = {
  'Content-Type': 'application/json',
  'Authorization': 'Bearer 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'
};

// Set up messages array
let messages = [
  {"role": "system", "content": "You are an intelligent assistant."}
];

// Here are the questions to ask
let wine_questions = [
  "What price (roughly) are you looking for?",
  "What are you eating with it?",
  "What color (red, white, rosé) are you looking for?",
  "Do you have a preference for specific wine regions or countries?",
  "What varietal (Pinot Noir, Sauvignon Blanc, etc) are you looking for?"
];

// Collect user preferences
let price = "";
let food = "";
let color = "";
let region = "";
let varietal = "";

// This iterates through each question
for (let i = 0; i < wine_questions.length; i++) {
  // This asks the question and then takes in the message
  let question = wine_questions[i];
  let message = prompt(`User: ${question}`);
  messages.push({"role": "user", "content": message});

  // This stores the data in respective variables
  if (i === 0) {
    price = message;
  } else if (i === 1) {
    food = message;
  } else if (i === 2) {
    color = message;
  } else if (i === 3) {
    region = message;
  } else if (i === 4) {
    varietal = message;
  }
}

// Print price (optional)
console.log(price);

// Create completion request payload
const completionPayload = {
  model: "gpt-3.5-turbo",
  messages: [
    {"role": "user", "content": `I'm looking for a wine that costs about ${price}. I am eating it with ${food}, I want it to be a ${color} wine from ${region}, and my preference is that it is a ${varietal}. Please show me 3 specific wine recommendations based on these preferences.`}
  ]
};

// Perform completion request
fetch(endpoint, {
  method: 'POST',
  // mode: 'cors',
  // credentials: 'same-origin',
  headers: headers,
  body: JSON.stringify(completionPayload)
})
.then(response => response.json())
.then(data => {
  console.log(data.choices[0].message.content);
})
.catch(error => {
  console.log('Error:', error);
});
/*
let follow_up = [
  "Would you like to purchase one of these? If yes, which one (copy and paste the name)?"
];

let follow = "";

// Iterate through follow-up questions
for (let i = 0; i < follow_up.length; i++) {
  // This asks the question and then takes in the message
  let question = follow_up[i];
  let follow = prompt(`User: ${question}`);
  messages.push({"role": "user", "content": follow});

  // Update variables based on user response
  if (i === 0) {
    price = follow;
  } else if (i === 1) {
    food = follow;
  } else if (i === 2) {
    color = follow;
  } else if (i === 3) {
    region = follow;
  } else if (i === 4) {
    varietal = follow;
  }
}

// Check if user wants to purchase
if (follow !== "no" && follow !== "No") {
  // Create another completion request payload
  const completionPayload2 = {
    model: "gpt-3.5-turbo",
    messages: [
      {"role": "user", "content": `Can you send me a link for the ${follow} wine that you recommended to me previously`}
    ]
  };
}
*/
