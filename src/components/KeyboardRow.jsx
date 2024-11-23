import React from 'react'
import PropTypes from 'prop-types'
import KeyboardButton from './KeyboardButton'

const KeyboardRow = ({ 
  keys, 
  onKeyClick, 
  isUpperCase, 
  isFirstRow = false, 
  isSecondRow = false,
  pressedKey = null
}) => {
  return (
    <div className={`flex gap-1.5 w-full px-0.5 ${isSecondRow ? 'pl-[4.166%]' : ''}`}>
      {keys.map((key, index) => (
        <KeyboardButton
          key={index}
          character={key}
          onClick={onKeyClick}
          isUpperCase={isUpperCase}
          isPressed={pressedKey === key.toLowerCase()}
        />
      ))}
    </div>
  )
}

KeyboardRow.propTypes = {
  keys: PropTypes.arrayOf(PropTypes.string).isRequired,
  onKeyClick: PropTypes.func.isRequired,
  isUpperCase: PropTypes.bool.isRequired,
  isFirstRow: PropTypes.bool,
  isSecondRow: PropTypes.bool,
  pressedKey: PropTypes.string
}

export default KeyboardRow