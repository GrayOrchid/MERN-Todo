import CommentModel from '../models/Comments.js'


export const create = async (req, res) => {
    try {
        const comment = new CommentModel({
            text: req.body.text,
            creator: req.body.userId,
            parentComment: req.body?.parentComment,
            childComments: []
        })

        if (req.body?.parentComment) {
            const parentComment = await CommentModel.findById(req.body.parentComment);
            if (parentComment) {
                parentComment.childComments.push(comment._id);
                await parentComment.save();
            }
        }

        await comment.save()
        res.json(comment)
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: 'Не удалосЬ создать задачу'
        })
    }
}


export const getAll = async (req, res) => {
    try {
        const comment = await CommentModel.find().populate('childComments')
        console.log(comment);
        res.json(comment)
    } catch (error) {
        console.log(error);
    }
}

export const remove = async (req, res) => {
    try {
        const commentId = req.params.id
        await CommentModel.findOneAndDelete(commentId)
        res.send("Deleted!")

        console.log('ww');
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: 'Не удалос создать задачу'
        })
    }
}

export const update = async (req, res) => {
    try {
        const commentId = req.params.id
        await CommentModel.updateOne({ _id: commentId },
            { text: req.body.text, })

        res.send("Updated!")
    } catch (error) {
        console.log(error);
    }
}