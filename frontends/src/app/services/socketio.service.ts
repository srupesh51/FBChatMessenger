import * as io from 'socket.io-client';
import {environment} from './../../environments/environment';

export class SocketioService {
  socket;
  constructor() {
  }
  setupSocketConnection() {
    this.socket = io(environment.SOCKET_ENDPOINT);
  }
  // sendMessage(msgObject) {
  //   this.socket.emit('MSG_SENT', msgObject);
  // }
}
