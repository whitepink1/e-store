'use client'
import { useEffect, useState } from 'react';
import { verifyPaymentMethodAction } from '../../actions/user';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

const page = () => {
    const searchParams = useSearchParams();
    const sessionId = searchParams.get('session_id');
    const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');

    useEffect(() => {
        const verify = async () => {
            if (!sessionId) {
                setStatus('error');
                return;
            }

            const result = await verifyPaymentMethodAction(sessionId);

            if (result.success) {
                setStatus('success');
            } else {
                setStatus('error');
            }
        };

        verify();
    }, [sessionId]);

    if (status === 'loading') {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
                <p className="text-lg font-medium text-gray-70">Verifying your payment, please wait...</p>
            </div>
        ); 
    }

    if (status === 'error') {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4 text-center px-4">
                <p className="text-2xl font-bold text-red-500">Something went wrong</p>
                <p className="text-gray-70 max-w-md">We couldn't verify your payment. If your money was deducted, please contact our support team.</p>
                <Link href="/checkout?step=Payment" className="mt-4 bg-black text-white px-6 py-3 rounded-xl font-medium">
                    Try Again
                </Link>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4 animate-in fade-in duration-500">
            <div className="h-20 w-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
                <span className="text-green-600 text-4xl">✓</span>
            </div>
            <h1 className="text-3xl font-bold leading-8 mb-2">Thank you for your order!</h1>
            <p className="text-base text-gray-70 max-w-md mb-8">
                Your payment was successful and your order is now being processed.
            </p>
            <div className="flex gap-4">
                <Link href="/profile?tab=order" className="border border-white-300 px-6 py-3 rounded-xl font-medium hover:bg-white-100 transition-colors">
                    View Orders
                </Link>
                <Link href="/catalog" className="bg-black text-white px-6 py-3 rounded-xl font-medium hover:opacity-90 transition-opacity">
                    Continue Shopping
                </Link>
            </div>
        </div>
    );
}

export default page