"use client";
// import { getArticlesData } from "@/utils/pageData";
import { useState, useEffect, useRef } from "react";
import { BigCircle } from "../SVGs";
import Card from "./Card";
import { fetchData } from "@/services/api";
const Articles = () => {
    const [articlesData, setArticlesData] = useState([]);
    const [visibleItems, setVisibleItems] = useState(9);
    const [isLoading, setIsLoading] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    const containerRef = useRef(null);
    const loadMoreRef = useRef(null);
    
    useEffect(() => {
        const fetchArticlesData = async () => {
            const articlesData = await fetchData('news');
            setArticlesData(articlesData.data);
        }
        fetchArticlesData();
    }, []);

    // Load more items function
    const loadMoreItems = () => {
        if (isLoading || visibleItems >= articlesData.length) return;
        
        setIsLoading(true);
        
        // Simulate loading delay for better UX
        setTimeout(() => {
            setVisibleItems(prev => Math.min(prev + 6, articlesData.length));
            setIsLoading(false);
        }, 500);
    };

    // Scroll detection for load more
    useEffect(() => {
        const handleScroll = () => {
            if (!loadMoreRef.current || isLoading || visibleItems >= articlesData.length) return;
            
            const rect = loadMoreRef.current.getBoundingClientRect();
            const isVisible = rect.top <= window.innerHeight && rect.bottom >= 0;
            
            if (isVisible) {
                loadMoreItems();
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [visibleItems, isLoading, articlesData.length]);

    useEffect(() => {
        if (articlesData.length === 0) return;
        
        // Masonry layout fallback for browsers that don't support CSS masonry
        const applyMasonryLayout = () => {
            if (!containerRef.current || !articlesData.length) return;
            
            const container = containerRef.current;
            const items = container.querySelectorAll('.articles__index__item');
            
            if (items.length === 0) return;
            
            // Check if CSS masonry is supported
            const supportsMasonry = CSS.supports('grid-template-rows', 'masonry');
            if (supportsMasonry) return;
            
            // Apply JavaScript masonry layout
            const containerWidth = container.offsetWidth;
            const gap = 24;
            const minItemWidth = 300;
            const columns = Math.max(1, Math.floor((containerWidth + gap) / (minItemWidth + gap)));
            const columnWidth = (containerWidth - (gap * (columns - 1))) / columns;
            
            const columnHeights = new Array(columns).fill(0);
            
            items.forEach((item) => {
                const shortestColumn = columnHeights.indexOf(Math.min(...columnHeights));
                const x = shortestColumn * (columnWidth + gap);
                const y = columnHeights[shortestColumn];
                
                item.style.position = 'absolute';
                item.style.left = `${x}px`;
                item.style.top = `${y}px`;
                item.style.width = `${columnWidth}px`;
                
                columnHeights[shortestColumn] += item.offsetHeight + gap;
            });
            
            const maxHeight = Math.max(...columnHeights);
            container.style.height = `${maxHeight}px`;
        };

        // Run masonry layout immediately
        const runMasonry = () => {
            // First attempt - immediate
            
            // Second attempt - after a short delay to ensure DOM is ready
            setTimeout(applyMasonryLayout, 50);
            // Third attempt - after images load
            const images = containerRef.current?.querySelectorAll('img');
            if (images && images.length > 0) {
                let loadedImages = 0;
                const totalImages = images.length;
                
                const onImageLoad = () => {
                    loadedImages++;
                    if (loadedImages === totalImages) {
                        setTimeout(applyMasonryLayout, 50);
                    }
                };
                
                images.forEach((img) => {
                    if (img.complete) {
                        onImageLoad();
                    } else {
                        img.addEventListener('load', onImageLoad);
                        img.addEventListener('error', onImageLoad);
                    }
                });
            }

            applyMasonryLayout();
            setIsLoaded(true);
        };

        // Run masonry layout immediately when component mounts
        runMasonry();
        // Reapply on window resize
        const handleResize = () => {
            setTimeout(applyMasonryLayout, 100);
        };
        
        window.addEventListener('resize', handleResize);
        
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [articlesData, visibleItems, isLoaded]);


    const visibleArticles = articlesData.slice(0, visibleItems);
    const hasMoreItems = visibleItems < articlesData.length;

    return (
        <section className="articles articles__index">
            <div className="articles__circle">
                <BigCircle />
            </div>
            <div className="container">
                <div className={`articles__index__items ${isLoaded ? 'loaded' : ''}`} ref={containerRef}>
                    {visibleArticles.map((article, index) => (
                        <Card key={index} data={article} />
                    ))}
                </div>
                
                {/* Load More Trigger */}
                {hasMoreItems && (
                    <div className="articles__load-more" ref={loadMoreRef}>
                        {isLoading ? (
                            <div className="articles__loading">
                                <div className="articles__loading__spinner"></div>
                                <span>Loading more articles...</span>
                            </div>
                        ) : (
                            <div className="articles__load-more__text">
                                Scroll down to load more articles
                            </div>
                        )}
                    </div>
                )}
                
                {/* End of articles message */}
                {!hasMoreItems && articlesData.length > 0 && (
                    <div className="articles__end">
                        <p>You've reached the end of all articles!</p>
                    </div>
                )}
            </div>
        </section>
    );
}

export default Articles;