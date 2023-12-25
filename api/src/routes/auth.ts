import { Router } from "express";

const router: Router = Router();

router.get("/", function (req, res, next) {
  res.send("Auth API Main Page");
})

router.get("/login", async (req, res) => {
    res.send("Login Page");
});

router.post("/login", async (req, res) => {

});

export default router;