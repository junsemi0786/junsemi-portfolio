import React from 'react';

export const metadata = {
  title: '개인정보처리방침 | 반도체 WET 세정설비 개조개선 전문',
  description: '서비스 개인정보처리방침입니다.',
};

export default function PrivacyPage() {
  return (
    <main style={{ padding: '4rem 2rem', maxWidth: '800px', margin: '0 auto', lineHeight: '1.6' }}>
      <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '2rem' }}>개인정보처리방침</h1>
      <section style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>1. 개인정보의 처리 목적</h2>
        <p>회사는 다음의 목적을 위하여 개인정보를 처리합니다. 처리하고 있는 개인정보는 다음의 목적 이외의 용도로는 이용되지 않으며, 이용 목적이 변경되는 경우에는 사전 동의를 구하는 등 필요한 조치를 이행할 예정입니다.</p>
        <ul style={{ listStyleType: 'disc', paddingLeft: '1.5rem', marginTop: '0.5rem' }}>
          <li>서비스 제공 및 계약의 이행</li>
          <li>회원 관리 및 고객 상담</li>
        </ul>
      </section>
      <section style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>2. 수집하는 개인정보 항목</h2>
        <p>회사는 고객 문의 및 상담 등을 위해 아래와 같은 개인정보를 수집하고 있습니다. (내용 추가 필요)</p>
      </section>
      <section style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>3. 개인정보의 파기</h2>
        <p>회사는 원칙적으로 개인정보 처리목적이 달성된 경우에는 지체 없이 해당 개인정보를 파기합니다.</p>
      </section>
      <p style={{ marginTop: '2rem', color: '#666' }}>※ 본 개인정보처리방침은 기본 템플릿이며, 실제 서비스에 맞게 및 수정이 필요합니다.</p>
    </main>
  );
}
