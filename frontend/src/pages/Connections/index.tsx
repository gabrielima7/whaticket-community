import React, { useState, useEffect } from 'react';
import {
    Box,
    Typography,
    Button,
    Card,
    CardContent,
    CardActions,
    Grid,
    Chip,
    IconButton,
    Tooltip,
    CircularProgress,
} from '@mui/material';
import {
    Add as AddIcon,
    Delete as DeleteIcon,
    Edit as EditIcon,
    QrCode as QrCodeIcon,
    PowerSettingsNew as DisconnectIcon,
    WhatsApp as WhatsAppIcon,
} from '@mui/icons-material';
import { toast } from 'react-toastify';
import { format, parseISO } from 'date-fns';

import whatsappService from '@/services/whatsappService';
import { WhatsApp } from '@/types/whatsapp';
import ConnectionModal from './ConnectionModal';
import QrCodeModal from './QrCodeModal';
import { useSocket } from '@/context/SocketContext';

const Connections: React.FC = () => {
    const [whatsapps, setWhatsapps] = useState<WhatsApp[]>([]);
    const [loading, setLoading] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [qrModalOpen, setQrModalOpen] = useState(false);
    const [selectedWhatsApp, setSelectedWhatsApp] = useState<WhatsApp | null>(null);

    const { socket } = useSocket();

    const fetchWhatsApps = async () => {
        setLoading(true);
        try {
            const data = await whatsappService.list();
            setWhatsapps(data);
        } catch (err) {
            toast.error('Erro ao carregar conexões');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchWhatsApps();
    }, []);

    useEffect(() => {
        if (!socket) return;

        const handleWhatsAppUpdate = (data: { whatsapp: WhatsApp }) => {
            setWhatsapps((prev) =>
                prev.map((w) => (w.id === data.whatsapp.id ? data.whatsapp : w))
            );
        };

        const handleWhatsAppDelete = (data: { whatsappId: number }) => {
            setWhatsapps((prev) => prev.filter((w) => w.id !== data.whatsappId));
        };

        socket.on('whatsapp:update', handleWhatsAppUpdate);
        socket.on('whatsapp:delete', handleWhatsAppDelete);

        return () => {
            socket.off('whatsapp:update', handleWhatsAppUpdate);
            socket.off('whatsapp:delete', handleWhatsAppDelete);
        };
    }, [socket]);

    const handleOpenModal = (whatsapp?: WhatsApp) => {
        setSelectedWhatsApp(whatsapp || null);
        setModalOpen(true);
    };

    const handleOpenQrModal = (whatsapp: WhatsApp) => {
        setSelectedWhatsApp(whatsapp);
        setQrModalOpen(true);
    };

    const handleDisconnect = async (whatsappId: number | undefined) => {
        if (!whatsappId) return;
        if (confirm('Deseja realmente desconectar?')) {
            try {
                await whatsappService.disconnect(whatsappId);
                toast.success('Desconexão solicitada!');
            } catch (err) {
                toast.error('Erro ao desconectar');
            }
        }
    };

    const handleDelete = async (whatsappId: number | undefined) => {
        if (!whatsappId) return;
        if (confirm('Atenção! Isso apagará a conexão permanentemente. Deseja continuar?')) {
            try {
                await whatsappService.remove(whatsappId);
                toast.success('Conexão excluída!');
                fetchWhatsApps();
            } catch (err) {
                toast.error('Erro ao excluir conexão');
            }
        }
    };

    const renderStatus = (whatsapp: WhatsApp) => {
        const { status, number } = whatsapp;
        // Status can be upper or lowercase, handle both
        const normalizedStatus = status?.toUpperCase();

        if (normalizedStatus === 'QRCODE') {
            return (
                <Button
                    size="small"
                    variant="contained"
                    color="primary"
                    onClick={() => handleOpenQrModal(whatsapp)}
                    startIcon={<QrCodeIcon />}
                >
                    LER QR CODE
                </Button>
            );
        }
        if (normalizedStatus === 'CONNECTED') {
            return (
                <Box textAlign="center">
                    <Chip label="Conectado" color="success" size="small" sx={{ mb: 1 }} />
                    <Typography variant="body2" color="textSecondary">
                        {number}
                    </Typography>
                    <Button
                        size="small"
                        variant="outlined"
                        color="error"
                        onClick={() => handleDisconnect(whatsapp.id)}
                        startIcon={<DisconnectIcon />}
                        sx={{ mt: 1 }}
                    >
                        Desconectar
                    </Button>
                </Box>
            );
        }
        return (
            <Chip label={status || 'Desconhecido'} size="small" />
        );
    };

    return (
        <Box sx={{ p: 2 }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                <Typography variant="h5" component="h1">
                    Conexões
                </Typography>
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={() => handleOpenModal()}
                >
                    Adicionar WhatsApp
                </Button>
            </Box>

            {loading ? (
                <CircularProgress />
            ) : (
                <Grid container spacing={3}>
                    {whatsapps.map((whatsapp) => (
                        <Grid item xs={12} sm={6} md={4} key={whatsapp.id}>
                            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', position: 'relative' }}>
                                <CardContent sx={{ flexGrow: 1, textAlign: 'center' }}>
                                    {whatsapp.isDefault && (
                                        <Chip
                                            label="Padrão"
                                            color="info"
                                            size="small"
                                            sx={{ position: 'absolute', top: 10, right: 10 }}
                                        />
                                    )}

                                    <WhatsAppIcon sx={{ fontSize: 48, color: 'success.main', mb: 2 }} />

                                    <Typography variant="h6" gutterBottom>
                                        {whatsapp.name}
                                    </Typography>

                                    <Box minHeight={80} display="flex" flexDirection="column" justifyContent="center" alignItems="center">
                                        {renderStatus(whatsapp)}
                                    </Box>

                                    <Typography variant="caption" display="block" color="textSecondary" sx={{ mt: 2 }}>
                                        Atualizado em: {format(parseISO(whatsapp.updatedAt), 'dd/MM/yyyy HH:mm')}
                                    </Typography>

                                </CardContent>
                                <CardActions disableSpacing sx={{ justifyContent: 'space-between' }}>
                                    <Tooltip title="Editar">
                                        <IconButton size="small" onClick={() => handleOpenModal(whatsapp)}>
                                            <EditIcon />
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Excluir">
                                        <IconButton size="small" color="error" onClick={() => handleDelete(whatsapp.id)}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </Tooltip>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            )}

            <ConnectionModal
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                whatsappId={selectedWhatsApp?.id || null}
                onSave={fetchWhatsApps}
            />

            <QrCodeModal
                open={qrModalOpen}
                onClose={() => setQrModalOpen(false)}
                whatsappId={selectedWhatsApp?.id || null}
            />

        </Box>
    );
};

export default Connections;
