import React from 'react';
import { Box, Typography } from '@mui/material';
import { Ticket } from '@/types/ticket';

interface TicketChatProps {
    ticket?: Ticket | null;
}

const TicketChat: React.FC<TicketChatProps> = ({ ticket }) => {
    if (!ticket) {
        return (
            <Box
                sx={{
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    bgcolor: 'background.default'
                }}
            >
                <Typography variant="h6" color="text.secondary">
                    Selecione um ticket para iniciar o atendimento.
                </Typography>
            </Box>
        );
    }

    return (
        <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', bgcolor: '#e5ddd5' }}>
            <Box sx={{ p: 2, bgcolor: 'white', borderBottom: '1px solid rgba(0,0,0,0.1)' }}>
                <Typography variant="h6">{ticket.contact?.name}</Typography>
                <Typography variant="body2" color="text.secondary">
                    {ticket.user ? `Atribuído a: ${ticket.user.name}` : 'Aguardando atendimento'}
                </Typography>
            </Box>
            <Box sx={{ flexGrow: 1, p: 2, overflowY: 'auto' }}>
                {/* Messages will go here */}
                <Typography align="center" sx={{ mt: 4, color: 'text.secondary' }}>
                    [Área de mensagens em construção]
                </Typography>
            </Box>
            <Box sx={{ p: 2, bgcolor: 'white' }}>
                {/* Input area */}
                <Typography variant="caption">Input Area Mockup</Typography>
            </Box>
        </Box>
    );
};

export default TicketChat;
