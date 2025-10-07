import Image from "next/image";
const SingleImage = ({ dataParent, data }) => {
    return (
        <div className={`content content__single-image`}>
            {/* {data.image && (
                <Image src={process.env.NEXT_PUBLIC_ASSET_URL + data.image} alt={`${dataParent.name} Image`} fill />
            )} */}
        </div>
    );
}

export default SingleImage;