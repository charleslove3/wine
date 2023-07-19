import requests
from bs4 import BeautifulSoup
import pandas as pd

url = "https://www.wine.com/list/wine/7155?showOutOfStock=true&sortBy=mostInteresting"

# Create an empty list to store wine names
wine_names = []

while True:
    # Send a GET request to the website
    response = requests.get(url)

    # Parse the HTML content using BeautifulSoup
    soup = BeautifulSoup(response.content, "html.parser")

    # Find all the wine names on the current page
    names = soup.find_all("span", class_="listGridItemInfo_name")

    # Extract and add the wine names to the list
    for name in names:
        wine_names.append(name.text.strip())

    # Find the "Show More" button
    next_page_button = soup.find("a", class_="listPageNextUrl")

    # If the "Show More" button is not found, break the loop
    if not next_page_button:
        break

    # Get the URL for the next page
    url = next_page_button["href"]

# Create a DataFrame from the wine_names list with index and wine_name columns
df = pd.DataFrame({"index": range(1, len(wine_names) + 1), "wine_name": wine_names})

# Display the DataFrame
print(df.shape)
df.to_csv("wine_names.csv", index=False)
