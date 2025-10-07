const Paragraph = ({ data }) => {
    return (
        <div className="content content__paragraph">
            <div className="container">
                <div className="content__inside">
                    {data.title && <h3 dangerouslySetInnerHTML={{ __html: data.title }} />}
                    {data.content && (
                        <div className="content__paragraph-content" dangerouslySetInnerHTML={{ __html: data.content }} />
                    )}
                </div>
            </div>
        </div>
    );
}

export default Paragraph;