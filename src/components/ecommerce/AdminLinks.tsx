import Link from "next/link";
import {
    GridIcon,
    CalenderIcon,
    UserCircleIcon,
    StudentIcon,
    GroupIcon,
    BoxCubeIcon,
    ListIcon,
    DollarLineIcon,
    FolderIcon,
    PageIcon,
    MailIcon,
} from "@/icons";


const adminLinks = [
    { name: "Profile", path: "/admin/profile", icon: <UserCircleIcon /> },
    { name: "Customers", path: "/admin/customers", icon: <PageIcon /> },
    { name: "Calendar", path: "/admin/calendar", icon: <CalenderIcon /> },
    { name: "Email Templates", path: "/admin/email-templates", icon: <MailIcon /> },
    { name: "Student", path: "/admin/student", icon: <StudentIcon /> },
    { name: "Recepient", path: "/admin/recepient", icon: <GroupIcon /> },
    { name: "Vendor Item", path: "/admin/vendoritem", icon: <BoxCubeIcon /> },
    { name: "Vendor Staff", path: "/admin/vendorstaff", icon: <GroupIcon /> },
    { name: "Invoice", path: "/admin/invoice", icon: <ListIcon /> },
    { name: "Media Library", path: "/admin/folder", icon: <FolderIcon /> },
    { name: "Templates", path: "/admin/templates", icon: <FolderIcon /> },
    { name: "HeaderFooter", path: "/admin/headerfooter", icon: <PageIcon /> },
    { name: "Pages", path: "/admin/pages", icon: <PageIcon /> },
];



export default function AdminLinks() {
    return (
        <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03]">
            {/* Header */}
            <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Admin Links
                </h3>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    Quick shortcuts to manage your application
                </p>
            </div>

            {/* Cards */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {adminLinks.map((item) => (
                    <Link
                        key={item.name}
                        href={item.path}
                        className="group relative overflow-hidden rounded-xl border border-gray-200 bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-gray-800 dark:bg-gray-900"
                    >
                        {/* Gradient glow */}
                        <div className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-gradient-to-br from-brand-500/10 via-transparent to-transparent" />

                        <div className="relative flex items-center gap-4">
                            {/* Icon */}
                            <div
                                className="
           flex h-11 w-11 items-center justify-center
            rounded-lg
    bg-gray-100
    text-[#6284FF]
    transition-colors
    group-hover:bg-gray-200
    dark:bg-gray-800
    dark:text-brand-400
    dark:group-hover:bg-gray-700
    [&_svg]:h-5
    [&_svg]:w-5
    [&_svg]:stroke-current
    [&_svg]:fill-current
  "
                            >
                                {item.icon}
                            </div>


                            {/* Text */}
                            <div className="flex flex-1 flex-col">
                                <span className="text-sm font-semibold text-gray-800 dark:text-white">
                                    {item.name}
                                </span>
                                <span className="text-xs text-gray-500 dark:text-gray-400">
                                    Open {item.name.toLowerCase()}
                                </span>
                            </div>

                            {/* Arrow */}
                            <span
                                className="
    text-gray-400
    transition-transform
    duration-300
    ease-out
    group-hover:translate-x-1.5
  "
                            >
                                →
                            </span>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
