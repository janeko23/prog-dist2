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
    if (
      validate(newData.rent.client_id[0]) &&
      validate(newData.rent.object_id[0]) &&
      newData.rent.details
    ) {
      var newElement = {
        rent:{
          client_id: newData.rent.client_id[0],
          object_id: newData.rent.object_id[0],
          details: {
            status: newData.rent.details[0].status[0],
            until: newData.rent.details[0].until[0],
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
  if (newData.return) {
    if (
      validate(newData.return.client_id[0]) &&
      validate(newData.return.object_id[0]) &&
      newData.return.details
    ) {
      var newElement = {
        return :{
          client_id: newData.return.client_id[0],
          object_id: newData.return.object_id[0],
          details: {
            status: newData.return.details[0].status[0],
            until: newData.return.details[0].until[0],
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
  if (newData.delivery_to_rent) {
    if (
      validate(newData.delivery_to_rent.client_id[0]) &&
      validate(newData.delivery_to_rent.object_id[0]) &&
      newData.delivery_to_rent.details
    ) {
      var newElement = {
        delivery_to_rent: {
          client_id: newData.delivery_to_rent.client_id[0],
          object_id: newData.delivery_to_rent.object_id[0],
          details: {
            status: newData.delivery_to_rent.details[0].status[0],
            until: newData.delivery_to_rent.details[0].until[0],
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
  if(newData.delivery_to_return){
    if (
      validate(newData.delivery_to_return.client_id[0]) &&
      validate(newData.delivery_to_return.object_id[0]) &&
      newData.delivery_to_return.details
    ) {
      var newElement = {
        delivery_to_return: {
          client_id: newData.delivery_to_return.client_id[0],
          object_id: newData.delivery_to_return.object_id[0],
          details: {
            status: newData.delivery_to_return.details[0].status[0],
            until: newData.delivery_to_return.details[0].until[0],
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
  
});
// actualizar
router.put("/:type", (req, res) => {
  const { type } = req.params;
  const data = {
    ...req.body
  }
  if (id && title && director && year && rating) {
    _.each(data, (movie, i) => {
      if (movie.id === id) {
        movie.title = title;
        movie.director = director;
        movie.year = year;
        movie.rating = rating;
      }
    });
    res.json(data);
  } else {
    res.status(500).json({ error: "There was an error." });
  }
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  if (id) {
    _.each(data, (movie, i) => {
      if (movie.id == id) {
        data.splice(i, 1);
      }
    });
    res.json(data);
  }
});

module.exports = router;
