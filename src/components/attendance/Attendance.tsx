"use client";
import React, { useState, useEffect } from "react";
import { apiUrl } from "@/utils/config";
import Button from "../ui/button/Button";
import HoverPopover from "../ui/popupbutton/HoverPopover";

function Attendance() {
    const currentMonth = new Date().toISOString().slice(0, 7);
    const [showQRPopup, setShowQRPopup] = useState(false);
    const [showSummary, setShowSummary] = useState(false);
    const [students, setStudents] = useState<any[]>([]);
    const [selectedStudent, setSelectedStudent] = useState("");
    const [selectedMonth, setSelectedMonth] = useState(currentMonth);
    const [attendanceData, setAttendanceData] = useState<any[]>([]);
    const [presentCount, setPresentCount] = useState(0);
    const [absentCount, setAbsentCount] = useState(0);
    const [totalDays, setTotalDays] = useState(0);
    const handleGetAttendance = async () => {

        if (!selectedStudent || !selectedMonth) {
            alert("Please select student and month");
            return;
        }

        try {

            const jwt = localStorage.getItem("jwt");

            const res = await fetch(
                `${apiUrl}/api/students/${selectedStudent}`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${jwt}`,
                    },
                }
            );

            const data = await res.json();
            const attendance = data?.data?.attributes?.attandance || [];
            setAttendanceData(attendance);

            const [year, month] = selectedMonth.split("-");

            const daysInMonth = new Date(Number(year), Number(month), 0).getDate();

            const today = new Date();
            const currentYear = today.getFullYear();
            const currentMonth = today.getMonth() + 1;
            const todayDate = today.getDate();

            let present = 0;
            let absent = 0;
            let total = 0;

            let endDay = daysInMonth;

            if (
                Number(year) === currentYear &&
                Number(month) === currentMonth
            ) {
                endDay = todayDate;
            }

            for (let d = 1; d <= endDay; d++) {

                const date = `${year}-${month}-${String(d).padStart(2, "0")}`;

                const dayIndex = new Date(
                    Number(year),
                    Number(month) - 1,
                    d
                ).getDay();

                // Sunday skip
                if (dayIndex === 0) continue;

                total++;

                const record = attendance.find((a: any) =>
                    a.date.slice(0, 10) === date
                );

                if (record) present++;
                else absent++;
            }

            setPresentCount(present);
            setAbsentCount(absent);
            setTotalDays(total);

            setShowSummary(true);

        } catch (error) {
            console.log("Attendance fetch error", error);
        }

    };

    const fetchStudentList = async () => {
        try {

            const staffDataString = localStorage.getItem("staffData");
            const staffData = staffDataString ? JSON.parse(staffDataString) : null;

            const jwt = localStorage.getItem("jwt");
            const vendorid = staffData?.data?.[0]?.attributes?.vendoruuid;

            if (vendorid && jwt) {

                const res = await fetch(
                    `${apiUrl}/api/students?filters[vendoruuid][$eq]=${vendorid}&pagination[pageSize]=100`,
                    {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${jwt}`,
                        },
                    }
                );

                const data = await res.json();

                setStudents(data.data);
            }

        } catch (error) {
            console.log("Student fetch error", error);
        }
    };

    useEffect(() => {
        fetchStudentList();
    }, []);

    const daysInMonth = selectedMonth
        ? new Date(
            Number(selectedMonth.split("-")[0]),
            Number(selectedMonth.split("-")[1]),
            0
        ).getDate()
        : 0;

    return (
        <div className="w-full p-6 bg-gray-50 min-h-screen">

            <div className="max-w-6xl mx-auto space-y-6">

                {/* Filter Card */}
                <div className="bg-white border border-gray-200 rounded-2xl shadow-md p-6">
                    <div className="flex justify-between items-center mb-6">

                        <h2 className="text-lg font-semibold text-gray-700">
                            Student Attendance
                        </h2>

                        <HoverPopover
                            title="Add Attendance"
                            content="Click to open QR code for student attendance scan"
                            buttonText="+"
                            onClick={() => setShowQRPopup(true)}
                        />

                    </div>

                    <div className="grid md:grid-cols-3 gap-6 items-end">

                        {/* Student */}
                        <div>
                            <label className="text-sm font-medium text-gray-600 mb-2 block">
                                Select Student
                            </label>

                            <select
                                value={selectedStudent}
                                onChange={(e) => setSelectedStudent(e.target.value)}
                                className="w-full h-11 border border-gray-300 rounded-lg px-3"
                            >
                                <option value="">Select Student</option>

                                {students.map((student) => (
                                    <option key={student.id} value={student.id}>
                                        {student.attributes.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Month */}
                        <div>
                            <label className="text-sm font-medium text-gray-600 mb-2 block">
                                Select Month
                            </label>

                            <input
                                type="month"
                                value={selectedMonth}
                                onChange={(e) => setSelectedMonth(e.target.value)}
                                className="w-full h-11 border border-gray-300 rounded-lg px-3"
                            />
                        </div>

                        {/* Button */}
                        <div>
                            <button
                                onClick={handleGetAttendance}
                                className="w-full h-11 rounded-lg bg-[#1E40AF] hover:bg-[#1E40AF]/80 text-white font-medium shadow"
                            >
                                Get Attendance
                            </button>
                        </div>

                    </div>
                </div>

                {/* Calendar Section */}
                {showSummary && (
                    <div className="bg-white border border-gray-200 rounded-2xl shadow-md p-5">

                        {/* Header */}
                        <div className="flex justify-between items-center mb-5">

                            <h3 className="text-lg font-semibold text-gray-700">
                                Monthly Attendance
                            </h3>

                            <div className="flex gap-3">

                                <div className="flex items-center gap-2 bg-green-50 border border-green-200 px-3 py-1 rounded-md">
                                    <span className="text-green-600 font-semibold text-sm">
                                        {presentCount}
                                    </span>
                                    <span className="text-xs text-gray-600">Present</span>
                                </div>

                                <div className="flex items-center gap-2 bg-red-50 border border-red-200 px-3 py-1 rounded-md">
                                    <span className="text-red-600 font-semibold text-sm">
                                        {absentCount}
                                    </span>
                                    <span className="text-xs text-gray-600">Absent</span>
                                </div>

                                <div className="flex items-center gap-2 bg-gray-100 border border-gray-200 px-3 py-1 rounded-md">
                                    <span className="text-gray-800 font-semibold text-sm">
                                        {totalDays}
                                    </span>
                                    <span className="text-xs text-gray-600">Total</span>
                                </div>

                            </div>

                        </div>

                        {/* Calendar Grid */}
                        <div className="grid grid-cols-7 gap-2">

                            {Array.from({ length: daysInMonth }, (_, i) => {

                                const date = i + 1;

                                const [year, month] = selectedMonth.split("-");

                                const fullDate = `${year}-${month}-${String(date).padStart(2, "0")}`;

                                const dayIndex = new Date(
                                    Number(year),
                                    Number(month) - 1,
                                    date
                                ).getDay();

                                const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
                                const day = dayNames[dayIndex];

                                const isSunday = dayIndex === 0;

                                const record = attendanceData.find(
                                    (a: any) => a.date === fullDate
                                );

                                const status = isSunday
                                    ? "holiday"
                                    : record
                                        ? "present"
                                        : "absent";

                                const time = record?.time;

                                const bg =
                                    status === "present"
                                        ? "bg-green-50 border-green-200"
                                        : status === "absent"
                                            ? "bg-red-50 border-red-200"
                                            : "bg-yellow-50 border-yellow-200";

                                const text =
                                    status === "present"
                                        ? "text-green-600"
                                        : status === "absent"
                                            ? "text-red-600"
                                            : "text-yellow-600";

                                return (
                                    <div
                                        key={date}
                                        className={`rounded-lg border p-2 text-center text-xs ${bg}`}
                                    >

                                        <div className="text-base font-bold text-gray-800">
                                            {date}
                                        </div>

                                        {time && (
                                            <div className="text-[10px] text-gray-500">
                                                {time}
                                            </div>
                                        )}

                                        <div className="text-[10px] text-gray-400">
                                            {day}
                                        </div>

                                        <div className={`text-[10px] font-medium ${text}`}>
                                            {status === "holiday"
                                                ? "Holiday"
                                                : status === "present"
                                                    ? "Present"
                                                    : "Absent"}
                                        </div>

                                    </div>
                                );

                            })}

                        </div>

                    </div>
                )}
                {showQRPopup && (

                    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

                        <div className="bg-white rounded-xl shadow-lg p-6 w-[350px]">

                            <div className="flex justify-between items-center mb-4">

                                <h3 className="font-semibold text-gray-700">
                                    Scan QR for Attendance
                                </h3>

                                <button
                                    onClick={() => setShowQRPopup(false)}
                                    className="text-gray-500"
                                >
                                    ✕
                                </button>

                            </div>

                            {/* QR Image */}
                            <div className="flex justify-center">

                                <img
                                    src="https://edgeadmin.teqtoeducation.com/uploads/Attendance_1_bf7fc19529.png"
                                    alt="QR Code"
                                    className="w-60 h-60"
                                />

                            </div>

                        </div>

                    </div>

                )}

            </div>

        </div>
    );
}

export default Attendance;