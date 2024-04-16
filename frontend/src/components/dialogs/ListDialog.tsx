import { Anime } from "../../api/types";
import Score from "../Score";

export default function ListDialog(props: { anime: Anime }) {
    const showModal = () => (document.getElementById('my_modal_2') as HTMLDialogElement)?.showModal();
    return (
        <>
            <button className="btn btn-info m-2 lg:m-0" onClick={showModal}>Watching</button>
            <dialog id="my_modal_2" className="modal">
                <div className="modal-box relative">

                    <div className="grid grid-rows-3 gap-3">
                        <div className="col-span-3 text-center font-bold h-12">
                            <span>{props.anime.title}</span>
                            <button className="btn btn-xs absolute m-2 top-4 right-4 text-neutral btn-square btn-outline border-transparent">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <div className="col-span-1">
                            <select className="select select-bordered border-accent w-40 max-w-xs">
                                <option disabled selected>Select Status</option>
                                <option>Watching</option>
                                <option>Pending</option>
                                <option>Completed</option>
                                <option>Dumped</option>
                                <option>Paused</option>
                            </select>
                        </div>
                        <div className="col-span-1">
                            <Score />
                        </div>
                        <div className="col-span-1">
                            <input type="number" placeholder={`Progress 0 - ${props.anime.episodes}`} className="input input-bordered border-accent input-info w-40 max-w-xs" />
                        </div>

                        <div className="col-span-1 ">
                            <button className="btn btn-s text-neutral btn-block font-bold">Save</button>
                        </div>
                        <div className="col-span-1 ">
                            <button className="btn btn-s text-neutral btn-block font-bold">Delete</button>
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