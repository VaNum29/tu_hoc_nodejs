import express, { Express, response } from "express";
import { getCreateUserPage, getHomePage, postCreateUserPage, postDeleteUserPage, getViewUserPage, postUpdateUserPage } from "../controllers/user.controller";
import { getDashboardPage, getAdminOrderPage, getAdminUserPage, getAdminProductPage } from "controllers/admin/dashboard.controller";
import fileUploadMiddleware from "src/middleware/multer";




const router = express.Router();

const webRouter = (app: Express) => {
    router.get("/", getHomePage);





    // admin routers
    router.get("/admin", getDashboardPage);
    router.get("/admin/user", getAdminUserPage);
    router.get("/admin/create", getCreateUserPage);
    router.post("/admin/handle_create_user", fileUploadMiddleware("avatar"), postCreateUserPage);
    router.post("/admin/delete-user/:id", postDeleteUserPage);
    router.get("/admin/view-user/:id", getViewUserPage);
    router.post("/admin/update-user", fileUploadMiddleware("avatar"), postUpdateUserPage);


    router.get("/admin/order", getAdminOrderPage);
    router.get("/admin/product", getAdminProductPage);
    app.use("/", router);
}


export default webRouter;
