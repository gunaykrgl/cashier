import { Router } from "express";
import jwt from "jsonwebtoken";

const router: Router = Router();

router.get("/", function (req, res, next) {
  res.send("Auth API Main Page");
})

router.get("/login", async (req, res) => {
    res.send("Login Page");
});

router.post("/login", async (req, res) => {
  // Assuming you have a user authentication logic here
  const { username, password } = req.body;

  // Check if the username and password are valid
  if (username === "admin" && password === "password") {
    // Generate a JWT token
    const token = jwt.sign({ username }, "secretKey");

    let currentDate = new Date();
    let nextYearDate = new Date(currentDate.setFullYear(currentDate.getFullYear() + 1));
    
    // Set an auth token as a cookie in the response
    res.cookie("auth", token, { httpOnly: false, expires: nextYearDate });

    // Send a success response
    res.send("Login successful");
  } else {
    // Send an error response
    res.status(401).send("Invalid username or password");
  }
});

router.get("/validate-token", (req, res) => {
  const token = req.cookies.auth;
  if (!token) {
    return res.status(401).send("No token provided");
  }

  jwt.verify(token, "secretKey", (err : any, decoded : any) => {
    if (err) {
      return res.status(401).send("Invalid token");
    }

    // Token is valid
    res.send("Token is valid");
  });
});

export default router;