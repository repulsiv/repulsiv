## Home Page
- The users are not required to sign-in for searching product items.
- The users need to sign-in for:
	- Being able to add a threshold value
	- Visit their watchlist


## Searching Items 

- When a search item is entered in the search box, it makes a API call to Walmart API and fetches data
- The resulting item are links which when clicked renders the picture at the bottom of the page


## Authentication 
- Upon users approval, they can login to yecchy with their google credentials


## Searching Items when logged-in 

- In addition to above, when searched for items with logged-in status, every items gets a toggle button in front and a navigation on the side of watchlist

- Upon toggling the button to on, a text box appears where the threshold price for alert can be set and hit enter. On enter, the search box disappears

## Watchlist

- The item gets added to the watchlist, where their threshold price and price graph appears. 

- The cron job runs after every 12 hours and checks for the price in the watchlist items.

- If the retail price gets lower or equal to the threshold price, the user gets an email notification

## Price Analysis

- If you don't want alerts, this app can be used for price analysis only, set the threshold to 0.00 and build a price history 

## Remove items
Items can be removed from the watchlist. Upon removal, it deletes history as well








