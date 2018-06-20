import io from 'socket.io-client';

export default () => io(process.env.REACT_SOCKET_URL);