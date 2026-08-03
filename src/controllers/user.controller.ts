import { Request, Response } from "express";
import { getAllUsers, handleCreateUser, handleDeleteUser, getUserById, updateUserById, getAllRoles } from "services/user.service";


const getHomePage = async (req: Request, res: Response) => {
    const users = await getAllUsers();

    return res.render("home", { users: users });
}

const getCreateUserPage = async (req: Request, res: Response) => {
    const roles = await getAllRoles();

    return res.render("admin/user/create.ejs", { roles });
}
const postCreateUserPage = async (req: Request, res: Response) => {
    // object destructuring
    const { fullname, username, phone, role, address } = req.body;
    const file = req.file;
    const avatar = file?.filename ?? "";
    //handle create_user
    await handleCreateUser(fullname, username, address, phone, avatar, role);
    return res.redirect("/admin/user");
}
const postDeleteUserPage = async (req: Request<{ id: string }>, res: Response) => {
    const { id } = req.params;

    const a = await handleDeleteUser(id);
    return res.redirect("/admin/user");
}
const getViewUserPage = async (req: Request<{ id: string }>, res: Response) => {

    const { id } = req.params;
    const user = await getUserById(id);
    const roles = await getAllRoles();

    return res.render("admin/user/detail.ejs", { id: id, user: user, roles });
}
const postUpdateUserPage = async (req: Request<{ id: string }>, res: Response) => {

    const { id, fullname, username, phone, role, address } = req.body;
    const file = req.file;
    const avatar = file?.filename ?? undefined;
    await updateUserById(id, fullname, username, phone, role, address, avatar as string);
    return res.redirect("/admin/user");
}
export { getHomePage, getCreateUserPage, postCreateUserPage, postDeleteUserPage, getViewUserPage, postUpdateUserPage };