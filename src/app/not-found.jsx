import Link from "next/link";
const NotFound = () => {
    return (
        <section className="h-[80vh]">
            <div className="container items-center justify-center h-full flex flex-col gap-y-[24px]">
                <h1 className="text-[100px] font-medium text-hei-blue">4 0 4</h1>
                <div>
                    <p className="text-[24px] font-bold text-hei-blue text-center mb-4">Page Not Found</p>
                    <p className="text-[16px] font-medium text-hei-blue">The page you are looking for does not exist. Please try another page.</p>
                </div>
                <Link href="/" className="text-[16px] font-medium text-hei-blue underline">Go to Home</Link>
            </div>
        </section>
    );
}

export default NotFound;