const ChatWindow = ({ chatResponse }) => {

  return (
    <div className="flex-1 flex-col overflow-y-auto p-4 bg-gray-100">
        <h1 className="text-black">Chat Window</h1> 
        <div className="bg-grey">
          <p className="text-black">chatResponse </p>
        </div>
    </div>
  );
};

export default ChatWindow;
