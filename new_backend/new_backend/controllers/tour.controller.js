const _ = require("lodash");
const { tourModel } = require("../models");
const { userService } = require("../mongoServices");
const {
  hashPassword,
  generateJWTToken,
  comparePassword,
  multerConfig,
} = require("../utils");
const { default: mongoose } = require("mongoose");


const getTourList  = async (req,res) => {
    try {
        const tours = await tourModel.find();
        res.json(tours);
      } catch (err) {
        res.status(500).json({ error: err._message });
      }
}

const getTourById = async (req,res) => {
    try {
      console.log(req.params.id,"req.params.id")
      const tourId =new mongoose.Types.ObjectId(req.params.id)
        const tour = await tourModel.findById(tourId);
        console.log(tour,"tour")
        res.json(tour);
      } catch (err) {
        console.log(err,"rtt")
        res.status(404).json({ error: "Tour not found" });
      }
}

const createTour = async (req,res) => {
    try {
      console.log(req.body);
      const newTour = await tourModel.create(req.body);
      res.status(201).json(newTour);
    } catch (err) {
      console.log(err,"err==")
      res.status(400).json({ error: "Error creating tour" });
    }
};

const updateTour = async (req,res) => {
    try {
        const updatedTour = await Tour.findByIdAndUpdate(
          req.params.id,
          req.body,
          { new: true }
        );
        res.json(updatedTour);
      } catch (err) {
        res.status(404).json({ error: "Tour not found" });
      }
}

const deleteTour = async (req,res) => {
    try {
        await Tour.findByIdAndDelete(req.params.id);
        res.status(204).end();
      } catch (err) {
        res.status(404).json({ error: "Tour not found" });
      }
}



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
    getTourList,
  getTourById,
  deleteTour,
  createTour,
  updateTour
  // getProfile,
  // updateProfile
};
