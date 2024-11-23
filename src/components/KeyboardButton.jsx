import React from 'react'
import PropTypes from 'prop-types'

const KeyboardButton = ({ 
  character, 
  onClick, 
  isUpperCase,
  isPressed = false 
}) => {
  const displayChar = isUpperCase ? character.toUpperCase() : character

  if (!character || character === ' ') {
    return <div className="flex-1 aspect-square" />
  }

  const isBackspace = character === '⌫'
  const isShift = character === '⇧'
  const isSpecialChar = isBackspace || isShift || character.match(/[^a-zA-Z]/)
  
  return (
    <button
      onClick={() => onClick(character)}
      className={`flex-1 min-h-[3.5rem] rounded-lg m-0.5
                 font-['Zaghawa_Beria'] text-base text-white transition-all duration-150
                 flex items-center justify-center select-none
                 ${isPressed ? 'transform scale-95 bg-[#344047]' : 'bg-[#2a373f]'}
                 ${isBackspace 
                   ? `${isPressed ? 'bg-[#344047]' : 'bg-[#2a373f]'} hover:bg-[#344047] text-[#ef4444]` 
                   : isShift 
                     ? (isUpperCase 
                        ? `${isPressed ? 'bg-[#00a884] text-white' : 'bg-[#00a884] text-white'} hover:bg-[#00a884]` 
                        : `${isPressed ? 'bg-[#344047]' : 'bg-[#2a373f]'} hover:bg-[#344047]`)
                     : 'hover:bg-[#344047]'}`}
    >
      {displayChar}
    </button>
  )
}

KeyboardButton.propTypes = {
  character: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  isUpperCase: PropTypes.bool.isRequired,
  isPressed: PropTypes.bool
}

export default KeyboardButton