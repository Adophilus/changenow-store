import React from 'react'

const Footer: React.FC = () => {
  return (
    <article
      style={{
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column'
      }}
    >
      <span>
        Made with{' '}
        <i style={{ color: '#F93822' }} className="bi bi-heart-fill"></i> by{' '}
        <a
          rel="noreferrer noopener"
          target="_blank"
          href="https://github.com/Adophilus"
        >
          Uchenna Ofoma
        </a>
      </span>
      <span
        style={{
          display: 'flex',
          columnGap: 'calc(var(--block-spacing-vertical) / 2)'
        }}
      >
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://twitter.com/adophilus"
        >
          <i className="bi bi-twitter"></i>
        </a>
        <a
          style={{ color: 'black' }}
          target="_blank"
          rel="noopener noreferrer"
          href="https://github.com/Adophilus"
        >
          <i className="bi bi-github"></i>
        </a>
      </span>
    </article>
  )
}

export default Footer
