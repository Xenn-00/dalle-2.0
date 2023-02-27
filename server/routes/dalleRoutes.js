import express from 'express'
import * as dotenv from 'dotenv'
import { Configuration, OpenAIApi } from 'openai'

dotenv.config()

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY
})

const openai = new OpenAIApi(configuration)

const router = express.Router()

router.route('/api/v1/dalle').get((req, res) => {
    res.send('Hello from DALL-E')
})
router.route('/api/v1/dalle/post').post(async (req, res) => {
    try {
        const { prompt } = req.body
        const aiResponse = await openai.createImage({
            prompt: prompt,
            n: 1,
            size: '1024x1024',
            response_format: 'b64_json'
        })
        const image = aiResponse.data.data[0].b64_json
        res.status(200).json({ message: "Success generating image", photo: image })
    } catch (error) {
        console.log("Generating Image failed : ", error)
        res.status(500).send(error?.response.data.error.message)
    }
})


export default router