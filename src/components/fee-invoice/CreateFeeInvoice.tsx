"use client";

import React, { useEffect, useMemo, useState } from "react";

import { useRouter } from "next/navigation";

import { apiUrl } from "@/utils/config";

const DEFAULT_VENDOR_UUID = "8-gb-i-k0-fw9-r-zi-and-a-265qe-sw-1";

interface Student {
  id: number;
  attributes?: any;
  firstName?: string;
  lastName?: string;
  name?: string;
  course?: any;
}

interface FeeHead {
  id: number;
  attributes?: any;
}

interface StudentConcession {
  id: number;
  attributes?: any;
}

interface FeeStructureItem {
  id: number;
  attributes?: any;
  name?: string;
  amount?: number;
  mandatory?: boolean;
}

const cleanText = (value: any): string => {
  if (value === null || value === undefined) return "";

  return String(value)
    .replace(/\s+/g, " ")
    .trim();
};

const getHeaders = (): HeadersInit => {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (typeof window !== "undefined") {
    try {
      const staffData = JSON.parse(
        localStorage.getItem("staffData") || "{}"
      );

      const token =
        staffData?.jwt ||
        staffData?.token ||
        localStorage.getItem("jwt") ||
        localStorage.getItem("token");

      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }
    } catch {
      const token =
        localStorage.getItem("jwt") ||
        localStorage.getItem("token");

      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }
    }
  }

  return headers;
};

const getVendorUuid = (): string => {
  if (typeof window === "undefined") {
    return DEFAULT_VENDOR_UUID;
  }

  try {
    const staffData = JSON.parse(
      localStorage.getItem("staffData") || "{}"
    );

    const vendorUuid =
      staffData?.vendoruuid ||
      staffData?.vendorUuid ||
      staffData?.vendor?.vendoruuid ||
      staffData?.vendor?.uuid ||
      staffData?.data?.vendoruuid ||
      staffData?.user?.vendoruuid;

    return vendorUuid || DEFAULT_VENDOR_UUID;
  } catch {
    return DEFAULT_VENDOR_UUID;
  }
};

const getAttributes = (item: any) => {
  return item?.attributes || item || {};
};

const getStudentName = (student: Student | null): string => {
  if (!student) return "";

  const data = getAttributes(student);

  const firstName = cleanText(
    student.firstName || data.firstName || data.first_name
  );

  const lastName = cleanText(
    student.lastName || data.lastName || data.last_name
  );

  const fullName = cleanText(
    student.name ||
      data.name ||
      data.fullName ||
      data.full_name ||
      `${firstName} ${lastName}`
  );

  return fullName || `Student ${student.id}`;
};

/*
 * COURSE FIX
 *
 * This handles all common Strapi relation formats:
 *
 * 1. student.course.data.attributes.name
 * 2. student.attributes.course.data.attributes.name
 * 3. student.course.attributes.name
 * 4. student.course.name
 * 5. student.course.data.name
 * 6. student.course.title
 */
const getCourseName = (student: Student | null): string => {
  if (!student) return "";

  const studentData = student?.attributes || student;

  const courseRelation =
    studentData?.course ??
    student?.course ??
    null;

  if (!courseRelation) {
    return "";
  }

  // Strapi relation:
  // course = {
  //   data: {
  //     id: 1,
  //     attributes: {
  //       name: "B.Tech CSE"
  //     }
  //   }
  // }
  if (courseRelation?.data) {
    const courseData = courseRelation.data;

    if (courseData?.attributes?.name) {
      return cleanText(courseData.attributes.name);
    }

    if (courseData?.attributes?.title) {
      return cleanText(courseData.attributes.title);
    }

    if (courseData?.name) {
      return cleanText(courseData.name);
    }

    if (courseData?.title) {
      return cleanText(courseData.title);
    }
  }

  // Direct relation:
  // course = {
  //   id: 1,
  //   attributes: {
  //     name: "B.Tech CSE"
  //   }
  // }
  if (courseRelation?.attributes?.name) {
    return cleanText(courseRelation.attributes.name);
  }

  if (courseRelation?.attributes?.title) {
    return cleanText(courseRelation.attributes.title);
  }

  // Direct object:
  // course = {
  //   name: "B.Tech CSE"
  // }
  if (courseRelation?.name) {
    return cleanText(courseRelation.name);
  }

  if (courseRelation?.title) {
    return cleanText(courseRelation.title);
  }

  return "";
};

