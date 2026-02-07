import { useState, useEffect, useRef, useId } from 'react'
import './BreathingBall.css'

// 한 주기의 총 시간
function getTotalCycleTime(pattern) {
  return pattern[0] + pattern[1] + pattern[2] + pattern[3]
}

// cycleElapsed에 따른 Y값 (0~1)
function getYAtTime(t, pattern) {
  const [inhale, holdIn, exhale] = pattern
  
  if (t <= 0) return 0
  if (t <= inhale) {
    return inhale > 0 ? t / inhale : 1
  }
  if (t <= inhale + holdIn) {
    return 1
  }
  if (t <= inhale + holdIn + exhale) {
    const elapsed = t - inhale - holdIn
    return exhale > 0 ? 1 - elapsed / exhale : 0
  }
  return 0
}

// cycleElapsed에 따른 phase 반환
function getPhaseAtTime(t, pattern) {
  const [inhale, holdIn, exhale] = pattern
  if (t < inhale) return 'inhale'
  if (t < inhale + holdIn) return 'holdIn'
  if (t < inhale + holdIn + exhale) return 'exhale'
  return 'holdOut'
}

// X, Y 좌표 계산 (동일한 함수로 통일)
function getXY(t, pattern, width, height, padding) {
  const total = getTotalCycleTime(pattern)
  const w = width - padding * 2
  const h = height - padding * 2
  const progress = total > 0 ? t / total : 0
  const yValue = getYAtTime(t, pattern)
  
  return {
    x: padding + progress * w,
    y: padding + h * (1 - yValue)
  }
}

// 고정 곡선의 path 생성
function generateCurvePath(pattern, width, height, padding) {
  const total = getTotalCycleTime(pattern)
  if (total === 0) return ''
  
  const points = []
  const steps = 120
  
  for (let i = 0; i <= steps; i++) {
    const t = (i / steps) * total
    const { x, y } = getXY(t, pattern, width, height, padding)
    points.push(`${i === 0 ? 'M' : 'L'} ${x.toFixed(2)} ${y.toFixed(2)}`)
  }
  
  return points.join(' ')
}

// 현재 시간까지의 진행 path 생성
function generateProgressPath(pattern, width, height, padding, currentTime) {
  const total = getTotalCycleTime(pattern)
  if (total === 0 || currentTime <= 0) return ''
  
  const points = []
  const progress = currentTime / total
  const steps = Math.max(2, Math.floor(progress * 120))
  
  for (let i = 0; i <= steps; i++) {
    const t = (i / 120) * total
    if (t > currentTime) break
    const { x, y } = getXY(t, pattern, width, height, padding)
    points.push(`${i === 0 ? 'M' : 'L'} ${x.toFixed(2)} ${y.toFixed(2)}`)
  }
  
  // 마지막 점을 정확한 현재 시간으로
  const { x, y } = getXY(currentTime, pattern, width, height, padding)
  if (points.length > 0) {
    points.push(`L ${x.toFixed(2)} ${y.toFixed(2)}`)
  }
  
  return points.join(' ')
}

export function BreathingBall({
  pattern,
  isRunning,
  onPhaseChange,
  onCycleChange,
  phaseLabel,
  gradientStart = '#7c9eb2',
  gradientEnd = '#52528c',
}) {
  const [tick, setTick] = useState(0)
  const rafRef = useRef(null)
  const lastTimeRef = useRef(0)
  const cycleTimeRef = useRef(0)
  const prevPhaseRef = useRef('inhale')
  const cycleCountRef = useRef(0)

  const totalCycleTime = getTotalCycleTime(pattern)
  const gradientId = `grad-${useId().replace(/:/g, '')}`

  // SVG 치수 (더 크게)
  const svgWidth = 500
  const svgHeight = 220
  const padding = 24

  // 초기화
  useEffect(() => {
    if (isRunning) {
      cycleTimeRef.current = 0
      cycleCountRef.current = 0
      prevPhaseRef.current = 'inhale'
      lastTimeRef.current = performance.now()
      onPhaseChange?.('inhale')
    }
  }, [isRunning, onPhaseChange])

  // 애니메이션 루프
  useEffect(() => {
    if (!isRunning || totalCycleTime === 0) return

    const animate = () => {
      const now = performance.now()
      const dt = (now - lastTimeRef.current) / 1000
      lastTimeRef.current = now

      // 시간 업데이트
      cycleTimeRef.current += dt
      
      // 주기 완료 체크
      if (cycleTimeRef.current >= totalCycleTime) {
        cycleTimeRef.current = cycleTimeRef.current % totalCycleTime
        cycleCountRef.current += 1
        onCycleChange?.(cycleCountRef.current)
      }
      
      // phase 변경
      const newPhase = getPhaseAtTime(cycleTimeRef.current, pattern)
      if (newPhase !== prevPhaseRef.current) {
        prevPhaseRef.current = newPhase
        onPhaseChange?.(newPhase)
      }
      
      setTick(t => t + 1)
      rafRef.current = requestAnimationFrame(animate)
    }
    
    rafRef.current = requestAnimationFrame(animate)
    
    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
      }
    }
  }, [isRunning, pattern, totalCycleTime, onPhaseChange, onCycleChange])

  // 현재 위치 계산 (getXY와 동일한 방식)
  const currentTime = cycleTimeRef.current
  const { x: dotX, y: dotY } = getXY(currentTime, pattern, svgWidth, svgHeight, padding)

  // paths
  const curvePath = generateCurvePath(pattern, svgWidth, svgHeight, padding)
  const progressPath = generateProgressPath(pattern, svgWidth, svgHeight, padding, currentTime)

  return (
    <div className="breathing-scene">
      <div className="breathing-fixed-graph" aria-hidden="true">
        <svg
          className="fixed-graph-svg"
          viewBox={`0 0 ${svgWidth} ${svgHeight}`}
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={gradientStart} />
              <stop offset="100%" stopColor={gradientEnd} />
            </linearGradient>
          </defs>
          
          {/* Y=0 기준선 */}
          <line
            x1={padding}
            y1={svgHeight - padding}
            x2={svgWidth - padding}
            y2={svgHeight - padding}
            stroke="rgba(255,255,255,0.1)"
            strokeWidth="1"
            strokeDasharray="4 4"
          />
          
          {/* 전체 곡선 (희미하게) */}
          <path
            d={curvePath}
            fill="none"
            stroke="rgba(255,255,255,0.15)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          
          {/* 진행된 부분 (색상) */}
          {progressPath && (
            <path
              d={progressPath}
              fill="none"
              stroke={`url(#${gradientId})`}
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          )}
          
          {/* 현재 위치 점 - 곡선과 동일한 getXY 사용 */}
          <circle
            cx={dotX}
            cy={dotY}
            r="12"
            fill={`url(#${gradientId})`}
            stroke="white"
            strokeWidth="3"
          />
        </svg>
      </div>
      
      {phaseLabel && (
        <p className="phase-label" aria-live="polite">
          {phaseLabel}
        </p>
      )}
    </div>
  )
}
