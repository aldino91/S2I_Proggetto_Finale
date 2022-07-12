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

router.post("/restaurants", RestaurantControllers.AddRestaurant);
router.get("/restaurants/:idUser", RestaurantControllers.getAllRestaurant);
router.get("/restaurants/data/:id", RestaurantControllers.getDataRestaurant);
router.delete(
  "/restaurants/delete/:id",
  RestaurantControllers.deleteRestaurant
);

// Reserved

router.post("/reserved", ReservedControllers.AddReserved);
router.get("/reserved/", ReservedControllers.getReserved);
router.put("/reserved", ReservedControllers.UpdateResereved);

// Waiter

router.post("/waiters", WaiterControllers.AddWaiter);
router.get("/waiters/:idRestaurant", WaiterControllers.GetWaiters);
router.delete("/waiters/:id", WaiterControllers.DeleteWaiter);

// State reserved

router.put("/state", StateReserved.updateStateReserved);

// Tables

router.post("/tables", TableControllers.AddTables);
router.get("/tables/:id", TableControllers.GetTables);
router.delete("/tables/:id", TableControllers.DeleteTables);
router.put("/tables", ReservedControllers.AddTablesReserved);

module.exports = router;
