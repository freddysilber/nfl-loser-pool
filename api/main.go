package main

import (
	"api/router"
	// "fmt"
	"log"
	"net/http"

	"github.com/fatih/color"
)

func main() {
    r := router.Router()
    // fs := http.FileServer(http.Dir("build"))
    // http.Handle("/", fs)
    // fmt.Println("Starting server on the port 8080...")
	color.Green("Kicking off on port 8080...")

    log.Fatal(http.ListenAndServe(":8080", r))
}