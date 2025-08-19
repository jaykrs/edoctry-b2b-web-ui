'use client';
import { useEffect, useRef } from 'react';
import 'grapesjs/dist/css/grapes.min.css';
import grapesjs from 'grapesjs';

const GrapeBuilder = () => {
    const editorRef = useRef(null);

    useEffect(() => {
        if (!editorRef.current) return;

        const editor = grapesjs.init({
            container: editorRef.current,
            fromElement: true,
            width: '100%',
            height: '600px',
            storageManager: false,
            panels: {
                defaults: [
                    {
                        id: 'basic-actions',
                        el: '.panel__basic-actions',
                        buttons: [
                            {
                                id: 'visibility',
                                active: true,
                                label: '👁️',
                                command: 'sw-visibility',
                            },
                        ],
                    },
                    {
                        id: 'panel-devices',
                        el: '.panel__devices',
                        buttons: [
                            {
                                id: 'set-device-desktop',
                                label: 'Desktop',
                                command: 'set-device-desktop',
                                active: true,
                            },
                            {
                                id: 'set-device-mobile',
                                label: 'Mobile',
                                command: 'set-device-mobile',
                            },
                        ],
                    },
                ],
            },
            blockManager: {
                appendTo: '#blocks',
                blocks: [
                    // Layout Blocks
                    { id: '1-column', label: '1 Column', content: '<div class="col-1">1 Column</div>', category: 'Layout' },
                    { id: '2-column', label: '2 Columns', content: '<div class="row"><div class="col-6">Column 1</div><div class="col-6">Column 2</div></div>', category: 'Layout' },
                    { id: '3-column', label: '3 Columns', content: '<div class="row"><div class="col-4">Column 1</div><div class="col-4">Column 2</div><div class="col-4">Column 3</div></div>', category: 'Layout' },
                    { id: 'section', label: 'Section', content: '<section class="section">Section</section>', category: 'Layout' },
                    { id: 'divider', label: 'Divider', content: '<hr>', category: 'Layout' },
                    
                    // Typography
                    { id: 'h1', label: 'H1', content: '<h1>Heading 1</h1>', category: 'Typography' },
                    { id: 'h2', label: 'H2', content: '<h2>Heading 2</h2>', category: 'Typography' },
                    { id: 'h3', label: 'H3', content: '<h3>Heading 3</h3>', category: 'Typography' },
                    { id: 'h4', label: 'H4', content: '<h4>Heading 4</h4>', category: 'Typography' },
                    { id: 'h5', label: 'H5', content: '<h5>Heading 5</h5>', category: 'Typography' },
                    { id: 'h6', label: 'H6', content: '<h6>Heading 6</h6>', category: 'Typography' },
                    { id: 'link', label: 'Link', content: '<a href="#">Link</a>', category: 'Typography' },
                    { id: 'link-box', label: 'Link Box', content: '<div class="link-box"><a href="#">Link Box</a></div>', category: 'Typography' },

                    // Media
                    { id: 'image', label: 'Image', content: '<img src="https://via.placeholder.com/150" alt="Image"/>', category: 'Media' },
                    { id: 'video', label: 'Video', content: '<video src="https://via.placeholder.com/150" controls></video>', category: 'Media' },
                    { id: 'map', label: 'Map', content: '<iframe src="https://maps.google.com/?output=embed" frameborder="0"></iframe>', category: 'Media' },

                    // Forms
                    { id: 'form', label: 'Form', content: '<form><input type="text" placeholder="Text"/><button>Submit</button></form>', category: 'Forms' },
                    { id: 'input', label: 'Input', content: '<input type="text" placeholder="Text">', category: 'Forms' },
                    { id: 'textarea', label: 'Textarea', content: '<textarea placeholder="Textarea"></textarea>', category: 'Forms' },
                    { id: 'select', label: 'Select', content: '<select><option>Option 1</option><option>Option 2</option></select>', category: 'Forms' },
                    { id: 'button', label: 'Button', content: '<button class="button">Button</button>', category: 'Forms' },
                    { id: 'checkbox', label: 'Checkbox', content: '<input type="checkbox"> Checkbox', category: 'Forms' },
                    { id: 'radio', label: 'Radio', content: '<input type="radio"> Radio', category: 'Forms' },

                    // Navbar
                    { id: 'navbar', label: 'Navbar', content: '<nav><ul><li><a href="#">Home</a></li><li><a href="#">About</a></li><li><a href="#">Contact</a></li></ul></nav>', category: 'Navigation' },
                ],
            },
        });

        // Cleanup editor instance on component unmount
        return () => editor.destroy();
    }, []);

    return (
        <div style={{ display: 'flex' }}>
            <div id="blocks" style={{ width: '250px', padding: '10px', background: '#f0f0f0', overflowY: "auto", maxHeight:"100vh" }}></div>
            <div ref={editorRef} style={{ flex: 1, border: '1px solid #ddd' }}></div>
        </div>
    );
};

export default GrapeBuilder;