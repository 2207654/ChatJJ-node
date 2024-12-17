import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';

import OpenAiPro from './OpenAi/index'
import { Server, WebSocket } from 'ws';
import { OpenAI } from 'openai'; // 确保已经安装 openai 包

@WebSocketGateway(3004)
export class WsStartGateway
  implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;
  private readonly openaiClient: OpenAI;
  // 定义全局 messages 对象，按 WebSocket 连接 ID 记录会话上下文
  private sessions = [];
  private streamMessages = [];
  constructor() {
    this.openaiClient = new OpenAI({
      apiKey: "sk-XIbnpdEDriWnaiiCTy6MGh1nIrsPphl829r6X3mWWEepPezf", // 替换为你的 API Key
      baseURL: "https://api.moonshot.cn/v1", // Moonshot API 的基础路径
    });
  }
  handleDisconnect(client: any) {
    console.log('mmmmmllllllll', client);
  }
  handleConnection(client: any, ...args: any[]) {
    console.log('mmmmm', client);
    // 分配唯一会话 ID（以 WebSocket 对象为标识）
    const sessionId = client.id;

    // 初始化当前会话的历史记录
    this.sessions[sessionId] = [];
    console.log(`WebSocket client connected: ${sessionId}`);
  }

  @SubscribeMessage('message')
  async handleMessage(client: WebSocket, message: { content: string }) {
    const sessionId = client.id;
    console.log('Received message:', message); // 打印原始消息
    let history = [{ "role": "system", "content": "你是 Kimi，由 Moonshot AI 提供的人工智能助手，你更擅长中文和英文的对话。你会为用户提供安全，有帮助，准确的回答。同时，你会拒绝一切涉及恐怖主义，种族歧视，黄色暴力等问题的回答。Moonshot AI 为专有名词，不可翻译成其他语言。" }]

    try {
      // 检查消息是否存在 content 属性
      if (!message || !message.content) {
        throw new Error('No content found in the message');
      }

      const content = message.content; // 获取用户输入的内容
      console.log('Parsed content:', content); // 打印解析后的内容
      this.streamMessages.push({
        role: "user", content: content
      })
      console.log('用户发送完之后', this.sessions)
      // 调用 Moonshot AI 的聊天接口
      const completion = await this.openaiClient.chat.completions.create({
        model: "moonshot-v1-auto",
        // messages: [
        //   { role: "user", content },
        // ],
        messages: this.streamMessages,
        temperature: 0.3, // 控制回答的随机性
        stream: true
      });
      client.send(JSON.stringify(JSON.stringify({ reply: "", isStreaming: true })))
      let fullReply = ""; // 用于记录完整回复
      for await (const chunk of completion) {
        const delta = chunk.choices[0]?.delta;
        if (delta?.content) {
          client.send(JSON.stringify({ reply: delta.content }));
          fullReply += delta.content;
        }
      }

      this.streamMessages.push({ role: "assistant", content: fullReply });
      // history = history.concat(completion.choices[0].message)
      console.log('kimi回答之后的内容', fullReply)
      // 获取 Kimi 的回答内容
      // const reply = completion.choices[0]?.message?.content;
      // console.log('Reply from AI:', reply); // 打印 AI 的回答

      if (fullReply) {
        console.log('fullReply', fullReply);
        // 将回答发送到前端
        // client.send(JSON.stringify({ reply }));
        // return JSON.stringify({ reply })
      }

    } catch (error) {
      console.error('Error:', error); // 打印错误信息
      client.send(JSON.stringify({ reply: "Kimi 暂时无法回答您的问题，请稍后再试。" }));
    }

  }
}
