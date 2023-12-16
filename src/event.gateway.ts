import { Server, Socket } from "socket.io";
import { AuthService } from "./modules/auth/auth.service";
import { ConnectedSocket, MessageBody, OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer, WsResponse } from "@nestjs/websockets";
import { UseGuards } from "@nestjs/common";
import { JwtAccessGuard } from "./guards/jwt-access.guard";
import { Observable, from, map } from "rxjs";
@WebSocketGateway({
    cors: {
        origin: "*",
      },
})
export class EventGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer()
    server: Server;
    // constructor(private readonly autheService: AuthService) {}
  afterInit(server: any) {}
  @UseGuards(JwtAccessGuard)
  async handleConnection(socket: Socket) {
    console.log("connection socket id: ", socket.id);
    // const authHeader = socket.handshake.headers.authorization;
    // if (authHeader && (authHeader as string).split("")[1]) {
    //   try {
        
         
    //     socket.data.email = email;
    //     socket.join(socket.data.email);
    //   } catch (e) {
    //     socket.disconnect();
    //   }
    // } else {
    //   socket.disconnect();
    // }
  }
  handleDisconnect(socket: Socket) {
    console.log(socket.id, socket.data.email);
  }

  // ban socket theo point
  
  @SubscribeMessage("announce")
  async handleMessage(@MessageBody() data: any): Promise<Observable<WsResponse<number>>> {
    return from([1, 2, 3]).pipe(map(item => ({ event: 'announce', data: data })));
  
  }
}