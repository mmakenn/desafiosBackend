import Handlebars from 'express-handlebars'

export const handlebarsConfig = {
    extname: '.hbs',
    defaultLayout: 'index.hbs'
}

export function setHandlebars(app) {
    app.engine('.hbs', Handlebars.engine(handlebarsConfig))
    app.set('view engine', '.hbs')
    app.set('views', './src/views')
}