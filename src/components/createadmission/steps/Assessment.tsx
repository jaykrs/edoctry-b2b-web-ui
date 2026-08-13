"use client";

import React, { useState, useEffect, useCallback, FormEvent } from "react";
import TextHeading from "@/components/ui/textheader/TextHeader";

export type AssessmentData = {
  assessment_id: string;
  application_id: string;
  written_test: {
    test_code: string;
    score_obtained: number | "";
    max_score: number | "";
    percentile: number | "";
    status: string;
  };
  interview_evaluation: {
    panel_id: string;
    evaluators: string[];
    scores: {
      technical_aptitude: number | "";
      communication_skills: number | "";
      problem_solving: number | "";
    };
    max_score_per_metric: number | "";
    overall_feedback: string;
  };
  aggregate_eval_score: number | "";
  evaluation_result: string;
};

type AssessmentProps = {
  onNext?: (data?: any) => void;
  onBack?: () => void;
  data?: Partial<AssessmentData> & Record<string, any>;
  onChange?: (data: any) => void;
  strapiId?: string | number | null;
  assessmentId?: string;
  apiEndpoint?: string;
};

type ErrorsType = Record<string, string>;

const initialAssessmentState: AssessmentData = {
  assessment_id: "",
  application_id: "",
  written_test: {
    test_code: "",
    score_obtained: 0,
    max_score: 100,
    percentile: 0,
    status: "",
  },
  interview_evaluation: {
    panel_id: "",
    evaluators: [],
    scores: {
      technical_aptitude: 0,
      communication_skills: 0,
      problem_solving: 0,
    },
    max_score_per_metric: 10,
    overall_feedback: "",
  },
  aggregate_eval_score: 0,
  evaluation_result: "",
};

function mergeInitialData(incomingData?: Partial<AssessmentData> & Record<string, any>): AssessmentData {
  if (!incomingData || Object.keys(incomingData).length === 0) {
    return initialAssessmentState;
  }

  // Handle Strapi v4 wrapper if present (attributes)
  const item = incomingData.attributes || incomingData;

  return {
    ...initialAssessmentState,
    assessment_id: item.applicant_id || incomingData.assessment_id || "",
    application_id: item.applicant_id || incomingData.application_id || "",
    written_test: {
      ...initialAssessmentState.written_test,
      ...(item.Assessmentwritten || item.written_test || {}),
    },
    interview_evaluation: {
      ...initialAssessmentState.interview_evaluation,
      ...(item.Assessmentinterview || item.interview_evaluation || {}),
      scores: {
        ...initialAssessmentState.interview_evaluation.scores,
        ...(item.Assessmentinterview?.scores || item.interview_evaluation?.scores || {}),
      },
    },
    aggregate_eval_score: item.aggregateevalscore ?? item.aggregate_eval_score ?? initialAssessmentState.aggregate_eval_score,
    evaluation_result: item.evaluationresult || item.evaluation_result || initialAssessmentState.evaluation_result,
  };
}

