import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "문의",
  description: "스펙트리파이에 궁금한 점이 있으시면 문의해 주세요.",
  alternates: {
    canonical: "/contact",
  },
};

export default function ContactPage() {
  return (
    <div className="max-w-3xl mx-auto px-5 py-10">
      <h1 className="text-2xl font-bold text-[#1a1a1a] mb-6">문의</h1>

      <div className="prose">
        <p>
          스펙트리파이에 대한 문의, 제안, 오류 신고 등은 아래 이메일로 연락해
          주세요. 확인 후 빠르게 답변드리겠습니다.
        </p>

        <h2>연락처</h2>
        <ul>
          <li>
            이메일:{" "}
            <a
              href="mailto:contact@spectrify.kr"
              className="text-[#1a1a1a] underline underline-offset-2"
            >
              contact@spectrify.kr
            </a>
          </li>
        </ul>

        <h2>문의 안내</h2>
        <ul>
          <li>
            글 내용에 대한 수정 요청이나 최신 정보 업데이트 제안을 환영합니다.
          </li>
          <li>광고 및 제휴 관련 문의도 이메일로 보내주세요.</li>
          <li>
            개인정보 관련 문의는{" "}
            <a
              href="/privacy"
              className="text-[#1a1a1a] underline underline-offset-2"
            >
              개인정보처리방침
            </a>
            을 먼저 확인해 주세요.
          </li>
        </ul>
      </div>
    </div>
  );
}
