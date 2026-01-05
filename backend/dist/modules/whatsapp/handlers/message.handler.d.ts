import { PrismaService } from '../../../database/prisma.service';
import type { MessageReceivedEvent, QRCodeEvent, ConnectionEvent } from '../baileys.service';
export declare class MessageHandler {
    private readonly prisma;
    private readonly logger;
    constructor(prisma: PrismaService);
    handleMessageReceived(event: MessageReceivedEvent): Promise<void>;
    private processMessage;
    private extractMessageContent;
    handleQRCode(event: QRCodeEvent): Promise<void>;
    handleConnection(event: ConnectionEvent): Promise<void>;
}
