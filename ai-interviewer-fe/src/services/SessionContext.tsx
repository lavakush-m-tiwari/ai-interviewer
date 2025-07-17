import React from 'react';

interface SessionContextProps {
    sessionId: string;
    setSessionId: (id: string) => void;
}


const SessionContext = React.createContext<SessionContextProps | undefined>(undefined);

export const SessionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [sessionId, setSessionId] = React.useState<string>('');

    return (
        <SessionContext.Provider value={{ sessionId, setSessionId }}>
            {children}
        </SessionContext.Provider>
    );
};


export const useSession = (): SessionContextProps => {
    const context = React.useContext(SessionContext);
    if (!context) {
        throw new Error('useSession must be used within a SessionProvider');
    }
    return context;
}