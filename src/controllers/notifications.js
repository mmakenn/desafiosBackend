import { sendEmailToAdmin } from "../components/mailSender.js"
import { SmsSender } from "../components/smsSender.js"
import { WhatsAppSender } from "../components/whatsAppSender.js"
import { adminPhone } from "../../config.js"
import { CartsContainer } from "../containers/cartsContainer.js"
import { UsersContainer } from "../containers/usersContainer.js"

const carts = new CartsContainer()
const users = new UsersContainer()

function createcontentHTMLNewUser(infoUser) {
    return `<h1>Nuevo usuario registrado: ${infoUser.username}</h1>
                <h2>Estos son los datos del formulario:</h2>
                <spam>Nombre: ${infoUser.name}</spam>
                <spam>Edad: ${infoUser.age}</spam>
                <spam>Celular: ${infoUser.phone}</spam>
                <spam>Dirección: ${infoUser.adress}</spam>`
}
            
export function notificationsSingUp(req, res, next) {
    const contentHTML = createcontentHTMLNewUser(req.body)
    sendEmailToAdmin("Nuevo registro", contentHTML)
    next()
}
            
function createSubjectNewPurchase(name, username) {
    return `Nuevo pedido de ${name} [${username}]`
} 

function createcontentHTMLNewPurchase(cart) {
    let emailContent = `<h2>Estos son los productos solicitados:<h2> \n
    <table>
        <tr>
            <th> Producto </th>
            <th> Cantidad </th>
        </tr>
        `
    cart.forEach(item => {
        emailContent += `
        <tr>
            <th> ${item.title} </th>
            <th> ${item.quantity} </th>
        </tr>
        `
    })
    emailContent += `</table>`
    return emailContent
} 

export function notificationsSale(req, res, next) {
    /* Notification via email to admin */
    const { user } = req
    const subject = createSubjectNewPurchase(user.name, user.username)

    const { params } = req
    const cart = carts.getById(params.id)
    const contentHTML = createcontentHTMLNewPurchase(cart)
    
    sendEmailToAdmin(subject, contentHTML)

    /* Notification via whatsapp to admin */
    const whatsapp = new WhatsAppSender()
    whatsapp.send(adminPhone, subject)
    
    /* Notification via sms to user */
    const infoUser = users.getByUsername(user.username)
    const sms = new SmsSender()
    sms.send(infoUser.phone, "Tu pedido ha sido recibido. Se encuentra en proceso.")

    next()
}