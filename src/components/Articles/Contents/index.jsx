'use client';
import Banner from './Banner';
import Paragraph from './Paragraph';
import ParagraphWithImage from './ParagraphWithImage';
import Quote from './Quote';
import SingleImage from './SingleImage';
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
        case 'reference':
            return <Reference data={data} />;
        default:
            return null;
    }
}

const ArticleContents = ({ data, related }) => {
    
    return (
        <section className="articles articles__detail">
            <div className="articles__circle">
                <BigCircle />
            </div>
            <Banner data={data} />
            <Paragraph data={data} />
            {/* {data.content.map((item, index) => (
                <ContentsSwitcher key={index} type={item.type} dataParent={data} data={item} />
            ))} */}
            {related.length > 0 && (
                <Related data={related} />
            )}
        </section>
    );
}

export default ArticleContents;