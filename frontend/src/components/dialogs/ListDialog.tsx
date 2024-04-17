import { useState } from "react";
import { Anime } from "../../api/types";
import Score from "../Score";
import { useCreateToastAction, usePutIntoListAction, useRemoveFromListAction } from "../../store";
import { TrackingList } from "../../api/types/tracking-list";

export default function ListDialog({ anime, tracking }: { anime: Anime, tracking?: TrackingList }) {
    const showModal = () => (document.getElementById('my_modal_2') as HTMLDialogElement)?.showModal();
    const closeModal = () => (document.getElementById('my_modal_2') as HTMLDialogElement)?.close();

    const [status, setStatus] = useState(tracking?.status ?? "");
    const [score, setScore] = useState(tracking?.score ?? 0);
    const [progress, setProgress] = useState(tracking?.progress ?? 0);

    const isValid = status && (score >= 0) && (progress >= 0);

    const putIntoList = usePutIntoListAction();
    const removeFromList = useRemoveFromListAction();
    const createToast = useCreateToastAction();

    const onSave = async () => {
        await putIntoList({
            animeId: anime.id,
            status,
            score,
            progress
        });
        closeModal();
        createToast({ title: "Anime salvato", message: anime.title }, 5e3);
    };
    const onRemove = async () => {
        await removeFromList({
            animeId: anime.id,
            status,
            score,
            progress
        });
        closeModal();
        createToast({ title: "Anime rimosso", message: anime.title }, 5e3);
        setStatus("");
        setScore(0);
        setProgress(0);
    };
    return (
        <>
            <button className="btn btn-info m-2 lg:m-0" onClick={showModal}>{tracking?.status ?? "Add to list"}</button>
            <dialog id="my_modal_2" className="modal">
                <div className="modal-box max-w-sm relative">

                    <div className="flex flex-col gap-3">
                        <div className="text-center font-bold">
                            <span className="block max-w-[80%] mx-auto">{anime.title}</span>
                            <button onClick={closeModal} className="btn btn-xs absolute m-2 top-4 right-4 text-neutral btn-square btn-outline border-transparent">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        <label className="form-control w-full">
                            <div className="label">
                                <span className="label-text">Status </span>
                            </div>
                            <select
                                value={status}
                                className="select select-bordered border-accent"
                                onChange={(e) => setStatus(e.target.value)}
                            >
                                <option disabled value="">Select Status</option>
                                <option value="Watching" >Watching</option>
                                <option value="Pending">Pending</option>
                                <option value="Completed">Completed</option>
                                <option value="Dumped">Dumped</option>
                                <option value="Paused">Paused</option>
                            </select>
                        </label>
                        <label className="form-control w-full">
                            <div className="label">
                                <span className="label-text">{`Progress 0 - ${anime.episodes}`} </span>
                            </div>
                            <input 
                                onChange={(e) => setProgress(Number(e.target.value))} 
                                type="number" 
                                placeholder={`Progress 0 - ${anime.episodes}`} 
                                className="input input-bordered border-accent input-info" />
                        </label> 
                        <label className="form-control w-full">
                            <div className="label">
                                <span className="label-text">Score </span>
                            </div>
                            <Score onChange={score => setScore(score)} value={score} />
                        </label>
                        <div className="flex gap-4 justify-end items-center">
                            <button onClick={onRemove} disabled={!tracking} className="btn btn-outline btn-error font-bold">Delete</button>
                            <button onClick={onSave} disabled={!isValid} className="btn btn-primary w-28 font-bold">Save</button>
                        </div>
                    </div>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
        </>
    )
}