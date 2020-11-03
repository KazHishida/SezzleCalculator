package main

import (
  "github.com/gin-gonic/contrib/static"
  "github.com/gin-gonic/gin"
  "encoding/json"
  "log"
  "gopkg.in/olahol/melody.v1"
  "os"
)
//Store recent equations as a queue of max-size 10 in memory. If size is no longer constant, consider using a DB.
var recentCalcs []string 

func main() {

  router := gin.Default()
  m := melody.New()

  router.Use(static.Serve("/", static.LocalFile("./build/", true)))

  //Socket interations
  router.GET("/ws", func(c *gin.Context) {
    m.HandleRequest(c.Writer, c.Request)
  })
  m.HandleMessage(func(s *melody.Session, msg []byte) {
    handleMessage(msg)
    m.Broadcast(getRecent())
  })

  //Get port from environment or 8080 nothing
  port := os.Getenv("PORT")
  if port == "" {
    port = "8080"
  }

  router.Run(":"+port)
}

//Return recentCalcs queue as json to be broadcasted to everyone when recentCalcs is updated
func getRecent() []byte {
  jsonEncoded, err := json.Marshal(recentCalcs)
  if err!=nil {
    log.Println(err)
  }
  return jsonEncoded
}

//Process message and delegate request to correct function
func handleMessage(message []byte) {
  var m map[string]string
  err := json.Unmarshal(message, &m)
  if err!=nil {
    log.Println(err)
  }
  if val, ok := m["recentCalc"]; ok {
    pushRecent(val)
  } else if val, ok := m["clear"]; ok {
    clearRecent(val)
  }
}

//Push recent message to queue, pop if queue is at length 10
func pushRecent(message string) {
  if len(recentCalcs) == 10 {
    recentCalcs[0] = ""
    recentCalcs = recentCalcs[1:]
  }
  recentCalcs = append(recentCalcs, message)
}

//Clear queue
func clearRecent(message string) {
  recentCalcs = nil
}