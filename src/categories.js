// 각 카테고리별 호흡 패턴: [들숨(초), 참기(초), 날숨(초), 날숨 후 참기(초)]
// 과학적 연구와 전통 명상법에 기반한 호흡 패턴
export const categories = [
  {
    id: 'box',
    nameKey: 'box',
    descKey: 'boxDesc',
    methodKey: 'boxMethod',
    // Box Breathing (박스 호흡) - 미 해군 특수부대(Navy SEALs) 훈련에 사용
    // 연구: Ma et al. (2017) - 균등한 호흡이 자율신경계 균형에 효과적
    pattern: [4, 4, 4, 4],
    color: '#5b8a72',
    gradient: 'linear-gradient(135deg, #5b8a72 0%, #2d5a4a 100%)',
    gradientStart: '#5b8a72',
    gradientEnd: '#2d5a4a',
  },
  {
    id: 'relaxing',
    nameKey: 'relaxing',
    descKey: 'relaxingDesc',
    methodKey: 'relaxingMethod',
    // 4-7-8 호흡법 - Dr. Andrew Weil 개발
    // 원리: 긴 날숨이 부교감신경을 활성화하여 이완 유도
    // Arizona Center for Integrative Medicine 권장
    pattern: [4, 7, 8, 0],
    color: '#7c9eb2',
    gradient: 'linear-gradient(135deg, #7c9eb2 0%, #52528c 100%)',
    gradientStart: '#7c9eb2',
    gradientEnd: '#52528c',
  },
  {
    id: 'sleep',
    nameKey: 'sleep',
    descKey: 'sleepDesc',
    methodKey: 'sleepMethod',
    // 4-7-8 변형 (초보자용) - 수면 유도에 최적화
    // 연구: Jerath et al. (2015) - 느린 호흡이 수면의 질 향상
    pattern: [4, 7, 8, 0],
    color: '#4a5568',
    gradient: 'linear-gradient(135deg, #4a5568 0%, #2d3748 100%)',
    gradientStart: '#4a5568',
    gradientEnd: '#2d3748',
  },
  {
    id: 'coherent',
    nameKey: 'coherent',
    descKey: 'coherentDesc',
    methodKey: 'coherentMethod',
    // Coherent Breathing (일관 호흡) - Stephen Elliott 개발
    // 연구: 분당 5회 호흡(들숨 6초 + 날숨 6초)이 심박변이도(HRV) 최적화
    // Lehrer & Gevirtz (2014) - 심장 일관성 연구
    pattern: [5, 0, 5, 0],
    color: '#9b9b7a',
    gradient: 'linear-gradient(135deg, #9b9b7a 0%, #797d62 100%)',
    gradientStart: '#9b9b7a',
    gradientEnd: '#797d62',
  },
  {
    id: 'energizing',
    nameKey: 'energizing',
    descKey: 'energizingDesc',
    methodKey: 'energizingMethod',
    // 활력 호흡 - 들숨 강조 (교감신경 활성화)
    // 원리: 들숨이 날숨보다 길면 각성 효과
    // 요가의 Bhastrika(풀무 호흡) 원리 적용
    pattern: [4, 2, 2, 0],
    color: '#e07a5f',
    gradient: 'linear-gradient(135deg, #e07a5f 0%, #81b29a 100%)',
    gradientStart: '#e07a5f',
    gradientEnd: '#81b29a',
  },
  {
    id: 'stress',
    nameKey: 'stress',
    descKey: 'stressDesc',
    methodKey: 'stressMethod',
    // Physiological Sigh (생리적 한숨) - Stanford 연구
    // Huberman Lab: 이중 들숨 + 긴 날숨이 가장 빠르게 스트레스 감소
    // 단순화 버전: 들숨 후 잠깐 멈춤, 2배 길이 날숨
    pattern: [4, 2, 8, 0],
    color: '#b56576',
    gradient: 'linear-gradient(135deg, #b56576 0%, #6b2d5c 100%)',
    gradientStart: '#b56576',
    gradientEnd: '#6b2d5c',
  },
  {
    id: 'focus',
    nameKey: 'focus',
    descKey: 'focusDesc',
    methodKey: 'focusMethod',
    // 균형 호흡 (Sama Vritti) - 전통 요가 호흡법
    // 연구: 균등한 호흡이 주의력과 인지 기능 향상
    // 짧은 참기가 CO2 내성을 높여 집중력 향상
    pattern: [4, 2, 4, 2],
    color: '#e8b86d',
    gradient: 'linear-gradient(135deg, #e8b86d 0%, #c97b63 100%)',
    gradientStart: '#e8b86d',
    gradientEnd: '#c97b63',
  },
]
