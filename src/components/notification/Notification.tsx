import React from 'react'
import TextHeading from '../ui/textheader/TextHeader'

function Notification() {
    return (
        <>
            <div className="border-b bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100 px-6 py-5 shadow-sm">
                <TextHeading
                    title="Notifications"
                    icon="🔔"
                />
            </div>
        </>
    )
}

export default Notification