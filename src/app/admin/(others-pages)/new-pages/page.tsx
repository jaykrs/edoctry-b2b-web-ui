'use client'

import ComponentCard from '@/components/common/ComponentCard';
import Input from '@/components/form/input/InputField';
import Label from '@/components/form/Label';
import Select from '@/components/form/Select';
import Button from '@/components/ui/button/Button';
import { BoxIcon, TimeIcon } from '@/icons';
import { apiUrl } from '@/utils/config';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
interface dataProps {
    attributes: attributes;
    id: string;
}
interface attributes {
    header_html_element: string;
    footer_html_element: string;
}
const page: React.FC = () => {
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [state, setState] = useState<dataProps[]>([]);
    useEffect(() => {
        axios.get(apiUrl + "/api/headerfooters", {
            headers: {
                Authorization: "Bearer " + localStorage.getItem('jwt')
            }
        }).then(res => {
            setState(res.data.data);
        }).catch(err => {
            console.log(err.message);
        })
    }, [])

    return (
        <>
            <h3>New Page</h3>
            <div className='w-fill flex justify-center pt-4 pb-8'>
                <div className='w-[500px] flex justify-evenly'>
                    <h2 className={step === 1 ? 'text-blue-400 border-b-2 border-blue-300' : ''}  >Page Details</h2>
                    <h2 className={step === 2 ? 'text-blue-400 border-b-2 border-blue-300' : ''} >Choose Header & Footer</h2>
                </div>
            </div>
            <ComponentCard
                title={step === 1 ? "Page Info" : step === 2 ? "Header" : "Footer"}
            >
                {step === 1 &&
                    <div className="space-y-5 sm:space-y-6">
                        {/* Error Input */}
                        <div>
                            <Label>Page Name</Label>
                            <Input
                                type="text"
                                // error={error}
                                // onChange={handleEmailChange}
                                placeholder="Enter page name"
                            //  hint={error ? "This is an invalid email address." : ""}
                            />
                        </div>

                        {/* Success Input */}
                        <div>
                            <Label>Page Path</Label>
                            <Input
                                type="text"
                                // success={!error}
                                // onChange={handleEmailChange}
                                placeholder="Enter page path"
                            //  hint={!error ? "Valid email!" : ""}
                            />
                        </div>
                        <div className="w-full flex justify-end">
                            <button className="bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600" onClick={() => setStep(2)} >
                                Next
                            </button>
                        </div>
                    </div>
                }
                {
                    step === 2 &&
                    <div className="space-y-5 sm:space-y-6">
                        <div>
                            <div className='w-full flex justify-end'>
                                <button className="bg-blue-500 text-white px-2 py-2 rounded hover:bg-blue-600">
                                    Select
                                </button>
                            </div>
                            {
                                state.length > 0 ? state.map((el, index) => {
                                    return (
                                        <div key={"header-" + index} className='h-[300px]'>
                                            <p dangerouslySetInnerHTML={{ __html: el?.attributes?.header_html_element }}></p>
                                            <p dangerouslySetInnerHTML={{ __html: el?.attributes?.footer_html_element }}></p>
                                        </div>
                                    )
                                }) : ""
                            }
                        </div>
                        <div className="w-full flex justify-between">
                            <button className="bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600" onClick={() => setStep(1)} >
                                Back
                            </button>
                            <button className="bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600" onClick={() => router.push('/admin/page')}>
                                Next
                            </button>
                        </div>
                    </div>
                }
            </ComponentCard>
        </>
    )
}

export default page