import Image from "next/image";
const ParagraphWithImage = ({ data }) => {
    return (
        <div className="content content__paragraph">
            <div className="container">
                <div className="content__inside">
                    {data.title && <h3 className="!mb-2" dangerouslySetInnerHTML={{ __html: data.title }} />}
                    {data.image && (
                        <div className="content__paragraph-image">
                            <Image src={`${process.env.NEXT_PUBLIC_ASSET_URL}/${data.image}`} alt={'image detail'} fill />
                        </div>
                    )}
                    {data.caption && (
                        <div className="content__paragraph-image-caption">{data.caption}</div>
                    )}
                    {data.description && (
                        <div className="content__paragraph-content" dangerouslySetInnerHTML={{ __html: data.description }} />
                    )}
                </div>
            </div>
        </div>
    );
}

export default ParagraphWithImage;