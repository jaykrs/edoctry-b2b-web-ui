'use client';

import React, { useEffect, useState, useRef } from 'react';
import grapesjs, { Editor } from 'grapesjs';
//import DefaultLayout from '@/components/Layouts/DefaultLayout';
import axios from 'axios';
import { ToastContainer } from 'react-toastify';
import { headers } from 'next/headers';
import toastComponent from '@/components/toastComponent';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { apiUrl } from '@/utils/config';

interface temProps {
    attributes: any;
    temName: string;
    temCode: string;
    userName: string;
    temID: string;
}

const GrapesEditor: React.FC = () => {
    const [templateHtml, setTemplateHtml] = useState("");
    const [temCode, setTemCode] = useState<temProps[]>([]);
    const [tempParams, setTempParams] = useState<string | '<body></body>'>('<body></body>');
    const editorRef = useRef<Editor | null>(null);
    const params = useSearchParams();
    const router = useRouter();


    const getTemplateList = async () => {
        const token = localStorage.getItem("accessToken");
        try {
            const response = await axios.get(`${apiUrl}/api/pages`, {
                //  headers: { Authorization: "Bearer " + token },
            });
            setTemCode(response.data.data);
        } catch (err) {
            console.log("Something went wrong fetching templates!");
        }
    };

    useEffect(() => {
        let temp = params.get('temp');
        setTempParams(temp ? temp : '<body></body>');

        editorRef.current = grapesjs.init({
            container: '#gjs',
            height: '100vh',
            fromElement: true,
            storageManager: false,
            selectorManager: {
                escapeName: (name: string) => `${name}`.trim().replace(/([^a-z0-9\w-:/]+)/gi, '-')
            },
            plugins: ['grapesjs-tailwind'],
            pluginsOpts: {
                'grapesjs-tailwind': {}
            },
            styleManager: {
                sectors: [{
                    name: 'General',
                    properties: [
                        { name: 'background-color', type: 'color' },
                    ]
                }]
            },
        });

      //  editorRef.current.BlockManager.getAll().reset();
      //  editorRef.current.BlockManager.getCategories().reset();

        editorRef.current.BlockManager.add('Text', {
            label: 'Text',
            category: 'Basic Block',
            content: {
                type: 'text',
                content: '<span>Editable text <a href="#">with link</a></span>',
                style: {
                    padding: '10px',
                    color: '#000',
                    'background-color': '#fff',
                },
            },
        });

        editorRef.current.DomComponents.addType('text', {
            extend: 'text',
            model: {
                defaults: {
                    traits: [
                        {
                            type: 'text',
                            name: 'href',
                            label: 'Link URL',
                        },
                    ],
                    stylable: ['color', 'background-color', 'font-size', 'text-decoration'],
                    editable: true,
                    droppable: true,
                    highlightable: true,
                    // 👇 This ensures inline links don't break behavior
                    components: '',
                    tagName: 'div',
                },
            },
        });

        editorRef.current.BlockManager.add('custom-image', {
            label: 'Image',
            category: 'Basic Block',
            content: {
                type: 'image',
                activeOnRender: 1,
                attributes: { alt: 'Custom Image', src: 'https://via.placeholder.com/150' },
            },
        });

        editorRef.current.BlockManager.add('custom-button', {
            label: 'Button',
            category: 'Basic Block',
            content: `
        <button class="bg-blue-500 text-white px-4 py-2 rounded">
            Click Me
        </button>
    `,
        });

        editorRef.current.BlockManager.add('custom-link', {
            label: 'Link',
            category: 'Basic Block',
            content: {
                type: 'link',
                content: 'Click me!',
                attributes: { href: '#', target: '_blank' },
                style: {
                    color: '#2563eb',
                    'text-decoration': 'underline',
                },
            },
        });

        editorRef.current.DomComponents.addType('link', {
            extend: 'link',
            model: {
                defaults: {
                    traits: ['href', 'target'],
                    stylable: ['color', 'font-size', 'text-decoration'],
                },
            },
        });

        const openModal = () => {
            if (editorRef.current)
                editorRef.current.Modal.open({
                    title: 'My title', // string | HTMLElement
                    content: 'My content', // string | HTMLElement
                });
        };
        // Create a simple custom button that will open the modal
        // document.body.insertAdjacentHTML('afterbegin', `
        //     <button onclick="openModal()">Open Modal</button>
        // `);
        const button = document.createElement('button');
        button.innerText = 'Open Modal';
        button.onclick = openModal;
        document.body.prepend(button);

        // Clean up the editor instance when the component unmounts
        return () => {
            if (editorRef.current) {
                editorRef.current.destroy();
            }
        };
    }, []);

    useEffect(() => {
        setHtmlContentInEditor(tempParams);
    }, [tempParams])

    useEffect(() => {
        if (temCode.length > 0 && editorRef.current) {

            temCode.forEach((el) => {
                // Only add blocks for the current user or admin
                if (editorRef.current) { // && (localStorage.getItem("username") === el.userName || localStorage.getItem("username") === "admin")
                    let content = el?.attributes?.page_html_body;
                    console.log('page code', content);
                    content = content.replace(/<!DOCTYPE[^>]*>/i, '');
                    content = content.replace(/<html[^>]*>([\s\S]*?)<\/html>/, '$1');
                    content = content.replace(/<head[^>]*>[\s\S]*?<\/head>/, '')
                    content = content.replace(/<body[^>]*>([\s\S]*?)<\/body>/, '$1');
                    content = content.replace(/\s+/g, ' ').trim();
                    editorRef.current.BlockManager.add(el.temName, {
                        label: el.temName,
                        category: 'Email Templates',
                        content: content,
                    });
                }
            });
        }
    }, [temCode]);

    const getTemplateHtml = async () => {
        if (editorRef.current) {
            const htmlContent = editorRef.current.getHtml();
            const cssContent = editorRef.current.getCss();
            let content = editorRef.current.getHtml();
            content = content.replace(/<!DOCTYPE[^>]*>/i, '');
            content = content.replace(/<html[^>]*>([\s\S]*?)<\/html>/, '$1');
            content = content.replace(/<head[^>]*>[\s\S]*?<\/head>/, '')
            content = content.replace(/<body[^>]*>([\s\S]*?)<\/body>/, '$1');
            content = content.replace(/\s+/g, ' ').trim();
            let template = `
            <!doctype html>
            <html>
            <head>
                <meta charset="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <script src="https://cdn.tailwindcss.com"></script>
                <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
                <style>
                ${cssContent}
                </style>
            </head>
            ` + htmlContent +
                `
            </html>
            `;
            setTemplateHtml(template);
            if (content !== "") {
                let templateName = prompt("Please enter mail template Name");
                await axios.post('/api/template', {
                    temName: templateName,
                    temCode: template,
                    userName: localStorage.getItem("username") ? localStorage.getItem("username") : ""
                }, {
                    headers: { Authorization: "Bearer " + localStorage.getItem("accessToken") }
                }).then(res => {
                    toastComponent({ Type: 'success', Message: res.data.message, Func: () => { } })
                })
            } else {
                toastComponent({ Type: 'success', Message: "Please add a template from block to save.", Func: () => { } })
            }
        }
    };

    // const clearEditor = () => {
    //     if (editorRef.current) {
    //         editorRef.current.setHtml()
    //     }
    // };

    const setHtmlContentInEditor = (html: string) => {
        if (editorRef.current) {
            html = html.replace(/<!DOCTYPE[^>]*>/i, '');
            html = html.replace(/<html[^>]*>([\s\S]*?)<\/html>/, '$1');
            html = html.replace(/<head[^>]*>[\s\S]*?<\/head>/, '')
            html = html.replace(/\s+/g, ' ').trim();
            editorRef.current.setComponents(html);
        }
    };

    useEffect(() => {
        getTemplateList();
    }, []);

    return (
        // <DefaultLayout>
        <div>
            <ToastContainer />
            <div className="w-full flex justify-end  gap-2.5" >
                <button onClick={getTemplateHtml} className="bg-blue-500 text-white py-1 px-4 my-1 rounded " >
                    Save
                </button>
                <button onClick={() => setHtmlContentInEditor('<body></body>')} className="bg-blue-500 text-white py-1 px-4 my-1 rounded " >
                    Clear
                </button>
            </div>
            <div>
                <div
                    id="gjs"
                    style={{ height: '100vh', width: '100%' }}
                >
                </div>
            </div>
        </div>
        // </DefaultLayout>
    );
};

export default GrapesEditor;