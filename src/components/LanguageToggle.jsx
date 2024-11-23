import React from "react";
import PropTypes from "prop-types";

const LanguageToggle = ({ isArabic, onClick, showArrow = true }) => {
  return (
    <button
      className="px-4 py-3 bg-[#00a884] rounded-lg text-white w-[20%]
               hover:bg-[#017561] transition-colors text-lg font-medium
               flex items-center justify-center gap-1"
      aria-label={isArabic ? "Switch to English" : "التبديل إلى العربية"}
    >
      <span>🌐</span>
      {showArrow && <span className="text-sm">⇧</span>}
    </button>
  );
};

LanguageToggle.propTypes = {
  isArabic: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  showArrow: PropTypes.bool,
};

export default LanguageToggle;
