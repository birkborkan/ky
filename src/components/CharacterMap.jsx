import React from 'react'

function CharacterMap() {
  const characterMapping = [
    { english: 'a-z', beria: 'Corresponding Beria characters' },
    { english: 'Space', beria: 'Space' },
    { english: 'Backspace', beria: 'Delete last character' }
  ]

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mt-6">
      <h2 className="text-xl font-bold mb-4">Character Mapping</h2>
      <div className="grid grid-cols-2 gap-4">
        <div className="font-semibold">English</div>
        <div className="font-semibold">Beria</div>
        {characterMapping.map((mapping, index) => (
          <React.Fragment key={index}>
            <div className="py-2 border-t">{mapping.english}</div>
            <div className="py-2 border-t font-['Zaghawa_Beria']">{mapping.beria}</div>
          </React.Fragment>
        ))}
      </div>
    </div>
  )
}

export default CharacterMap