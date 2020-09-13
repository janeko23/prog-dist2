package app
import (
	"fmt"
    "io/ioutil"
    "os"
	"log"
	"net/http"
	"encoding/xml"
	"strings"
)
func main() {

    // Open our xmlFile
    xmlFile, err := os.Open("docRecibido.xml")
    // if we os.Open returns an error then handle it
    if err != nil {
        fmt.Println(err)
    }

    fmt.Println("Successfully Opened docRecibido.xml")
    // defer the closing of our xmlFile so that we can parse it later on
    defer xmlFile.Close()

}