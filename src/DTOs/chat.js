class ChatMessage {
    constructor({ id, username, date, text }) {
        this.id = id
        this.username = username
        this.date = date
        this.text = text
    }
}

export function asDto(message) {
    if (Array.isArray(message))
        return message.map(mes => new ChatMessage(mes))
    else
        return new ChatMessage(message)
}
