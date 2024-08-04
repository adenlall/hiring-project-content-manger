import { catchAsync } from "../utils/catchAsync.js";
import * as userService from "../services/user.service.js";

const createUser = catchAsync(async (req, res) => {
    const user = await userService.createUser(req.body);
    res.status(201).json(user);
});

const getUsers = catchAsync(async (req, res) => {
    const filter = pick(req.query, ['name', 'role']);
    const options = pick(req.query, ['sortBy', 'limit', 'page']);
    const result = await userService.queryUsers(filter, options);
    res.status(200).json(result);
});

const getUser = catchAsync(async (req, res) => {
    const user = await userService.getUserById(req.params.userId);
    if (!user) {
        throw new ApiError(500, 'User not found');
    }
    res.status(200).json(user);
});

const updateUser = catchAsync(async (req, res) => {
    const user = await userService.updateUserById(req.params.userId, req.body);
    res.status(200).json(user);
});

const deleteUser = catchAsync(async (req, res) => {
    await userService.deleteUserById(req.params.userId);
    res.status(200).json();
});

export {
    createUser,
    getUsers,
    getUser,
    updateUser,
    deleteUser
}