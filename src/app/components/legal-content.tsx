type LegalSection = {
  title: string;
  body: string[];
};

type LegalDocument = {
  title: string;
  description: string;
  effectiveDate: string;
  sections: LegalSection[];
};

export const privacyDocument: LegalDocument = {
  title: "개인정보 처리방침",
  description:
    "오브제두 웹사이트 이용 과정에서 수집될 수 있는 개인정보의 처리 기준을 안내하는 목업 문서입니다.",
  effectiveDate: "2026.04.22",
  sections: [
    {
      title: "1. 수집하는 개인정보 항목",
      body: [
        "오브제두는 문의 접수, 주문 처리, 배송 안내를 위해 이름, 연락처, 이메일, 배송지 정보를 수집할 수 있습니다.",
        "결제 연동이 도입되는 경우 결제 수단 확인에 필요한 최소한의 정보가 외부 결제 서비스사를 통해 처리될 수 있습니다.",
      ],
    },
    {
      title: "2. 개인정보 수집 및 이용 목적",
      body: [
        "상품 주문 확인, 배송 진행, 고객 문의 응대, 공지 전달을 위해 개인정보를 이용합니다.",
        "서비스 개선을 위해 접속 기록이나 이용 환경 등의 비식별 정보가 통계 형태로 활용될 수 있습니다.",
      ],
    },
    {
      title: "3. 보유 및 이용 기간",
      body: [
        "관계 법령에 따른 보관 의무가 없는 경우, 개인정보는 수집 및 이용 목적이 달성된 후 지체 없이 파기합니다.",
        "단, 전자상거래 관련 법령에 따라 주문 및 결제 기록은 일정 기간 보관될 수 있습니다.",
      ],
    },
    {
      title: "4. 제3자 제공 및 처리 위탁",
      body: [
        "오브제두는 원칙적으로 이용자의 개인정보를 외부에 제공하지 않습니다.",
        "배송, 결제, 메시지 발송 등 서비스 운영상 필요한 경우에 한해 관련 업체에 최소한의 범위로 위탁할 수 있으며, 실제 운영 시 해당 업체 정보를 명시합니다.",
      ],
    },
    {
      title: "5. 이용자의 권리",
      body: [
        "이용자는 언제든지 본인의 개인정보 열람, 정정, 삭제, 처리 정지를 요청할 수 있습니다.",
        "요청은 공식 문의 채널을 통해 접수되며, 확인 후 지체 없이 필요한 조치를 진행합니다.",
      ],
    },
    {
      title: "6. 문의처",
      body: [
        "브랜드명: objetdoux / 오브제두",
        "이메일: hello@objetdoux.com",
        "본 문서는 목업 단계의 예시 문안이며, 실제 오픈 전 법률 검토 후 최종 반영이 필요합니다.",
      ],
    },
  ],
};

export const termsDocument: LegalDocument = {
  title: "이용약관",
  description:
    "오브제두 웹사이트 및 향후 온라인 스토어 이용에 관한 기본 약관을 정리한 목업 문서입니다.",
  effectiveDate: "2026.04.22",
  sections: [
    {
      title: "1. 목적",
      body: [
        "이 약관은 오브제두가 운영하는 웹사이트에서 제공하는 서비스의 이용 조건과 절차, 이용자와 브랜드의 권리 및 의무를 정하는 것을 목적으로 합니다.",
      ],
    },
    {
      title: "2. 서비스 내용",
      body: [
        "오브제두는 브랜드 소개, 상품 정보 제공, 문의 접수, 추후 온라인 구매 기능 등을 제공할 수 있습니다.",
        "현재 사이트는 목업 및 준비 단계가 포함되어 있으며, 실제 판매 정책은 오픈 시점에 맞춰 별도 고지될 수 있습니다.",
      ],
    },
    {
      title: "3. 주문 및 계약의 성립",
      body: [
        "이용자가 상품을 주문하고 브랜드가 이를 확인한 시점에 계약이 성립합니다.",
        "품절, 가격 오기재, 시스템 오류 등 불가피한 사유가 있는 경우 주문이 조정되거나 취소될 수 있습니다.",
      ],
    },
    {
      title: "4. 결제 및 배송",
      body: [
        "결제는 사이트 내에서 제공하는 결제 수단을 통해 진행되며, 실제 결제 처리에는 외부 결제 서비스가 사용될 수 있습니다.",
        "배송 일정, 배송비, 제주 및 도서산간 추가 비용 등은 상품 또는 주문 단계에서 별도로 안내됩니다.",
      ],
    },
    {
      title: "5. 교환 및 반품",
      body: [
        "이용자는 관계 법령과 브랜드 정책에 따라 교환 및 반품을 요청할 수 있습니다.",
        "도자기 제품 특성상 미세한 톤 차이, 유약의 흐름, 작은 점 등은 제품 불량이 아닌 자연스러운 개체 차이로 안내될 수 있습니다.",
      ],
    },
    {
      title: "6. 지식재산권",
      body: [
        "사이트에 포함된 이미지, 문구, 로고, 디자인, 제품 설명 등은 오브제두 또는 정당한 권리자에게 권리가 있습니다.",
        "브랜드의 사전 동의 없이 이를 복제, 배포, 수정, 상업적으로 이용할 수 없습니다.",
      ],
    },
    {
      title: "7. 면책 및 기타",
      body: [
        "천재지변, 시스템 장애, 물류 지연 등 브랜드가 통제하기 어려운 사유로 서비스 제공이 지연될 수 있습니다.",
        "본 문서는 목업 단계의 예시 약관이며, 실제 오픈 전 운영 정책과 법률 검토를 반영한 최종본으로 교체되어야 합니다.",
      ],
    },
  ],
};

export function LegalContent({
  document,
  compact = false,
}: {
  document: LegalDocument;
  compact?: boolean;
}) {
  return (
    <div>
      <h1 className="text-3xl font-semibold tracking-[-0.04em] text-stone-950 sm:text-4xl">
        {document.title}
      </h1>
      <p className="mt-3 text-sm leading-6 text-stone-600 sm:text-[15px]">
        {document.description}
      </p>
      <p className="mt-2 text-xs text-stone-400 sm:text-sm">
        시행예정일: {document.effectiveDate}
      </p>

      <div className={compact ? "mt-8 space-y-7" : "mt-10 space-y-8"}>
        {document.sections.map((section) => (
          <section key={section.title}>
            <h2 className="text-xl font-semibold tracking-[-0.03em] text-stone-950 sm:text-2xl">
              {section.title}
            </h2>
            <div className="mt-3 space-y-3 text-sm leading-6 text-stone-600 sm:text-[15px]">
              {section.body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
