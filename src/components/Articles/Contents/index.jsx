'use client';
import Banner from './Banner';
import Paragraph from './Paragraph';
import ParagraphWithImage from './ParagraphWithImage';
import Quote from './Quote';
import SingleImage from './SingleImage';
import Reference from './Reference';
import { BigCircle } from '@/components/SVGs';
import Related from '../Related';
const ContentsSwitcher = ({ type, dataParent, data }) => {
    switch (type) {
        case 'paragraph':
            return <Paragraph data={data} />;
        case 'paragraph-with-image':
            return <ParagraphWithImage data={data} />;
        case 'quote':
            return <Quote data={data} />;
        case 'single-image':
            return <SingleImage dataParent={dataParent} data={data} />;
        case 'references':
            return <Reference data={data} />;
        default:
            return null;
    }
}

const ArticleContents = ({ data, related }) => {
    // console.log(data);
    return (
        <section className="articles articles__detail">
            <div className="articles__circle">
                <BigCircle />
            </div>
            <Banner data={data} />
            {/* <Paragraph data={data} /> */}
            {
                data.components &&
                data.components.map((item, index) => (
                    <ContentsSwitcher key={index} type={item.type} dataParent={data} data={item.data} />
                ))
            }
            {related.length > 0 && (
                <Related data={related.slice(0, 3)} />
            )}
        </section>
    );
}

export default ArticleContents;