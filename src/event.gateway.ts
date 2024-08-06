import { Server, Socket } from "socket.io";
import { InvoiceService } from "./modules/invoice/invoice.service";
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
     constructor(private readonly invoiceServices: InvoiceService) {}
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
  async handleMessage(@MessageBody() data: any): Promise<any> {
    
    try {
      const res = await this.invoiceServices.completeInvocie(data?.id_invoice)
      if(res) {
        this.server.emit("announce_success", {
          id_invoice: data.id_invoice,
          message:"success"
        })
      } else {
        this.server.emit("announce_success", {
          id_invoice: data.id_invoice,
          message:"error"
        })
      }
    
    } catch (err: any) {
      console.log(err)
      this.server.emit("announce_success", {
        id_invoice: data.id_invoice,
        message:"error"
      })
    }
  
  }

  @SubscribeMessage("change_order")
  async handleChangeOrder(@MessageBody() data: any) : Promise<any> {
 
    if(data?.status) this.server.emit("change_order_success", {
      status: true,
      table: data?.table ? data?.table : ""
    })
  }
}