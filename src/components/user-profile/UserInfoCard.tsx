"use client";
import React, { useState, useEffect } from "react";
import { useModal } from "../../hooks/useModal";
import { Modal } from "../ui/modal";
import Button from "../ui/button/Button";
import Input from "../form/input/InputField";
import Label from "../form/Label";
import { apiUrl } from "@/utils/config";


export default function UserInfoCard() {



  const { isOpen, openModal, closeModal } = useModal();
  const [staff, setStaff] = useState<any>(null);
  const [formData, setFormData] = useState<any>({});
  const [isSaving, setIsSaving] = useState(false);

  // Initial load from localStorage
  useEffect(() => {
    const staffDataString = localStorage.getItem("staffData");
    if (staffDataString) {
      const parsedData = JSON.parse(staffDataString);
      const staffInfo = parsedData?.data?.[0]?.attributes || {};
      setStaff(staffInfo);
      setFormData(staffInfo);
    }
  }, []);

  const handleOpenModal = () => {
    if (staff) setFormData(staff);
    openModal();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      setIsSaving(true);

      const staffDataString = localStorage.getItem("staffData");
      const staffData = staffDataString ? JSON.parse(staffDataString) : null;
      const jwt = localStorage.getItem("jwt");
      const vendorid = staffData?.data?.[0]?.id;
      console.log("Vendor ID:", vendorid);

      if (!vendorid || !jwt) {
        console.error("Vendor ID or JWT missing");
        return;
      }

      const res = await fetch(`${apiUrl}/api/vendors/${vendorid}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt}`,
        },
        body: JSON.stringify({ data: formData }),
      });

      if (!res.ok) throw new Error("Failed to update vendor");

      const updated = await res.json();
      const updatedAttributes = updated?.data?.attributes || {};

      setStaff(updatedAttributes);
      setFormData(updatedAttributes);

      // Update localStorage
      const updatedLocal = {
        ...staffData,
        data: [{ ...staffData.data[0], attributes: updatedAttributes }],
      };
      localStorage.setItem("staffData", JSON.stringify(updatedLocal));

      closeModal();
    } catch (err) {
      console.error("Update error:", err);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <h4 className="text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-6">
            Personal Information
          </h4>
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-7 2xl:gap-x-32">
            <div>
              <p className="mb-2 text-xs text-gray-500 dark:text-gray-400">Name</p>
              <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                {staff?.ownerName || "User name"}
              </p>
            </div>
            <div>
              <p className="mb-2 text-xs text-gray-500 dark:text-gray-400">Email</p>
              <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                {staff?.email || "user@email.com"}
              </p>
            </div>
            <div>
              <p className="mb-2 text-xs text-gray-500 dark:text-gray-400">Phone</p>
              <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                {staff?.phone || "0000000000"}
              </p>
            </div>
            <div>
              <p className="mb-2 text-xs text-gray-500 dark:text-gray-400">Bio</p>
              <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                {staff?.details || "Bio"}
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={handleOpenModal}
          className="flex w-full items-center justify-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200 lg:inline-flex lg:w-auto"
        >
          <svg
            className="fill-current"
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M15.0911 2.78206C14.2125 1.90338 12.7878 1.90338 11.9092 2.78206L4.57524 10.116C4.26682 10.4244 4.0547 10.8158 3.96468 11.2426L3.31231 14.3352C3.25997 14.5833 3.33653 14.841 3.51583 15.0203C3.69512 15.1996 3.95286 15.2761 4.20096 15.2238L7.29355 14.5714C7.72031 14.4814 8.11172 14.2693 8.42013 13.9609L15.7541 6.62695C16.6327 5.74827 16.6327 4.32365 15.7541 3.44497L15.0911 2.78206ZM12.9698 3.84272C13.2627 3.54982 13.7376 3.54982 14.0305 3.84272L14.6934 4.50563C14.9863 4.79852 14.9863 5.2734 14.6934 5.56629L14.044 6.21573L12.3204 4.49215L12.9698 3.84272ZM11.2597 5.55281L5.6359 11.1766C5.53309 11.2794 5.46238 11.4099 5.43238 11.5522L5.01758 13.5185L6.98394 13.1037C7.1262 13.0737 7.25666 13.003 7.35947 12.9002L12.9833 7.27639L11.2597 5.55281Z"
              fill=""
            />
          </svg>
          Edit
        </button>
      </div>

      <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[700px] m-4">
        <div className="relative w-full max-w-[700px] rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
          <form className="flex flex-col">
            <div className="h-[450px] overflow-y-auto px-2 pb-3">
              <h5 className="mb-5 text-lg font-medium text-gray-800 dark:text-white/90">
                Personal Information
              </h5>
              <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">

                <div>
                  <Label>First Name</Label>
                  <input
                    name="ownerName"
                    type="text"
                    value={formData.ownerName || ""}
                    className="w-full border-2 bg-gray-100 rounded-xl p-2 mb-3"
                    onChange={(e) => setFormData({ ...formData, ownerName: e.target.value })}
                  />
                </div>

                <div>
                  <Label>Email</Label>
                  <input
                    name="email"
                    type="text"
                    value={formData.email || ""}
                    className="w-full border-2 cursor-not-allowed bg-gray-100 rounded-xl p-2 mb-3"
                    disabled
                    readOnly
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>

                <div>
                  <Label>Phone</Label>
                  <input
                    name="phone"
                    type="text"
                    value={formData.phone || ""}
                    className="w-full border-2 bg-gray-100 rounded-xl p-2 mb-3"
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>

                <div className="col-span-2">
                  <Label>Bio</Label>
                  <textarea
                    name="details"
                    value={formData.details || ""}
                    className="w-full border-2 bg-gray-100 rounded-xl p-2 mb-3"
                    onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                  />
                </div>

              </div>
            </div>

            <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
              <Button size="sm" variant="outline" onClick={closeModal}>
                Close
              </Button>
              <Button size="sm" variant="outline" onClick={handleSave} disabled={isSaving}>
                {isSaving ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
}
