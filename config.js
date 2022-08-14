import 'dotenv/config'

export const mongoDB = {
    urlServer: `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.6zovj.mongodb.net/${process.env.MONGO_DATABASE}?retryWrites=true&w=majority`,
    options: {
        serverSelectionTimeoutMS: 5000,
    },
    advancedOptions: { 
        useNewUrlParser: true, 
        useUnifiedTopology: true 
    }
}

export const PORT = process.env.PORT ?? 8080

export const serverEmail = process.env.SERVER_EMAIL
export const serverEmailPassword = process.env.SERVER_PASSWORD

export const adminEmail = process.env.ADMIN_EMAIL
export const adminPhone = process.env.ADMIN_PHONE

export const twilioSID = process.env.TWILIO_SID
export const twilioToken = process.env.TWILIO_TOKEN
export const twilioNumber = process.env.TWILIO_NUMBER

/* Argv(s) */
import parseArgs from 'minimist'

export const SERVER_MODE = parseArgs(process.argv).server_mode ?? 'fork'