import { io } from 'socket.io-client';

// "undefined" means the URL will be computed from the `window.location` object
const URL = import.meta.env.VITE_CHAT_SOCKET_URL;

if (!URL) {
    throw new Error('CHAT_SOCKET_URL is not set');
}

export const socket = io(URL, {
    autoConnect: false
});