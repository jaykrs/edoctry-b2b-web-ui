"use client";

import React, { useEffect, useState } from "react";
import { apiUrl } from "@/utils/config";

interface StudentConcessionProps {
  onNext?: (data?: any) => void;
  onBack?: () => void;
  data?: any;
}

interface Student {
  lastName: string | undefined;
  firstName: string | undefined;
  id: number;
  name?: string;
  attributes?: {
    name?: string;
    firstName?: string;
    lastName?: string;
  };
}

interface FeeHead {
  id: number;
  name?: string;
  attributes?: {
    name?: string;
  };
}

export default function StudentConcession({
  onNext,
  onBack,
  data,
}: StudentConcessionProps) {
  const [name, setName] = useState("");
  const [student, setStudent] = useState("");
  const [applicableHead, setApplicableHead] =
    useState("");
  const [discountType, setDiscountType] =
    useState("PERCENTAGE");
  const [discountValue, setDiscountValue] =
    useState("");
  const [validUntil, setValidUntil] =
    useState("");

  const [students, setStudents] = useState<Student[]>(
    []
  );

  const [feeHeads, setFeeHeads] = useState<FeeHead[]>(
    []
  );

  const [vendoruuid, setVendoruuid] = useState("");

  const [loadingStudents, setLoadingStudents] =
    useState(false);
  const [loadingFeeHeads, setLoadingFeeHeads] =
    useState(false);
  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  /*
   * --------------------------------------------------
   * GET VENDOR UUID
   * --------------------------------------------------
   */
  const getVendorUuid = () => {
    try {
      const staffData =
        localStorage.getItem("staffData");

      if (!staffData) return "";

      const parsed = JSON.parse(staffData);

      const uuid =
        parsed?.data?.[0]?.attributes?.vendoruuid ||
        parsed?.data?.attributes?.vendoruuid ||
        parsed?.attributes?.vendoruuid ||
        parsed?.vendoruuid ||
        "";

      return typeof uuid === "string"
        ? uuid.trim()
        : "";
    } catch (err) {
      console.error(
        "Vendor UUID Error:",
        err
      );

      return "";
    }
  };

  /*
   * --------------------------------------------------
   * INITIAL DATA
   * --------------------------------------------------
   */
  useEffect(() => {
    if (!data) return;

    const attrs =
      data?.attributes || data;

    setName(attrs?.name || "");

    const studentId =
      attrs?.student?.data?.id ||
      attrs?.student?.id ||
      attrs?.student ||
      "";

    const headId =
      attrs?.applicable_head?.data?.id ||
      attrs?.applicable_head?.id ||
      attrs?.applicable_head ||
      "";

    setStudent(
      studentId ? String(studentId) : ""
    );

    setApplicableHead(
      headId ? String(headId) : ""
    );

    setDiscountType(
      attrs?.discountType ||
        "PERCENTAGE"
    );

    if (
      attrs?.discountValue !== undefined &&
      attrs?.discountValue !== null
    ) {
      setDiscountValue(
        String(attrs.discountValue)
      );
    }

    if (attrs?.validUntil) {
      setValidUntil(
        String(attrs.validUntil).slice(
          0,
          10
        )
      );
    }
  }, [data]);

  /*
   * --------------------------------------------------
   * VENDOR UUID
   * --------------------------------------------------
   */
  useEffect(() => {
    const uuid = getVendorUuid();

    if (uuid) {
      setVendoruuid(uuid);
    }
  }, []);

  /*
   * --------------------------------------------------
   * LOAD STUDENTS
   * --------------------------------------------------
   */
  useEffect(() => {
    if (!vendoruuid) return;

    fetchStudents();
    fetchFeeHeads();
  }, [vendoruuid]);

  const fetchStudents = async () => {
    try {
      setLoadingStudents(true);

      const token =
        localStorage.getItem("jwt");

      const url =
        `${apiUrl}/api/students` +
        `?filters[vendoruuid][$eq]=${encodeURIComponent(
          vendoruuid
        )}` +
        `&sort=createdAt:desc`;

      const response = await fetch(url, {
        method: "GET",
        headers: {
          Accept: "application/json",

          ...(token
            ? {
                Authorization: `Bearer ${token}`,
              }
            : {}),
        },
      });

      const result = await response
        .json()
        .catch(() => null);

      if (!response.ok) {
        throw new Error(
          result?.error?.message ||
            `HTTP Error: ${response.status}`
        );
      }

      const formattedStudents =
        (result?.data || []).map(
          (item: any) => ({
            id: item?.id,
            ...(item?.attributes || {}),
            attributes:
              item?.attributes || {},
          })
        );

      setStudents(
        formattedStudents
      );
    } catch (err) {
      console.error(
        "Students Fetch Error:",
        err
      );

      setStudents([]);
    } finally {
      setLoadingStudents(false);
    }
  };

  /*
   * --------------------------------------------------
   * LOAD FEE HEADS
   * --------------------------------------------------
   */
  const fetchFeeHeads = async () => {
    try {
      setLoadingFeeHeads(true);

      const token =
        localStorage.getItem("jwt");

      const url =
        `${apiUrl}/api/fee-heads` +
        `?filters[vendoruuid][$eq]=${encodeURIComponent(
          vendoruuid
        )}` +
        `&sort=createdAt:desc`;

      const response = await fetch(url, {
        method: "GET",
        headers: {
          Accept: "application/json",

          ...(token
            ? {
                Authorization: `Bearer ${token}`,
              }
            : {}),
        },
      });

      const result = await response
        .json()
        .catch(() => null);

      if (!response.ok) {
        throw new Error(
          result?.error?.message ||
            `HTTP Error: ${response.status}`
        );
      }

      const formattedFeeHeads =
        (result?.data || []).map(
          (item: any) => ({
            id: item?.id,
            ...(item?.attributes || {}),
            attributes:
              item?.attributes || {},
          })
        );

      setFeeHeads(
        formattedFeeHeads
      );
    } catch (err) {
      console.error(
        "Fee Heads Fetch Error:",
        err
      );

      setFeeHeads([]);
    } finally {
      setLoadingFeeHeads(false);
    }
  };

  /*
   * --------------------------------------------------
   * SKIP CONCESSION
   * --------------------------------------------------
   */
  const handleSkip = () => {
    setError("");
    setSuccess("");

    if (typeof onNext === "function") {
      onNext(null);
    }
  };

  /*
   * --------------------------------------------------
   * SAVE CONCESSION
   * --------------------------------------------------
   */
  const handleSubmit = async (
    event: React.FormEvent
  ) => {
    event.preventDefault();

    try {
      setError("");
      setSuccess("");

      if (!student) {
        setError(
          "Please select a Student."
        );
        return;
      }

      if (!applicableHead) {
        setError(
          "Please select a Fee Head."
        );
        return;
      }

      if (!discountValue) {
        setError(
          "Please enter Discount Value."
        );
        return;
      }

      const numericDiscount =
        Number(discountValue);

      if (
        Number.isNaN(numericDiscount) ||
        numericDiscount <= 0
      ) {
        setError(
          "Please enter a valid Discount Value."
        );
        return;
      }

      if (
        discountType === "PERCENTAGE" &&
        numericDiscount > 100
      ) {
        setError(
          "Percentage discount cannot be more than 100."
        );
        return;
      }

      if (!vendoruuid) {
        setError(
          "Vendor UUID not found. Please login again."
        );
        return;
      }

      setSaving(true);

      const token =
        localStorage.getItem("jwt");

      const payload = {
        name: name.trim() || "Student Concession",

        discountType,

        discountValue:
          numericDiscount,

        validUntil:
          validUntil || undefined,

        student:
          Number(student),

        applicable_head:
          Number(applicableHead),

        vendoruuid:
          vendoruuid.trim(),
      };

      const concessionId =
        data?.id ||
        data?.data?.id;

      const isEdit =
        Boolean(concessionId);

      const url = isEdit
        ? `${apiUrl}/api/student-concessions/${concessionId}`
        : `${apiUrl}/api/student-concessions`;

      const response = await fetch(url, {
        method: isEdit ? "PUT" : "POST",

        headers: {
          "Content-Type":
            "application/json",

          Accept: "application/json",

          ...(token
            ? {
                Authorization: `Bearer ${token}`,
              }
            : {}),
        },

        body: JSON.stringify({
          data: payload,
        }),
      });

      const result = await response
        .json()
        .catch(() => null);

      if (!response.ok) {
        throw new Error(
          result?.error?.message ||
            `HTTP Error: ${response.status}`
        );
      }

      setSuccess(
        isEdit
          ? "Concession updated successfully."
          : "Concession created successfully."
      );

      const nextData = {
        ...(result?.data || {}),
      };

      if (typeof onNext === "function") {
        onNext(nextData);
      }
    } catch (err) {
      console.error(
        "Concession Save Error:",
        err
      );

      setError(
        err instanceof Error
          ? err.message
          : "Failed to save concession."
      );
    } finally {
      setSaving(false);
    }
  };

  /*
   * --------------------------------------------------
   * BACK
   * --------------------------------------------------
   */
  const handleBack = () => {
    if (typeof onBack === "function") {
      onBack();
    }
  };

  /*
   * --------------------------------------------------
   * STUDENT NAME
   * --------------------------------------------------
   */
  const getStudentName = (
    item: Student
  ) => {
    if (item?.name) {
      return item.name;
    }

    const firstName =
      item?.firstName ||
      item?.attributes?.firstName ||
      "";

    const lastName =
      item?.lastName ||
      item?.attributes?.lastName ||
      "";

    const fullName =
      `${firstName} ${lastName}`.trim();

    return (
      fullName ||
      `Student #${item.id}`
    );
  };

  /*
   * --------------------------------------------------
   * UI
   * --------------------------------------------------
   */
  return (
    <div className="w-full">
      <div className="mx-auto max-w-4xl">

        {/* Header */}
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
            Student Concession
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Add a concession for the student,
            or skip this step if there is no
            concession.
          </p>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        )}

        {/* Success */}
        {success && (
          <div className="mb-5 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
            {success}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800"
        >

          {/* Name */}
          <div className="mb-5">
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-200">
              Concession Name
            </label>

            <input
              type="text"
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
              placeholder="Example: Scholarship"
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            />
          </div>

          {/* Student */}
          <div className="mb-5">
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-200">
              Student
              <span className="ml-1 text-red-500">
                *
              </span>
            </label>

            <select
              value={student}
              onChange={(e) =>
                setStudent(e.target.value)
              }
              disabled={loadingStudents}
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 disabled:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            >
              <option value="">
                {loadingStudents
                  ? "Loading Students..."
                  : students.length === 0
                  ? "No Students Found"
                  : "Select Student"}
              </option>

              {students.map(
                (item) => (
                  <option
                    key={item.id}
                    value={item.id}
                  >
                    {getStudentName(item)}
                  </option>
                )
              )}
            </select>
          </div>

          {/* Fee Head */}
          <div className="mb-5">
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-200">
              Applicable Fee Head
              <span className="ml-1 text-red-500">
                *
              </span>
            </label>

            <select
              value={applicableHead}
              onChange={(e) =>
                setApplicableHead(
                  e.target.value
                )
              }
              disabled={loadingFeeHeads}
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 disabled:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            >
              <option value="">
                {loadingFeeHeads
                  ? "Loading Fee Heads..."
                  : feeHeads.length === 0
                  ? "No Fee Heads Found"
                  : "Select Fee Head"}
              </option>

              {feeHeads.map(
                (item) => (
                  <option
                    key={item.id}
                    value={item.id}
                  >
                    {item.name ||
                      item?.attributes?.name ||
                      `Fee Head #${item.id}`}
                  </option>
                )
              )}
            </select>
          </div>

          {/* Discount Type */}
          <div className="mb-5">
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-200">
              Discount Type
            </label>

            <select
              value={discountType}
              onChange={(e) =>
                setDiscountType(
                  e.target.value
                )
              }
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            >
              <option value="PERCENTAGE">
                Percentage
              </option>

              <option value="FLAT_AMOUNT">
                Flat Amount
              </option>
            </select>
          </div>

          {/* Discount Value */}
          <div className="mb-5">
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-200">
              Discount Value
              <span className="ml-1 text-red-500">
                *
              </span>
            </label>

            <input
              type="number"
              min="0"
              step="0.01"
              value={discountValue}
              onChange={(e) =>
                setDiscountValue(
                  e.target.value
                )
              }
              placeholder={
                discountType ===
                "PERCENTAGE"
                  ? "Example: 10"
                  : "Example: 1000"
              }
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            />

            <p className="mt-1 text-xs text-gray-500">
              {discountType ===
              "PERCENTAGE"
                ? "Enter percentage between 0 and 100."
                : "Enter fixed discount amount."}
            </p>
          </div>

          {/* Valid Until */}
          <div className="mb-6">
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-200">
              Valid Until
            </label>

            <input
              type="date"
              value={validUntil}
              onChange={(e) =>
                setValidUntil(
                  e.target.value
                )
              }
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            />
          </div>

          {/* Buttons */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-gray-200 pt-5 dark:border-gray-700">

            <button
              type="button"
              onClick={handleBack}
              className="rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-700"
            >
              Back
            </button>

            <div className="flex gap-3">

              {/* Skip */}
              <button
                type="button"
                onClick={handleSkip}
                disabled={saving}
                className="rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-700"
              >
                Skip Concession
              </button>

              {/* Save */}
              <button
                type="submit"
                disabled={saving}
                className="rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {saving
                  ? "Saving..."
                  : data
                  ? "Update & Next"
                  : "Save & Next"}
              </button>

            </div>
          </div>
        </form>
      </div>
    </div>
  );
}