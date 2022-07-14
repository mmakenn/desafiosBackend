import express from 'express'

export function setMiddleware(app) {
    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))
    app.use('/public', express.static('public'))
}