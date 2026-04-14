import React from 'react';

export const metadata = {
  title: '이용약관 | 반도체 WET 세정설비 개조개선 전문',
  description: '서비스 이용약관입니다.',
};

export default function TermsPage() {
  return (
    <main style={{ padding: '4rem 2rem', maxWidth: '800px', margin: '0 auto', lineHeight: '1.6' }}>
      <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '2rem' }}>이용약관</h1>
      <section style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>제1조 (목적)</h2>
        <p>본 약관은 회사가 제공하는 서비스의 이용과 관련하여 회사와 회원 간의 권리, 의무 및 책임사항 등을 규정함을 목적으로 합니다.</p>
      </section>
      <section style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>제2조 (정의)</h2>
        <p>본 약관에서 사용하는 용어의 정의는 다음과 같습니다. (내용 추가 필요)</p>
      </section>
      <section style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>제3조 (약관의 효력 및 변경)</h2>
        <p>본 약관은 서비스를 이용하고자 하는 모든 회원에 대하여 그 효력을 발생합니다. 회사는 필요하다고 인정되는 경우 본 약관을 변경할 수 있습니다.</p>
      </section>
      <p style={{ marginTop: '2rem', color: '#666' }}>※ 본 이용약관은 기본 템플릿이며, 실제 서비스에 맞게 수정이 필요합니다.</p>
    </main>
  );
}
