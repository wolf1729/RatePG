/* eslint-disable react/prop-types */
function CommentsComponent({ showingComments, addingComment }) {
    return (
        <div>
            <div className="flex justify-between items-center mb-4">
                <h2 className="font-extrabold text-xl">Comments</h2>
                <button onClick={() => addingComment()} className="bg-teal-500 text-white py-2 px-4 rounded-md">Add Comment and Rating</button>
            </div>
            <hr />
            <div>
                {showingComments()}
            </div>
        </div>
    )
}

export default CommentsComponent;