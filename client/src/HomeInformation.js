import React, { useState, useEffect } from 'react'
import './css/InformationCard.css'

export default function HomeInformation(props) {
  const [informations, setInformations] = useState([])
  const [nowSelect, setNowSelect] = useState(4)
  const testrouter = ''
  useEffect(() => {
    //お知らせ３件取得
    fetch(testrouter + '/informationdatathree')
      .then(res => res.json())
      .then(data => setInformations(data))
  }, [props.push])
  const onClickCard = index => {
    if (nowSelect === index) {
      setNowSelect(4)
    } else {
      setNowSelect(index)
    }
  }
  return (
    <div id="infoFlameHolder">
      <div id="infoFlame">
        <span id="infoTitle">おしらせ</span>
        <div id="infoArea">
          {informations.map((info, index) => (
            <InformationCard
              info={info}
              index={index}
              key={info.id}
              select={nowSelect}
              onSelect={value => onClickCard(value)}
            />
          ))}
        </div>
        {nowSelect !== 4 ? (
          <div id="info-detail">
            <span>{informations[nowSelect].message}</span>
          </div>
        ) : (
          ''
        )}
        <button className="lightgreenbutton" onClick={props.push}>
          一覧へ
        </button>
      </div>
    </div>
  )
}

const InformationCard = props => {
  const date = new Date(props.info.date)
  return (
    <div
      className="card_flame"
      id={props.index === props.select ? 'card_flame_select' : ''}
      key={props.info.id}
      onClick={() => props.onSelect(props.index)}
    >
      <div className="card_infoarea">
        <div className="card_new">
          {props.index === 0 ? <span className="info-newtext">new</span> : ''}
        </div>
        {props.info.title}
      </div>
      <div className="card_date">
        <span className="date_text">
          {date.getFullYear() +
            '/' +
            (date.getMonth() + 1) +
            '/' +
            date.getDate()}
        </span>
      </div>
    </div>
  )
}
