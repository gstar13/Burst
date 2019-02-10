# Burst
Burst is a new social media platform that asks the user to contemplate great art pieces from the RijksMuseum in Amsterdam.
The users input is stored in a document on firebase that is specific to each user. We grabbed the users ip address using the ipapi.com 
geolocator API. That gave us a JSON object that we are able to pull out the city, state and country of the user. We used this to post the location
where the user contemplated the art. The second API was from the Rijksmuseum. Our new technology was the firebase authentication and creating
user accounts for each user. 
This app could be useful for museums, schools research institutions and even marketing companies to get an idea of the publics ideas about particular images.
