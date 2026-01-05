import { QueuesService } from './queues.service';
import { CreateQueueDto, UpdateQueueDto } from './dto';
export declare class QueuesController {
    private readonly queuesService;
    constructor(queuesService: QueuesService);
    findAll(): Promise<({
        _count: {
            tickets: number;
            users: number;
            whatsapps: number;
        };
    } & {
        name: string;
        id: number;
        createdAt: Date;
        updatedAt: Date;
        color: string;
        greetingMessage: string | null;
    })[]>;
    findOne(id: number): Promise<{
        users: ({
            user: {
                email: string;
                name: string;
                id: number;
            };
        } & {
            id: number;
            createdAt: Date;
            updatedAt: Date;
            userId: number;
            queueId: number;
        })[];
        whatsapps: ({
            whatsapp: {
                name: string;
                id: number;
            };
        } & {
            id: number;
            createdAt: Date;
            updatedAt: Date;
            queueId: number;
            whatsappId: number;
        })[];
    } & {
        name: string;
        id: number;
        createdAt: Date;
        updatedAt: Date;
        color: string;
        greetingMessage: string | null;
    }>;
    create(dto: CreateQueueDto): Promise<{
        name: string;
        id: number;
        createdAt: Date;
        updatedAt: Date;
        color: string;
        greetingMessage: string | null;
    }>;
    update(id: number, dto: UpdateQueueDto): Promise<{
        name: string;
        id: number;
        createdAt: Date;
        updatedAt: Date;
        color: string;
        greetingMessage: string | null;
    }>;
    delete(id: number): Promise<void>;
}
