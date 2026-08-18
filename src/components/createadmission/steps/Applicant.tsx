"use client";

import React, { useState, useEffect } from "react";
import TextHeading from "@/components/ui/textheader/TextHeader";

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

type AcademicHistoryItem = {
  level: string;
  institution: string;
  board_or_university: string;
  year_passed: string | number;
  score_percentage: string | number;
};

type DocumentItem = {
  doc_type: string;
  file_url: string;
  verification_status: "PENDING" | "VERIFIED" | "REJECTED";
};

type FormDataSchema = {
  vendorid?: string | null;
  applicant_id: string;
  personal_info: {
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    dob: string;
    gender: string;
  };
  program_applied: {
    program_id: string;
    program_name: string;
    academic_term: string;
    intake_batch: string;
  };
  academic_history: AcademicHistoryItem[];
  documents: DocumentItem[];
};

type ApplicantProps = {
  onNext: (strapiResponseData: any) => void;
  onBack: () => void;
  data: Partial<FormDataSchema> | null;
  onChange: (data: FormDataSchema) => void;
};

type FormErrors = {
  applicant_id?: string;
  first_name?: string;
  last_name?: string;
  email?: string;
  phone?: string;
  dob?: string;
  gender?: string;
  program_id?: string;
  program_name?: string;
  academic_term?: string;
  intake_batch?: string;
  academic_history?: Array<{
    level?: string;
    institution?: string;
    board_or_university?: string;
    year_passed?: string;
    score_percentage?: string;
  }>;
  documents?: Array<{
    doc_type?: string;
    file_url?: string;
    verification_status?: string;
  }>;
};

const initialArrayHistory = (): AcademicHistoryItem => ({
  level: "",
  institution: "",
  board_or_university: "",
  year_passed: "",
  score_percentage: "",
});

const initialArrayDocument = (): DocumentItem => ({
  doc_type: "",
  file_url: "",
  verification_status: "PENDING",
});

