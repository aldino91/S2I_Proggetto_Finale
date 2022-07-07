const express = require("express");
const router = express.Router();
const authentication = require("../middleware/AuthMiddleware");

const AuthControlles = require("../controlles/AuthControlles");
const RestaurantControllers = require("../controlles/RestaurantControllers");
const ReservedControllers = require("../controlles/ReservedControllers");
const WaiterControllers = require("../controlles/WaiterControllers");
const StateReserved = require("../controlles/StateReserved");
const TableControllers = require("../controlles/TableControllers");

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

// Reserved

router.post("/reserved", ReservedControllers.AddReserved);
router.get("/reserved/", ReservedControllers.getReserved);
router.put("/reserved", ReservedControllers.UpdateResereved);
router.put("/addtables", ReservedControllers.AddTablesReserved);

// Waiter

router.post("/add-waiter", WaiterControllers.AddWaiter);
router.get("/waiter/:idRestaurant", WaiterControllers.GetWaiters);
router.delete("/deletewaiter/:id", WaiterControllers.DeleteWaiter);

// State reserved

router.put("/state-reserved", StateReserved.updateStateReserved);

// Tables

router.post("/tables", TableControllers.AddTables);
router.get("/tables/:id", TableControllers.GetTables);
router.delete("/tables/:id", TableControllers.DeleteTables);

module.exports = router;
