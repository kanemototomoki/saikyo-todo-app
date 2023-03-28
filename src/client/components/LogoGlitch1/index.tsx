import './index.scss'

export default function LogoGlitch1() {
  return (
    <>
      <div
        className="glitch1"
        style={{
          backgroundImage: `url(./logo_text.svg)`,
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
