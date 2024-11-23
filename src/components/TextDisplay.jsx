import React, { forwardRef } from 'react'
import PropTypes from 'prop-types'

const TextDisplay = forwardRef(({ value, onChange, onSend, isArabic }, ref) => {
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      onSend()
    }
  }

  return (
    <div className="relative flex items-end gap-2 w-full bg-[#202c33] rounded-lg p-2">
      <textarea
        ref={ref}
        value={value}
        onChange={onChange}
        onKeyDown={handleKeyDown}
        spellCheck="false"
        autoCorrect="off"
        autoCapitalize="off"
        rows={1}
        className="flex-1 p-3 rounded-lg bg-[#2a373f] text-white
                 font-['Zaghawa_Beria'] text-lg resize-none tracking-wider 
                 leading-relaxed border-none focus:ring-2 focus:ring-[#00a884]/20 
                 focus:border-[#00a884]/50 outline-none min-h-[3rem] max-h-[12rem]
                 transition-all duration-200 placeholder:text-[#8696a0]"
        style={{
          direction: isArabic ? 'rtl' : 'ltr'
        }}
        placeholder={isArabic ? "اكتب رسالتك هنا..." : "Type your message here..."}
      />
      
      <button
        onClick={onSend}
        disabled={!value.trim()}
        className="p-3 rounded-full bg-[#00a884] text-white hover:bg-[#017561] 
                 transition-colors disabled:opacity-50 disabled:cursor-not-allowed 
                 flex items-center justify-center h-12 w-12 flex-shrink-0
                 shadow-lg transform hover:scale-105 active:scale-95 duration-150"
      >
        <svg viewBox="0 0 24 24" width="24" height="24" className="transform rotate-90">
          <path
            fill="currentColor"
            d="M1.101 21.757L23.8 12.028 1.101 2.3l.011 7.912 13.623 1.816-13.623 1.817-.011 7.912z"
          />
        </svg>
      </button>
    </div>
  )
})

TextDisplay.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onSend: PropTypes.func.isRequired,
  isArabic: PropTypes.bool.isRequired
}

TextDisplay.displayName = 'TextDisplay'

export default TextDisplay