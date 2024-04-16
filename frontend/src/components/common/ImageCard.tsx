import { ReactNode } from "react";
type Input = {
    children?: ReactNode;
    imgsrc?: string;
};
export default function ImageCard ({ children, imgsrc, ...props}:Input){
    return(
        <>
        <div {...props} className="relative max-w-xs overflow-hidden rounded-2xl h-full shadow-lg group ">
            <img src={imgsrc} alt="" className="transition-transform group-hover:scale-110 h-full w-full object-cover duration-200" />
            <div className="absolute inset-0 flex items-end
            bg-gradient-to-t from-black/60 to-transparent">
                <div className="p-4 text-white">{children}</div>
            </div>
        </div>
        </>
    )
}