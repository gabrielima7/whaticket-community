import React, { useEffect } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    FormControlLabel,
    Switch,
} from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import whatsappService from '@/services/whatsappService';
import { toast } from 'react-toastify';

interface ConnectionModalProps {
    open: boolean;
    onClose: () => void;
    whatsappId?: number | null;
    onSave: () => void;
}

const ConnectionSchema = Yup.object().shape({
    name: Yup.string().min(2, 'Nome muito curto').required('Obrigatório'),
    //   isDefault: Yup.boolean(),
});

const ConnectionModal: React.FC<ConnectionModalProps> = ({
    open,
    onClose,
    whatsappId,
    onSave,
}) => {
    const formik = useFormik({
        initialValues: {
            name: '',
            isDefault: false,
        },
        validationSchema: ConnectionSchema,
        onSubmit: async (values) => {
            try {
                if (whatsappId) {
                    await whatsappService.update(whatsappId, values);
                    toast.success('Conexão atualizada com sucesso!');
                } else {
                    await whatsappService.create(values);
                    toast.success('Conexão criada com sucesso!');
                }
                onSave();
                handleClose();
            } catch (err: any) {
                toast.error(
                    err.response?.data?.message || 'Erro ao salvar conexão.'
                );
            }
        },
    });

    useEffect(() => {
        const fetchWhatsApp = async () => {
            if (!whatsappId) return;
            try {
                const whatsapp = await whatsappService.show(whatsappId);
                formik.setValues({
                    name: whatsapp.name,
                    isDefault: whatsapp.isDefault,
                });
            } catch (err) {
                toast.error('Erro ao carregar conexão');
            }
        };

        if (open && whatsappId) {
            fetchWhatsApp();
        } else {
            formik.resetForm();
        }
    }, [whatsappId, open]);

    const handleClose = () => {
        onClose();
        formik.resetForm();
    };

    return (
        <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth>
            <DialogTitle>
                {whatsappId ? 'Editar Conexão' : 'Nova Conexão'}
            </DialogTitle>
            <form onSubmit={formik.handleSubmit}>
                <DialogContent dividers>
                    <TextField
                        fullWidth
                        margin="normal"
                        id="name"
                        name="name"
                        label="Nome da Conexão"
                        variant="outlined"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        error={formik.touched.name && Boolean(formik.errors.name)}
                        helperText={formik.touched.name && formik.errors.name}
                    />
                    <FormControlLabel
                        control={
                            <Switch
                                checked={formik.values.isDefault}
                                onChange={formik.handleChange}
                                name="isDefault"
                                color="primary"
                            />
                        }
                        label="Padrão"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="error">
                        Cancelar
                    </Button>
                    <Button
                        type="submit"
                        color="primary"
                        variant="contained"
                        disabled={formik.isSubmitting}
                    >
                        {whatsappId ? 'Salvar' : 'Adicionar'}
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
};

export default ConnectionModal;
