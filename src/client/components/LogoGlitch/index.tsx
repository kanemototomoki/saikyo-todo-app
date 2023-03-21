import './index.scss'

export default function LogoGlitch() {
  return (
    <>
      <div
        className="glitch"
        style={{
          backgroundImage: `url(/public/logo_text.svg)`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center'
        }}
      >
        <div className="channel r"></div>
        <div className="channel g"></div>
        <div className="channel b"></div>
      </div>
    </>
  )
}
