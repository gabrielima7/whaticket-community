import api from './api';
import { Ticket, TicketListParams } from '@/types/ticket';

const list = async (params: TicketListParams = {}): Promise<{ tickets: Ticket[]; count: number; hasMore: boolean }> => {
    const { data } = await api.get('/tickets', {
        params,
    });
    return data;
};

const show = async (id: number): Promise<Ticket> => {
    const { data } = await api.get<Ticket>(`/tickets/${id}`);
    return data;
};

const update = async (id: number, data: Partial<Ticket>): Promise<Ticket> => {
    const { data: result } = await api.put<Ticket>(`/tickets/${id}`, data);
    return result;
};

const updateStatus = async (id: number, status: string): Promise<Ticket> => {
    const { data } = await api.put<Ticket>(`/tickets/${id}`, { status });
    return data;
};

const ticketService = {
    list,
    show,
    update,
    updateStatus,
};

export default ticketService;
