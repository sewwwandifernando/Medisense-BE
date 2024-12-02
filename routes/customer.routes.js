const express = require("express");
const authMiddleware = require("../middleware/auth.middleware");
const customerMiddleware = require("../middleware/customer.images.middleware");
const customerController = require("../controller/customer.controller");

function getCustomerRoutes() {
    const router = express.Router();

    router.use(express.json());
    router.use(authMiddleware);

    //POST
    router.post("/registerCustomer", customerMiddleware.upload ,customerController.registerCustomer);
    router.post("/addCustomerTestsAndPackages/:customerId/:admissionId", customerController.createCustomerTestsAndPackages);
    
    //GET
    router.get("/getAllCustomers", customerController.getAllCustomers);
    router.get("/getCustomerById/:customerId", customerController.getCustomerById);
    
    //PATCH
    router.patch("/updateCustomerById/:customerId", customerController.updateCustomerById);

    //DELETE
    router.delete("/deleteCustomerById/:customerId", customerController.deleteCustomerById);


    return router;
}

module.exports = getCustomerRoutes();