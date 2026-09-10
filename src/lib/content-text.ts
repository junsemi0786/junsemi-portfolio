// Remove only the known test suffixes found in the existing public copy.
export function cleanExpertiseDescription(description: string): string {
  return description
    .replace(/\.{3}(?:000|1111|2222)\s*$/, ".")
    .replace("완벽한 제어 솔루션", "현장 조건에 맞는 제어 솔루션")
    .replace("고도의 기술력을 보유하고 있습니다", "기술 지원을 제공합니다");
}
