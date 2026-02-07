import { useState, useCallback, useEffect, useRef } from 'react'
import { t, supportedLangs } from './i18n'
import { categories } from './categories'
import { BreathingBall } from './BreathingBall'
import './App.css'

export default function App() {
  const [lang, setLang] = useState('ko')
  const [categoryId, setCategoryId] = useState(categories[0].id)
  const [isRunning, setIsRunning] = useState(false)
  const [currentPhase, setCurrentPhase] = useState('inhale')
  const [cycleCount, setCycleCount] = useState(0)
  const [resetKey, setResetKey] = useState(0)
  const [affirmation, setAffirmation] = useState('')
  const [affirmationVisible, setAffirmationVisible] = useState(false)
  const affirmationIndexRef = useRef(0)

  const category = categories.find((c) => c.id === categoryId) || categories[0]
  const pattern = category.pattern

  // 명상 문구 가져오기
  const getAffirmations = useCallback(() => {
    const key = `affirmations_${categoryId}`
    return t(lang, key) || []
  }, [lang, categoryId])

  // 명상 시작 시 또는 카테고리 변경 시 문구 초기화
  useEffect(() => {
    const affirmations = getAffirmations()
    if (Array.isArray(affirmations) && affirmations.length > 0) {
      affirmationIndexRef.current = 0
      setAffirmation(affirmations[0])
      setAffirmationVisible(isRunning)
    }
  }, [categoryId, lang, isRunning, getAffirmations])

  // 주기마다 문구 변경
  useEffect(() => {
    if (!isRunning) {
      setAffirmationVisible(false)
      return
    }
    
    const affirmations = getAffirmations()
    if (!Array.isArray(affirmations) || affirmations.length === 0) return

    setAffirmationVisible(true)
    const nextIndex = cycleCount % affirmations.length
    affirmationIndexRef.current = nextIndex
    setAffirmation(affirmations[nextIndex])
  }, [cycleCount, isRunning, getAffirmations])

  const phaseLabel =
    currentPhase === 'inhale'
      ? t(lang, 'inhale')
      : currentPhase === 'exhale'
        ? t(lang, 'exhale')
        : t(lang, 'hold')

  const handleReset = useCallback(() => {
    setIsRunning(false)
    setCycleCount(0)
    setResetKey((k) => k + 1)
  }, [])

  return (
    <div className="app">
      {/* 우주 배경 */}
      <div className="space-bg" aria-hidden="true">
        <div className="planet planet-earth" />
        <div className="planet planet-small" />
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="star"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
            }}
          />
        ))}
      </div>
      <header className="app-header">
        <h1 className="app-title">{t(lang, 'appTitle')}</h1>
        <div className="header-actions">
          <label className="lang-select-wrap">
            <span className="visually-hidden">{t(lang, 'language')}</span>
            <select
              className="lang-select"
              value={lang}
              onChange={(e) => setLang(e.target.value)}
              aria-label={t(lang, 'language')}
            >
              {supportedLangs.map((l) => (
                <option key={l} value={l}>
                  {l === 'ko' ? '한국어' : l === 'en' ? 'English' : l === 'ja' ? '日本語' : 'Español'}
                </option>
              ))}
            </select>
          </label>
        </div>
      </header>

      <section className="category-section">
        <h2 className="section-title">{t(lang, 'categories')}</h2>
        <div className="category-grid" role="tablist" aria-label={t(lang, 'categories')}>
          {categories.map((c) => (
            <button
              key={c.id}
              type="button"
              role="tab"
              aria-selected={categoryId === c.id}
              className={`category-card ${categoryId === c.id ? 'active' : ''}`}
              style={{
                '--card-color': c.color,
                '--card-gradient': c.gradient,
              }}
              onClick={() => {
                setCategoryId(c.id)
                setIsRunning(false)
                setCycleCount(0)
                setResetKey((k) => k + 1)
              }}
            >
              <span className="category-name">{t(lang, c.nameKey)}</span>
              <span className="category-desc">{t(lang, c.descKey)}</span>
            </button>
          ))}
        </div>
      </section>

      <section className="breathing-section">
        {/* 명상 문구 */}
        <div className={`affirmation-container ${affirmationVisible ? 'visible' : ''}`}>
          <p className="affirmation-text">{affirmation}</p>
        </div>
        
        <BreathingBall
          key={`${categoryId}-${resetKey}`}
          pattern={pattern}
          isRunning={isRunning}
          gradient={category.gradient}
          gradientStart={category.gradientStart}
          gradientEnd={category.gradientEnd}
          phaseLabel={phaseLabel}
          onPhaseChange={setCurrentPhase}
          onCycleChange={setCycleCount}
        />
        <p className="cycle-info">
          {t(lang, 'cycle')}: {cycleCount} · {t(lang, 'breathCycle')}
        </p>
        <div className="controls">
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => setIsRunning((r) => !r)}
            aria-pressed={isRunning}
          >
            {isRunning ? t(lang, 'pause') : t(lang, 'start')}
          </button>
          <button type="button" className="btn btn-secondary" onClick={handleReset}>
            {t(lang, 'reset')}
          </button>
        </div>
      </section>

      <footer className="app-footer">
        <p>Meditation Helper · {t(lang, 'appTitle')}</p>
      </footer>
    </div>
  )
}
