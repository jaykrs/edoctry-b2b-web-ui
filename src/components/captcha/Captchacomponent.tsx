"use client";

import ReCAPTCHA from "react-google-recaptcha";
import { useState } from "react";

export default function CaptchaComponent({ setCaptchaToken }: any) {

    const [token, setToken] = useState<string | null>(null);

    const handleCaptcha = (value: string | null) => {
        setToken(value);
        setCaptchaToken(value);
    };

    return (
        <div className="w-full flex justify-center sm:justify-start overflow-hidden mt-2">
            <div className="transform scale-75 sm:scale-90 md:scale-100 origin-center md:origin-left">
                <ReCAPTCHA
                    sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
                    onChange={handleCaptcha}
                />
            </div>
        </div>
    );
}