import axios from 'axios';
import { useEffect } from 'react'
import { BASE_URL } from '../utils/constant';
import { useDispatch, useSelector } from 'react-redux';
import { addConnection } from '../utils/connectionSlice';

const Connections = () => {
  const dispatch = useDispatch()
  const connections = useSelector((store) => store.connection)

  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnection(res?.data?.data))
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    fetchConnections()
  }, [])

  if (!connections || connections.length <= 0) return <h1 className="flex justify-center my-10">No new connections founds!</h1>;
  return (
    <div className="text-center my-5">
      <h1 className="text-bold text-white text-3xl">Connection Requests</h1>
      <div className='flex justify-center my-0 '>

        <div className='flex justify-center  my-10 flex-col gap-5 w-max'>
          {connections.map((connection) => {
            const { firstName, lastName, photoUrl, about } = connection
            return (
              <div className="card card-side bg-base-200 shadow-sm p-5 items">
                <figure className='w-30'>
                  <img
                    src={photoUrl}
                    alt="Movie" />
                </figure>
                <div className="card-body">
                  <h2 className="card-title">{firstName + " " + lastName}</h2>
                  <p>{about}</p>

                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>

  )
}

export default Connections