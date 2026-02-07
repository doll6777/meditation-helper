// 각 카테고리별 호흡 패턴: [들숨(초), 참기(초), 날숨(초), 날숨 후 참기(초)]
// 자연스럽고 편한 호흡 속도
export const categories = [
  {
    id: 'relax',
    nameKey: 'relax',
    descKey: 'relaxDesc',
    pattern: [3, 0, 4, 0], // 들숨 3초, 날숨 4초 (7초 주기)
    color: '#7c9eb2',
    gradient: 'linear-gradient(135deg, #7c9eb2 0%, #52528c 100%)',
    gradientStart: '#7c9eb2',
    gradientEnd: '#52528c',
  },
  {
    id: 'focus',
    nameKey: 'focus',
    descKey: 'focusDesc',
    pattern: [2, 1, 2, 1], // 박스 호흡: 각 2초, 참기 1초 (6초 주기)
    color: '#5b8a72',
    gradient: 'linear-gradient(135deg, #5b8a72 0%, #2d5a4a 100%)',
    gradientStart: '#5b8a72',
    gradientEnd: '#2d5a4a',
  },
  {
    id: 'sleep',
    nameKey: 'sleep',
    descKey: 'sleepDesc',
    pattern: [3, 0, 5, 0], // 들숨 3초, 날숨 5초 (8초 주기)
    color: '#4a5568',
    gradient: 'linear-gradient(135deg, #4a5568 0%, #2d3748 100%)',
    gradientStart: '#4a5568',
    gradientEnd: '#2d3748',
  },
  {
    id: 'stress',
    nameKey: 'stress',
    descKey: 'stressDesc',
    pattern: [2, 2, 4, 0], // 들숨 2초, 참기 2초, 날숨 4초 (8초 주기)
    color: '#b56576',
    gradient: 'linear-gradient(135deg, #b56576 0%, #6b2d5c 100%)',
    gradientStart: '#b56576',
    gradientEnd: '#6b2d5c',
  },
  {
    id: 'morning',
    nameKey: 'morning',
    descKey: 'morningDesc',
    pattern: [2, 0, 2, 0], // 빠른 호흡 (4초 주기)
    color: '#e8b86d',
    gradient: 'linear-gradient(135deg, #e8b86d 0%, #c97b63 100%)',
    gradientStart: '#e8b86d',
    gradientEnd: '#c97b63',
  },
  {
    id: 'energy',
    nameKey: 'energy',
    descKey: 'energyDesc',
    pattern: [1.5, 0, 1.5, 0], // 더 빠른 호흡 (3초 주기)
    color: '#e07a5f',
    gradient: 'linear-gradient(135deg, #e07a5f 0%, #81b29a 100%)',
    gradientStart: '#e07a5f',
    gradientEnd: '#81b29a',
  },
  {
    id: 'calm',
    nameKey: 'calm',
    descKey: 'calmDesc',
    pattern: [3, 0, 4, 0], // 들숨 3초, 날숨 4초 (7초 주기)
    color: '#9b9b7a',
    gradient: 'linear-gradient(135deg, #9b9b7a 0%, #797d62 100%)',
    gradientStart: '#9b9b7a',
    gradientEnd: '#797d62',
  },
]
