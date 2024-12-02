const customerService = require("../service/customer.service");

//Register Customer
async function registerCustomer(req, res) {
    try {
        const userRole_id = req.user.roleId;
        const customerDetails = req.body;
        customerDetails.image = req.file.path;
        
        // Check if the user is authorized to perform this action
        if (![1, 2].includes(userRole_id)) {
            return res.status(403).json({ error: true, payload: "Unauthorized. Only Admins and Receptionists can create Customers." });
        }

        //Save customer details
        const result = await customerService.registerCustomer(customerDetails);

        if(result.error) {
            return res.status(result.status).json ({
                error: true,
                payload: result.payload
            })
        }
        else {
            return res.status(result.status).json ({
                error: false,
                payload: "Customer Successfully Registered!",
                customerId: result.payload.id,
                admissionId: result.payload.admissionId
            })
        }  

    } catch (error) {
        console.log("Error Creating Customer Controller: ", error);
        return res.status(500).json({
            error: true,
            payload: error
        })
    }
}

//Create Customers' Tests and Packages
async function createCustomerTestsAndPackages(req, res) {
    try {
        const userRole_id = req.user.roleId;

        if (![1, 2].includes(userRole_id)) {
            return res.status(403).json({ error: true, payload: "Unauthorized. Only Admins and Receptionists can create customers' tests and packages." });
        }

        //Destructure the request body into 2 parts as packages and tests.
        const packages = req.body.packages;
        const tests = req.body.tests;

        const { customerId } = req.params;
        const { admissionId } = req.params;

        //If customer has selected Packages.
        if(packages) {
            const resultPackages = await customerService.createCustomerPackages(packages, customerId, admissionId);
            
            if(resultPackages.error) {
                return res.status(resultPackages.status).json ({
                    error: true,
                    payload: resultPackages.payload
                })
            }
        }

        //Save selected tests.
        const resultTests = await customerService.createCustomerTests(tests, customerId, admissionId);

        if(resultTests.error) {
            return res.status(resultTests.status).json ({
                error: true,
                payload: resultTests.payload
            })
        }
        else {
            return res.status(resultTests.status).json ({
                error: false,
                payload: "Customer tests have been saved!"
            })
        } 

    } catch (error) {
        console.log("Error Creating Customer Tests and Packages Controller: ", error);
        return res.status(500).json({
            error: true,
            payload: error
        })
    }
}

//Get all customers
async function getAllCustomers(req, res) {
    try {
        const userRole_id = req.user.roleId;

        const result = await customerService.getAllCustomers();

        if(result.error) {
            return res.status(result.status).json ({
                error: true,
                payload: result.payload
            })
        }
        else {
            return res.status(result.status).json ({
                error: false,
                payload: result.payload
            })
        } 
    } catch (error) {
        console.log("Error Getting Customer Controller: ", error);
        return res.status(500).json({
            error: true,
            payload: error
        })
    }
}

//Get Customer by ID
async function getCustomerById(req, res) {
  try {
    const { customerId } = req.params;

    const result = await customerService.getCustomerById(customerId);

    if(result.error) {
      return res.status(result.status).json({
        error: true,
        payload: result.payload
      });
    }

    return res.status(result.status).json({
      error: false,
      payload: result.payload
    });

  } catch (error) {
    console.log("Error getting customer: ", error);
    return res.status(500).json({
      error: true,
      payload: error
    });
  }
}

//Update Customer By ID
async function updateCustomerById(req, res) {
    try {
        const { customerId } = req.params;
        const customerDetails = req.body;
        const userRole_id = req.user.roleId;

        if (![1, 2].includes(userRole_id)) {
            return res.status(403).json({ error: true, payload: "Unauthorized. Only Admins and Receptionists can update Customers." });
        }

        const result = await customerService.updateCustomerById(customerId, customerDetails);

        if(result.error) {
            return res.status(result.status).json ({
                error: true,
                payload: result.payload
            })
        }
        else {
            return res.status(result.status).json ({
                error: false,
                payload: result.payload
            })
        }

    } catch (error) {
        console.log("Error Updating Customer Controller: ", error);
        return res.status(500).json({
            error: true,
            payload: error
        })
    }
}

//Delete Customer By ID
async function deleteCustomerById(req, res) {       
    try {
        const { customerId } = req.params;
        const userRole_id = req.user.roleId;        

        if (![1].includes(userRole_id)) {
            return res.status(403).json({ error: true, payload: "Unauthorized. Only Admins can delete Customers." });
        }

        const result = await customerService.deleteCustomerById(customerId);

        if(result.error) {
            return res.status(result.status).json ({
                error: true,
                payload: result.payload
            })
        }   
        else {
            return res.status(result.status).json ({
                error: false,
                payload: result.payload
            })
        }
    }   
    catch (error) {
        console.log("Error Deleting Customer Controller: ", error);
        return res.status(500).json({
            error: true,
            payload: error
        })
    }
}


module.exports = {
    registerCustomer,
    createCustomerTestsAndPackages,
    getAllCustomers,
    getCustomerById,
    updateCustomerById,
    deleteCustomerById
}