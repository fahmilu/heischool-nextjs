import Link from 'next/link';
const Arrow = ({ href, label, isSelf = false }) => {
  return (
    <Link href={href} className='flex items-center gap-x-[10px] group' target={isSelf ? '_self' : '_blank'}>
        <span className='text-[36px] group-hover:no-underline font-noyh font-black text-hei-green underline'>{label}</span>
        <svg xmlns="http://www.w3.org/2000/svg" width={25} height={23} viewBox="0 0 25 23" fill="none">
            <path d="M19.4253 8.87418C21.4674 10.0204 21.4674 12.96 19.4253 14.1063L10.8115 18.9413C8.81173 20.0638 6.34309 18.6186 6.34309 16.3253L6.34309 6.65518C6.34309 4.3619 8.81173 2.91662 10.8115 4.03913L19.4253 8.87418Z" fill="#00513C" />
        </svg>
    </Link>
  )
}

export default Arrow