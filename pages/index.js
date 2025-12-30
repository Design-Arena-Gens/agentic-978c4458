import { useState, useEffect } from 'react'
import Head from 'next/head'

export default function Home() {
  const [currentDemo, setCurrentDemo] = useState(0)
  const [sortArray, setSortArray] = useState([])
  const [isSorting, setIsSorting] = useState(false)
  const [particles, setParticles] = useState([])
  const [mathResult, setMathResult] = useState('')
  const [codeOutput, setCodeOutput] = useState('')

  useEffect(() => {
    // Initialize random array for sorting demo
    setSortArray(Array.from({ length: 20 }, () => Math.floor(Math.random() * 100) + 10))

    // Initialize particles
    const newParticles = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      vx: (Math.random() - 0.5) * 2,
      vy: (Math.random() - 0.5) * 2,
      size: Math.random() * 4 + 2
    }))
    setParticles(newParticles)
  }, [])

  useEffect(() => {
    // Animate particles
    const interval = setInterval(() => {
      setParticles(prev => prev.map(p => ({
        ...p,
        x: (p.x + p.vx + 100) % 100,
        y: (p.y + p.vy + 100) % 100
      })))
    }, 50)
    return () => clearInterval(interval)
  }, [])

  const demos = [
    {
      title: 'Algorithm Visualization',
      description: 'Real-time bubble sort algorithm',
      color: '#00d4ff'
    },
    {
      title: 'Physics Simulation',
      description: 'Particle system with continuous motion',
      color: '#ff6b00'
    },
    {
      title: 'Mathematical Computing',
      description: 'Complex calculations and number theory',
      color: '#00ff88'
    },
    {
      title: 'Code Execution',
      description: 'Dynamic JavaScript evaluation',
      color: '#ff00ff'
    }
  ]

  const bubbleSort = async () => {
    setIsSorting(true)
    const arr = [...sortArray]
    const n = arr.length

    for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        if (arr[j] > arr[j + 1]) {
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
          setSortArray([...arr])
          await new Promise(resolve => setTimeout(resolve, 50))
        }
      }
    }
    setIsSorting(false)
  }

  const resetSort = () => {
    setSortArray(Array.from({ length: 20 }, () => Math.floor(Math.random() * 100) + 10))
  }

  const calculateMath = () => {
    const fibonacci = (n) => {
      if (n <= 1) return n
      let a = 0, b = 1
      for (let i = 2; i <= n; i++) {
        [a, b] = [b, a + b]
      }
      return b
    }

    const isPrime = (num) => {
      if (num <= 1) return false
      for (let i = 2; i <= Math.sqrt(num); i++) {
        if (num % i === 0) return false
      }
      return true
    }

    const fib20 = fibonacci(20)
    const primes = Array.from({ length: 100 }, (_, i) => i).filter(isPrime).slice(0, 20)
    const factorial = (n) => n <= 1 ? 1 : n * factorial(n - 1)

    setMathResult(`Fibonacci(20) = ${fib20}
First 20 primes: ${primes.join(', ')}
10! = ${factorial(10)}
π ≈ ${Math.PI.toFixed(10)}
e ≈ ${Math.E.toFixed(10)}`)
  }

  const executeCode = () => {
    try {
      const code = `
        // Dynamic code execution
        const result = {
          timestamp: new Date().toISOString(),
          computation: Math.pow(2, 16),
          randomHash: Array.from({length: 8}, () =>
            Math.floor(Math.random() * 16).toString(16)).join(''),
          capabilities: [
            'Real-time rendering',
            'State management',
            'Async operations',
            'DOM manipulation',
            'Event handling'
          ]
        };
        JSON.stringify(result, null, 2);
      `
      const output = eval(code)
      setCodeOutput(output)
    } catch (e) {
      setCodeOutput('Error: ' + e.message)
    }
  }

  return (
    <>
      <Head>
        <title>Power Showcase - Capabilities Demo</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="container">
        <header>
          <h1 className="glitch" data-text="POWER SHOWCASE">POWER SHOWCASE</h1>
          <p className="subtitle">Demonstrating Advanced Capabilities</p>
        </header>

        <div className="demo-selector">
          {demos.map((demo, idx) => (
            <button
              key={idx}
              className={`demo-btn ${currentDemo === idx ? 'active' : ''}`}
              onClick={() => setCurrentDemo(idx)}
              style={{ '--color': demo.color }}
            >
              {demo.title}
            </button>
          ))}
        </div>

        <div className="demo-container">
          {currentDemo === 0 && (
            <div className="demo">
              <h2>Algorithm Visualization</h2>
              <div className="chart">
                {sortArray.map((val, idx) => (
                  <div
                    key={idx}
                    className="bar"
                    style={{ height: `${val}%`, animationDelay: `${idx * 0.05}s` }}
                  >
                    <span>{val}</span>
                  </div>
                ))}
              </div>
              <div className="controls">
                <button onClick={bubbleSort} disabled={isSorting} className="action-btn">
                  {isSorting ? 'Sorting...' : 'Start Bubble Sort'}
                </button>
                <button onClick={resetSort} disabled={isSorting} className="action-btn secondary">
                  Reset Array
                </button>
              </div>
            </div>
          )}

          {currentDemo === 1 && (
            <div className="demo">
              <h2>Physics Simulation</h2>
              <div className="particle-container">
                {particles.map(p => (
                  <div
                    key={p.id}
                    className="particle"
                    style={{
                      left: `${p.x}%`,
                      top: `${p.y}%`,
                      width: `${p.size}px`,
                      height: `${p.size}px`
                    }}
                  />
                ))}
              </div>
              <p className="info">50 particles with continuous motion and boundary wrapping</p>
            </div>
          )}

          {currentDemo === 2 && (
            <div className="demo">
              <h2>Mathematical Computing</h2>
              <button onClick={calculateMath} className="action-btn">
                Calculate Complex Math
              </button>
              {mathResult && (
                <pre className="output">{mathResult}</pre>
              )}
            </div>
          )}

          {currentDemo === 3 && (
            <div className="demo">
              <h2>Code Execution</h2>
              <button onClick={executeCode} className="action-btn">
                Execute Dynamic Code
              </button>
              {codeOutput && (
                <pre className="output">{codeOutput}</pre>
              )}
            </div>
          )}
        </div>

        <footer>
          <div className="stats">
            <div className="stat">
              <div className="stat-value">4</div>
              <div className="stat-label">Interactive Demos</div>
            </div>
            <div className="stat">
              <div className="stat-value">∞</div>
              <div className="stat-label">Possibilities</div>
            </div>
            <div className="stat">
              <div className="stat-value">100%</div>
              <div className="stat-label">Powerful</div>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}
