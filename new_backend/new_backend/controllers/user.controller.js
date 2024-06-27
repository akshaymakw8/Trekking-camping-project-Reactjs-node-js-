const _ = require("lodash");
const { userModel } = require("../models");
const { userService } = require("../mongoServices");
const {
  hashPassword,
  generateJWTToken,
  comparePassword,
  multerConfig,
} = require("../utils");
const {
  validationSchema: { registerSchema, updateSchema },
} = require("../joiSchema");
const { PORT, HOST } = require("../utils/env");

const getUserList  = async (req,res) => {
  try {
      const users = await userModel.find();
      res.json(users);
    } catch (err) {
      res.status(500).json({ error: err._message });
    }
}

const register = async (req, res) => {
  console.log("call here========");
  try {
    const { email, password, phone, role } = req.body;
    console.log(email,password,"=========")
    // Validation
    if (!email || !password) {
      throw new Error("Email and password are required");
    }

    try {
      // Check if the username already exists
      const userData = await userModel.findOne({ email });
      if (userData) {
        throw new Error("User already exists");
      }
      const hashPwd = await hashPassword(password);
      const user = new userModel({
        email: email,
        password: hashPwd,
        phone:phone,
        role: role,
      });
      console.log(hashPwd)
      const newUser = await user.save();
      return res.status(200).json({ message: "Registration successful" });
    } catch (err) {
      console.error("Error occurred during user lookup:", err);
      throw new Error(err.message);
    }
  } catch (err) {
    return res.status(400).json({ status: false, error: err.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email, password, "email password");
    // Validation
    if (!email || !password) {
      throw new Error("email and password are required");
    }
    // Check if the user exists
    const userDetails = await userModel.findOne({ email });
    if (!userDetails) {
      throw new Error("User not found");
    }
    console.log(userDetails)
    // Compare passwords
    const isPasswordMatch = await comparePassword(
      password,
      userDetails.password
    );
    console.log(isPasswordMatch,"isPasswordMatch")
    if (!isPasswordMatch) {
      throw new Error("Incorrect password");
    }

    // Generate JWT token
    const token = generateJWTToken(userDetails._id);

    return res.status(200).json({
      status: true,
      message: "Login successful",
      token: token,
      uid:userDetails.id
    });
  } catch (err) {
    return res.status(400).json({ status: false, error: err.message });
  }
};



// const register = async (req, res) => {
//   try {
//     const field = "profileImg";
//     const upload = multerConfig.upload.single(field);

//     upload(req, res, async (err) => {
//       try {
//         const { file, body } = req;

//         if (!file) throw new Error("Please select profile image");

//         const { error, value } = registerSchema.validate(body);
//         if (error)
//           throw new Error(
//             `Validation error: ${error.details
//               .map(function (elem) {
//                 return elem.message;
//               })
//               .join(", ")}`
//           );

//         const checkUser = await userService.userQuery({ email: value.email });
//         if (checkUser) throw new Error(`${value.email} Exist.`);

//         const imageURL = file.filename;
//         const skills = value.skills.trim().split(',').filter(o => o);
//         let userData = {
//           fullName: value.fullName,
//           email: value.email,
//           skills,
//           profileImg: imageURL,
//         };
//         userData.password = await hashPassword(value.password);
//         const createUser = new userModel(userData);
//         createUser.save();
//         console.log(createUser);
//         res.status(200).send({
//           success: true,
//           message: "User Created Successfully",
//           data: createUser,
//         });
//       } catch (error) {
//         if (req.file) {
// 					multerConfig.removeFile(req.file.filename);
// 				}
//         res.status(400).send({
//           success: false,
//           message: error.message,
//         });
//       }
//     });
//   } catch (error) {
//     res.status(400).send({
//       success: false,
//       message: error.message,
//     });
//   }
// };

// const login = async (req, res) => {
//   try {
//     const { body } = req;
//     const { email, password } = body;

//     // Check email Exists or Not
//     const checkUser = await userService.userQuery({ email });
//     if (!checkUser)
//       throw new Error(`${email} Not Found. Please Register with Us!`);

//     if (checkUser) {
//       const { _id, fullName, skills, profileImg, isActive } = checkUser;

//       if (!isActive) {
//         throw new Error("Your Account is Temporary Deactivated.");
//       }

//       let verifyPassword = await comparePassword(password, checkUser.password);

//       if (!verifyPassword) throw new Error("Email or Password is incorrect");

//       // Generate JWT
//       const token = generateJWTToken(_id);
//       const data = {
//         token,
//         _id,
//         fullName,
//         email,
//         skills,
//         profileImg: `http://${HOST}:${PORT}/${profileImg}`
//       };
//       res.status(200).send({
//         success: true,
//         data,
//         message: `${fullName} Login Successfully`,
//       });
//     }
//   } catch (error) {
//     res.status(400).send({
//       success: false,
//       message: error.message,
//     });
//   }
// };

// const getProfile = async (req, res) => {
//   try {
//     const { currentUser } = req;
//     const {  _id, fullName, email, skills, profileImg } = currentUser;

//     const data = {
//       _id,
//       fullName,
//       email,
//       skills,
//       profileImg: `http://${HOST}:${PORT}/${profileImg}`
//     };
//     res.status(200).send({
//       success: true,
//       data,
//       message: `Get profile Successfully`,
//     });
//   } catch (error) {
//     res.status(400).send({
//       success: false,
//       message: error.message,
//     });
//   }
// };

// const updateProfile = async (req, res) => {
//   try {
//     const field = "profileImg";
//     const upload = multerConfig.upload.single(field);

//     upload(req, res, async (err) => {
//       try {
//         let { file, body, currentUser } = req;
//         const {_id} = currentUser;

//         const { error, value } = updateSchema.validate(body);
//         if (error)
//           throw new Error(
//             `Validation error: ${error.details
//               .map(function (elem) {
//                 return elem.message;
//               })
//               .join(", ")}`
//           );

//         const checkUser = await userService.userQuery({ email: value.email, _id });
//         if (checkUser) throw new Error("Email all exist");
//         let oldImg;
//         if (file && file.filename) {
//           oldImg = currentUser.profileImg;
//           value.profileImg = file.filename;
//         }
//         value.skills = value.skills.trim().split(',').filter(o => o);
//         currentUser = _.merge(currentUser, value)
//         delete currentUser.password;
//         currentUser.save();
//         if(!currentUser) throw new Error("Something went to wrong");
//         if (currentUser && oldImg) {
//           multerConfig.removeFile(oldImg);
//         }
//         res.status(200).send({
//           success: true,
//           message: "User updated Successfully"
//         });
//       } catch (error) {
//         if (req.file) {
// 					multerConfig.removeFile(req.file.filename);
// 				}
//         res.status(400).send({
//           success: false,
//           message: error.message,
//         });
//       }
//     });
//   } catch (error) {
//     res.status(400).send({
//       success: false,
//       message: error.message,
//     });
//   }
// };

module.exports = {
  register,
  login,
  getUserList
  // getProfile,
  // updateProfile
};
