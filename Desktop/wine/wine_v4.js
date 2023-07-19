const endpoint = 'https://api.openai.com/v1/chat/completions';
const headers = {
  'Content-Type': 'application/json',
  'Authorization': 'Bearer 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'
};

function parseLink(a_rec, i) {
  document.getElementById(`wine${i}`).innerHTML = a_rec;
  const startIndex = a_rec.indexOf(`${i}. `) + 3;
  const endIndex = a_rec.indexOf(":", startIndex);
  const wine_link = a_rec.substring(startIndex, endIndex);
  const plusLink = wine_link.replace(/ /g, "%20");
  const url = "https://www.wine.com/search/" + plusLink + "/0";
  document.getElementById(`url${i}`).innerHTML = `<a href=${url} target = "_blank">Find this online</a>`;
}

function handleReset() {
  const submitBtn = document.getElementById('submitBtn');
  submitBtn.style.display = 'inline-block'; // Set the display property to 'inline-block'
  submitBtn.disabled = false;

  // Reset the form inputs
  document.getElementById('wineForm').reset();
}

function handleSubmit(event) {
      event.preventDefault(); // Prevent form from being submitted
      // submit load
      const submitBtn = document.getElementById('submitBtn');
      const loadingAnimation = document.getElementById('loadingAnimation');
      const submitText = document.getElementById('submitText');
      loadingAnimation.style.display = 'block';
      submitBtn.disabled = 'true';
      submitText.style.display = 'none';
      // end submit load
      // Get form data
      const price = document.getElementById('price').value;
      const food = document.getElementById('food').value;
      const color = document.getElementById('color').value;
      const region = document.getElementById('region').value;
      const varietal = document.getElementById('varietal').value;

      // Perform some action with the form data
      const completionPayload = {
        model: "gpt-3.5-turbo",
        messages: [
          {"role": "user", "content": `I'm looking for a wine that costs about ${price}. I am eating it with ${food}, I want it to be a ${color} wine from ${region}, and my preference is that it is a ${varietal}.  Please provide three wine recommendations, following this format for each recommendation:
- Start with the name of the wine, followed by a comma and the year in parentheses.
- Then provide a colon (:).
- Next, include a brief description or tasting note for the wine.
- Finally, end the recommendation with a rough price estimate.

Example:
Chateau XYZ, (2015):
A rich and full-bodied red wine with notes of blackberry and spices. Perfectly pairs with grilled steak and hearty stews. Price range: $30-$40.

After the recommendations, please include an introduction paragraph that sets the context and briefly introduces the recommendations.

Finally, conclude the response with a closing paragraph summarizing the recommendations and providing any additional insights or suggestions.

Please make sure all three recommendations follow the specified format, with colons used only after the year. Thank you!"`}
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
        let recommendation = data.choices[0].message.content;
        const wine_rec = recommendation.split(/\n\n/);
        document.getElementById("first_line").innerHTML = wine_rec[0];
        document.getElementById("last_line").innerHTML = wine_rec[4];
        parseLink(wine_rec[1], 1)
        parseLink(wine_rec[2], 2)
        parseLink(wine_rec[3], 3)
        loadingAnimation.style.display = 'none';
        submitBtn.style.display = 'none';
      })
      .catch(error => {
        console.log('Error:', error);
      });
    // You can perform additional actions here, such as making an API call or updating the DOM

    return false;
       // Return false to prevent form submission
  }
const resetBtn = document.getElementById('resetBtn');
resetBtn.addEventListener('click', handleReset);
