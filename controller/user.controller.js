const bcrypt = require("bcrypt");
const userService = require("../service/user.service");
const { sign } = require("jsonwebtoken");

//Register User 
async function registerUser(req, res) {
    try {
        const userRole_id = req.user.roleId;
        const {firstName, lastName,email,contactNo, dob, address, username, password, roleId } = req.body;

        if (![1].includes(userRole_id)) {
            return res.status(403).json({ error: true, payload: "Unauthorized. Only Admins can create users." });
        }

        const hashPassword = await bcrypt.hash(password, 10);
        const result = await userService.registerUser(firstName, lastName,email,contactNo, dob, address, username, hashPassword, roleId);
        
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
        console.log("error in user controller: ", error)
        return res.status(500).json({
            error: true,
            payload: error
        })
    }
}

//Login User
async function loginUser(req, res) {
    try {
        const { username, password } = req.body;

        const user = await userService.loginUser(username);

        if (!user) {
            return res.json({ 
                error: true,
                payload: "User Doesn't Exist"
             });
            
          }
        else {
            bcrypt.compare(password, user.password).then(async (match) => {
                if (!match) {res.status(400).json({ 
                    error: true,
                    payload: "Wrong Username And Password Combination" 
                });
            }
                else{
                  const accessToken = sign(
                    { username: user.username, id: user.id, roleId: user.roleId},
                    "importantsecret"
                  );
                  res.status(200).json({
                    error: false,
                    payload: accessToken
                  });
                }  
              });
        }     
    } catch (error) {
        return res.status(500).json({
            error: true,
            payload: error
        })
    }
}

//Get User Roles
async function getUserRoles(req, res) {
    try {
        const result = await userService.getUserRoles();

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
        console.log("Error Getting User Roles Controller: ", error);
        return res.status(500).json({
            error: true,
            payload: error
        });
    }
}

//Get All Users.
async function getAllUsers(req, res) {
    try {
        const userRole_id = req.user.roleId;

        if (![1].includes(userRole_id)) {
            return res.status(403).json({ error: true, payload: "Unauthorized. Only Admins can view users." });
        }

        const result = await userService.getAllUsers();

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
        console.log("Error Getting Users Controller: ", error);
        return res.status(500).json({
            error: true,
            payload: error
        });
    }
}

//Get User By Id
async function getUserById(req, res) {
    try {
        const userRole_id = req.user.roleId;
        const { id } = req.params;

        if (![1].includes(userRole_id)) {
            return res.status(403).json({ error: true, payload: "Unauthorized. Only Admins can view users." });
        }
        
        const result = await userService.getUserById(id);

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
        console.log("Error Getting User Controller: ", error);
        return res.status(500).json({
            error: true,
            payload: error
        });
    }
}

//Get Signed User
async function getSignedUser(req, res) {
    try {
        const id = req.user.id

        const result = await userService.getUserById(id);

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
        console.log("Error Getting Signed User Controller: ", error);
        return res.status(500).json({
            error: true,
            payload: error
        });
    }
}

//Update User
async function updateUser(req, res) {
    try {
        const userRole_id = req.user.roleId;
        const { id } = req.params;
        const userData = req.body;

        delete userData.password;

        if (![1].includes(userRole_id)) {
            return res.status(403).json({ error: true, payload: "Unauthorized. Only Admins can update users." });
        }
        
        const result = await userService.updateUser(id, userData);

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
        console.log("Error Updating User Controller: ", error);
        return res.status(500).json({
            error: true,
            payload: error
        });
    }
}

//Delete User
async function deleteUser(req, res) {
    try {
        const userRole_id = req.user.roleId;
        const { id } = req.params;

        if (![1].includes(userRole_id)) {
            return res.status(403).json({ error: true, payload: "Unauthorized. Only Admins can delete users." });
        }
        
        const result = await userService.deleteUser(id);

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
        console.log("Error Deleting User Controller: ", error);
        return res.status(500).json({
            error: true,
            payload: error
        });
    }
}


module.exports = {
    registerUser,
    loginUser,
    getUserRoles,
    getAllUsers,
    getUserById,
    getSignedUser,
    updateUser,
    deleteUser
}