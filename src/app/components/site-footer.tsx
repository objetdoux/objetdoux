"use client";

import { useEffect, useState } from "react";

type PolicyType = "terms" | "privacy";

const policies: Record<
  PolicyType,
  {
    title: string;
    sections: {
      title: string;
      paragraphs: string[];
    }[];
  }
> = {
  terms: {
    title: "이용약관",
    sections: [
      {
        title: "목적",
        paragraphs: [
          "본 약관은 오브제두가 운영하는 브랜드 웹사이트의 이용과 관련하여 방문자와 오브제두 사이의 기본적인 권리, 의무 및 책임사항을 정하는 것을 목적으로 합니다.",
        ],
      },
      {
        title: "서비스의 성격",
        paragraphs: [
          "본 웹사이트는 오브제두의 브랜드 소개, 제품 방향성, 소식 및 외부 판매 채널 안내를 위한 공간입니다.",
          "상품의 실제 구매, 결제, 배송, 교환, 반품, 환불 등 거래와 관련된 사항은 연결된 외부 판매 채널의 정책과 약관에 따릅니다.",
        ],
      },
      {
        title: "콘텐츠의 권리",
        paragraphs: [
          "웹사이트에 게시된 브랜드명, 문구, 이미지, 디자인, 구성 등 모든 콘텐츠의 권리는 오브제두 또는 정당한 권리자에게 있습니다.",
          "방문자는 오브제두의 사전 동의 없이 콘텐츠를 복제, 배포, 수정, 전송하거나 상업적인 목적으로 사용할 수 없습니다.",
        ],
      },
      {
        title: "외부 링크",
        paragraphs: [
          "오브제두 웹사이트는 인스타그램, 스마트스토어 등 외부 서비스로 연결되는 링크를 포함할 수 있습니다.",
          "외부 서비스 이용 과정에서 발생하는 회원가입, 주문, 결제, 배송, 고객 응대 등은 해당 서비스의 이용약관 및 운영정책에 따릅니다.",
        ],
      },
      {
        title: "약관의 변경",
        paragraphs: [
          "오브제두는 서비스 운영 상황, 관련 법령 또는 브랜드 정책에 따라 본 약관을 변경할 수 있습니다.",
          "변경된 내용은 웹사이트에 게시하는 방식으로 안내하며, 게시된 시점부터 효력이 발생합니다.",
        ],
      },
    ],
  },
  privacy: {
    title: "개인정보처리방침",
    sections: [
      {
        title: "개인정보 수집 여부",
        paragraphs: [
          "현재 오브제두 웹사이트는 브랜드 소개와 외부 채널 안내를 목적으로 운영되며, 별도의 회원가입, 주문, 결제 기능을 제공하지 않습니다.",
          "따라서 본 웹사이트에서는 방문자의 이름, 연락처, 주소, 결제정보와 같은 개인정보를 직접 수집하지 않습니다.",
        ],
      },
      {
        title: "외부 서비스 이용",
        paragraphs: [
          "인스타그램, 스마트스토어 등 외부 링크를 통해 이동한 뒤 발생하는 개인정보 수집 및 처리는 해당 외부 서비스의 개인정보처리방침을 따릅니다.",
          "오브제두는 외부 서비스에서 독립적으로 이루어지는 개인정보 처리에 대해 해당 서비스의 정책 범위 안에서 안내받을 수 있습니다.",
        ],
      },
      {
        title: "문의 과정에서의 정보",
        paragraphs: [
          "방문자가 이메일, 인스타그램 메시지 등으로 직접 문의하는 경우, 답변을 위해 이메일 주소, 계정명, 문의 내용 등이 확인될 수 있습니다.",
          "이 정보는 문의 응대와 기록 확인 목적에 한해 사용하며, 목적이 달성된 뒤에는 관련 법령과 내부 기준에 따라 보관 또는 삭제합니다.",
        ],
      },
      {
        title: "향후 서비스 확장",
        paragraphs: [
          "오브제두가 향후 자체 회원가입, 주문, 결제, 배송 기능을 제공하게 될 경우, 수집 항목, 이용 목적, 보관 기간, 파기 절차 등을 포함한 개인정보처리방침을 별도로 고지합니다.",
          "서비스 확장 전에는 필요한 최소한의 개인정보만 수집하고, 수집 목적 외의 용도로 사용하지 않는 것을 원칙으로 합니다.",
        ],
      },
      {
        title: "정책 변경",
        paragraphs: [
          "본 개인정보처리방침은 관련 법령, 서비스 변경, 운영 정책에 따라 수정될 수 있습니다.",
          "변경 사항은 웹사이트를 통해 안내하며, 변경된 내용은 게시된 시점부터 적용됩니다.",
        ],
      },
    ],
  },
};

