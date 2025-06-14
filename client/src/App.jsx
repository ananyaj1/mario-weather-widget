import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { motion } from 'framer-motion';

const App = () => {
  const [count, setCount] = useState(0)

  const texts = [
    'Today’s weather: light drizzle with mild, overcast skies.',
    'Wear a light rain jacket and waterproof shoes today.'
  ];
  return (
    <>
    <div className='card'>
      <div className='description-bubble'>
        <p className='description-text'>
           <Typewrite texts={texts}/> 
        </p>
      </div>
    </div>
    
    </>
    /*<>
      <div>
        <a href='https://vite.dev' target='_blank'>
          <img src={viteLogo} className='logo' alt='Vite logo' />
        </a>
        <a href='https://react.dev' target='_blank'>
          <img src={reactLogo} className='logo react' alt='React logo' />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className='card'>
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className='read-the-docs'>
        Click on the Vite and React logos to learn more
      </p>
    </>*/
  )
}

// constants in seconds 
const LETTER_DELAY = 0.025;
const BOX_FADE_DURATION = 0.125;

const FADE_DELAY = 5;
const MIN_FADE_DURATION = .25;

//constants in milliseconds
const SWAP_DELAY_IN_MS = 5500;

const Typewrite = ({ texts }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setIndex((pv) => (pv + 1) % texts.length);
    }, SWAP_DELAY_IN_MS);

    return () => clearInterval(intervalId);
  }, []);

  return <p className=''>
    <span className='ml-1'>
      {texts[index].split('').map((l, i) => {
        return (<motion.span 
          initial={{
            opacity: 1,
          }}
          animate={{
            opacity: 0,
          }}
          transition={{
            delay: FADE_DELAY,
            duration: MIN_FADE_DURATION,
            ease: "easeInOut"
          }} 
          className='relative'
          key={`${index}-${i}`}
        >
          <motion.span
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            delay: i * LETTER_DELAY,
            duration: 0,
          }}
          >
            {l}
          </motion.span>
          <motion.span 
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: [0, 1, 0],
          }}
          transition={{
            delay: i * LETTER_DELAY,
            times: [0, 0.1, 1],
            duration: BOX_FADE_DURATION,
            ease: "easeInOut"
          }}
          className='absolute bottom-[1px] left-[1px]
          right-0 top-[1px] bg-neutral-950'/>
        </motion.span>
        );
      })}
    </span>
  </p>;
}

export default App
