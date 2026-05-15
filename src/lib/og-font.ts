/**
 * Google Fonts에서 지정한 텍스트에 필요한 글리프만 서브셋으로 받아 ArrayBuffer로 반환.
 * Next.js ImageResponse(`next/og`)는 TTF/OTF만 지원하므로 User-Agent를 비워 TTF 응답을 받아야 한다.
 */
export async function loadGoogleFont(
  family: string,
  weight: 400 | 700,
  text: string
): Promise<ArrayBuffer> {
  const url = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(
    family
  )}:wght@${weight}&text=${encodeURIComponent(text)}`;

  const css = await fetch(url).then((r) => r.text());
  const match = css.match(
    /src:\s*url\((.+?)\)\s*format\('(?:opentype|truetype)'\)/
  );
  if (!match) {
    throw new Error(`Font URL not found for ${family} ${weight}`);
  }

  const fontResp = await fetch(match[1]);
  if (!fontResp.ok) {
    throw new Error(`Failed to fetch font: ${fontResp.status}`);
  }
  return await fontResp.arrayBuffer();
}
