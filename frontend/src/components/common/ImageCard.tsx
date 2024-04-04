import { ReactNode } from "react";

type Input = {
    children: ReactNode;
    imgsrc: string;
};

export default function ImageCard ({ children, imgsrc, ...props}:Input){
    return(
        <>
        <div className="relative max-w-xs ">
            <img src={imgsrc} alt="" />
            <div>
                <div>{children}</div>
            </div>
        </div>
        </>

    )

}