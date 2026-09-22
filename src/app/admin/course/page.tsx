"use client";

import React, { useEffect, useState } from "react";
import { apiUrl } from "@/utils/config";

interface Course {
  id: number;
  documentId?: string;
  name: string;
  code?: string;
  description?: string;
  duration?: string | number;
  affiliated?: string;
  status?: "ACTIVE" | "INACTIVE";
}

export default function CoursePage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);
  const [saving, setSaving] = useState(false);

  const [editingCourseId, setEditingCourseId] = useState<number | null>(null);

  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState("");
  const [affiliated, setAffiliated] = useState("");
  const [status, setStatus] = useState<"ACTIVE" | "INACTIVE">("ACTIVE");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const fetchCourses = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        `${apiUrl}/api/courses?pagination[pageSize]=1000&sort=createdAt:desc`
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result?.error?.message || "Failed to fetch courses"
        );
      }

      const data = Array.isArray(result?.data) ? result.data : [];

      const formattedCourses: Course[] = data.map((item: any) => {
        const attributes = item?.attributes || item || {};

        return {
          id: item?.id,
          documentId: item?.documentId,
          name: attributes?.name || "",
          code: attributes?.code || "",
          description: attributes?.description || "",
          duration: attributes?.duration || "",
          affiliated: attributes?.affiliated || "",
          status: attributes?.status || "ACTIVE",
        };
      });

      setCourses(formattedCourses);
    } catch (err: any) {
      console.error("Fetch courses error:", err);
      setError(err?.message || "Failed to load courses");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const resetForm = () => {
    setEditingCourseId(null);
    setName("");
    setCode("");
    setDescription("");
    setDuration("");
    setAffiliated("");
    setStatus("ACTIVE");
    setError("");
  };

  const handleCloseModal = () => {
    if (saving) return;

    setShowModal(false);
    resetForm();
  };

  const handleEditCourse = (course: Course) => {
    setEditingCourseId(course.id);
    setName(course.name || "");
    setCode(course.code || "");
    setDescription(course.description || "");
    setDuration(String(course.duration || ""));
    setAffiliated(course.affiliated || "");
    setStatus(course.status || "ACTIVE");

    setError("");
    setSuccess("");
    setShowModal(true);
  };

  const handleCreateCourse = async () => {
    if (!name.trim()) {
      setError("Course Name is required.");
      return;
    }

    try {
      setSaving(true);
      setError("");
      setSuccess("");

      const payload = {
        data: {
          name: name.trim(),
          code: code.trim(),
          description: description.trim(),
          duration: duration.trim(),
          affiliated: affiliated.trim(),
          status,
        },
      };

      const isEditing = editingCourseId !== null;

      const url = isEditing
        ? `${apiUrl}/api/courses/${editingCourseId}`
        : `${apiUrl}/api/courses`;

      const response = await fetch(url, {
        method: isEditing ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result?.error?.message ||
            `Failed to ${isEditing ? "update" : "create"} course`
        );
      }

      setSuccess(
        isEditing
          ? "Course updated successfully."
          : "Course created successfully."
      );

      await fetchCourses();

      setTimeout(() => {
        setShowModal(false);
        resetForm();
        setSuccess("");
      }, 700);
    } catch (err: any) {
      console.error(
        editingCourseId !== null
          ? "Update course error:"
          : "Create course error:",
        err
      );

      setError(
        err?.message ||
          `Failed to ${
            editingCourseId !== null ? "update" : "create"
          } course.`
      );
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteCourse = async (course: Course) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${course.name}"?`
    );

    if (!confirmed) return;

    try {
      setError("");
      setSuccess("");

      const response = await fetch(
        `${apiUrl}/api/courses/${course.id}`,
        {
          method: "DELETE",
        }
      );

      const result = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(
          result?.error?.message || "Failed to delete course"
        );
      }

      setSuccess("Course deleted successfully.");

      await fetchCourses();

      setTimeout(() => {
        setSuccess("");
      }, 1500);
    } catch (err: any) {
      console.error("Delete course error:", err);
      setError(err?.message || "Failed to delete course.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="mx-auto max-w-7xl">
        {/* Title Strip */}
        <div className="overflow-hidden rounded-xl bg-white shadow-sm">
          <div className="bg-gray-900 px-6 py-4">
            <h1 className="text-xl font-semibold text-white">Course</h1>
          </div>

          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-8">
            <p className="text-sm font-medium uppercase tracking-wide text-blue-100">
              🎓
            </p>

            <h2 className="mt-2 text-2xl font-bold text-white">
              Course
            </h2>

            <p className="mt-1 text-sm text-blue-100">
              Manage courses
            </p>
          </div>
        </div>

        {/* Course List */}
        <div className="mt-6 overflow-hidden rounded-xl bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-gray-200 px-6 py-5">
            <div>
              <h3 className="text-lg font-semibold text-gray-800">
                Course List
              </h3>

              <p className="mt-1 text-sm text-gray-500">
                Manage available courses
              </p>
            </div>

            <button
              type="button"
              onClick={() => {
                resetForm();
                setShowModal(true);
              }}
              className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              + Add Course
            </button>
          </div>

          {error && !showModal && (
            <div className="mx-6 mt-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}

          {success && !showModal && (
            <div className="mx-6 mt-5 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
              {success}
            </div>
          )}

          <div className="overflow-x-auto">
            <table className="w-full min-w-[1050px]">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                    #
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                    Course Name
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                    Affiliated
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                    Description
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                    Status
                  </th>

                  <th className="px-6 py-4 text-right text-sm font-semibold text-gray-600">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody>
                {loading ? (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-6 py-12 text-center text-sm text-gray-500"
                    >
                      Loading courses...
                    </td>
                  </tr>
                ) : courses.length === 0 ? (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-6 py-12 text-center text-sm text-gray-500"
                    >
                      No courses found
                    </td>
                  </tr>
                ) : (
                  courses.map((course, index) => (
                    <tr
                      key={course.id || index}
                      className="border-b border-gray-100 last:border-b-0"
                    >
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {index + 1}
                      </td>

                      <td className="px-6 py-4 text-sm font-medium text-gray-800">
                        {course.name || "-"}
                      </td>

                      <td className="px-6 py-4 text-sm text-gray-600">
                        {course.affiliated || "-"}
                      </td>

                      <td className="px-6 py-4 text-sm text-gray-600">
                        {course.description || "-"}
                      </td>

                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                            course.status === "ACTIVE"
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {course.status || "ACTIVE"}
                        </span>
                      </td>

                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            type="button"
                            onClick={() => handleEditCourse(course)}
                            className="rounded-lg border border-blue-200 bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-600 transition hover:bg-blue-100"
                          >
                            Edit
                          </button>

                          <button
                            type="button"
                            onClick={() => handleDeleteCourse(course)}
                            className="rounded-lg border border-red-200 bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-600 transition hover:bg-red-100"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Create / Edit Course Modal */}
      {showModal && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-2xl overflow-hidden rounded-2xl bg-white shadow-2xl">
            {/* Modal Header */}
            <div className="flex items-center justify-between bg-gray-900 px-6 py-4">
              <div>
                <h2 className="text-lg font-semibold text-white">
                  {editingCourseId !== null
                    ? "Edit Course"
                    : "Create Course"}
                </h2>

                <p className="mt-1 text-xs text-gray-300">
                  {editingCourseId !== null
                    ? "Update course details"
                    : "Add a new course"}
                </p>
              </div>

              <button
                type="button"
                onClick={handleCloseModal}
                disabled={saving}
                className="text-2xl leading-none text-gray-300 transition hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
              >
                ×
              </button>
            </div>

            {/* Modal Body */}
            <div className="max-h-[75vh] overflow-y-auto px-6 py-6">
              {error && (
                <div className="mb-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                  {error}
                </div>
              )}

              {success && (
                <div className="mb-5 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
                  {success}
                </div>
              )}

              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                {/* Course Name */}
                <div className="md:col-span-2">
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Course Name{" "}
                    <span className="text-red-500">*</span>
                  </label>

                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. B.Tech CSE"
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                {/* Course Code */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Course Code
                  </label>

                  <input
                    type="text"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    placeholder="e.g. CSE001"
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                {/* Duration */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Duration
                  </label>

                  <input
                    type="text"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    placeholder="e.g. 4 Years"
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                {/* Affiliated */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Affiliated
                  </label>

                  <input
                    type="text"
                    value={affiliated}
                    onChange={(e) => setAffiliated(e.target.value)}
                    placeholder="e.g. AKTU"
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                {/* Status */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Status
                  </label>

                  <select
                    value={status}
                    onChange={(e) =>
                      setStatus(
                        e.target.value as "ACTIVE" | "INACTIVE"
                      )
                    }
                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  >
                    <option value="ACTIVE">ACTIVE</option>
                    <option value="INACTIVE">INACTIVE</option>
                  </select>
                </div>

                {/* Description */}
                <div className="md:col-span-2">
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Description
                  </label>

                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Enter course description"
                    rows={4}
                    className="w-full resize-none rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-end gap-3 border-t border-gray-200 px-6 py-4">
              <button
                type="button"
                onClick={handleCloseModal}
                disabled={saving}
                className="rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleCreateCourse}
                disabled={saving}
                className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {saving
                  ? editingCourseId !== null
                    ? "Updating..."
                    : "Creating..."
                  : editingCourseId !== null
                  ? "Update Course"
                  : "Create Course"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}