const getFeeHeadName = (feeHead: FeeHead | null): string => {
  if (!feeHead) return "";

  const data = getAttributes(feeHead);

  return cleanText(
    data?.name ||
      data?.title ||
      `Fee Head ${feeHead.id}`
  );
};

const getConcessionName = (
  concession: StudentConcession | null
): string => {
  if (!concession) return "";

  const data = getAttributes(concession);

  return cleanText(
    data?.name ||
      data?.title ||
      data?.concessionName ||
      data?.description ||
      `Concession ${concession.id}`
  );
};

const getRelationId = (relation: any): number | null => {
  if (!relation) return null;

  if (typeof relation === "number") {
    return relation;
  }

  if (relation?.id) {
    return Number(relation.id);
  }

  if (relation?.data?.id) {
    return Number(relation.data.id);
  }

  return null;
};

const getFeeStructureId = (
  feeHead: FeeHead | null
): number | null => {
  if (!feeHead) return null;

  const data = getAttributes(feeHead);

  return getRelationId(
    data?.fee_structure ||
      data?.feeStructure
  );
};

const getFeeItemName = (
  item: FeeStructureItem
): string => {
  const data = getAttributes(item);

  return cleanText(
    item.name ||
      data?.name ||
      data?.title ||
      `Fee Item ${item.id}`
  );
};

const getFeeItemAmount = (
  item: FeeStructureItem
): number => {
  const data = getAttributes(item);

  const amount = Number(
    item.amount ??
      data?.amount ??
      0
  );

  return Number.isFinite(amount) ? amount : 0;
};

