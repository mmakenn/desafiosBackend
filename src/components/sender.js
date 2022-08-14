import twilio from 'twilio'
import { twilioSID, twilioToken } from '../../config.js'
import logger from './logger.js'

export class Sender {
    constructor(number) {
        this.number = number
        this.client = twilio(twilioSID, twilioToken)
    }

    async send(destNumer, text) {
        const message = {
            from: this.number,
            to: destNumer,
            body: text,
        }

        try {
            await this.cliente.messages.create(message)
        } catch (error) {
            logger.error(`Error while sending message to ${destNumer}\n
            ${error}`)
        }
    }
}