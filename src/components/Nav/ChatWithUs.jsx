"use client";
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { 
    selectAllLocations, 
    fetchLocations,
  } from '@/redux/slices/locationsSlice';
import { useEffect } from 'react';
const ChatWithUs = () => {
    const locations = useAppSelector(selectAllLocations);
    const dispatch = useAppDispatch();
    useEffect(() => {
        if (locations.length === 0) {
            dispatch(fetchLocations());
        }
    }, [dispatch, locations.length]);
    return (
        <div className="chat-with-us">
        <div className="button">
            <svg xmlns="http://www.w3.org/2000/svg" width={30} height={30} viewBox="0 0 30 30" fill="none">
                <g clipPath="url(#clip0_1399_3200)">
                    <path d="M29.77 14.6141C29.77 22.6846 23.2271 29.2272 15.1544 29.2272C12.5926 29.2272 10.1861 28.5669 8.0912 27.4106L0 30L2.63753 22.1574C1.3076 19.9563 0.541679 17.3718 0.541679 14.6131C0.542649 6.54254 7.08357 0 15.1563 0C23.2281 0.0019565 29.77 6.54352 29.77 14.6141ZM15.1534 2.33019C8.37855 2.33019 2.8676 7.84165 2.8676 14.617C2.8676 17.3052 3.73739 19.7939 5.20808 21.8189L3.67429 26.3805L8.39408 24.8691C10.3356 26.1525 12.6586 26.8999 15.1534 26.8999C21.9283 26.8999 27.4412 21.3894 27.4412 14.6141C27.4431 7.84165 21.9292 2.33019 15.1534 2.33019ZM22.535 17.9802C22.4437 17.8325 22.2049 17.7425 21.8477 17.5625C21.4914 17.3825 19.7276 16.5168 19.4004 16.3994C19.0704 16.2791 18.8316 16.2184 18.5928 16.5774C18.3569 16.9364 17.6696 17.7425 17.4589 17.9832C17.2502 18.2228 17.0415 18.2532 16.6833 18.0761C16.3251 17.8942 15.1699 17.5185 13.8012 16.2986C12.7362 15.3478 12.0169 14.1768 11.8092 13.8178C11.5985 13.4597 11.7878 13.2661 11.9655 13.088C12.1256 12.9266 12.3237 12.6693 12.5033 12.459C12.6829 12.2506 12.7421 12.1029 12.8615 11.8632C12.9789 11.6236 12.9197 11.4152 12.8314 11.2342C12.7421 11.0542 12.0266 9.29338 11.7267 8.57632C11.4286 7.86024 11.1306 7.97861 10.9209 7.97861C10.7122 7.97861 10.4734 7.94926 10.2346 7.94926C9.99582 7.94926 9.60752 8.03633 9.28037 8.39534C8.95323 8.75436 8.02713 9.62011 8.02713 11.3829C8.02713 13.1477 9.30949 14.8489 9.48908 15.0876C9.66964 15.3253 11.9684 19.0612 15.6097 20.4953C19.2529 21.9285 19.2529 21.4501 19.9091 21.3894C20.5673 21.3288 22.0292 20.5237 22.3263 19.6883C22.6253 18.8489 22.6253 18.1299 22.535 17.9802Z" fill="#302864" />
                </g>
                <defs>
                    <clipPath id="clip0_1399_3200">
                    <rect width="29.77" height={30} fill="white" />
                    </clipPath>
                </defs>
            </svg>
            <span>Chat with us</span>
        </div>
        <div className="btn-area">
            {locations.map((location) => (
                <a
                    key={location.slug}
                    href={`https://wa.me/${location.phone?.replace(/\D/g, '') || ''}`}
                    className='btn-area__item'
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    {location.label}
                </a>
            ))}
        </div>
    </div>
    );
}

export default ChatWithUs;