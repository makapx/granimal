import { useSelector } from "react-redux";
import {  selectToasts } from "../../store";
import React from "react";
import Toast from "../common/Toast";

export default function ToastViewport({ children }: { children: React.ReactNode }) {
    const toasts = useSelector(selectToasts);
    return <>
        {children}
        <div className="fixed bottom-0 right-0 min-w-64 flex flex-col gap-2 p-2">
            {
                toasts.map( toast => (<Toast key={toast.id} toast={toast}></Toast>))
            }
        </div>
    </>
}