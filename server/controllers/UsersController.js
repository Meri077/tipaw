import bcrypt from 'bcryptjs';
import UserModel from "../models/UserModel.js";

export const signup = async (req, res) => {
  const { firstName: firstname, lastName: lastname, phone, email, password, terms } = req.body;

  try {
    const existingUser = await UserModel.findOne({ where: { email: email } });

    if(existingUser) return res.status(201).json({ message: "User already exist." });

    const hashedPassword = await bcrypt.hash(password, 12);

    await UserModel.create({ firstname, lastname, phone, email, password: hashedPassword, terms });

    res.status(200).json({ message: "You have been successfully registered." });
  } catch (error) {
    res.status(201).json({message: 'Something went wrong.'});
  }
}