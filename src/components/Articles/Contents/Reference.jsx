const Reference = ({ data }) => {
    console.log(data);
    return (data.references.length > 0 && (
        <div className="content content__reference">
            <div className="container">
                <div className="content__inside">
                    <h5 className="!mb-[10px]">References</h5>
                    {data.references.map((reference, index) => (
                        <a href={reference.url} className="underline" target="_blank" rel="noopener noreferrer">
                            {reference.title}
                        </a>
                    ))}
                </div>
            </div>
        </div>
    )) || null;
}

export default Reference;