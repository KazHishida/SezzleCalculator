# SezzleCalculator
This webapp's was built using Gin for the back-end and React for the front-end. Although I had never used either framework or library, I did a little research and found that they were a part of Sezzle's tech stack. I had been meaning to get my toes wet in both Go and React, so this was a perfect opportunity for me to do so. For the collaborative feature of sharing calculations, I used websockets to allow the front-end to communicate in real-time with the back-end. The application is being hosted at https://blooming-forest-96051.herokuapp.com/.

## How to use
Make sure Go is properly installed, along with the following dependencies:
```bash
go get -u github.com/gin-gonic/gin
go get github.com/gin-contrib/static
go get gopkg.in/olahol/melody.v1
```
Then, simply run application.go:
```bash
git clone https://github.com/KazHishida/SezzleCalculator.git
cd SezzleCalculator
cd gin-gonic-backend
go run application.go
```
There is already a built executable file included in the repository as well, so you can just run gin-gonic-backend.exe from the gin-gonic-backend folder instead.

Once the application is running, go to http://localhost:8080/ to view. It is also deployed at https://blooming-forest-96051.herokuapp.com/.

## Some Notes:

I opted to include a "Clear" button at the bottom of the recent calculations list. This clears all of the recent calculations across every user. This is not a feature I would normally include but I included it to allow the engineers to test my application more thoroughly if they so please. This button is not an essential part of my program, as the list is managed automatically by a queue-like data structure.

The calculator's functionality was modeled, in large part, by the android calculator's functionality.

I genuinely enjoyed the opportunity to work on this exercise and to work with Gin and React. My favorite take-home assignments are the ones where I am given an opportunity to learn. I appreciate this opportunity, regardless of the outcome, and with that said, I look forward to hearing back you and your team!
