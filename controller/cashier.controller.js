const e = require('express');
const cashierService = require('../service/cashier.service');

//Get Cashier List
async function getCashierList(req, res) {
    try {
        const userRole_id = req.user.roleId;

        // Check if the user is authorized to perform this action
        if (![1, 3].includes(userRole_id)) {
            return res.status(403).json({ error: true, payload: "Unauthorized. Only Admins and Cashiers can create Customers." });
        }

        const result = await cashierService.getCashierList();

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
        console.log("Error Getting CashierList Controller: ", error);
        return res.status(500).json({
            error: true,
            payload: error
        })
    }
}

//Get Cashier List Matrices
async function getCashierListMatrices(req, res) {
    try {
        const userRole_id = req.user.roleId;

        // Check if the user is authorized to perform this action
        if (![1, 3].includes(userRole_id)) {
            return res.status(403).json({ error: true, payload: "Unauthorized. Only Admins and Cashiers can create Customers." });
        }

        const result = await cashierService.getCashierListMatrices();

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
        console.log("Error Getting CashierList Matrices Controller: ", error);
        return res.status(500).json({
            error: true,
            payload: error
        })
    }
}

//Get Customer With Tests And Packages
async function getCustomerWithTestsAndPackages(req, res) {
    try {
        const { customerId } = req.params;
        const { admissionId } = req.params;
        const userRole_id = req.user.roleId;

        // Check if the user is authorized to perform this action
        if (![1, 3].includes(userRole_id)) {
            return res.status(403).json({ error: true, payload: "Unauthorized. Only Admins and Cashiers can create Customers." });
        }

        const result = await cashierService.getCustomerWithTestsAndPackages(customerId, admissionId);

        if(result.error) {
            return res.status(result.status).json ({
                error: true,
                payload: result.payload
            })
        } else {
            return res.status(result.status).json ({
                error: false,
                payload: result.payload
            })
        }           
    } catch (error) {
        console.log("Error Getting Customer With Tests And Packages Controller: ", error);
        return res.status(500).json({
            error: true,
            payload: error
        })
    }
}

module.exports = {
    getCashierList,
    getCashierListMatrices,
    getCustomerWithTestsAndPackages
}   