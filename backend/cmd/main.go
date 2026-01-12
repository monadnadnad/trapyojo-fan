package main

import (
  "log"
  "net/http"

  handler "github.com/monadnadnad/trapyojo-fan/backend/api"
)

func main() {
  mux := http.NewServeMux()
  mux.HandleFunc("/api/likes", handler.Handler)

  log.Println("listening on :8080")
  if err := http.ListenAndServe(":8080", mux); err != nil {
    log.Fatal(err)
  }
}
