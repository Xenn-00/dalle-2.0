import express from 'express'
import * as dotenv from 'dotenv'
import { v2 as cloudinary } from 'cloudinary'

import Post from '../mongoDB/models/Post.js'

dotenv.config()

const router = express.Router()

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

// GET ALL POSTS
router.route('/api/get').get(async (req, res) => {
    try {
        const posts = await Post.find({})
        res.status(200).json({ message: "Success querying posts", data: posts })
    } catch (error) {
        res.status(500).json({message: "Failed to querying posts", error: error})
    }
})
// CREATE A POST
router.route('/api/post').post(async (req, res) => {
    try {
        const { name, prompt, photo } = req.body
        const photoUrl = await cloudinary.uploader.upload(photo)

        const newPost = await Post.create({
            name,
            prompt,
            photo: photoUrl.url
        })

        res.status(201).json({ message: "Success create a post", data: newPost })
    } catch (error) {
        res.status(500).json({ message: "failed to create a post", error: error })
    }
})

export default router