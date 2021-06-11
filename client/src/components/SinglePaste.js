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
        <span>{singlePaste.creationDate}</span>
      </div>
    </div>
  );
}
