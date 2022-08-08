import logger from '../components/logger.js';
import persistance from '../../options.js';

let productsModule;
let productsList;

let usersModule;
let users;

let chatModule;
let chat;

switch (persistance) {
    case 'file':
        logger.info("Select persistance: File");

        productsModule = await import('./localfile/productsList.js');
        productsList = new productsModule.ProductsContainer();

        usersModule = await import('./localfile/users.js');
        users = new usersModule.UsersContainer();

        chatModule = await import('./localfile/chat.js');
        chat = new chatModule.ChatContainer();
        break
    case 'mongodb':
        logger.info("Select persistance: MongoDB");

        productsModule = await import('./mongo/productsList.js');
        productsList = new productsModule.ProductsContainer();
        
        usersModule = await import('./mongo/users.js');
        users = new usersModule.UsersContainer();

        chatModule = await import('./mongo/chat.js');
        chat = new chatModule.ChatContainer();
        break
    default:
        logger.info("Select persistance: Default --> Memory");

        productsModule = await import('./memory/productsList.js');
        productsList = new productsModule.ProductsContainer();

        usersModule = await import('./memory/users.js');
        users = new usersModule.UsersContainer();

        chatModule = await import('./memory/chat.js');
        chat = new chatModule.ChatContainer();
        break
}

export { productsList, users, chat }