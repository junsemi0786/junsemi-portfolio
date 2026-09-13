"use client";

import { useState } from "react";
import { CaseStudy, CaseStudyFormData } from "@/types/case-study";
import Button from "@/components/ui/Button";
import toast from "react-hot-toast";

interface CaseFormProps {
  initialData?: CaseStudy;
  onSubmit: (
    data: CaseStudyFormData,
  ) => Promise<{ error?: string; success?: boolean } | void>;
  isEditing?: boolean;
}

function parseGalleryPaths(value: string) {
  return value
    .split(/[,\n]/)
    .map((path) => path.trim())
    .filter(Boolean);
}

export default function CaseForm({
  initialData,
  onSubmit,
  isEditing = false,
}: CaseFormProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<CaseStudyFormData>({
    clientName: initialData?.clientName || "",
    projectName: initialData?.projectName || "",
    period: initialData?.period || "",
    tags: initialData?.tags || [],
    thumbnailUrl: initialData?.thumbnailUrl || "",
    gallery: initialData?.gallery || [],
    summary: initialData?.summary || "",
    description: initialData?.description || "",
    outcome: initialData?.outcome || "",
    status: initialData?.status || "draft",
    order: initialData?.order || 0,
  });

  const [tagInput, setTagInput] = useState("");
  const [galleryInput, setGalleryInput] = useState(
    initialData?.gallery?.join(", ") || "",
  );

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "number" ? Number(value) : value,
    }));
  };

  const handleAddTag = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && tagInput.trim()) {
      e.preventDefault();
      if (!formData.tags.includes(tagInput.trim())) {
        setFormData((prev) => ({
          ...prev,
          tags: [...prev.tags, tagInput.trim()],
        }));
      }
      setTagInput("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const toastId = toast.loading("저장 중...");

    try {
      const res = await onSubmit({
        ...formData,
        gallery: parseGalleryPaths(galleryInput),
      });
      if (res && res.error) {
        toast.error(res.error, { id: toastId });
        setLoading(false);
        return; // Return early so loading is stopped and form state is preserved
      }
      toast.success(
        isEditing ? "수정 완료되었습니다." : "주요 실적이 등록되었습니다.",
        { id: toastId },
      );
    } catch (error) {
      // Next.js redirect는 에러 객체를 통해 작동하므로,
      // 메시지가 없거나 리다이렉트 관련 에러면 다시 throw하여 작동시킴
      if (
        error instanceof Error &&
        (error.message === "NEXT_REDIRECT" ||
          error.message.includes("redirect"))
      ) {
        toast.dismiss(toastId);
        throw error;
      }
      console.error(error);
      toast.error("저장에 실패했습니다.", { id: toastId });
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="form-container"
      style={{ maxWidth: "800px", margin: "0 auto" }}
    >
      <div className="form-group" style={{ marginBottom: "1.5rem" }}>
        <label
          htmlFor="case-projectName"
          style={{ display: "block", marginBottom: "0.5rem", fontWeight: 600 }}
        >
          프로젝트명 *
        </label>
        <input
          type="text"
          name="projectName"
          id="case-projectName"
          value={formData.projectName}
          onChange={handleChange}
          required
          style={{
            width: "100%",
            padding: "10px",
            borderRadius: "4px",
            border: "1px solid #444",
            background: "#222",
            color: "white",
          }}
        />
      </div>

      <div
        className="grid-2"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "1rem",
          marginBottom: "1.5rem",
        }}
      >
        <div className="form-group">
          <label
            htmlFor="case-clientName"
            style={{
              display: "block",
              marginBottom: "0.5rem",
              fontWeight: 600,
            }}
          >
            고객·사업장명 *
          </label>
          <input
            type="text"
            name="clientName"
            id="case-clientName"
            value={formData.clientName}
            onChange={handleChange}
            required
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "4px",
              border: "1px solid #444",
              background: "#222",
              color: "white",
            }}
          />
        </div>
        <div className="form-group">
          <label
            htmlFor="case-period"
            style={{
              display: "block",
              marginBottom: "0.5rem",
              fontWeight: 600,
            }}
          >
            작업 기간 (예: 2025.01) *
          </label>
          <input
            type="text"
            name="period"
            id="case-period"
            value={formData.period}
            onChange={handleChange}
            required
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "4px",
              border: "1px solid #444",
              background: "#222",
              color: "white",
            }}
          />
        </div>
      </div>

      <div className="form-group" style={{ marginBottom: "1.5rem" }}>
        <label
          htmlFor="case-thumbnailUrl"
          style={{ display: "block", marginBottom: "0.5rem", fontWeight: 600 }}
        >
          썸네일 이미지 경로 (예: /images/thumb.jpg) *
        </label>
        <input
          type="text"
          name="thumbnailUrl"
          id="case-thumbnailUrl"
          value={formData.thumbnailUrl}
          onChange={handleChange}
          required
          placeholder="/images/project-1.jpg"
          style={{
            width: "100%",
            padding: "10px",
            borderRadius: "4px",
            border: "1px solid #444",
            background: "#222",
            color: "white",
          }}
        />
      </div>

      <div className="form-group" style={{ marginBottom: "1.5rem" }}>
        <label
          htmlFor="case-gallery"
          style={{ display: "block", marginBottom: "0.5rem", fontWeight: 600 }}
        >
          갤러리 이미지 (선택, 쉼표 또는 줄바꿈으로 구분)
        </label>
        <p
          style={{ fontSize: "0.8rem", color: "#aaa", marginBottom: "0.5rem" }}
        >
          여러 사진의 경로를 쉼표(,) 또는 줄바꿈으로 구분하세요. 입력한 쉼표와
          줄바꿈은 저장할 때 사진 경로 목록으로 변환됩니다.
        </p>
        <textarea
          name="gallery"
          id="case-gallery"
          value={galleryInput}
          onChange={(e) => setGalleryInput(e.target.value)}
          placeholder={"/images/detail1.jpg, /images/detail2.jpg\n/images/detail3.png"}
          rows={3}
          style={{
            width: "100%",
            padding: "10px",
            borderRadius: "4px",
            border: "1px solid #444",
            background: "#222",
            color: "white",
            resize: "vertical",
          }}
        />
      </div>

      <div className="form-group" style={{ marginBottom: "1.5rem" }}>
        <label
          style={{ display: "block", marginBottom: "0.5rem", fontWeight: 600 }}
        >
          기술 태그 (입력 후 Enter)
        </label>
        <input
          type="text"
          value={tagInput}
          onChange={(e) => setTagInput(e.target.value)}
          onKeyDown={handleAddTag}
          aria-label="기술 태그 추가"
          placeholder="CIMON, SCADA, PLC, FSI Mercury..."
          style={{
            width: "100%",
            padding: "10px",
            borderRadius: "4px",
            border: "1px solid #444",
            background: "#222",
            color: "white",
          }}
        />
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "8px",
            marginTop: "0.5rem",
          }}
        >
          {formData.tags.map((tag) => (
            <span
              key={tag}
              style={{
                background: "#444",
                padding: "4px 8px",
                borderRadius: "4px",
                fontSize: "0.9rem",
                display: "flex",
                alignItems: "center",
                gap: "5px",
              }}
            >
              {tag}
              <button
                type="button"
                onClick={() => removeTag(tag)}
                style={{
                  background: "none",
                  border: "none",
                  color: "#ccc",
                  cursor: "pointer",
                }}
              >
                ×
              </button>
            </span>
          ))}
        </div>
      </div>

      <div className="form-group" style={{ marginBottom: "1.5rem" }}>
        <label
          htmlFor="case-summary"
          style={{ display: "block", marginBottom: "0.5rem", fontWeight: 600 }}
        >
          목록·검색 결과에 표시할 요약 *
        </label>
        <textarea
          name="summary"
          id="case-summary"
          value={formData.summary}
          onChange={handleChange}
          required
          rows={3}
          style={{
            width: "100%",
            padding: "10px",
            borderRadius: "4px",
            border: "1px solid #444",
            background: "#222",
            color: "white",
          }}
        />
      </div>

      <div className="form-group" style={{ marginBottom: "1.5rem" }}>
        <label
          htmlFor="case-outcome"
          style={{ display: "block", marginBottom: "0.5rem", fontWeight: 600 }}
        >
          확인된 작업 결과 (측정 근거가 있는 내용만)
        </label>
        <input
          type="text"
          name="outcome"
          id="case-outcome"
          value={formData.outcome}
          onChange={handleChange}
          style={{
            width: "100%",
            padding: "10px",
            borderRadius: "4px",
            border: "1px solid #444",
            background: "#222",
            color: "white",
          }}
        />
      </div>

      <div className="form-group" style={{ marginBottom: "1.5rem" }}>
        <label
          htmlFor="case-description"
          style={{ display: "block", marginBottom: "0.5rem", fontWeight: 600 }}
        >
          상세 작업 내용 (## 제목, 줄바꿈 지원) *
        </label>
        <textarea
          name="description"
          id="case-description"
          placeholder={
            "## 현장 문제\n어떤 문제가 있었는지\n\n## 수행 작업\n실제로 변경한 범위\n\n## 확인 결과\n시운전과 인수인계 내용"
          }
          value={formData.description}
          onChange={handleChange}
          required
          rows={10}
          style={{
            width: "100%",
            padding: "10px",
            borderRadius: "4px",
            border: "1px solid #444",
            background: "#222",
            color: "white",
          }}
        />
      </div>

      <div
        className="grid-2"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "1rem",
          marginBottom: "2rem",
        }}
      >
        <div className="form-group">
          <label
            htmlFor="case-status"
            style={{
              display: "block",
              marginBottom: "0.5rem",
              fontWeight: 600,
            }}
          >
            공개 상태
          </label>
          <select
            name="status"
            id="case-status"
            value={formData.status}
            onChange={handleChange}
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "4px",
              border: "1px solid #444",
              background: "#222",
              color: "white",
            }}
          >
            <option value="draft">초안 (외부 비공개)</option>
            <option value="published">공개</option>
          </select>
        </div>
        <div className="form-group">
          <label
            htmlFor="case-order"
            style={{
              display: "block",
              marginBottom: "0.5rem",
              fontWeight: 600,
            }}
          >
            표시 순서
          </label>
          <input
            type="number"
            name="order"
            id="case-order"
            value={formData.order}
            onChange={handleChange}
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "4px",
              border: "1px solid #444",
              background: "#222",
              color: "white",
            }}
          />
        </div>
      </div>

      <div
        className="actions"
        style={{ display: "flex", justifyContent: "flex-end", gap: "1rem" }}
      >
        <Button
          type="button"
          variant="outline"
          onClick={() => window.history.back()}
        >
          취소
        </Button>
        <Button type="submit" disabled={loading}>
          {loading
            ? "저장 중..."
            : isEditing
              ? "프로젝트 수정"
              : "프로젝트 추가"}
        </Button>
      </div>
    </form>
  );
}
