import axios from 'axios';
import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constant';
import { useDispatch, useSelector } from 'react-redux';
import { addRequest } from '../utils/requestSlice';

const Requests = () => {
    const dispatch = useDispatch()
    const requests = useSelector((store) => store.request)

    const fetchRequest = async () => {
        try {
            const res = await axios.get(BASE_URL + "/user/requests/received", {
                withCredentials: true,
            });
            dispatch(addRequest(res?.data?.data))
        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        fetchRequest()
    }, [])

    if (!requests || requests.length <= 0) return <h1 className="flex justify-center my-10">No new requests found!</h1>;
    console.log(requests)
    return (
        <div className='flex justify-center my-10'>
            <div className='flex justify-center my-10 flex-col gap-5 w-max'>
                {requests.map((request, index) => {
                    const { firstName, lastName, photoUrl, about } = request.fromUserId
                    return (
                        <div key={index} className="card card-side bg-base-200 shadow-sm p-5 items-center">
                            <figure className='w-30'>
                                <img src={photoUrl} alt="User" />
                            </figure>
                            <div className="card-body">
                                <h2 className="card-title">{firstName + " " + lastName}</h2>
                                <p>{about}</p>
                                <div className="card-actions justify-end">
                                    <button className="btn btn-primary">Reject</button>
                                    <button className="btn btn-secondary">Accept</button>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Requests