import React from 'react'
import { connect } from 'react-redux'
import Scoreboard from './components/Scoreboard/index'
import actions from '../../reducer/actions'
import Keyboard from './components/Keyboard'
import ScoreBubble from './components/ScoreBubble'
import './style.css'

const X01 = ({currentScore, del, enter, nrPressed, playerScores, scoreEnteredManually, scoreToDisplay}) => (
  <div className={`gameFrame`}>
    <div className={`gameLeft`}>
      <Scoreboard playerScores={playerScores}/>
      <div className={`bottom`}>
        <div className={'main'}>
          <ScoreBubble value={scoreToDisplay} manuallyEntered={scoreEnteredManually}/>
        </div>
        <div className={`leftKb`}>
          <Keyboard del={del} enter={enter} nrPressed={nrPressed}/>
        </div>
      </div>
    </div>
    <div className={`rightKb`}>
      <Keyboard del={del} enter={enter} nrPressed={nrPressed}/>
    </div>
  </div>
)

const createPS = (targetScore, startedBy, toThrow) => (ps) => ({
  playerName: ps.player,
  points: targetScore - ps.throws.reduce((total, num) => total + num, 0),
  legs: ps.legsWon,
  didBegin: ps.player === startedBy,
  theirTurn: ps.player === toThrow
})

const mapStateToProps = (state, ownProps) => {
  return ({
    ...ownProps,
    currentScore: state.game.currentScore,
    playerScores: state.game.playerScores.map(createPS(state.game.points, state.game.startedBy, state.game.toThrow)),
    currentPlayerScore: (state.game.points - state.game.playerScores.find(ps => ps.player === state.game.toThrow).throws.reduce((sum, cur) => sum + cur, 0)),
    scoreEnteredManually: state.game.currentScore !== 0,
    scoreToDisplay: state.game.currentScore !== 0 ? state.game.currentScore : (state.game.points - state.game.playerScores.find(ps => ps.player === state.game.toThrow).throws.reduce((sum, cur) => sum + cur, 0))
  })
}

export default connect(mapStateToProps, actions)(X01)