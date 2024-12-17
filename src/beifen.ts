
// import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WsResponse } from "@nestjs/websockets";
// import { Socket } from "socket.io";
// import { OpenAI } from "openai"; // 确保已经安装 openai 包

// @WebSocketGateway(3003)
// export class WsStartGateway {
//   private readonly openaiClient: OpenAI;

//   constructor() {
//     this.openaiClient = new OpenAI({
//       apiKey: "sk-XIbnpdEDriWnaiiCTy6MGh1nIrsPphl829r6X3mWWEepPezf", // 替换为你的 API Key
//       baseURL: "https://api.moonshot.cn/v1", // Moonshot API 的基础路径
//     });
//   }

//   @SubscribeMessage('chat')
//   async handleEvent(
//     @MessageBody() message: { content: string },
//     @ConnectedSocket() client: Socket,
//   ): Promise<void> {
//     console.log('Received message:', message); // 打印原始消息

//     try {
//       // 检查消息是否存在 content 属性
//       if (!message || !message.content) {
//         throw new Error('No content found in the message');
//       }

//       const content = message.content; // 获取用户输入的内容
//       console.log('Parsed content:', content); // 打印解析后的内容

//       // 调用 Moonshot AI 的聊天接口
//       const completion = await this.openaiClient.chat.completions.create({
//         model: "moonshot-v1-8k",
//         messages: [
//           { role: "user", content },
//         ],
//         temperature: 0.3, // 控制回答的随机性
//       });

//       // 获取 Kimi 的回答内容
//       const reply = completion.choices[0]?.message?.content;
//       console.log('Reply from AI:', reply); // 打印 AI 的回答
//       if (reply) {
//         console.log('存在')
//         // 将回答发送到前端
//         client.emit('chat', JSON.stringify({ reply }));
//       }

//     } catch (error) {
//       console.error('Error:', error); // 打印错误信息
//       client.emit('chat', JSON.stringify({ reply: "Kimi 暂时无法回答您的问题，请稍后再试。" }));
//     }
//   }
// }


// import { WebSocketGateway, WebSocketServer, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/platform-ws';
// import { Server, WebSocket } from 'ws';
// import { OpenAI } from 'openai'; // 确保已经安装 openai 包

// @WebSocketGateway(3003, {
//   cors: {
//     origin: 'http://localhost:5173', // 允许的前端地址
//     credentials: true,
//   },
// })
// export class WsStartGateway implements OnGatewayConnection, OnGatewayDisconnect {
//   @WebSocketServer()
//   server: Server;

//   private readonly openaiClient: OpenAI;

//   constructor() {
//     this.openaiClient = new OpenAI({
//       apiKey: "sk-XIbnpdEDriWnaiiCTy6MGh1nIrsPphl829r6X3mWWEepPezf", // 替换为你的 API Key
//       baseURL: "https://api.moonshot.cn/v1", // Moonshot API 的基础路径
//     });
//   }

//   // 处理客户端连接
//   handleConnection(client: WebSocket) {
//     console.log('Client connected:', client);
//   }

//   // 处理客户端断开连接
//   handleDisconnect(client: WebSocket) {
//     console.log('Client disconnected:', client);
//   }

//   // 处理 WebSocket 消息
//   async handleMessage(client: WebSocket, message: { content: string }) {
//     console.log('Received message:', message); // 打印原始消息

//     try {
//       // 检查消息是否存在 content 属性
//       if (!message || !message.content) {
//         throw new Error('No content found in the message');
//       }

//       const content = message.content; // 获取用户输入的内容
//       console.log('Parsed content:', content); // 打印解析后的内容

//       // 调用 Moonshot AI 的聊天接口
//       const completion = await this.openaiClient.chat.completions.create({
//         model: "moonshot-v1-8k",
//         messages: [
//           { role: "user", content },
//         ],
//         temperature: 0.3, // 控制回答的随机性
//       });

//       // 获取 Kimi 的回答内容
//       const reply = completion.choices[0]?.message?.content;
//       console.log('Reply from AI:', reply); // 打印 AI 的回答

//       if (reply) {
//         console.log('存在');
//         // 将回答发送到前端
//         client.send(JSON.stringify({ reply }));
//       }

//     } catch (error) {
//       console.error('Error:', error); // 打印错误信息
//       client.send(JSON.stringify({ reply: "Kimi 暂时无法回答您的问题，请稍后再试。" }));
//     }
//   }
// }