const channelLinks = [
  {
    href: "https://www.instagram.com/objetdoux/?utm_source=ig_web_button_share_sheet",
    label: "INSTAGRAM",
  },
  {
    href: "https://smartstore.naver.com/objet_doux",
    label: "STORES",
  },
];

export function SiteFooter() {
  const [openedPolicy, setOpenedPolicy] = useState<PolicyType | null>(null);

  useEffect(() => {
    if (!openedPolicy) {
      return;
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpenedPolicy(null);
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [openedPolicy]);

  const selectedPolicy = openedPolicy ? policies[openedPolicy] : null;

  return (
    <>
      <footer className="border-t border-black/8 bg-[#f7f3ec] text-stone-950">
        <div className="mx-auto w-full max-w-6xl px-6 py-10 lg:px-8 lg:py-12">
          <div className="grid gap-10 md:grid-cols-[1fr_1fr_auto]">
            <div>
              <p className="text-sm font-semibold tracking-normal text-stone-950">
                POLICY
              </p>
              <div className="mt-5 flex flex-col gap-3 text-sm text-stone-600">
                <button
                  type="button"
                  onClick={() => setOpenedPolicy("terms")}
                  className="w-fit text-left transition hover:text-stone-950"
                >
                  이용약관
                </button>
                <button
                  type="button"
                  onClick={() => setOpenedPolicy("privacy")}
                  className="w-fit text-left transition hover:text-stone-950"
                >
                  개인정보처리방침
                </button>
              </div>
            </div>

            <div>
              <p className="text-sm font-semibold tracking-normal text-stone-950">
                SOCIAL
              </p>
              <div className="mt-5 flex flex-col gap-3 text-sm text-stone-600">
                {channelLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="transition hover:text-stone-950"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>

            <div className="text-left md:text-right">
              <p className="text-3xl font-semibold uppercase tracking-normal text-stone-950 sm:text-4xl">
                objetdoux
              </p>
              <p className="mt-3 text-sm text-stone-500">오브제두</p>
            </div>
          </div>

          <div className="mt-12 border-t border-black/8 pt-6 text-sm leading-6 text-stone-500">
            <p>조용히 놓아도 분위기가 달라지는 것들.</p>
            <p className="mt-2">COPYRIGHT © OBJETDOUX ALL RIGHTS RESERVED.</p>
          </div>
        </div>
      </footer>

      {selectedPolicy ? (
        <div
          className="fixed inset-0 z-[100] flex items-end bg-black/45 px-4 py-4 sm:items-center sm:justify-center"
          role="dialog"
          aria-modal="true"
          aria-labelledby="policy-dialog-title"
          onMouseDown={() => setOpenedPolicy(null)}
        >
          <div
            className="max-h-[82vh] w-full max-w-2xl overflow-hidden bg-white text-stone-950 shadow-2xl"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-6 border-b border-black/8 px-6 py-5">
              <div>
                <h2
                  id="policy-dialog-title"
                  className="text-2xl font-semibold tracking-normal"
                >
                  {selectedPolicy.title}
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setOpenedPolicy(null)}
                className="shrink-0 pt-1 text-base font-medium text-stone-500 transition hover:text-stone-950"
                aria-label="팝업 닫기"
              >
                닫기
              </button>
            </div>

            <div className="max-h-[60vh] overflow-y-auto px-6 py-6">
              <div className="space-y-7 text-base leading-7 text-stone-600">
                {selectedPolicy.sections.map((section) => (
                  <section key={section.title}>
                    <h3 className="text-base font-semibold text-stone-950">
                      {section.title}
                    </h3>
                    <div className="mt-3 space-y-3">
                      {section.paragraphs.map((paragraph) => (
                        <p key={paragraph}>{paragraph}</p>
                      ))}
                    </div>
                  </section>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
