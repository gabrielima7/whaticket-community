import React, { useEffect, useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogTitle,
    Typography,
    CircularProgress,
    Box,
    DialogActions,
    Button
} from '@mui/material';
import { useSocket } from '@/context/SocketContext';
import { QRCodeSVG } from 'qrcode.react';

interface QrContextModalProps {
    open: boolean;
    onClose: () => void;
    whatsappId: number | null;
}

const QrCodeModal: React.FC<QrContextModalProps> = ({
    open,
    onClose,
    whatsappId,
}) => {
    const { socket } = useSocket();
    const [qrCode, setQrCode] = useState<string | null>(null);
    const [status, setStatus] = useState<string>('AGUARDANDO...');

    useEffect(() => {
        if (!whatsappId || !socket || !open) return;

        setQrCode(null);
        setStatus('AGUARDANDO...');

        const handleQrCode = (data: { whatsappId: number; qrcode: string }) => {
            if (data.whatsappId === whatsappId) {
                setQrCode(data.qrcode);
                setStatus('QR CODE RECEBIDO');
            }
        };

        const handleStatus = (data: { whatsappId: number; status: string }) => {
            if (data.whatsappId === whatsappId) {
                setStatus(data.status);
                if (data.status === 'CONNECTED' || data.status === 'connected') {
                    onClose();
                }
            }
        };

        socket.on('whatsapp:qrcode', handleQrCode);
        socket.on('whatsapp:status', handleStatus);

        return () => {
            socket.off('whatsapp:qrcode', handleQrCode);
            socket.off('whatsapp:status', handleStatus);
        };
    }, [whatsappId, socket, open, onClose]);

    return (
        <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
            <DialogTitle>Conexão WhatsApp</DialogTitle>
            <DialogContent>
                <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    justifyContent="center"
                    minHeight={300}
                >
                    {qrCode ? (
                        <QRCodeSVG value={qrCode} size={250} />
                    ) : (
                        <Box display="flex" flexDirection="column" alignItems="center">
                            <CircularProgress sx={{ mb: 2 }} />
                            <Typography variant="body2" color="textSecondary">
                                Aguardando QR Code...
                            </Typography>
                        </Box>
                    )}

                    <Typography
                        variant="body1"
                        color={status === 'CONNECTED' || status === 'connected' ? 'success.main' : 'textSecondary'}
                        sx={{ mt: 3, fontWeight: 'bold' }}
                    >
                        Status: {status}
                    </Typography>
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Fechar</Button>
            </DialogActions>
        </Dialog>
    );
};

export default QrCodeModal;
