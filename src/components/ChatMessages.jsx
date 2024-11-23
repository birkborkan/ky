import React from 'react'
import Avatar from 'react-avatar'
import { formatDistanceToNow } from 'date-fns'
import PropTypes from 'prop-types'

const ChatMessages = ({ messages, currentUser, previewMessageId }) => {
  return (
    <div className="flex-1 overflow-y-auto p-4 bg-[#efeae2]">
      <div className="max-w-4xl mx-auto space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex items-start space-x-2 ${
              message.user_id === currentUser.id ? 'flex-row-reverse space-x-reverse' : ''
            } ${message.id === previewMessageId ? 'opacity-70' : ''}`}
          >
            <Avatar
              src={message.user_avatar}
              name={message.user_name}
              size="40"
              round={true}
              className="flex-shrink-0"
            />
            <div
              className={`flex flex-col ${
                message.user_id === currentUser.id ? 'items-end' : 'items-start'
              }`}
            >
              <div className="flex items-center space-x-2">
                <span className="text-sm text-[#667781] font-medium">
                  {message.user_name}
                </span>
                <span className="text-xs text-[#667781]">
                  {message.id === previewMessageId ? 
                    'Sending...' : 
                    formatDistanceToNow(new Date(message.created_at), { addSuffix: true })}
                </span>
              </div>
              <div
                className={`mt-1 px-4 py-2 rounded-lg max-w-sm ${
                  message.user_id === currentUser.id
                    ? 'bg-[#005c4b] text-white rounded-tr-sm'
                    : 'bg-white text-[#111b21] rounded-tl-sm shadow-sm'
                }`}
              >
                <p className="font-['Zaghawa_Beria'] text-base break-words">
                  {message.content}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

ChatMessages.propTypes = {
  messages: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      user_id: PropTypes.string.isRequired,
      user_name: PropTypes.string.isRequired,
      user_avatar: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
      created_at: PropTypes.string.isRequired
    })
  ).isRequired,
  currentUser: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired
  }).isRequired,
  previewMessageId: PropTypes.string
}

export default ChatMessages