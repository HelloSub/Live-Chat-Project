import { AppModule } from './app.module';
import { Socket, io } from 'socket.io-client';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AuthService } from './auth.service';
// import { ChatService } from './chat.service';
// import { FormControl, FormGroup } from '@angular/forms';
// import * as io from 'socket.io-client'
const SOCKET_ENDPOINT = 'localhost:4000';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  socket: any;
  message: string = '';
  showMe: boolean = true;
  @ViewChild('itemName') itemName: ElementRef | undefined;
  // userList = [
  //   { name: 'subham' },
  //   { name: 'suraj' },
  //   { name: 'sweta' },
  //   { name: 'sumit' },
  //   { name: 'rakesh' },
  //   { name: 'priya' },
  //   { name: 'madhu' },
  //   { name: 'amar' },
  // ];
  name: string = '';
  list: any[] = [];
  displayName: any = '';
  userList: any[] = [];

  constructor(private auth: AuthService) {}
  ngOnInit(): void {
    // this.setupSocketConnection();
    this.auth.getAllUsers().subscribe((result: any) => {
      this.list = result.data;
      console.log(this.list);
    });
  }

  setupSocketConnection() {
    this.socket = io(SOCKET_ENDPOINT);
    // this.auth.getAllUsers().subscribe((result) => {
    //   console.log(result);
    //   this.list = result.data;
    //   console.log(this.list);
    // });
    this.socket.on('online', (callback: any) => {
      if (this.displayName != '') {
        callback(this.displayName);
      }
    });
    this.name = this.itemName?.nativeElement.value;
    console.log(this.name);
    this.displayName = this.name;
    console.log(this.displayName);
    this.socket.on('message-broadcast', (data: string) => {
      console.log(data);
      if (data) {
        const element = document.createElement('li');
        element.innerHTML = data;
        element.style.background = 'white';
        element.style.padding = '15px 30px';
        element.style.margin = '10px';
        //   if (this.displayName == '') {
        document.getElementById('message-list')?.appendChild(element);

        //     // this.disconnect();
        //   } else {
        //     // this.connected();
        //     // document.getElementById('message-list')?.appendChild(element);
        //     this.disconnect();
        //   }
      }
    });
  }
  // set() {
  //   this.socket = io(SOCKET_ENDPOINT);
  //   this.socket.on('online', (parameter: any) => {
  //     console.log(this.name, parameter);
  //   });
  // }
  SendMessage() {
    this.socket.emit('message', this.message);
    const element = document.createElement('li');
    element.innerHTML = this.message;
    element.style.background = 'white';
    element.style.padding = '15px 30px';
    element.style.margin = '10px';
    element.style.textAlign = 'right';
    document.getElementById('message-list')?.appendChild(element);
    this.message = '';
  }

  onChangeList() {
    const name = this.itemName?.nativeElement.value;
    console.log(name);
    const list = this.list.filter((n) => n.name !== name);
    this.userList = list;
  }

  get() {
    // this.name = this.itemName?.nativeElement.value;
    // console.log(this.name);
    // this.displayName = this.name;
    // console.log(this.displayName);
    // this.userList = this.list.filter(this.displayName);
    // this.socket = io(SOCKET_ENDPOINT);
    // this.socket.emit('online', (callback: any) => {
    //   callback(this.displayName);
    // });
    // this.list = this.userList.splice(1, {{this.display}});
    // console.log(this.list);
    // if (this.displayName == '') {
    //   this.connected();
    // } else {
    //   this.disconnect();
    // }
  }

  disconnect() {
    // this.socket.disconnect();
    this.socket = io(SOCKET_ENDPOINT);
    this.socket.on('offline', (callback: any) => {
      callback(this.displayName);
      this.socket.disconnect();
      this.name = '';
      this.displayName = '';
    });
    // this.socket.disconnect();
  }
  connected(): void {
    this.socket.connect();
  }
}
