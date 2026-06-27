import { User } from "../../models/user.model.js"

export const getAllUsers = async (req, res, next) => {
    const adminId = req.user._id;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    try {
        const totalUsers = await User.countDocuments({ _id: { $ne: adminId } });
        const users = await User.find({ _id: { $ne: adminId } }).select('-password').sort({ createdAt: -1 }).skip(skip).limit(limit);

        if(users.length === 0) {
            return res.status(200).json({
                success: false,
                message: "Not users found",
                users: [],
                pagination: {}
            })
        }

        res.status(200).json({
            success: true,
            users,
            pagination: {
                totalUsers,
                totalPages: Math.ceil(totalUsers / limit),
                currentPage: page,
                limit
            }
        });

    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}

export const getUser = async (req, res, next) => {
    try {
        const { userId } = req.params;
        const user = await User.findById(userId);
        if(!user) {
            return res.status(404).json({
                success: false,
                message: "There is no user with this email address"
            })
        }
        res.status(200).json({
            success: true,
            user: {
                ...user._doc,
                password: undefined
            }
        })
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}

export const deleteUser = async (req, res, next) => {
    try {
        const { userId } = req.params;
        const user = await User.findByIdAndDelete(userId);
        if(!user){
            return res.status(404).json({ success: false, message: "User not found" });
        }
        res.status(200).json({
            success: true,
            message: "Deleted user successfuly",
            user: {
                ...user._doc,
                password: undefined
            }
        })
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}

export const deleteAllUsers = async (req, res, next) => {
    try {
        const userId = req.user._id;
        const result = await User.deleteMany({ _id: { $ne: userId } });
        if(!result){
            return res.status(404).json({ success: false, message: "Something went wrong" });
        }

        res.status(200).json({
            success: true,
            message: `Deleted ${result.deletedCount} users`
        })
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

