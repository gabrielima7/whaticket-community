import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { io, Socket } from 'socket.io-client';
import { useAuthStore } from './AuthContext';

interface SocketContextType {
    socket: Socket | null;
    isConnected: boolean;
}

const SocketContext = createContext<SocketContextType>({
    socket: null,
    isConnected: false,
});

export const useSocket = () => useContext(SocketContext);

interface SocketProviderProps {
    children: ReactNode;
}

export const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
    const [socket, setSocket] = useState<Socket | null>(null);
    const [isConnected, setIsConnected] = useState(false);
    const { token, isAuthenticated } = useAuthStore();

    useEffect(() => {
        if (!isAuthenticated || !token) {
            if (socket) {
                socket.disconnect();
                setSocket(null);
                setIsConnected(false);
            }
            return;
        }

        const socketUrl = import.meta.env.VITE_API_URL
            ? import.meta.env.VITE_API_URL.replace('/api/v1', '')
            : 'http://localhost:3001';

        const newSocket = io(socketUrl, {
            auth: {
                token: `Bearer ${token}`,
            },
            transports: ['websocket'],
            autoConnect: true,
            reconnection: true,
            reconnectionAttempts: 5,
            reconnectionDelay: 1000,
        });

        newSocket.on('connect', () => {
            console.log('Socket connected:', newSocket.id);
            setIsConnected(true);
        });

        newSocket.on('disconnect', (reason) => {
            console.log('Socket disconnected:', reason);
            setIsConnected(false);
        });

        newSocket.on('connect_error', (error) => {
            console.error('Socket connection error:', error);
            setIsConnected(false);
        });

        setSocket(newSocket);

        return () => {
            newSocket.disconnect();
        };
    }, [token, isAuthenticated]);

    return (
        <SocketContext.Provider value={{ socket, isConnected }}>
            {children}
        </SocketContext.Provider>
    );
};
