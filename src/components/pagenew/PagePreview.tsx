import React from 'react'
import TextHeading from '../ui/textheader/TextHeader'
import { FaCode } from "react-icons/fa";
import { IoMdEye } from "react-icons/io";

function PagePreview({ onBack }: { onBack: () => void }) {
    return (
        <div className='border-2 border-gray-100 dark:border-gray-700 rounded-t-2xl shadow-sm space-y-4'>
            <div className='border-b-2 bg-gray-200 rounded-t-2xl border-gray-200 dark:border-gray-700 dark:bg-gray-800 w-full'>
                <TextHeading title="Preview Page" icon2={<FaCode className="text-red-500 border-2 border-blue-500 rounded-sm p-0.5" />} icon={<IoMdEye className="text-red-500 border-2 border-blue-500 rounded-sm p-0.5" />} />
            </div>
            <div className='p-4 dark:text-gray-400'>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quibusdam atque voluptates sit perferendis nulla adipisci iure consequuntur beatae, in consequatur soluta eaque quos, fuga dolorem esse commodi, libero quasi nam!
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat expedita odit suscipit! Ipsum sapiente totam beatae, odit, saepe quis soluta explicabo modi dolore, veniam nemo aliquid blanditiis rem provident aut!
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid alias molestiae ipsam reprehenderit aut labore perspiciatis at aperiam odit eligendi voluptatibus totam soluta facere omnis, nulla quo exercitationem magni voluptatem!
            </div>
            <button
                onClick={onBack}
                className="mt-4 m-8 px-8 py-2 bg-gray-600 text-white rounded"
            >
                Back
            </button>
        </div>
    )
}

export default PagePreview