export default function SinglePaste({ singlePaste }) {
  return (
    <div className="singlePaste">
      <h3>{singlePaste.title}</h3>
      {singlePaste.content.map((data, i) => {
        return <p key={i}>{data}</p>;
      })}
      <div>
        <span>{singlePaste.author}</span>
        <span> </span>
        <span>{singlePaste.creationDate.slice(0, 10)} </span>
        <span>{singlePaste.creationDate.slice(11, 19)}</span>
      </div>
    </div>
  );
}
