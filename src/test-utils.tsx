import React, { ReactElement } from 'react';
import { BrowserRouter } from 'react-router-dom';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import testingStuff, { render, RenderOptions } from '@testing-library/react';

export const HookProvider = ({ children }: { children: any }) => {
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                retry: false,
                cacheTime: Infinity,
            },
        },
        logger: {
            // eslint-disable-next-line no-console
            log: console.log,
            warn: console.warn,
            error: console.error,
        },
    });

    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    );
};

const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                retry: false,
            },
        },
    });

    return (
        <>
            <BrowserRouter basename="/spock-react">
                <QueryClientProvider client={queryClient}>
                    {children}
                </QueryClientProvider>
            </BrowserRouter>
        </>
    );
};

const customRender = (
    ui: ReactElement,
    options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { wrapper: AllTheProviders, ...options });

export { testingStuff as testing, customRender as render };
