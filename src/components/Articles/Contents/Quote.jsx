const Quote = ({ data }) => {
    return (
        <div className="content content__quote">
            <div className="content__quote-content" dangerouslySetInnerHTML={{ __html: data.content }} />
        </div>
    );
}

export default Quote;