import User from '../models/User.model.js';
import crypto from 'crypto';
import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const registeredUser = async (req, res) => {
    const { name, email, password, role} = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({
            message: "All fields are required"
        });
    }

    try {
        const existinguser = await User.findOne({ email });
        if (existinguser) {
            return res.status(400).json({
                message: "User already exists"
            });
        }
        const user = await User.create({ name, email, password, role });
        if (!user) {
            return res.status(400).json({
                message: "User not created"
            });
        }
        console.log("User", user);

        const token = crypto.randomBytes(32).toString('hex');
        console.log("Token", token);
        user.verificationToken = token;
        await user.save();

        // //send email
        // const transport = nodemailer.createTransport({
        //     host: process.env.MAILTRAP_HOST,
        //     port: process.env.MAILTRAP_PORT,
        //     secure: false,
        //     auth: {
        //         user: process.env.MAILTRAP_USER,
        //         pass: process.env.MAILTRAP_PASS
        //     }
        // });

        // const mailOptions = {
        //     from: process.env.MAILTRAP_SENDER,
        //     to: user.email,
        //     subject: "verify the email",
        //     text: `Click on the link to verify the email: ${process.env.BASE_URL}/api/v1/users/verify/${token}`
        // };

        // try {
        //     const info = await transport.sendMail(mailOptions);
        //     console.log("Email sent successfully:", info.response);
        // } catch (error) {
        //     console.error("Error sending email:", error);
        // }


        return res.status(200).json({
            message: "User regitered successfully",
            success: true
        });

    } catch (error) {
        console.error("Error registering user:", error);
        return res.status(500).json({
            message: "Internal server error",
            success: false,
            error
        });
    }
};


//verify user
const verifyUser = async (req, res) => {
    const token = req.params.token;

    console.log("Token", token);
    if (!token) {
        return res.status(400).json({
            message: "invalid token"
        });
    }
    const user = await User.findOne({ verificationToken: token });
    if (!user) {
        return res.status(400).json({
            message: "User not found"
        });
    }
    //changes in user
    user.isVerified = true;
    user.verificationToken = "";

    await user.save();
    return res.status(200).json({
        message: "User verified successfully",
        success: true
    });
};

//user login 
const login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({
            message: "All fields are required"
        });
    }

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: "User not found"
            });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        // const userVerified = user.isVerified;
        // if (!userVerified) {
        //     return res.status(400).json({
        //         message: "User not verified"
        //     });
        // }

        if (!isMatch) {
            return res.status(401).json({
                message: "Invalid credentials"
            });
        }

        const token = jwt.sign({ id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '1d' });

        const cookieOptions = {
            httpOnly: true,
            expires: new Date(
                Date.now() + Number(process.env.JWT_COOKIE_EXPIRES) * 24 * 60 * 60 * 1000
            ),
            secure: false
        };
        res.cookie("token", token, cookieOptions);
        res.status(200).json({
            message: "User logged in successfully",
            success: true,
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });

    } catch (error) {
        console.error("Error logging in user:", error);
        return res.status(500).json({
            message: "Internal server error",
            success: false,
            error: error.message || error
        });
    }
};

const getProfile = async (req, res) => {
    try {
        const data = req.user;
        const user = await User.findOne({ _id: req.user.id }).select("-password");
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User not found"
            });
        }
        res.status(200).json({
            success: true,
            user
        });
        console.log("reached at porfile level", data);

    } catch (error) {
        console.error("Error getting user profile:", error);
        return res.status(500).json({
            message: "Internal server error",
            success: false,
            error: error.message || error
        });
    }
};


const updateProfile = async (req, res) => {
    try {
        const data = req.user;
        console.log("req.user:", req.user);
        console.log("Update body:", req.body);

        const user = await User.findOne({ _id: req.user.id });

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User not found"
            });
        }
        //update user
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        user.role = req.body.role || user.role;

        await user.save();
        return res.status(200).json({
            success: true,
            message: "User updated successfully",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });

    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            success: false,
            error: error.message || error
        });
    }
};


// //forgetpassword
// const forgotPassword = async (req, res) => {
//     try {
//         const { email } = req.body;
//         const user = await User.findOne({ email });
//         if (!user) {
//             return res.status(400).json({
//                 success: false,
//                 message: "User not found"
//             });
//         }
//         //generate reset token
//         const resetToken = crypto.randomBytes(32).toString('hex');
//         user.resetPasswordToken = resetToken;
//         user.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

//         //save the user
//         await user.save();

//         //send mail
//         const resetUrl = `${process.env.BASE_URL}/api/v1/users/resetPassword/${resetToken}`;
//         const transporter = nodemailer.createTransport({
//             host: process.env.MAILTRAP_HOST,
//             port: process.env.MAILTRAP_PORT,
//             auth: {
//                 user: process.env.MAILTRAP_USER,
//                 pass: process.env.MAILTRAP_PASS
//             }
//         });

//         const mailOptions = {
//             from: 'authentication_sys@gmail.com',
//             to: user.email,
//             subject: 'Password Reset',
//             text: `Please click on the link to reset your password: ${resetUrl}`
//         };
//         // Send email
//         await transporter.sendMail(mailOptions);

//         return res.status(200).json({
//             success: true,
//             message: "Password reset email sent successfully"
//         });

//     } catch (error) {
//         return res.status(500).json({
//             message: "Internal server error",
//             success: false,
//             error: error.message || error
//         });
//     };
// };


// //resetpassword
// const resetPassword = async (req, res) => {
//     try {
//         // Extract token from URL params & new password from body
//         const { resetToken } = req.params;
//         const { password } = req.body;

//         // Find user by token & check if token is still valid
//         const user = await User.findOne({
//             resetPasswordToken: resetToken,
//             resetPasswordExpire: { $gt: Date.now() } // Ensure token hasn't expired
//         });

//         // If user not found, return error
//         if (!user) {
//             return res.status(400).json({
//                 success: false,
//                 message: "Invalid or expired token"
//             });
//         }

//         // Set new password 
//         user.password = password;

//         // Clear the reset token and expiry
//         user.resetPasswordToken = undefined;
//         user.resetPasswordExpire = undefined;

//         // Save the updated user
//         await user.save();

//         // Send success response
//         return res.status(200).json({
//             success: true,
//             message: "Password reset successfully. You can now log in with your new password."
//         });

//     } catch (error) {
//         return res.status(500).json({
//             success: false,
//             message: "Internal server error",
//             error: error.message || error
//         });
//     }
// };


const logout = async (req, res) => {
    //clear cookie
    try {
        res.cookie("token", "none", {
            expires: new Date(0),
            httpOnly: true
        });
        res.status(200).json({
            success: true,
            message: "User logged out successfully"
        });
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            success: false,
            error: error.message || error
        });
    }
};

export {
    registeredUser,
    verifyUser,
    login,
    getProfile,
    updateProfile,
    logout
};