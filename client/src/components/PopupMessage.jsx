import propTypes from 'prop-types'

function PopupMessage({ message, onClose }) {
    return (
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-md p-4 flex flex-col items-center">
        <p className="text-gray-700 text-lg font-medium mb-4">{message}</p>
        <button onClick={onClose} className="bg-blue-500 text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-700">
          Close
        </button>
      </div>
    );
  }

  PopupMessage.propTypes={
    message:propTypes.string.isRequird,
    onClose:propTypes.func.isRequired
  }

export default PopupMessage
