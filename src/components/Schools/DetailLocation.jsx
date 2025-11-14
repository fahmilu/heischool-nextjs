const DetailLocation = ({ data }) => {
    const iframeTags = `<iframe src="${data.maps_url}" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>`;
    return (
        <section className="schools-detail-location">
            <div className="container">
                <div>
                    <h3>{data.title}</h3>
                    <p>{data.address} {data.city}</p>
                </div>
                <div dangerouslySetInnerHTML={{ __html: iframeTags }} className="map-container"></div>
                <a href={'/contact#enquiry'}>ENQUIRE</a>
            </div>
        </section>
    );
}

export default DetailLocation;