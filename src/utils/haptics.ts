// haptics.ts - 모바일 터치 및 인터랙션 햅틱 피드백

export const triggerHaptic = (pattern: number | number[] = 10) => {
  try {
    if (typeof window !== 'undefined' && 'vibrate' in navigator) {
      navigator.vibrate(pattern);
    }
  } catch {
    // 햅틱 미지원 브라우저는 무시
  }
};
