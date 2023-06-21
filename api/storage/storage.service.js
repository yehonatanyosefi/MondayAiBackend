require('dotenv').config()

const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args))
const FormData = require('form-data')

const CLOUD_NAME = process.env.CLOUD_NAME
const UPLOAD_PRESET = process.env.UPLOAD_PRESET
const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`

async function uploadImg(imgUrl) {
	try {
		const formData = new FormData()
		formData.append('upload_preset', UPLOAD_PRESET)
		formData.append('file', imgUrl)

		const res = await fetch(UPLOAD_URL, {
			method: 'POST',
			body: formData,
		})
		const uploadResponse = await res.json()
		const newImgUrl = uploadResponse.secure_url
		return newImgUrl
	} catch (err) {
		console.error('Failed to upload', err)
		throw err
	}
}

module.exports = {
	uploadImg,
}
