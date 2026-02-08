'use client';

import { useState, FormEvent } from 'react';
import Button from '@/components/ui/Button';
import styles from './ContactForm.module.css';
import { submitInquiry } from '@/app/actions/email';

export default function ContactForm() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitError(null);

        const formData = new FormData(e.currentTarget);

        try {
            const result = await submitInquiry(formData);
            if (result.success) {
                setIsSubmitted(true);
            } else {
                setSubmitError(result.message || '오류가 발생했습니다.');
            }
        } catch {
            setSubmitError('네트워크 오류가 발생했습니다.');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isSubmitted) {
        return (
            <div className={styles.successMessage}>
                <div className={styles.checkIcon}>✓</div>
                <h3>견적 요청이 접수되었습니다!</h3>
                <p>담당 엔지니어가 검토 후 24시간 이내에<br />입력하신 연락처로 회신 드리겠습니다.</p>
                <Button onClick={() => setIsSubmitted(false)} variant="outline">
                    추가 문의하기
                </Button>
            </div>
        );
    }

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <h3 className={styles.formTitle}>견적 및 긴급 지원 요청</h3>

            <div className={styles.grid}>
                <div className={styles.field}>
                    <label htmlFor="company">회사/기관명 <span className={styles.required}>*</span></label>
                    <input type="text" id="company" name="company" required placeholder="예: 한국반도체, 부천시청" />
                </div>

                <div className={styles.field}>
                    <label htmlFor="name">담당자 성함 <span className={styles.required}>*</span></label>
                    <input type="text" id="name" name="name" required placeholder="홍길동 과장" />
                </div>

                <div className={styles.field}>
                    <label htmlFor="phone">연락처 <span className={styles.required}>*</span></label>
                    <input type="tel" id="phone" name="phone" required placeholder="010-0000-0000" />
                </div>

                <div className={styles.field}>
                    <label htmlFor="email">이메일</label>
                    <input type="email" id="email" name="email" placeholder="email@company.com" />
                </div>
            </div>

            <div className={styles.field}>
                <label htmlFor="type">문의 유형</label>
                <select id="type" name="type">
                    <option value="retrofit">장비 리퍼비시/개조</option>
                    <option value="scada">SCADA/HMI 구축</option>
                    <option value="plc">PLC 자동화 제어</option>
                    <option value="repair">긴급 수리/유지보수</option>
                    <option value="other">기타 기술 문의</option>
                </select>
            </div>

            <div className={styles.field}>
                <label htmlFor="message">상세 내용 <span className={styles.required}>*</span></label>
                <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    placeholder="현재 발생한 문제점이나 필요하신 사양을 자세히 적어주시면 정확한 견적이 가능합니다."
                ></textarea>
            </div>

            {submitError && (
                <div style={{ color: 'red', marginBottom: '1rem', textAlign: 'center' }}>
                    {submitError}
                </div>
            )}

            <div className={styles.submitWrapper}>
                <Button type="submit" fullWidth disabled={isSubmitting}>
                    {isSubmitting ? '전송 중...' : '견적 요청하기'}
                </Button>
            </div>
        </form>
    );
}
