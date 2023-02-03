import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { io, Socket } from 'socket.io-client';
@Injectable({
  providedIn: 'root',
})
export class ChatService implements OnInit {
  private socket!: Socket;

  private url = 'http://localhost:4000'; //your server local path
  numberOfOnlineUsers!: number;

  constructor() {
    this.socket = io(this.url);
    // this.socket = io();
  }
  ngOnInit(): void {
    this.socket.on('numberOfOnlineUser', (numberOfOnlineUsers) => {
      this.numberOfOnlineUsers = numberOfOnlineUsers;
    });
  }

  joinRoom(data: any) {
    this.socket.emit('join', data);
  }

  newUserJoined() {
    let observable = new Observable<{ user: string; message: string }>(
      (observer) => {
        this.socket.on('new user joined', (data) => {
          observer.next(data);
        });

        return () => {
          this.socket.disconnect();
        };
      }
    );
    return observable;
  }

  leaveRoom(data: any) {
    this.socket.emit('leave', data);
  }

  userLeftRoom() {
    let observable = new Observable<{ user: string; message: string }>(
      (observer) => {
        this.socket.on('left room', (data) => {
          observer.next(data);
        });
        return () => {
          this.socket.disconnect();
        };
      }
    );
    return observable;
  }

  sendMessage(data: any) {
    this.socket.emit('message', data);
  }

  UserList(data: any) {
    this.socket.emit('', data);
  }

  newMessageReceived() {
    let observable = new Observable<{ user: string; message: string }>(
      (observer) => {
        this.socket.on('new message', (data) => {
          observer.next(data);
        });
        return () => {
          this.socket.disconnect();
        };
      }
    );
    return observable;
  }
  disconnect(): void {
    this.socket.disconnect();
  }
  connected(): void {
    this.socket.disconnect();
  }
}
