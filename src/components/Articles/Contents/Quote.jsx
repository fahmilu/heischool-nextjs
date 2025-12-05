const Quote = ({ data }) => {
    return (
        <div className="content content__quote">
            <div className="container">
                <div className="content__inside">                  
                    <blockquote className="content__quote-content" dangerouslySetInnerHTML={{ __html: data.quote }} />
                    <div className="content__quote-author">
                        <div className="content__quote-author-name">{data.author}</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Quote;