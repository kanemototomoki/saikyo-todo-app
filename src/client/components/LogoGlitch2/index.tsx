import './index.scss'

export default function LogoGlitch2() {
  const saikyo = 'SAIKYO'
  const todoapp = 'TODOAPP'
  return (
    <>
      <div className="glitch2">
        <div className="saikyo" data-text={saikyo}>
          {saikyo}
          <div className="channel r">{saikyo}</div>
          <div className="channel g">{saikyo}</div>
          <div className="channel b">{saikyo}</div>
        </div>
        {/* <div className="todoapp" data-text={todoapp}>
          {todoapp}
          <div className="channel r">{todoapp}</div>
          <div className="channel g">{todoapp}</div>
          <div className="channel b">{todoapp}</div>
        </div> */}
      </div>
    </>
  )
}
