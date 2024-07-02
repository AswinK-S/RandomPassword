import Password from "../models/Password.js";

const generatePassword = (length, options) => {
  const { uppercase, lowercase, numbers, special } = options;
  const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lower = "abcdefghijklmnopqrstuvwxyz";
  const nums = "0123456789";
  const specials = "!@#$%^&*()_+[]{}|;:,.<>?";

  let chars = "";
  if (uppercase) chars += upper;
  if (lowercase) chars += lower;
  if (numbers) chars += nums;
  if (special) chars += specials;

  let password = "";
  for (let i = 0; i < length; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return password;
};

const createPassword = async (req, res) => {
  const { length, options } = req.body;
  if (!length || length <= 0 || !options) {
    return res.status(400).json({ message: "Invalid input" });
  }

  const password = generatePassword(length, options);

  try {
    const newPassword = new Password({ password });
    await newPassword.save();
    res.json({ password });
  } catch (error) {
    console.error("Error saving password:", error);
    res.status(500).json({ message: "Error saving password" });
  }
};

const getPasswords = async (req, res) => {
  try {
    const passwords = await Password.find();
    res.json(passwords);
  } catch (error) {
    console.error("Error fetching passwords:", error);
    res.status(500).json({ message: "Error fetching passwords" });
  }
};

export { createPassword, getPasswords };
