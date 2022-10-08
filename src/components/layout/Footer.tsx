import React from 'react'

const Footer: React.FC = () => {
  return (
    <article
      style={{
        textAlign: 'center'
      }}
    >
      Made with{' '}
      <i style={{ color: '#F93822' }} className="bi bi-heart-fill"></i> by{' '}
      <a
        rel="noref noopener"
        target="_blank"
        href="https://github.com/Adophilus"
      >
        Uchenna Ofoma
      </a>
    </article>
  )
}

export default Footer
