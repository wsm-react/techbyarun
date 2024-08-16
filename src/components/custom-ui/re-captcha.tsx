"use client"

import { ReCaptchaProps } from '@/types/app-interface';
import React, { useEffect, useRef } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';


const ReCaptcha: React.FC<ReCaptchaProps> = ({ ...restProps }) => {
    const recaptchaRef = useRef<ReCAPTCHA>(null);

    const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY as string;

    useEffect(() => {
        if (recaptchaRef.current) {
            recaptchaRef.current.reset();
        }
    }, [recaptchaRef]);

    return (
        <ReCAPTCHA
            ref={recaptchaRef}
            sitekey={siteKey}
            {...restProps}
        />
    );
};

export default ReCaptcha;
