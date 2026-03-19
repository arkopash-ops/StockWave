import express from "express";
import * as assetsController from "../controller/assets.controller.js";
import { protect } from "../middleware/auth.middleware.js";
import { authorizedRole } from "../middleware/role.middleware.js";
import { RoleTypes } from "../types/users.types.js";

const router = express.Router();

router.post(
    "/",
    protect,
    authorizedRole(RoleTypes.ADMIN),
    assetsController._registerAssets
);

router.get(
    "/",
    protect,
    assetsController._allAssets
);

export default router;
