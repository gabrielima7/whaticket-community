import { Contact } from './contact';
import { User } from './auth';

export type TicketStatus = 'open' | 'pending' | 'closed';

export interface Ticket {
    id: number;
    status: TicketStatus;
    unreadMessages: number;
    lastMessage: string;
    isGroup: boolean;
    userId: number;
    contactId: number;
    queueId: number | null;
    whatsappId: number;
    createdAt: string;
    updatedAt: string;
    user?: User;
    contact?: Contact;
    queue?: any; // Define Queue type later
    whatsapp?: any; // Define Whatsapp type if needed lightweight
}

export interface TicketListParams {
    pageNumber?: string;
    status?: string;
    date?: string;
    searchParam?: string;
    showAll?: string;
    queueIds?: string;
    withUnreadMessages?: string;
}