export default function Assessment({
  onNext,
  onBack,
  data,
  onChange,
  strapiId,
  assessmentId,
  apiEndpoint = "http://localhost:1337/api/admission-workflows",
}: AssessmentProps) {
  const [formData, setFormData] = useState<AssessmentData>(() => mergeInitialData(data));
  const [evaluatorsInput, setEvaluatorsInput] = useState<string>(
    () => (formData.interview_evaluation?.evaluators || []).join(", ")
  );

  const [errors, setErrors] = useState<ErrorsType>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const targetRecordId = strapiId || data?.documentId || data?.id || assessmentId;

  // Sync state if incoming props change
  useEffect(() => {
    if (data && Object.keys(data).length > 0) {
      const merged = mergeInitialData(data);
      setFormData(merged);
      setEvaluatorsInput((merged.interview_evaluation?.evaluators || []).join(", "));
    }
  }, [data]);

  // Fetch remote data if record ID exists and no explicit local data was provided
  useEffect(() => {
    if (targetRecordId && (!data || Object.keys(data).length === 0)) {
      const controller = new AbortController();

      const fetchAssessmentData = async () => {
        setIsLoading(true);
        setApiError(null);
        try {

const token =
  typeof window !== "undefined"
    ? localStorage.getItem("jwt_token")
    : null;

const response = await fetch(`${apiEndpoint}/${targetRecordId}`, {
  signal: controller.signal,
  headers: {
    ...(token && {
      Authorization: `Bearer ${token}`,
    }),
  },
});
          if (!response.ok) throw new Error("Failed to fetch assessment data.");
          const result = await response.json();
          const fetchedData = result.data || result;
          const merged = mergeInitialData(fetchedData);

          setFormData(merged);
          setEvaluatorsInput((merged.interview_evaluation?.evaluators || []).join(", "));
        } catch (err: any) {
          if (err.name !== "AbortError") {
            const msg = err instanceof Error ? err.message : "Something went wrong while fetching data.";
            setApiError(msg);
          }
        } finally {
          setIsLoading(false);
        }
      };

      fetchAssessmentData();
      return () => controller.abort();
    }
  }, [targetRecordId, apiEndpoint, data]);

  const updateFormField = useCallback((path: string[], value: any) => {
    setFormData((prev) => {
      const updateNested = (obj: any, keys: string[]): any => {
        const [first, ...rest] = keys;
        if (!rest.length) {
          return { ...obj, [first]: value };
        }
        return {
          ...obj,
          [first]: updateNested(obj[first] || {}, rest),
        };
      };
      return updateNested(prev, path);
    });
  }, []);

  const clearError = (key: string) => {
    if (errors[key]) {
      setErrors((prev) => {
        const updated = { ...prev };
        delete updated[key];
        return updated;
      });
    }
  };

  const validate = (): boolean => {
    const newErrors: ErrorsType = {};

    if (!formData.assessment_id.trim()) newErrors.assessment_id = "Assessment ID is required.";
    if (!formData.application_id.trim()) newErrors.application_id = "Application ID is required.";

    // Written Test Validation
    if (!formData.written_test.test_code.trim()) newErrors.test_code = "Test Code is required.";
    
    const maxScore = Number(formData.written_test.max_score);
    const scoreObtained = Number(formData.written_test.score_obtained);
    const percentile = Number(formData.written_test.percentile);

    if (formData.written_test.max_score === "" || maxScore <= 0) {
      newErrors.max_score = "Maximum score must be greater than 0.";
    }
    
    if (formData.written_test.score_obtained === "" || scoreObtained < 0) {
      newErrors.score_obtained = "Score obtained cannot be negative or empty.";
    } else if (maxScore > 0 && scoreObtained > maxScore) {
      newErrors.score_obtained = `Score cannot exceed Max Score (${maxScore}).`;
    }

    if (formData.written_test.percentile === "" || percentile < 0 || percentile > 100) {
      newErrors.percentile = "Percentile must be between 0 and 100.";
    }
    
    if (!formData.written_test.status) newErrors.written_status = "Please select a written test status.";

    // Interview Evaluation Validation
    if (!formData.interview_evaluation.panel_id.trim()) newErrors.panel_id = "Panel ID is required.";

    const parsedEvaluators = evaluatorsInput
      .split(",")
      .map((e) => e.trim())
      .filter(Boolean);

    if (parsedEvaluators.length === 0) {
      newErrors.evaluators = "At least one evaluator name is required.";
    }

    const maxMetric = Number(formData.interview_evaluation.max_score_per_metric);
    if (formData.interview_evaluation.max_score_per_metric === "" || maxMetric <= 0) {
      newErrors.max_score_per_metric = "Max score per metric must be greater than 0.";
    }

    const { technical_aptitude, communication_skills, problem_solving } = formData.interview_evaluation.scores;

    const validateMetric = (scoreVal: number | "", key: string, label: string) => {
      const score = Number(scoreVal);
      if (scoreVal === "" || score <= 0) {
        newErrors[key] = `${label} score is required and must be greater than 0.`;
      } else if (maxMetric > 0 && score > maxMetric) {
        newErrors[key] = `${label} score cannot exceed ${maxMetric}.`;
      }
    };

    validateMetric(technical_aptitude, "technical_aptitude", "Technical Aptitude");
    validateMetric(communication_skills, "communication_skills", "Communication Skills");
    validateMetric(problem_solving, "problem_solving", "Problem Solving");

    if (!formData.interview_evaluation.overall_feedback.trim()) {
      newErrors.overall_feedback = "Overall feedback is required.";
    }

    // Final Evaluation Validation
    const aggScore = Number(formData.aggregate_eval_score);
    if (formData.aggregate_eval_score === "" || aggScore <= 0 || aggScore > 100) {
      newErrors.aggregate_eval_score = "Aggregate score must be between 0.1 and 100.";
    }
    if (!formData.evaluation_result) {
      newErrors.evaluation_result = "Please select an evaluation result.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = async (e?: FormEvent) => {
    if (e) e.preventDefault();
    if (!validate()) return;

    const cleanedEvaluators = evaluatorsInput
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);

    // Map exact Strapi schema field names
    const strapiPayload = {
      applicant_id: formData.application_id,

      // JSON fields in Strapi
      Assessmentwritten: {
        test_code: formData.written_test.test_code,
        score_obtained: formData.written_test.score_obtained,
        max_score: formData.written_test.max_score,
        percentile: formData.written_test.percentile,
        status: formData.written_test.status,
      },
      Assessmentinterview: {
        panel_id: formData.interview_evaluation.panel_id,
        evaluators: cleanedEvaluators,
        scores: formData.interview_evaluation.scores,
        max_score_per_metric: formData.interview_evaluation.max_score_per_metric,
        overall_feedback: formData.interview_evaluation.overall_feedback,
      },

      // Number & Enumeration fields in Strapi
      aggregateevalscore: formData.aggregate_eval_score,
      evaluationresult: formData.evaluation_result,
    };

    setApiError(null);
    setIsSubmitting(true);

    try {
      const isUpdate = Boolean(targetRecordId);
      const url = isUpdate ? `${apiEndpoint}/${targetRecordId}` : apiEndpoint;
      const method = isUpdate ? "PUT" : "POST";

      const token = typeof window !== "undefined" ? localStorage.getItem("jwt_token") : null;

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
        body: JSON.stringify({
          data: {
            ...(data || {}),
            ...strapiPayload,
          },
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(
          errorData?.error?.message ||
            `Server responded with status ${response.status}`
        );
      }

      const responseData = await response.json();
      const updatedRecord = responseData.data || responseData;

      alert("Data saved successfully to Strapi!");

      if (onChange) onChange(updatedRecord);
      if (onNext) onNext(updatedRecord);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "An unexpected error occurred while saving.";
      setApiError(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return <div className="p-6 text-center text-gray-500">Loading assessment data...</div>;
  }

  return (
    <div className="p-6">
      <TextHeading title="Assessment & Evaluation" />

      {apiError && (
        <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded text-sm" role="alert">
          {apiError}
        </div>
      )}

      <form onSubmit={handleNext}>
        <div className="grid grid-cols-2 gap-4 mt-6">
          {/* Assessment ID */}
          <div>
            <label htmlFor="assessment_id" className="font-medium text-sm block mb-1">
              Assessment ID <span className="text-red-500">*</span>
            </label>
            <input
              id="assessment_id"
              className={`w-full border rounded p-2 ${errors.assessment_id ? "border-red-500 focus:outline-red-500" : ""}`}
              value={formData.assessment_id}
              onChange={(e) => {
                clearError("assessment_id");
                updateFormField(["assessment_id"], e.target.value);
              }}
            />
            {errors.assessment_id && <p className="text-red-500 text-xs mt-1">{errors.assessment_id}</p>}
          </div>

          {/* Application ID */}
          <div>
            <label htmlFor="application_id" className="font-medium text-sm block mb-1">
              Application ID <span className="text-red-500">*</span>
            </label>
            <input
              id="application_id"
              className={`w-full border rounded p-2 ${errors.application_id ? "border-red-500 focus:outline-red-500" : ""}`}
              value={formData.application_id}
              onChange={(e) => {
                clearError("application_id");
                updateFormField(["application_id"], e.target.value);
              }}
            />
            {errors.application_id && <p className="text-red-500 text-xs mt-1">{errors.application_id}</p>}
          </div>

          {/* Written Test Section */}
          <h2 className="col-span-2 text-xl font-bold mt-4">Written Test</h2>

          {/* Test Code */}
          <div>
            <label htmlFor="test_code" className="font-medium text-sm block mb-1">
              Test Code <span className="text-red-500">*</span>
            </label>
            <input
              id="test_code"
              placeholder="e.g. INST-PAT-2026"
              className={`w-full border rounded p-2 ${errors.test_code ? "border-red-500 focus:outline-red-500" : ""}`}
              value={formData.written_test.test_code}
              onChange={(e) => {
                clearError("test_code");
                updateFormField(["written_test", "test_code"], e.target.value);
              }}
            />
            {errors.test_code && <p className="text-red-500 text-xs mt-1">{errors.test_code}</p>}
          </div>

          {/* Max Score */}
          <div>
            <label htmlFor="max_score" className="font-medium text-sm block mb-1">
              Maximum Score <span className="text-red-500">*</span>
            </label>
            <input
              id="max_score"
              type="number"
              placeholder="e.g. 100"
              className={`w-full border rounded p-2 ${errors.max_score ? "border-red-500 focus:outline-red-500" : ""}`}
              value={formData.written_test.max_score ?? ""}
              onChange={(e) => {
                clearError("max_score");
                const val = e.target.value;
                updateFormField(["written_test", "max_score"], val === "" ? "" : Number(val));
              }}
            />
            {errors.max_score && <p className="text-red-500 text-xs mt-1">{errors.max_score}</p>}
          </div>

          {/* Score Obtained */}
          <div>
            <label htmlFor="score_obtained" className="font-medium text-sm block mb-1">
              Score Obtained <span className="text-red-500">*</span>
            </label>
            <input
              id="score_obtained"
              type="number"
              step="0.1"
              placeholder="e.g. 88.5"
              className={`w-full border rounded p-2 ${errors.score_obtained ? "border-red-500 focus:outline-red-500" : ""}`}
              value={formData.written_test.score_obtained ?? ""}
              onChange={(e) => {
                clearError("score_obtained");
                const val = e.target.value;
                updateFormField(["written_test", "score_obtained"], val === "" ? "" : Number(val));
              }}
            />
            {errors.score_obtained && <p className="text-red-500 text-xs mt-1">{errors.score_obtained}</p>}
          </div>

          {/* Percentile */}
          <div>
            <label htmlFor="percentile" className="font-medium text-sm block mb-1">
              Percentile <span className="text-red-500">*</span>
            </label>
            <input
              id="percentile"
              type="number"
              step="0.1"
              placeholder="e.g. 94.2"
              className={`w-full border rounded p-2 ${errors.percentile ? "border-red-500 focus:outline-red-500" : ""}`}
              value={formData.written_test.percentile ?? ""}
              onChange={(e) => {
                clearError("percentile");
                const val = e.target.value;
                updateFormField(["written_test", "percentile"], val === "" ? "" : Number(val));
              }}
            />
            {errors.percentile && <p className="text-red-500 text-xs mt-1">{errors.percentile}</p>}
          </div>

          {/* Status */}
          <div className="col-span-2">
            <label htmlFor="written_status" className="font-medium text-sm block mb-1">
              Status <span className="text-red-500">*</span>
            </label>
            <select
              id="written_status"
              className={`w-full border rounded p-2 ${errors.written_status ? "border-red-500 focus:outline-red-500" : ""}`}
              value={formData.written_test.status}
              onChange={(e) => {
                clearError("written_status");
                updateFormField(["written_test", "status"], e.target.value);
              }}
            >
              <option value="">Select Status</option>
              <option value="PASSED">PASSED</option>
              <option value="FAILED">FAILED</option>
            </select>
            {errors.written_status && <p className="text-red-500 text-xs mt-1">{errors.written_status}</p>}
          </div>

          {/* Interview Evaluation Section */}
          <h2 className="col-span-2 text-xl font-bold mt-4">Interview Evaluation</h2>

          {/* Panel ID */}
          <div>
            <label htmlFor="panel_id" className="font-medium text-sm block mb-1">
              Panel ID <span className="text-red-500">*</span>
            </label>
            <input
              id="panel_id"
              placeholder="e.g. PANEL-TECH-04"
              className={`w-full border rounded p-2 ${errors.panel_id ? "border-red-500 focus:outline-red-500" : ""}`}
              value={formData.interview_evaluation.panel_id}
              onChange={(e) => {
                clearError("panel_id");
                updateFormField(["interview_evaluation", "panel_id"], e.target.value);
              }}
            />
            {errors.panel_id && <p className="text-red-500 text-xs mt-1">{errors.panel_id}</p>}
          </div>

          {/* Evaluators */}
          <div>
            <label htmlFor="evaluators" className="font-medium text-sm block mb-1">
              Evaluators (comma-separated) <span className="text-red-500">*</span>
            </label>
            <input
              id="evaluators"
              placeholder="Dr. A. Mehta, Prof. S. Rao"
              className={`w-full border rounded p-2 ${errors.evaluators ? "border-red-500 focus:outline-red-500" : ""}`}
              value={evaluatorsInput}
              onChange={(e) => {
                clearError("evaluators");
                setEvaluatorsInput(e.target.value);
              }}
            />
            {errors.evaluators && <p className="text-red-500 text-xs mt-1">{errors.evaluators}</p>}
          </div>

          {/* Max Score Per Metric */}
          <div className="col-span-2">
            <label htmlFor="max_score_per_metric" className="font-medium text-sm block mb-1">
              Max Score Per Metric <span className="text-red-500">*</span>
            </label>
            <input
              id="max_score_per_metric"
              type="number"
              placeholder="e.g. 10"
              className={`w-full border rounded p-2 ${errors.max_score_per_metric ? "border-red-500 focus:outline-red-500" : ""}`}
              value={formData.interview_evaluation.max_score_per_metric ?? ""}
              onChange={(e) => {
                clearError("max_score_per_metric");
                const val = e.target.value;
                updateFormField(["interview_evaluation", "max_score_per_metric"], val === "" ? "" : Number(val));
              }}
            />
            {errors.max_score_per_metric && (
              <p className="text-red-500 text-xs mt-1">{errors.max_score_per_metric}</p>
            )}
          </div>

          {/* Technical Aptitude */}
          <div>
            <label htmlFor="technical_aptitude" className="font-medium text-sm block mb-1">
              Technical Aptitude <span className="text-red-500">*</span>
            </label>
            <input
              id="technical_aptitude"
              type="number"
              placeholder="e.g. 8"
              className={`w-full border rounded p-2 ${errors.technical_aptitude ? "border-red-500 focus:outline-red-500" : ""}`}
              value={formData.interview_evaluation.scores.technical_aptitude ?? ""}
              onChange={(e) => {
                clearError("technical_aptitude");
                const val = e.target.value;
                updateFormField(
                  ["interview_evaluation", "scores", "technical_aptitude"],
                  val === "" ? "" : Number(val)
                );
              }}
            />
            {errors.technical_aptitude && <p className="text-red-500 text-xs mt-1">{errors.technical_aptitude}</p>}
          </div>

          {/* Communication Skills */}
          <div>
            <label htmlFor="communication_skills" className="font-medium text-sm block mb-1">
              Communication Skills <span className="text-red-500">*</span>
            </label>
            <input
              id="communication_skills"
              type="number"
              placeholder="e.g. 9"
              className={`w-full border rounded p-2 ${errors.communication_skills ? "border-red-500 focus:outline-red-500" : ""}`}
              value={formData.interview_evaluation.scores.communication_skills ?? ""}
              onChange={(e) => {
                clearError("communication_skills");
                const val = e.target.value;
                updateFormField(
                  ["interview_evaluation", "scores", "communication_skills"],
                  val === "" ? "" : Number(val)
                );
              }}
            />
            {errors.communication_skills && (
              <p className="text-red-500 text-xs mt-1">{errors.communication_skills}</p>
            )}
          </div>

          {/* Problem Solving */}
          <div className="col-span-2">
            <label htmlFor="problem_solving" className="font-medium text-sm block mb-1">
              Problem Solving <span className="text-red-500">*</span>
            </label>
            <input
              id="problem_solving"
              type="number"
              placeholder="e.g. 8"
              className={`w-full border rounded p-2 ${errors.problem_solving ? "border-red-500 focus:outline-red-500" : ""}`}
              value={formData.interview_evaluation.scores.problem_solving ?? ""}
              onChange={(e) => {
                clearError("problem_solving");
                const val = e.target.value;
                updateFormField(
                  ["interview_evaluation", "scores", "problem_solving"],
                  val === "" ? "" : Number(val)
                );
              }}
            />
            {errors.problem_solving && <p className="text-red-500 text-xs mt-1">{errors.problem_solving}</p>}
          </div>

          {/* Overall Feedback */}
          <div className="col-span-2">
            <label htmlFor="overall_feedback" className="font-medium text-sm block mb-1">
              Overall Feedback <span className="text-red-500">*</span>
            </label>
            <textarea
              id="overall_feedback"
              placeholder="Write evaluation feedback here..."
              className={`w-full border rounded p-2 ${errors.overall_feedback ? "border-red-500 focus:outline-red-500" : ""}`}
              rows={4}
              value={formData.interview_evaluation.overall_feedback}
              onChange={(e) => {
                clearError("overall_feedback");
                updateFormField(["interview_evaluation", "overall_feedback"], e.target.value);
              }}
            />
            {errors.overall_feedback && <p className="text-red-500 text-xs mt-1">{errors.overall_feedback}</p>}
          </div>

          {/* Final Evaluation Section */}
          <h2 className="col-span-2 text-xl font-bold mt-4">Final Evaluation</h2>

          {/* Aggregate Score */}
          <div>
            <label htmlFor="aggregate_eval_score" className="font-medium text-sm block mb-1">
              Aggregate Evaluation Score <span className="text-red-500">*</span>
            </label>
            <input
              id="aggregate_eval_score"
              type="number"
              step="0.1"
              placeholder="e.g. 87.2"
              className={`w-full border rounded p-2 ${errors.aggregate_eval_score ? "border-red-500 focus:outline-red-500" : ""}`}
              value={formData.aggregate_eval_score ?? ""}
              onChange={(e) => {
                clearError("aggregate_eval_score");
                const val = e.target.value;
                updateFormField(["aggregate_eval_score"], val === "" ? "" : Number(val));
              }}
            />
            {errors.aggregate_eval_score && (
              <p className="text-red-500 text-xs mt-1">{errors.aggregate_eval_score}</p>
            )}
          </div>
{/* Evaluation Result */}
<div>
  <label htmlFor="evaluation_result" className="font-medium text-sm block mb-1">
    Evaluation Result <span className="text-red-500">*</span>
  </label>
  <select
    id="evaluation_result"
    className={`w-full border rounded p-2 ${errors.evaluation_result ? "border-red-500 focus:outline-red-500" : ""}`}
    value={formData.evaluation_result}
    onChange={(e) => {
      clearError("evaluation_result");
      updateFormField(["evaluation_result"], e.target.value);
    }}
  >
    <option value="">Select Result</option>
    <option value="Pending">Pending</option>
    <option value="Passed">Passed</option>
    <option value="Failed">Failed</option>
    <option value="Waitlisted">Waitlisted</option>
    <option value="Rejected">Rejected</option>
  </select>
  {errors.evaluation_result && <p className="text-red-500 text-xs mt-1">{errors.evaluation_result}</p>}
</div>
          
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between mt-8">
          {onBack && (
            <button
              type="button"
              onClick={onBack}
              disabled={isSubmitting}
              className="px-5 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 disabled:opacity-50 transition"
            >
              Back
            </button>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="px-5 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 font-medium flex items-center space-x-2 transition ml-auto"
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                </svg>
                <span>Saving...</span>
              </>
            ) : (
              <span>Submit / Save →</span>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}