import React from 'react'
import PropTypes from 'prop-types'

const SymbolsToggle = ({ showSymbols, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-3 rounded-lg text-white w-[20%]
                flex items-center justify-center text-lg font-medium
                ${showSymbols ? 'bg-[#00a884] hover:bg-[#017561]' : 'bg-[#2a373f] hover:bg-[#344047]'}
                transition-colors`}
      aria-label={showSymbols ? "Return to letters" : "Show symbols"}
    >
      !#1
    </button>
  )
}

SymbolsToggle.propTypes = {
  showSymbols: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired
}

export default SymbolsToggle