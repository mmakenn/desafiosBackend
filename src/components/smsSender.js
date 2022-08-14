import { twilioNumber } from '../../config.js'
import { Sender } from './sender.js'

export class SmsSender extends Sender {
    constructor() {
        super(twilioNumber)
    }
}