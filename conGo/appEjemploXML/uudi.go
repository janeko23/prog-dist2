package main

import (
    "fmt"
    "strings"
    "github.com/google/uuid"
)

func main1() {
    uuidWithHyphen := uuid.New()
    fmt.Println(uuidWithHyphen)
    uuid := strings.Replace(uuidWithHyphen.String(), "-", "", -1)
    fmt.Println(uuid)
}