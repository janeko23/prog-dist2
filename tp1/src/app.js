const fs = require("fs");

const xmlData = fs.readFileSync(`./rent.xml`, {
    encoding: "utf-8",
});

const parser = require("fast-xml-parser");

const jsonData = parser.parse(
    xmlData, {
        attrNodeName: "#attr",
        textNodeName: "#text",
        attributeNamePrefix: "",
        arrayMode: "false",
        ignoreAttributes: false,
        parseAttributeValue: true,
    },
    true
);

console.log("jsonData", jsonData);