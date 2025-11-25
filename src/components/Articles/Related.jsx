import Card from "./Card";
const Related = ({ data }) => {
    return (
        <section className="content content__related mt-[100px]">
            <div className="container">
                <div className="content__inside">
                    <h3 className="text-center !mb-[40px]">Related Articles</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {data.map((item, index) => (
                            <Card key={index} data={item} isRelated />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Related;