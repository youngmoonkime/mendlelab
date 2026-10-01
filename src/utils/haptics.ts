// haptics.ts - 모바일 터치 및 인터랙션 햅틱 피드백

export const triggerHaptic = (pattern: number | number[] = 10) => {
  try {
    // 사용자 활성화(첫 탭) 이전 호출은 Chrome이 차단하고 경고를 남기므로 건너뜀
    const activated = navigator.userActivation?.hasBeenActive ?? true;
    if (typeof window !== 'undefined' && 'vibrate' in navigator && activated) {
      navigator.vibrate(pattern);
    }
  } catch {
    // 햅틱 미지원 브라우저는 무시
  }
};
