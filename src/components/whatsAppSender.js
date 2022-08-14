import { twilioNumber } from '../../config.js'
import { Sender } from './sender.js'

export class WhatsAppSender extends Sender {
    constructor() {
        super('whatsapp:' + twilioNumber)
    }

    async send(destNumer, text) {
        super.send('whatsapp:' + destNumer, text)
    }
}