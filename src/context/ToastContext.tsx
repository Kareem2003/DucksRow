import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Toast, ToastType, ToastOptions } from '../components/ui/Toast';

interface ToastContextType {
    showToast: (message: string, type?: ToastType, options?: ToastOptions) => void;
    hideToast: () => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [toast, setToast] = useState<{ message: string; type: ToastType; options?: ToastOptions } | null>(null);

    const showToast = (message: string, type: ToastType = 'info', options?: ToastOptions) => {
        setToast({ message, type, options });
    };

    const hideToast = () => {
        setToast(null);
    };

    return (
        <ToastContext.Provider value={{ showToast, hideToast }}>
            {children}
            {toast && (
                <Toast
                    key={Date.now()} // Force re-render on new toast
                    message={toast.message}
                    type={toast.type}
                    options={toast.options}
                    onDismiss={hideToast}
                />
            )}
        </ToastContext.Provider>
    );
};

export const useToast = () => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error('useToast must be used within a ToastProvider');
    }
    return context;
};
