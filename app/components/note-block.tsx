type Note = {
  id: number | string;
  content: string;
  postUrl: string;
  postTitle: string;
  postImageUrl: string;
};

async function NoteBlock({ notes }) {
  return (
    <div>
      {notes.map((post: Note) => (
        <div
          key={post.id}
          className={
            "bg-white text-sm text-black break-inside-avoid-column whitespace-nowrap rounded-lg shadow-3xl shadow-stone-900 p-2 mb-4"
          }
        >
          <span className="whitespace-pre-line relative">
            <div className="">
              <a href={post.postUrl} target="_blank">
                <img src={post.postImageUrl} />
              </a>

              <a
                href={post.postUrl}
                className="text-xs text-blue-700 leading-tight"
                target="_blank"
              >
                {post.postTitle}
              </a>
            </div>

            <div className="">{post.content}</div>
          </span>
        </div>
      ))}
    </div>
  );
}

export default NoteBlock;
