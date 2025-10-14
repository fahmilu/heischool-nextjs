const DetailLocation = ({ data }) => {
    return (
        <section className="schools-detail-location">
            <div className="container">
                <div>
                    <h3>{data.title}</h3>
                    <p>{data.address} {data.city}</p>
                </div>
                <div dangerouslySetInnerHTML={{ __html: data.maps_url }} className="map-container"></div>
                <a href={'/contact#enquiry'}>ENQUIRE</a>
            </div>
        </section>
    );
}

export default DetailLocation;