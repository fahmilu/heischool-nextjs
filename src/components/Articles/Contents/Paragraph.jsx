const Paragraph = ({ data }) => {
    console.log(data);
    return (
        <div className="content content__paragraph">
            <div className="container">
                <div className="content__inside">
                    {data.title && <h3 dangerouslySetInnerHTML={{ __html: data.title }} />}
                    {data.description && (
                        <div className="content__paragraph-content" dangerouslySetInnerHTML={{ __html: data.description }} />
                    )}
                </div>
            </div>
        </div>
    );
}

export default Paragraph;