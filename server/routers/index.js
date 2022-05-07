const express = require("express");
const router = express.Router();
const authentication = require("../middleware/AuthMiddleware");

const AuthControlles = require("../controlles/AuthControlles");
const RestaurantControllers = require("../controlles/RestaurantControllers");

router.get("/", (req, res) => {
  res.json({ messagge: "funziona" });
});

// Login end Register
router.post("/login", AuthControlles.singIn);

router.post("/register", AuthControlles.singUp);

// Authentication
router.get("/authentication", authentication, AuthControlles.getUser);

//  Restaurant

router.post("/add-restaurant", RestaurantControllers.AddRestaurant);
router.get("/restaurant/:idUser", RestaurantControllers.getAllRestaurant);
router.get("/restaurant/data/:id", RestaurantControllers.getDataRestaurant);
router.delete("/restaurant/delete/:id", RestaurantControllers.deleteRestaurant);

module.exports = router;
