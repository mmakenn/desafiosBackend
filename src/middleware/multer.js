import multer from 'multer'
import path from 'path'

function removeATSign(email) {
    return email.replace("@", "")
}

function defineFileExtention(fileMimeType) {
    const mimetype = fileMimeType.split('/')
    return mimetype.pop()
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.resolve() + '/public/uploads')
    },
    filename: (req, file, cb) => {
        const userId = removeATSign(req.body.username)
        const ext = defineFileExtention(file.mimetype)
        cb(null, `${file.fieldname}-${userId}.${ext}`)
    }
})

export const upload = multer({ storage: storage })

export const uploadFile = upload.single('avatar')