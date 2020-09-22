const { Router } = require("express");
const router = new Router();
const _ = require("underscore");
const fs = require('fs');
const validate = require('uuid-validate');
const json_items = fs.readFileSync('src/datos.json', 'utf-8');
let items = JSON.parse(json_items);

//const datos = require("src/datos");

// get all
router.get("/", (request, response) => {
  response.json(items[0]);
});
// get specific type
router.get("/:type",(request, response) => {
  var { type } = request.params;
  switch (type) {
    case "rent":
      response.json(items[0][0]);
      break;
    case "return":
      response.json(items[1][0]);
      break;
    case "delivery_to_rent":
      response.json(items[2][0]);
      break;
     case "delivery_to_return":
      response.json(items[3][0]);
      break;
    default:
      response.status(404).json("Type error. ONLY VALID: RENT,  DELIVERY_TO_RENT / RETURN / DELIVERY_TO_RETURN")
      break;
  }  
});
router.get("/:type/:object_id", (request, response) => {
  var {
    type,
    object_id
  } = request.params;
 // console.log(request.params)
  switch (type) {
    case "rent":
      var list = items[0][0].rent
      if (searchItemByObjet_id(list, object_id) == null) {
        response.status(404).json("You don't have that element")
      } else {
        response.json(searchItemByObjet_id(list, object_id))
      }
      break;
    case "return":
      var list = items[1][0].return

      if (searchItemByObjet_id(list, object_id) == null) {
        response.status(404).json("You don't have that element")
      } else {
        response.json(searchItemByObjet_id(list, object_id))
      } 
      break;
    case "delivery_to_rent":
      var list = items[2][0].delivery_to_rent
      if (searchItemByObjet_id(list, object_id) == null) {
        response.status(404).json("You don't have that element")
      } else {
        response.json(searchItemByObjet_id(list, object_id))
      } 
      break;
    case "delivery_to_return":
      var list = items[3][0].delivery_to_return
  
      if (searchItemByObjet_id(list, object_id) == null) {
        response.status(404).json("You don't have that element")
      } else {
        response.json(searchItemByObjet_id(list, object_id))
      } 
      break;
    default:
      response.status(404).json("Invalid param.")
      break;
  }
});
// crear cada tipo
router.post('/', (request, response) => {
// rent,  DELIVERY_TO_RENT / RETURN / DELIVERY_TO_RETURN   
  const newData = {
    ...request.body
  };
  if(newData.rent){
      //var list = items[0][0].rent.push(newData.rent);
      var uuidClient = newData.rent.client_id[0]
      var uuidObject = newData.rent.object_id[0]
      var fecha = newData.rent.details[0].until[0];
      if (
        validate(uuidClient) &&
        validate(uuidObject) &&
        newData.rent.details && isValidDate(fecha)
      ) {
        var newElement =  {
            client_id: uuidClient,
            object_id: uuidObject,
            details: {
              status: newData.rent.details[0].status[0],
              until: fecha,
            }
        };

        items[0][0].rent.push(newElement);
        response.json(items[0][0].rent);

      } else {
        response.status(500).json({
          error: "There was an error.",
        });
      }
  }
  else if (newData.return) {
      //var list = items[0][0].rent.push(newData.rent);
      var uuidClient = newData.return.client_id[0]
      var uuidObject = newData.return.object_id[0]
      var fecha = newData.return.details[0].until[0];
      if (
        validate(uuidClient) &&
        validate(uuidObject) &&
        newData.return.details && isValidDate(fecha)
      ) {
        var newElement =  {
            client_id: uuidClient,
            object_id: uuidObject,
            details: {
              status: newData.return.details[0].status[0],
              until: fecha,
            },
        };

        items[1][0].return.push(newElement);
        response.json(items[1][0].return);

      } else {
        response.status(500).json({
          error: "There was an error.",
        });
      }
  }
  else if (newData.delivery_to_rent){ 
    var uuidClient = newData.delivery_to_rent.client_id[0]
    var uuidObject = newData.delivery_to_rent.object_id[0]
    var fecha = newData.delivery_to_rent.details[0].until[0];
    if (
      validate(uuidClient) &&
      validate(uuidObject) &&
      newData.delivery_to_rent.details && isValidDate(fecha)
    ) {
      var newElement = {
        client_id: uuidClient,
        object_id: uuidObject,
        details: {
          status: newData.delivery_to_rent.details[0].status[0],
          until: fecha,
        },
      };

      items[2][0].delivery_to_rent.push(newElement);
      response.json(items[2][0].delivery_to_rent);

    } else {
      response.status(500).json({
        error: "There was an error.",
      });
    }
  }
  else if (newData.delivery_to_return) {
    var uuidClient = newData.delivery_to_return.client_id[0]
    var uuidObject = newData.delivery_to_return.object_id[0]
    var fecha = newData.delivery_to_return.details[0].until[0];
    if (
      validate(uuidClient) &&
      validate(uuidObject) &&
      newData.delivery_to_return.details && isValidDate(fecha)
    ) {
      var newElement = {
        client_id: uuidClient,
        object_id: uuidObject,
        details: {
          status: newData.delivery_to_return.details[0].status[0],
          until: fecha,
        },
      };

      items[3][0].delivery_to_return.push(newElement);
      response.json(items[3][0].delivery_to_return);

    } else {
      response.status(500).json({
        error: "There was an error.",
      });
    }
  }
  else{ 
    response.send("Error type data. Entries must have a correct format in xml");
  }
  
});
// actualizar
router.put("/:type", (request, response) => {
  const {
    type
  } = request.params;
  const data = {
    ...request.body
  }
  
});
// eliminar
router.delete("/:type", (request, response) => {
  const {
    type
  } = request.params;
  
});

module.exports = router;
function isValidDate(dateString) {

    var datePattern = /^(19[5-9][0-9]|20[0-4][0-9]|2050)[/](0?[1-9]|1[0-2])[/](0?[1-9]|[12][0-9]|3[01])$/;

    var matchArray = dateString.match(datePattern);

    if (matchArray == null) {
        return false;
    }
    var cleanDateString = dateString.replace(/\D/g, '');

    var year = parseInt(cleanDateString.substr(0, 4));
    var month = parseInt(cleanDateString.substr(4, 2));
    var day = parseInt(cleanDateString.substr(6, 2));


    var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    if (year % 400 == 0 || (year % 100 != 0 && year % 4 == 0)) {
        daysInMonth[1] = 29;
    }

    if (month < 1 || month > 12 || day < 1 || day > daysInMonth[month - 1]) {
        return false;
    }
    return true;
}

function searchItemByObjet_id(list, object_id){
  var itemInListFound=null
  if(list.length!=0){
    list.forEach(element => {
      var uuid1 = element.object_id.toString()
      if (object_id == uuid1) {
        itemInListFound = element;
      }
    });
  }

  return itemInListFound;
}