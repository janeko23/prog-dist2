const { Router } = require("express");
const router = new Router();
const _ = require("underscore");
const validate = require('uuid-validate');
const datos = require("../datos.json");
// get all
router.get("/", (req, res) => {
  res.json(datos);
});
// get for type
router.get("/:type", (req, res) => {
  const { type } = req.params;
  if (type == "rent") {
    res.json(datos[0]);
  } else if (type == "return") {
    res.json(datos[1]);
  } else if (type == "delivery_to_rent") {
    res.json(datos[2]);
  } else if (type == "delivery_to_return") {
    res.json(datos[3]);
  } else{
    res.send("Type error")
  }  
});
// crear cada tipo
router.post('/', (req, res) => {
// rent,  DELIVERY_TO_RENT / RETURN / DELIVERY_TO_RETURN   
  const newData = {
    ...req.body
  };
  if(newData.rent){
    var uuidClient = newData.rent.client_id[0]
    var uuidObject = newData.rent.object_id[0]
    var fecha = newData.rent.details[0].until[0];
    if (
      validate(uuidClient) &&
      validate(uuidObject) &&
      newData.rent.details && isValidDate(fecha)
    ) {
      var newElement = {
        rent:{
          client_id: uuidClient,
          object_id: uuidObject,
          details: {
            status: newData.rent.details[0].status[0],
            until: fecha,
          },
        }
      };
      console.log(newElement);
      datos[0].push(newElement);
      res.json(datos[0]);

    } else {
      res.status(500).json({
        error: "There was an error.",
      });
    }
  }
  else if(newData.return) {
    var uuidClient = newData.return.client_id[0]
    var uuidObject = newData.return.object_id[0]
    var fecha = newData.return.details[0].until[0];
    if (
      validate(uuidClient) &&
      validate(uuidObject) &&
      newData.return.details && isValidDate(fecha)
    ) {
      var newElement = {
        return :{
          client_id: uuidClient,
          object_id: uuidObject,
          details: {
            status: newData.return.details[0].status[0],
            until: fecha,
          },
        }
      };
      console.log(newElement);
      datos[1].push(newElement);
      res.json(datos[1]);

    } else {
      res.status(500).json({
        error: "There was an error.",
      });
    }
    //console.log(newData.return.client_id)
  }
  else if(newData.delivery_to_rent) {
    var uuidClient = newData.delivery_to_rent.client_id[0]
    var uuidObject = newData.delivery_to_rent.object_id[0]
    var fecha = newData.delivery_to_rent.details[0].until[0];
    if (
      validate(newData.delivery_to_rent.client_id[0]) &&
      validate(newData.delivery_to_rent.object_id[0]) &&
      newData.delivery_to_rent.details && isValidDate(fecha)
    ) {
      var newElement = {
        delivery_to_rent: {
          client_id: uuidClient,
          object_id: uuidObject,
          details: {
            status: newData.delivery_to_rent.details[0].status[0],
            until: fecha,
          },
        }
      };
      console.log(newElement);
      datos[2].push(newElement);
      res.json(datos[2]);

    } else {
      res.status(500).json({
        error: "There was an error.",
      });
    }
    //console.log(newData.delivery_to_rent.client_id)
  }
  else if(newData.delivery_to_return) {
    var uuidClient = newData.delivery_to_return.client_id[0]
    var uuidObject = newData.delivery_to_return.object_id[0]
    var fecha = newData.delivery_to_return.details[0].until[0];
    if (
      validate(newData.delivery_to_return.client_id[0]) &&
      validate(newData.delivery_to_return.object_id[0]) &&
      newData.delivery_to_return.details && isValidDate(fecha)
    ) {
      var newElement = {
        delivery_to_return: {
          client_id: uuidClient,
          object_id: uuidObject,
          details: {
            status: newData.delivery_to_return.details[0].status[0],
            until: fecha,
          },
        }
      };
      console.log(newElement);
      datos[3].push(newElement);
      res.json(datos[3]);

    } else {
      res.status(500).json({
        error: "There was an error.",
      });
    }
    //console.log(newData.delivery_to_return.client_id)
  }
  else{
    res.send("Error type data");
  }
  
});
// actualizar
router.put("/:type", (req, res) => {
  const { type } = req.params;
  const data = {
    ...req.body
  }
  
});
// eliminar
router.delete("/:type", (req, res) => {
  const { type } = req.params;
  
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