export default function Applicant({
  onNext,
  onBack,
  data,
  onChange,
}: ApplicantProps) {
  const [formData, setFormData] = useState<FormDataSchema>({
    vendorid: "",
    applicant_id: "",
    personal_info: {
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
      dob: "",
      gender: "",
    },
    program_applied: {
      program_id: "",
      program_name: "",
      academic_term: "",
      intake_batch: "",
    },
    academic_history: [initialArrayHistory()],
    documents: [initialArrayDocument()],
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  useEffect(() => {
    if (data) {
      setFormData((prev) => {
        const history = data.academic_history?.length
          ? data.academic_history
          : prev.academic_history;
        const docs = data.documents?.length
          ? data.documents
          : prev.documents;

        return {
          ...prev,
          ...data,
          applicant_id: data.applicant_id ?? prev.applicant_id,
          personal_info: {
            ...prev.personal_info,
            ...(data.personal_info || {}),
          },
          program_applied: {
            ...prev.program_applied,
            ...(data.program_applied || {}),
          },
          academic_history: [...history],
          documents: [...docs],
        };
      });
    }
  }, [data]);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.applicant_id.trim()) {
      newErrors.applicant_id = "Applicant ID is required.";
    }

    const { first_name, last_name, email, phone, dob, gender } = formData.personal_info;
    const nameRegex = /^[a-zA-Z\s]+$/;

    if (!first_name.trim()) {
      newErrors.first_name = "First name is required.";
    } else if (!nameRegex.test(first_name)) {
      newErrors.first_name = "First name must contain letters only.";
    }

    if (!last_name.trim()) {
      newErrors.last_name = "Last name is required.";
    } else if (!nameRegex.test(last_name)) {
      newErrors.last_name = "Last name must contain letters only.";
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!email.trim()) {
      newErrors.email = "Email address is required.";
    } else if (!emailRegex.test(email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    const digitsOnly = phone.replace(/\D/g, "");
    if (!phone.trim()) {
      newErrors.phone = "Phone number is required.";
    } else if (digitsOnly.length < 10 || digitsOnly.length > 12) {
      newErrors.phone = "Please enter a valid phone number.";
    }

    if (!dob) {
      newErrors.dob = "Date of Birth is required.";
    } else {
      const birthYear = new Date(dob).getFullYear();
      const currentYear = new Date().getFullYear();
      if (currentYear - birthYear < 16) {
        newErrors.dob = "Applicant must be at least 16 years old.";
      }
    }

    if (!gender) {
      newErrors.gender = "Please select a gender.";
    }

    const { program_id, program_name, academic_term, intake_batch } = formData.program_applied;
    if (!program_id.trim()) newErrors.program_id = "Program ID is required.";
    if (!program_name.trim()) newErrors.program_name = "Program name is required.";
    if (!academic_term.trim()) newErrors.academic_term = "Academic term is required.";
    if (!intake_batch.trim()) newErrors.intake_batch = "Intake batch is required.";

    const historyErrors = formData.academic_history.map((item) => {
      const itemErrors: { level?: string; institution?: string; board_or_university?: string; year_passed?: string; score_percentage?: string } = {};
      if (!item.level.trim()) itemErrors.level = "Level is required.";
      if (!item.institution.trim()) itemErrors.institution = "Institution is required.";
      if (!item.board_or_university.trim()) itemErrors.board_or_university = "Board/University is required.";
      
      const year = Number(item.year_passed);
      const currentYear = new Date().getFullYear();
      if (!item.year_passed) {
        itemErrors.year_passed = "Passing year required.";
      } else if (isNaN(year) || year < 1970 || year > currentYear) {
        itemErrors.year_passed = `Enter a year between 1970 and ${currentYear}.`;
      }

      const score = Number(item.score_percentage);
      if (item.score_percentage === "" || item.score_percentage === null) {
        itemErrors.score_percentage = "Score % required.";
      } else if (isNaN(score) || score < 0 || score > 100) {
        itemErrors.score_percentage = "Score must be between 0 and 100.";
      }

      return itemErrors;
    });

    if (historyErrors.some((err) => Object.keys(err).length > 0)) {
      newErrors.academic_history = historyErrors;
    }

    const docErrors = formData.documents.map((doc) => {
      const itemErrors: { doc_type?: string; file_url?: string; verification_status?: string } = {};
      if (!doc.doc_type.trim()) itemErrors.doc_type = "Document type is required.";
      
      const urlPattern = /^(https?:\/\/|s3:\/\/).+/i;
      if (!doc.file_url.trim()) {
        itemErrors.file_url = "File URL is required.";
      } else if (!urlPattern.test(doc.file_url)) {
        itemErrors.file_url = "Must start with http://, https:// or s3://";
      }

      if (!doc.verification_status) itemErrors.verification_status = "Status required.";
      return itemErrors;
    });

    if (docErrors.some((err) => Object.keys(err).length > 0)) {
      newErrors.documents = docErrors;
    }

    setErrors(newErrors);

    const hasTopErrors = Object.keys(newErrors).filter((k) => k !== "academic_history" && k !== "documents").length > 0;
    const hasHistoryErrors = newErrors.academic_history?.some((e) => Object.keys(e).length > 0);
    const hasDocErrors = newErrors.documents?.some((e) => Object.keys(e).length > 0);

    return !hasTopErrors && !hasHistoryErrors && !hasDocErrors;
  };

  const handleNext = async () => {
    setApiError(null);

    if (!validateForm()) return;

    onChange(formData);
    setIsSubmitting(true);

    try {
      // Payload structure strictly adhering to Strapi v4 Collection attributes
      const payload = {
        data: {
          vendorid: formData.vendorid?.trim() ? formData.vendorid : null,
          applicant_id: formData.applicant_id,
          firstname: formData.personal_info.first_name,
          lastname: formData.personal_info.last_name,
          email: formData.personal_info.email,
          phone: formData.personal_info.phone,
          DOB: formData.personal_info.dob,
          gender: formData.personal_info.gender,
          programid: formData.program_applied.program_id,
          programname: formData.program_applied.program_name,
          academicterm: formData.program_applied.academic_term,
          intakebatch: formData.program_applied.intake_batch,
          academichistory: formData.academic_history,
          documents: formData.documents,
          Assessmentwritten: {},
          Assessmentinterview: {},
          aggregateevalscore: null,
          evaluationresult: null,
          Approval: {},
          Offer: {},
          Feepaymentdetails: {},
          Feereceiptnumber: "",
          Onboarding: {},
        },
      };

const token = localStorage.getItem("jwt");

const response = await fetch(`${STRAPI_URL}/api/admission-workflows`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
  body: JSON.stringify(payload),
});

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.error?.message || "Failed to create applicant in Strapi."
        );
      }

      // Pass Strapi v4 response data ({ id: X, attributes: { ... } }) back to AdmissionWorkflow parent
      onNext(result.data);
    } catch (err: any) {
      setApiError(
        err.message === "Failed to fetch"
          ? "Unable to reach Strapi backend. Check if your server is running and CORS is enabled."
          : err.message || "An error occurred while connecting to the server."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const updateAcademicHistory = (index: number, fields: Partial<AcademicHistoryItem>) => {
    const updatedHistory = [...formData.academic_history];
    updatedHistory[index] = { ...updatedHistory[index], ...fields };
    setFormData({ ...formData, academic_history: updatedHistory });
  };

  const addAcademicHistory = () => {
    setFormData({
      ...formData,
      academic_history: [...formData.academic_history, initialArrayHistory()],
    });
  };

  const removeAcademicHistory = (index: number) => {
    if (formData.academic_history.length === 1) return;
    const updatedHistory = formData.academic_history.filter((_, i) => i !== index);
    setFormData({ ...formData, academic_history: updatedHistory });
  };

  const updateDocument = (index: number, fields: Partial<DocumentItem>) => {
    const updatedDocs = [...formData.documents];
    updatedDocs[index] = { ...updatedDocs[index], ...fields };
    setFormData({ ...formData, documents: updatedDocs });
  };

  const addDocument = () => {
    setFormData({
      ...formData,
      documents: [...formData.documents, initialArrayDocument()],
    });
  };

  const removeDocument = (index: number) => {
    if (formData.documents.length === 1) return;
    const updatedDocs = formData.documents.filter((_, i) => i !== index);
    setFormData({ ...formData, documents: updatedDocs });
  };

  const inputStyle = "w-full border border-gray-300 rounded p-2 focus:border-black focus:ring-1 focus:ring-black outline-none bg-white transition-all duration-150";
  const errorInputStyle = "w-full border border-red-500 rounded p-2 focus:ring-1 focus:ring-red-500 outline-none bg-white transition-all duration-150";

  return (
    <div className="w-full space-y-8">
      <TextHeading title="Applicant Form" />

      {/* Top Meta Fields */}
      <div className="grid grid-cols-2 gap-x-6 gap-y-4">
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">
            Applicant ID <span className="text-red-500">*</span>
          </label>
          <input
            className={errors.applicant_id ? errorInputStyle : inputStyle}
            value={formData.applicant_id}
            onChange={(e) => setFormData({ ...formData, applicant_id: e.target.value })}
          />
          {errors.applicant_id && <p className="text-red-500 text-xs mt-1">{errors.applicant_id}</p>}
        </div>
      </div>

      <hr className="border-gray-200" />

      {/* Personal Information */}
      <div>
        <h2 className="text-xl font-bold text-gray-800 mb-4">Personal Information</h2>
        <div className="grid grid-cols-2 gap-x-6 gap-y-4">
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">
              First Name <span className="text-red-500">*</span>
            </label>
            <input
              placeholder="First Name"
              className={errors.first_name ? errorInputStyle : inputStyle}
              value={formData.personal_info.first_name}
              onChange={(e) => setFormData({
                ...formData,
                personal_info: { ...formData.personal_info, first_name: e.target.value },
              })}
            />
            {errors.first_name && <p className="text-red-500 text-xs mt-1">{errors.first_name}</p>}
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">
              Last Name <span className="text-red-500">*</span>
            </label>
            <input
              placeholder="Last Name"
              className={errors.last_name ? errorInputStyle : inputStyle}
              value={formData.personal_info.last_name}
              onChange={(e) => setFormData({
                ...formData,
                personal_info: { ...formData.personal_info, last_name: e.target.value },
              })}
            />
            {errors.last_name && <p className="text-red-500 text-xs mt-1">{errors.last_name}</p>}
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">
              Email Address <span className="text-red-500">*</span>
            </label>
            <input
              placeholder="Email"
              type="email"
              className={errors.email ? errorInputStyle : inputStyle}
              value={formData.personal_info.email}
              onChange={(e) => setFormData({
                ...formData,
                personal_info: { ...formData.personal_info, email: e.target.value },
              })}
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">
              Phone Number <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              placeholder="+91-9876543210"
              className={errors.phone ? errorInputStyle : inputStyle}
              value={formData.personal_info.phone}
              onChange={(e) => setFormData({
                ...formData,
                personal_info: { ...formData.personal_info, phone: e.target.value },
              })}
            />
            {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">
              Date of Birth <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              className={errors.dob ? errorInputStyle : inputStyle}
              value={formData.personal_info.dob}
              onChange={(e) => setFormData({
                ...formData,
                personal_info: { ...formData.personal_info, dob: e.target.value },
              })}
            />
            {errors.dob && <p className="text-red-500 text-xs mt-1">{errors.dob}</p>}
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">
              Gender <span className="text-red-500">*</span>
            </label>
            <select
              className={errors.gender ? errorInputStyle : inputStyle}
              value={formData.personal_info.gender}
              onChange={(e) => setFormData({
                ...formData,
                personal_info: { ...formData.personal_info, gender: e.target.value },
              })}
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
            {errors.gender && <p className="text-red-500 text-xs mt-1">{errors.gender}</p>}
          </div>
        </div>
      </div>

      <hr className="border-gray-200" />

      {/* Program Applied */}
      <div>
        <h2 className="text-xl font-bold text-gray-800 mb-4">Program Applied</h2>
        <div className="grid grid-cols-2 gap-x-6 gap-y-4">
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">
              Program ID <span className="text-red-500">*</span>
            </label>
            <input
              placeholder="e.g. PRG-CS-2026"
              className={errors.program_id ? errorInputStyle : inputStyle}
              value={formData.program_applied.program_id}
              onChange={(e) => setFormData({
                ...formData,
                program_applied: { ...formData.program_applied, program_id: e.target.value },
              })}
            />
            {errors.program_id && <p className="text-red-500 text-xs mt-1">{errors.program_id}</p>}
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">
              Program Name <span className="text-red-500">*</span>
            </label>
            <input
              placeholder="e.g. B.Tech Computer Science"
              className={errors.program_name ? errorInputStyle : inputStyle}
              value={formData.program_applied.program_name}
              onChange={(e) => setFormData({
                ...formData,
                program_applied: { ...formData.program_applied, program_name: e.target.value },
              })}
            />
            {errors.program_name && <p className="text-red-500 text-xs mt-1">{errors.program_name}</p>}
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">
              Academic Term <span className="text-red-500">*</span>
            </label>
            <input
              placeholder="e.g. Fall 2026"
              className={errors.academic_term ? errorInputStyle : inputStyle}
              value={formData.program_applied.academic_term}
              onChange={(e) => setFormData({
                ...formData,
                program_applied: { ...formData.program_applied, academic_term: e.target.value },
              })}
            />
            {errors.academic_term && <p className="text-red-500 text-xs mt-1">{errors.academic_term}</p>}
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">
              Intake Batch <span className="text-red-500">*</span>
            </label>
            <input
              placeholder="e.g. Batch-A"
              className={errors.intake_batch ? errorInputStyle : inputStyle}
              value={formData.program_applied.intake_batch}
              onChange={(e) => setFormData({
                ...formData,
                program_applied: { ...formData.program_applied, intake_batch: e.target.value },
              })}
            />
            {errors.intake_batch && <p className="text-red-500 text-xs mt-1">{errors.intake_batch}</p>}
          </div>
        </div>
      </div>

      <hr className="border-gray-200" />

      {/* Academic History Block */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">Academic History</h2>
          <button
            type="button"
            onClick={addAcademicHistory}
            className="text-sm font-semibold text-blue-600 hover:text-blue-800"
          >
            + Add Another Entry
          </button>
        </div>

        <div className="space-y-4">
          {formData.academic_history.map((item, index) => {
            const itemErr = errors.academic_history?.[index];
            return (
              <div key={index} className="p-4 border border-dashed border-gray-200 rounded-lg bg-gray-50/50 relative group">
                {formData.academic_history.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeAcademicHistory(index)}
                    className="absolute top-2 right-2 text-xs text-red-500 hover:underline opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    Remove
                  </button>
                )}
                <div className="grid grid-cols-2 gap-x-6 gap-y-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">
                      Level <span className="text-red-500">*</span>
                    </label>
                    <input
                      placeholder="e.g., Grade 12, B.Sc"
                      className={itemErr?.level ? errorInputStyle : inputStyle}
                      value={item.level}
                      onChange={(e) => updateAcademicHistory(index, { level: e.target.value })}
                    />
                    {itemErr?.level && <p className="text-red-500 text-xs mt-1">{itemErr.level}</p>}
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">
                      Institution <span className="text-red-500">*</span>
                    </label>
                    <input
                      placeholder="e.g. Delhi Public School"
                      className={itemErr?.institution ? errorInputStyle : inputStyle}
                      value={item.institution}
                      onChange={(e) => updateAcademicHistory(index, { institution: e.target.value })}
                    />
                    {itemErr?.institution && <p className="text-red-500 text-xs mt-1">{itemErr.institution}</p>}
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">
                      Board / University <span className="text-red-500">*</span>
                    </label>
                    <input
                      placeholder="e.g. CBSE / Delhi University"
                      className={itemErr?.board_or_university ? errorInputStyle : inputStyle}
                      value={item.board_or_university}
                      onChange={(e) => updateAcademicHistory(index, { board_or_university: e.target.value })}
                    />
                    {itemErr?.board_or_university && <p className="text-red-500 text-xs mt-1">{itemErr.board_or_university}</p>}
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">
                        Year Passed <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="number"
                        placeholder="2024"
                        className={itemErr?.year_passed ? errorInputStyle : inputStyle}
                        value={item.year_passed}
                        onChange={(e) => updateAcademicHistory(index, {
                          year_passed: e.target.value ? Number(e.target.value) : "",
                        })}
                      />
                      {itemErr?.year_passed && <p className="text-red-500 text-xs mt-1">{itemErr.year_passed}</p>}
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">
                        Score % <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="number"
                        step="any"
                        placeholder="92.4"
                        className={itemErr?.score_percentage ? errorInputStyle : inputStyle}
                        value={item.score_percentage}
                        onChange={(e) => updateAcademicHistory(index, {
                          score_percentage: e.target.value ? Number(e.target.value) : "",
                        })}
                      />
                      {itemErr?.score_percentage && <p className="text-red-500 text-xs mt-1">{itemErr.score_percentage}</p>}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <hr className="border-gray-200" />

      {/* Documents Block */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">Documents</h2>
          <button
            type="button"
            onClick={addDocument}
            className="text-sm font-semibold text-blue-600 hover:text-blue-800"
          >
            + Add Another Document
          </button>
        </div>

        <div className="space-y-4">
          {formData.documents.map((doc, index) => {
            const docErr = errors.documents?.[index];
            return (
              <div key={index} className="p-4 border border-dashed border-gray-200 rounded-lg bg-gray-50/50 relative group">
                {formData.documents.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeDocument(index)}
                    className="absolute top-2 right-2 text-xs text-red-500 hover:underline opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    Remove
                  </button>
                )}
                <div className="grid grid-cols-3 gap-x-6 gap-y-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">
                      Document Type <span className="text-red-500">*</span>
                    </label>
                    <input
                      placeholder="e.g. TRANSCRIPT_12TH"
                      className={docErr?.doc_type ? errorInputStyle : inputStyle}
                      value={doc.doc_type}
                      onChange={(e) => updateDocument(index, { doc_type: e.target.value })}
                    />
                    {docErr?.doc_type && <p className="text-red-500 text-xs mt-1">{docErr.doc_type}</p>}
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">
                      File URL <span className="text-red-500">*</span>
                    </label>
                    <input
                      placeholder="s3://... or https://..."
                      className={docErr?.file_url ? errorInputStyle : inputStyle}
                      value={doc.file_url}
                      onChange={(e) => updateDocument(index, { file_url: e.target.value })}
                    />
                    {docErr?.file_url && <p className="text-red-500 text-xs mt-1">{docErr.file_url}</p>}
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">
                      Verification Status <span className="text-red-500">*</span>
                    </label>
                    <select
                      className={docErr?.verification_status ? errorInputStyle : inputStyle}
                      value={doc.verification_status}
                      onChange={(e) => updateDocument(index, {
                        verification_status: e.target.value as "PENDING" | "VERIFIED" | "REJECTED",
                      })}
                    >
                      <option value="PENDING">Pending</option>
                      <option value="VERIFIED">Verified</option>
                      <option value="REJECTED">Rejected</option>
                    </select>
                    {docErr?.verification_status && <p className="text-red-500 text-xs mt-1">{docErr.verification_status}</p>}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Error Message Display */}
      {apiError && (
        <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded">
          {apiError}
        </div>
      )}

      {/* Navigation Actions */}
      <div className="flex justify-between items-center pt-4 border-t">
        <button 
          type="button"
          onClick={onBack}
          disabled={isSubmitting}
          className="px-5 py-2 border border-gray-200 rounded text-gray-600 hover:bg-gray-50 transition-colors disabled:opacity-50"
        >
          Back
        </button>

        <button
          type="button"
          onClick={handleNext}
          disabled={isSubmitting}
          className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded shadow-sm transition-colors disabled:opacity-50 flex items-center gap-2"
        >
          {isSubmitting ? "Saving..." : "Submit / Next →"}
        </button>
      </div>
    </div>
  );
}