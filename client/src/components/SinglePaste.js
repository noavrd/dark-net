export default function SinglePaste({ singlePaste }) {
  console.log(singlePaste);
  return (
    <div className="singlePaste">
      <h3>{singlePaste.title}</h3>
      {singlePaste.content.map((data, i) => {
        return <p className={i}>{data}</p>;
      })}
      <div>
        <span>{singlePaste.author}</span>
        <span>{singlePaste.creationDate}</span>
        {/* <span>{singlePaste.creationTime}</span> */}
      </div>
    </div>
  );
}
