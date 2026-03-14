"use client";
import CaptchaComponent from "@/components/captcha/Captchacomponent";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { apiUrl } from "@/utils/config";
export default function StudentAttendance() {
    const [captchaToken, setCaptchaToken] = useState<string | null>(null);
    const [showInstructions, setShowInstructions] = useState(false);
    const searchParams = useSearchParams();
    const vendoruuid = searchParams.get("vendoruuid");
    const [email, setEmail] = useState("");
    const [studentId, setStudentId] = useState("");
    const instituteName = "The Sakar Library";
    const logoUrl = "https://edgeadmin.teqtoeducation.com/uploads/Sakar_c5ea47ffaf.png";

    const [isCheckout, setIsCheckout] = useState(false);
    const handleSubmit = async (e: any) => {
        e.preventDefault();

        if (!captchaToken) {
            alert("Please verify captcha first");
            return;
        }

        try {
            const today = new Date().toISOString().split("T")[0];
            const currentTime = new Date().toLocaleTimeString("en-GB");

            // Fetch Student
            const res = await fetch(
                `${apiUrl}/api/students?filters[vendoruuid][$eq]=${vendoruuid}&filters[email][$eq]=${email}&filters[studentid][$eq]=${studentId}&fields=attandance&pagination[pageSize]=1`
            );

            const data = await res.json();

            if (!data.data.length) {
                alert("Student not found");
                return;
            }

            const student = data.data[0];
            let attendance = student.attributes.attandance || [];

            // AUTO CHECKOUT (previous day)
            if (attendance.length) {
                const last = attendance[attendance.length - 1];

                if (last.type === "checkin" && last.date !== today) {
                    attendance.push({
                        date: last.date,
                        time: "23:59:59",
                        type: "checkout"
                    });
                }
            }

            //  Today's records
            const todayCheckin = attendance.find(
                (a: any) => a.date === today && a.type === "checkin"
            );

            const todayCheckout = attendance.find(
                (a: any) => a.date === today && a.type === "checkout"
            );

            //CHECK-IN
            if (!isCheckout) {
                if (todayCheckin) {
                    alert("Already checked in today");
                    return;
                }

                attendance.push({
                    date: today,
                    time: currentTime,
                    type: "checkin"
                });
            }

            // CHECK-OUT
            if (isCheckout) {
                if (!todayCheckin) {
                    alert("You must check-in first");
                    return;
                }

                if (todayCheckout) {
                    alert("Already checked out today");
                    return;
                }

                attendance.push({
                    date: today,
                    time: currentTime,
                    type: "checkout"
                });
            }

            // Update API
            await fetch(`${apiUrl}/api/students/${student.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    data: {
                        attandance: attendance
                    }
                })
            });

            alert("Attendance recorded successfully");
            setEmail("");
            setStudentId("");
            setIsCheckout(false);
            setCaptchaToken(null);
        } catch (err) {
            console.error(err);
            alert("Error marking attendance");
        }
    };
    return (
        <div className="w-full min-h-screen bg-green-600">
            <div className="flex justify-center py-20 px-5">

                <div className="w-full sm:w-10/12 md:w-7/12 lg:w-5/12 flex mx-auto shadow rounded bg-gray-50">

                    <form className="mx-auto mt-3 p-10 w-full" onSubmit={handleSubmit}>
                        <h5 className="text-green-600 flex items-center gap-2 uppercase font-bold">
                            <img
                                src={logoUrl}
                                alt="logo"
                                className="w-16 h-16 object-contain"
                            />
                            {instituteName}
                        </h5>

                        <h3 className="text-2xl font-semibold uppercase mt-2">
                            Attendance
                        </h3>

                        <p className="text-gray-500">
                            Kindly submit your attendance using the form below.
                        </p>

                        <div className="mt-4">
                            <label className="block mb-1">
                                Email address <span className="text-red-600">*</span>
                            </label>

                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full border rounded px-3 py-2"
                                required
                            />
                        </div>

                        <div className="mt-4">
                            <label className="block mb-1">
                                Student ID <span className="text-red-600">*</span>
                            </label>

                            <input
                                type="text"
                                className="w-full border rounded px-3 py-2"
                                value={studentId}
                                onChange={(e) => setStudentId(e.target.value)}
                                required
                            />
                        </div>

                        {/* Checkbox */}
                        <div className="mt-4 flex items-center">
                            <input
                                type="checkbox"
                                className="mr-2"
                                checked={isCheckout}
                                onChange={(e) => setIsCheckout(e.target.checked)}
                            />
                            <label>Check me out</label>
                        </div>

                        <div className="text-sm text-gray-400 mt-1">
                            <span className="text-red-600">*</span>
                            Leave unchecked for Check-In. Check this if you are leaving (Check-Out).
                        </div>
                        <CaptchaComponent setCaptchaToken={setCaptchaToken} />                        {/* Button */}
                        <div className="mt-5 space-y-2">
                            <button
                                type="submit"
                                className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
                            >
                                {isCheckout ? "Continue with Check-Out" : "Continue with Check-In"}
                            </button>
                        </div>

                        <p className="mt-3">
                            Need help?{" "}
                            <span
                                onClick={() => setShowInstructions(true)}
                                className="text-blue-600 cursor-pointer "
                            >
                                View Instructions
                            </span>
                        </p>

                    </form>

                </div>
            </div>
            {showInstructions && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50 p-4">

                    <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6 relative animate-fadeIn">

                        {/* Close Icon */}
                        <button
                            onClick={() => setShowInstructions(false)}
                            className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 text-lg"
                        >
                            ✕
                        </button>

                        {/* Title */}
                        <h3 className="text-xl font-semibold text-gray-800 mb-4">
                            Attendance Instructions
                        </h3>

                        {/* Content */}
                        <ul className="text-sm text-gray-600 list-disc pl-5 space-y-2 leading-relaxed">
                            <li>Enter your registered email address.</li>
                            <li>
                                Enter your <span className="font-medium">Student ID</span> given by{" "}
                                <span className="text-green-700 font-semibold">{instituteName}</span>.
                            </li>
                            <li>Leave the checkbox unchecked for <b>Check-In</b>.</li>
                            <li>Tick the checkbox only if you are leaving (<b>Check-Out</b>).</li>
                            <li>Click the submit button to record your attendance.</li>
                        </ul>

                        {/* Button */}
                        <button
                            onClick={() => setShowInstructions(false)}
                            className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white py-2.5 rounded-lg font-medium transition"
                        >
                            Got it
                        </button>

                    </div>

                </div>
            )}
        </div>
    );
}