const sanitizePart = (value: string): string => {
  return cleanText(value)
    .replace(/[\\/:*?"<>|]/g, "")
    .replace(/\s+/g, " ");
};

const getNextInvoiceNumber = async (
  vendorUuid: string,
  courseName: string,
  studentName: string
): Promise<string> => {
  const safeCourse =
    sanitizePart(courseName) || "Course";

  const safeStudent =
    sanitizePart(studentName) || "Student";

  try {
    const url =
      `${apiUrl}/api/fee-invoices` +
      `?filters[vendoruuid][$eq]=${encodeURIComponent(
        vendorUuid
      )}` +
      `&pagination[pageSize]=1000` +
      `&sort=createdAt:desc`;

    const response = await fetch(url, {
      method: "GET",
      headers: getHeaders(),
    });

    if (!response.ok) {
      return `INV - ${safeCourse} - ${safeStudent} - 001`;
    }

    const result = await response.json();

    const invoices = result?.data || [];

    const prefix =
      `INV - ${safeCourse} - ${safeStudent} - `;

    let maxNumber = 0;

    invoices.forEach((invoice: any) => {
      const data = getAttributes(invoice);

      const invoiceNumber = cleanText(
        data?.invoiceNumber
      );

      if (!invoiceNumber.startsWith(prefix)) {
        return;
      }

      const suffix = invoiceNumber
        .slice(prefix.length)
        .trim();

      const number = Number(suffix);

      if (
        Number.isInteger(number) &&
        number > maxNumber
      ) {
        maxNumber = number;
      }
    });

    const nextNumber = String(
      maxNumber + 1
    ).padStart(3, "0");

    return `INV - ${safeCourse} - ${safeStudent} - ${nextNumber}`;
  } catch {
    return `INV - ${safeCourse} - ${safeStudent} - 001`;
  }
};

export default function CreateFeeInvoice() {
  const router = useRouter();

  const [vendoruuid, setVendoruuid] = useState("");

  const [students, setStudents] =
    useState<Student[]>([]);

  const [feeHeads, setFeeHeads] =
    useState<FeeHead[]>([]);

  const [feeItems, setFeeItems] =
    useState<FeeStructureItem[]>([]);

  const [concessions, setConcessions] =
    useState<StudentConcession[]>([]);

  const [selectedStudent, setSelectedStudent] =
    useState<Student | null>(null);

  /*
   * COURSE FIX
   * Selected student's course is stored separately
   * so the Course input always displays correctly.
   */
  const [selectedCourseName, setSelectedCourseName] =
    useState("");

  const [selectedFeeHead, setSelectedFeeHead] =
    useState<FeeHead | null>(null);

  const [selectedConcession, setSelectedConcession] =
    useState<StudentConcession | null>(null);

  const [invoiceNumber, setInvoiceNumber] =
    useState("");

  const [billingPeriod, setBillingPeriod] =
    useState("");

  const [dueDate, setDueDate] =
    useState("");

  const [discountType, setDiscountType] =
    useState<"amount" | "percentage">("amount");

  const [discountValue, setDiscountValue] =
    useState("0");

  const [amountPaid, setAmountPaid] =
    useState("0");

  const [loading, setLoading] =
    useState(true);

  const [loadingItems, setLoadingItems] =
    useState(false);

  const [loadingConcessions, setLoadingConcessions] =
    useState(false);

  const [saving, setSaving] =
    useState(false);

  const [error, setError] =
    useState("");

  const [success, setSuccess] =
    useState("");

  useEffect(() => {
    const uuid = getVendorUuid();

    setVendoruuid(uuid);

    loadInitialData(uuid);
  }, []);

  const loadInitialData = async (
    uuid: string
  ) => {
    setLoading(true);
    setError("");

    try {
      const headers = getHeaders();

      const studentsUrl =
        `${apiUrl}/api/students` +
        `?filters[vendoruuid][$eq]=${encodeURIComponent(
          uuid
        )}` +
        `&populate[course]=*` +
        `&pagination[pageSize]=1000`;

      const feeHeadsUrl =
        `${apiUrl}/api/fee-heads` +
        `?filters[vendoruuid][$eq]=${encodeURIComponent(
          uuid
        )}` +
        `&populate[fee_structure]=*` +
        `&pagination[pageSize]=1000`;

      const [
        studentsResponse,
        feeHeadsResponse,
      ] = await Promise.all([
        fetch(studentsUrl, {
          method: "GET",
          headers,
        }),

        fetch(feeHeadsUrl, {
          method: "GET",
          headers,
        }),
      ]);

      if (!studentsResponse.ok) {
        throw new Error(
          "Unable to load students."
        );
      }

      if (!feeHeadsResponse.ok) {
        throw new Error(
          "Unable to load fee heads."
        );
      }

      const studentsResult =
        await studentsResponse.json();

      const feeHeadsResult =
        await feeHeadsResponse.json();

      setStudents(
        studentsResult?.data || []
      );

      setFeeHeads(
        feeHeadsResult?.data || []
      );
    } catch (err: any) {
      setError(
        err?.message ||
          "Unable to load Fee Invoice data."
      );
    } finally {
      setLoading(false);
    }
  };

  const loadStudentConcessions = async (
    studentId: number
  ) => {
    setLoadingConcessions(true);

    setConcessions([]);

    setSelectedConcession(null);

    try {
      const url =
        `${apiUrl}/api/student-concessions` +
        `?filters[student][id][$eq]=${studentId}` +
        `&filters[vendoruuid][$eq]=${encodeURIComponent(
          vendoruuid
        )}` +
        `&populate=*` +
        `&pagination[pageSize]=1000`;

      const response = await fetch(url, {
        method: "GET",
        headers: getHeaders(),
      });

      if (!response.ok) {
        setConcessions([]);
        return;
      }

      const result =
        await response.json();

      setConcessions(
        result?.data || []
      );
    } catch {
      setConcessions([]);
    } finally {
      setLoadingConcessions(false);
    }
  };

  const loadFeeStructureItems = async (
    feeStructureId: number | null
  ) => {
    setFeeItems([]);

    if (!feeStructureId) {
      return;
    }

    setLoadingItems(true);

    try {
      const url =
        `${apiUrl}/api/fee-structure-items` +
        `?filters[fee_structure][id][$eq]=${feeStructureId}` +
        `&filters[vendoruuid][$eq]=${encodeURIComponent(
          vendoruuid
        )}` +
        `&pagination[pageSize]=1000` +
        `&sort=createdAt:asc`;

      const response = await fetch(url, {
        method: "GET",
        headers: getHeaders(),
      });

      if (!response.ok) {
        throw new Error(
          "Unable to load fee structure items."
        );
      }

      const result =
        await response.json();

      setFeeItems(
        result?.data || []
      );
    } catch (err: any) {
      setError(
        err?.message ||
          "Unable to load fee structure items."
      );
    } finally {
      setLoadingItems(false);
    }
  };

  const handleStudentChange = async (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const studentId = Number(
      event.target.value
    );

    const student =
      students.find(
        (item) =>
          Number(item.id) === studentId
      ) || null;

    setSelectedStudent(student);

    setInvoiceNumber("");

    /*
     * COURSE FIX
     * Clear old course whenever student changes.
     */
    setSelectedCourseName("");

    if (!student) {
      setConcessions([]);
      setSelectedConcession(null);
      return;
    }

    await loadStudentConcessions(
      student.id
    );

    const studentName =
      getStudentName(student);

    const courseName =
      getCourseName(student);

    /*
     * COURSE FIX
     * Save the selected student's course.
     */
    setSelectedCourseName(courseName);

    const generatedInvoiceNumber =
      await getNextInvoiceNumber(
        vendoruuid,
        courseName,
        studentName
      );

    setInvoiceNumber(
      generatedInvoiceNumber
    );
  };

  const handleFeeHeadChange = async (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const feeHeadId = Number(
      event.target.value
    );

    const feeHead =
      feeHeads.find(
        (item) =>
          Number(item.id) === feeHeadId
      ) || null;

    setSelectedFeeHead(feeHead);

    const feeStructureId =
      getFeeStructureId(feeHead);

    await loadFeeStructureItems(
      feeStructureId
    );
  };

  const subtotal = useMemo(() => {
    return feeItems.reduce(
      (total, item) =>
        total + getFeeItemAmount(item),
      0
    );
  }, [feeItems]);

  const concessionAmount = useMemo(() => {
    if (!selectedConcession) {
      return 0;
    }

    const data =
      getAttributes(
        selectedConcession
      );

    const amount = Number(
      data?.amount ??
        data?.concessionAmount ??
        data?.discountAmount ??
        0
    );

    return Number.isFinite(amount)
      ? amount
      : 0;
  }, [selectedConcession]);

  const manualDiscountAmount =
    useMemo(() => {
      const value = Number(
        discountValue || 0
      );

      if (
        !Number.isFinite(value) ||
        value <= 0
      ) {
        return 0;
      }

      if (
        discountType ===
        "percentage"
      ) {
        return (
          (subtotal * value) /
          100
        );
      }

      return value;
    }, [
      discountValue,
      discountType,
      subtotal,
    ]);

  const totalDiscount = useMemo(() => {
    return Math.min(
      subtotal,
      concessionAmount +
        manualDiscountAmount
    );
  }, [
    subtotal,
    concessionAmount,
    manualDiscountAmount,
  ]);

  const netAmount = useMemo(() => {
    return Math.max(
      0,
      subtotal - totalDiscount
    );
  }, [
    subtotal,
    totalDiscount,
  ]);

  const paidAmount = useMemo(() => {
    const value = Number(
      amountPaid || 0
    );

    if (
      !Number.isFinite(value) ||
      value < 0
    ) {
      return 0;
    }

    return Math.min(
      value,
      netAmount
    );
  }, [
    amountPaid,
    netAmount,
  ]);

  const balanceDue = useMemo(() => {
    return Math.max(
      0,
      netAmount - paidAmount
    );
  }, [
    netAmount,
    paidAmount,
  ]);

  const status = useMemo(() => {
    if (netAmount <= 0) {
      return "PAID";
    }

    if (
      paidAmount >= netAmount
    ) {
      return "PAID";
    }

    if (paidAmount > 0) {
      return "PARTIALLY_PAID";
    }

    return "UNPAID";
  }, [
    netAmount,
    paidAmount,
  ]);

  const handleSubmit = async (
    event: React.FormEvent
  ) => {
    event.preventDefault();

    setError("");
    setSuccess("");

    if (!selectedStudent) {
      setError(
        "Please select a Student."
      );
      return;
    }

    if (!selectedFeeHead) {
      setError(
        "Please select a Fee Head."
      );
      return;
    }

    if (!invoiceNumber) {
      setError(
        "Invoice Number could not be generated."
      );
      return;
    }

    if (!billingPeriod.trim()) {
      setError(
        "Please enter Billing Period."
      );
      return;
    }

    if (!dueDate) {
      setError(
        "Please select Due Date."
      );
      return;
    }

    if (feeItems.length === 0) {
      setError(
        "No Fee Structure Items found for this Fee Head."
      );
      return;
    }

    setSaving(true);

    try {
      const feeStructureId =
        getFeeStructureId(
          selectedFeeHead
        );

      if (!feeStructureId) {
        throw new Error(
          "Fee Structure is not linked with the selected Fee Head."
        );
      }

      const invoicePayload = {
        data: {
          vendoruuid,
          invoiceNumber,
          billingPeriod:
            billingPeriod.trim(),
          dueDate,
          subTotal: subtotal,
          discountTotal:
            totalDiscount,
          netAmount,
          amountPaid:
            paidAmount,
          status,
          student:
            selectedStudent.id,
          fee_structure:
            feeStructureId,
          fee_head:
            selectedFeeHead.id,

          ...(selectedConcession
            ? {
                student_concession:
                  selectedConcession.id,
              }
            : {}),
        },
      };

      const invoiceResponse =
        await fetch(
          `${apiUrl}/api/fee-invoices`,
          {
            method: "POST",
            headers: getHeaders(),
            body: JSON.stringify(
              invoicePayload
            ),
          }
        );

      const invoiceResult =
        await invoiceResponse.json();

      if (!invoiceResponse.ok) {
        throw new Error(
          invoiceResult?.error
            ?.message ||
            "Unable to create Fee Invoice."
        );
      }

      const invoiceId =
        invoiceResult?.data?.id;

      if (!invoiceId) {
        throw new Error(
          "Fee Invoice created but Invoice ID was not returned."
        );
      }

      for (const item of feeItems) {
        const itemData =
          getAttributes(item);

        const itemAmount =
          getFeeItemAmount(item);

        const lineItemPayload = {
          data: {
            vendoruuid,
            amount: itemAmount,
            quantity: 1,
            fee_invoice:
              invoiceId,
            fee_structure_item:
              item.id,
            name:
              getFeeItemName(item),
            mandatory:
              item.mandatory ??
              itemData?.mandatory ??
              true,
          },
        };

        const lineItemResponse =
          await fetch(
            `${apiUrl}/api/invoice-line-items`,
            {
              method: "POST",
              headers: getHeaders(),
              body: JSON.stringify(
                lineItemPayload
              ),
            }
          );

        if (!lineItemResponse.ok) {
          const lineItemResult =
            await lineItemResponse.json();

          throw new Error(
            lineItemResult?.error
              ?.message ||
              "Invoice was created but an invoice line item could not be saved."
          );
        }
      }

      setSuccess(
        `Fee Invoice ${invoiceNumber} created successfully.`
      );

      setTimeout(() => {
        router.push(
          "/admin/fee-invoice"
        );
      }, 1200);
    } catch (err: any) {
      setError(
        err?.message ||
          "Unable to create Fee Invoice."
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 px-6 py-7 text-white">
        <div className="text-sm font-medium opacity-90">
          Fee Management
        </div>

        <h1 className="mt-2 text-2xl font-bold">
          Create Fee Invoice
        </h1>

        <p className="mt-1 text-sm opacity-90">
          Create a student fee invoice
        </p>
      </div>

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {success && (
        <div className="rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
          {success}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-white/[0.03]"
      >
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Student */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Student
            </label>

            <select
              value={
                selectedStudent?.id || ""
              }
              onChange={
                handleStudentChange
              }
              disabled={loading}
              className="h-11 w-full rounded-lg border border-gray-300 bg-white px-3 text-sm text-gray-700 outline-none focus:border-blue-500 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
            >
              <option value="">
                {loading
                  ? "Loading students..."
                  : "Select Student"}
              </option>

              {students.map(
                (student) => (
                  <option
                    key={student.id}
                    value={student.id}
                  >
                    {getStudentName(
                      student
                    )}
                  </option>
                )
              )}
            </select>
          </div>

          {/* Course */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Course
            </label>

            <input
              type="text"
              value={selectedCourseName}
              readOnly
              placeholder="Course will appear here"
              className="h-11 w-full rounded-lg border border-gray-300 bg-gray-50 px-3 text-sm text-gray-700 outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300"
            />
          </div>

          {/* Student Concession */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Student Concession
            </label>

            <select
              value={
                selectedConcession?.id ||
                ""
              }
              onChange={(event) => {
                const concessionId =
                  Number(
                    event.target.value
                  );

                const concession =
                  concessions.find(
                    (item) =>
                      Number(item.id) ===
                      concessionId
                  ) || null;

                setSelectedConcession(
                  concession
                );
              }}
              disabled={
                !selectedStudent ||
                loadingConcessions
              }
              className="h-11 w-full rounded-lg border border-gray-300 bg-white px-3 text-sm text-gray-700 outline-none focus:border-blue-500 disabled:bg-gray-100 dark:border-gray-700 dark:bg-gray-900 dark:text-white dark:disabled:bg-gray-800"
            >
              <option value="">
                {loadingConcessions
                  ? "Loading concessions..."
                  : !selectedStudent
                  ? "Select Student first"
                  : concessions.length === 0
                  ? "No concession available"
                  : "Select Concession"}
              </option>

              {concessions.map(
                (concession) => (
                  <option
                    key={concession.id}
                    value={concession.id}
                  >
                    {getConcessionName(
                      concession
                    )}
                  </option>
                )
              )}
            </select>
          </div>

          {/* Fee Head */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Fee Head
            </label>

            <select
              value={
                selectedFeeHead?.id ||
                ""
              }
              onChange={
                handleFeeHeadChange
              }
              disabled={loading}
              className="h-11 w-full rounded-lg border border-gray-300 bg-white px-3 text-sm text-gray-700 outline-none focus:border-blue-500 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
            >
              <option value="">
                {loading
                  ? "Loading fee heads..."
                  : "Select Fee Head"}
              </option>

              {feeHeads.map(
                (feeHead) => (
                  <option
                    key={feeHead.id}
                    value={feeHead.id}
                  >
                    {getFeeHeadName(
                      feeHead
                    )}
                  </option>
                )
              )}
            </select>
          </div>

          {/* Invoice Number */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Invoice Number
            </label>

            <input
              type="text"
              value={invoiceNumber}
              readOnly
              placeholder="Select Student"
              className="h-11 w-full rounded-lg border border-gray-300 bg-gray-50 px-3 text-sm font-medium text-gray-700 outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300"
            />
          </div>

          {/* Billing Period */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Billing Period
            </label>

            <input
              type="text"
              value={billingPeriod}
              onChange={(event) =>
                setBillingPeriod(
                  event.target.value
                )
              }
              placeholder="e.g. September 2026"
              className="h-11 w-full rounded-lg border border-gray-300 bg-white px-3 text-sm text-gray-700 outline-none focus:border-blue-500 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
            />
          </div>

          {/* Due Date */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Due Date
            </label>

            <input
              type="date"
              value={dueDate}
              onChange={(event) =>
                setDueDate(
                  event.target.value
                )
              }
              className="h-11 w-full rounded-lg border border-gray-300 bg-white px-3 text-sm text-gray-700 outline-none focus:border-blue-500 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
            />
          </div>

          {/* Amount Paid */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Amount Paid
            </label>

            <input
              type="number"
              min="0"
              value={amountPaid}
              onChange={(event) =>
                setAmountPaid(
                  event.target.value
                )
              }
              className="h-11 w-full rounded-lg border border-gray-300 bg-white px-3 text-sm text-gray-700 outline-none focus:border-blue-500 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
            />
          </div>
        </div>

        {/* Fee Structure Items */}
        <div className="mt-8">
          <div className="mb-3">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
              Fee Structure Items
            </h2>

            <p className="text-sm text-gray-500">
              Items are loaded automatically
              from the Fee Head's Fee
              Structure.
            </p>
          </div>

          <div className="overflow-hidden rounded-xl border border-gray-200 dark:border-gray-800">
            {loadingItems ? (
              <div className="p-5 text-sm text-gray-500">
                Loading fee structure
                items...
              </div>
            ) : feeItems.length === 0 ? (
              <div className="p-5 text-sm text-gray-500">
                Select a Fee Head to load
                its fee structure items.
              </div>
            ) : (
              <div className="divide-y divide-gray-200 dark:divide-gray-800">
                {feeItems.map(
                  (item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between gap-4 px-5 py-4"
                    >
                      <div>
                        <div className="font-medium text-gray-800 dark:text-white">
                          {getFeeItemName(
                            item
                          )}
                        </div>

                        <div className="text-xs text-gray-500">
                          {item.mandatory
                            ? "Mandatory"
                            : "Optional"}
                        </div>
                      </div>

                      <div className="font-semibold text-gray-800 dark:text-white">
                        ₹
                        {getFeeItemAmount(
                          item
                        ).toFixed(2)}
                      </div>
                    </div>
                  )
                )}
              </div>
            )}
          </div>
        </div>

        {/* Discount */}
        <div className="mt-8">
          <h2 className="mb-4 text-lg font-semibold text-gray-800 dark:text-white">
            Additional Discount
          </h2>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Discount Type
              </label>

              <select
                value={discountType}
                onChange={(event) =>
                  setDiscountType(
                    event.target
                      .value as
                      | "amount"
                      | "percentage"
                  )
                }
                className="h-11 w-full rounded-lg border border-gray-300 bg-white px-3 text-sm text-gray-700 outline-none focus:border-blue-500 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
              >
                <option value="amount">
                  Fixed Amount
                </option>

                <option value="percentage">
                  Percentage
                </option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Discount Value
              </label>

              <input
                type="number"
                min="0"
                value={discountValue}
                onChange={(event) =>
                  setDiscountValue(
                    event.target.value
                  )
                }
                className="h-11 w-full rounded-lg border border-gray-300 bg-white px-3 text-sm text-gray-700 outline-none focus:border-blue-500 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
              />
            </div>
          </div>
        </div>

        {/* Calculation */}
        <div className="mt-8 rounded-xl border border-gray-200 bg-gray-50 p-5 dark:border-gray-800 dark:bg-gray-900/50">
          <h2 className="mb-4 text-lg font-semibold text-gray-800 dark:text-white">
            Calculation
          </h2>

          <div className="space-y-3 text-sm">
            <div className="flex justify-between gap-4">
              <span className="text-gray-500">
                Sub Total
              </span>

              <span className="font-medium text-gray-800 dark:text-white">
                ₹{subtotal.toFixed(2)}
              </span>
            </div>

            <div className="flex justify-between gap-4">
              <span className="text-gray-500">
                Concession
              </span>

              <span className="font-medium text-gray-800 dark:text-white">
                - ₹
                {concessionAmount.toFixed(
                  2
                )}
              </span>
            </div>

            <div className="flex justify-between gap-4">
              <span className="text-gray-500">
                Additional Discount
              </span>

              <span className="font-medium text-gray-800 dark:text-white">
                - ₹
                {manualDiscountAmount.toFixed(
                  2
                )}
              </span>
            </div>

            <div className="border-t border-gray-200 pt-3 dark:border-gray-700">
              <div className="flex justify-between gap-4">
                <span className="font-semibold text-gray-700 dark:text-gray-300">
                  Total Discount
                </span>

                <span className="font-semibold text-gray-800 dark:text-white">
                  ₹
                  {totalDiscount.toFixed(
                    2
                  )}
                </span>
              </div>
            </div>

            <div className="flex justify-between gap-4">
              <span className="text-gray-500">
                Net Amount
              </span>

              <span className="font-bold text-gray-900 dark:text-white">
                ₹{netAmount.toFixed(2)}
              </span>
            </div>

            <div className="flex justify-between gap-4">
              <span className="text-gray-500">
                Amount Paid
              </span>

              <span className="font-medium text-gray-800 dark:text-white">
                ₹{paidAmount.toFixed(2)}
              </span>
            </div>

            <div className="border-t border-gray-200 pt-3 dark:border-gray-700">
              <div className="flex justify-between gap-4">
                <span className="font-semibold text-gray-700 dark:text-gray-300">
                  Balance Due
                </span>

                <span className="font-bold text-red-600">
                  ₹{balanceDue.toFixed(2)}
                </span>
              </div>
            </div>

            <div className="flex justify-between gap-4">
              <span className="text-gray-500">
                Status
              </span>

              <span className="font-semibold text-gray-800 dark:text-white">
                {status}
              </span>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-8 flex flex-wrap justify-end gap-3">
          <button
            type="button"
            onClick={() =>
              router.push(
                "/admin/fee-invoice"
              )
            }
            disabled={saving}
            className="rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={
              saving || loading
            }
            className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {saving
              ? "Creating Invoice..."
              : "Create Invoice"}
          </button>
        </div>
      </form>
    </div>
  );
}