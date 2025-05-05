import axios from "axios";
import { BASE_URL } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequest } from "../utils/requestSlice";
import { useEffect} from "react";

const Requests = () => {
  const requests = useSelector((store) => store.request);
  const dispatch = useDispatch();

  const reviewRequest = async (status, _id) => {
    try {
    axios.post(
        BASE_URL + "/request/review/" + status + "/" + _id,
        {},
        { withCredentials: true }
      );
      dispatch(removeRequest(_id));
    } catch (err) {
        console.error(err);
    }
  };

  const fetchRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests/received", {
        withCredentials: true,
      });

      dispatch(addRequests(res.data.data));
    } catch (err) {
        console.error(err);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);


  if (!requests || requests.length === 0)
    return <h1 className="flex justify-center my-10"> No Requests Found</h1>;

  return (
    <div className="text-center my-10">
      <h1 className="text-bold text-white text-3xl">Connection Requests</h1>
      <div className="flex justify-center my-10" >
      {requests.map((request) => {
        const { _id, firstName, lastName, photoUrl,  about } =
          request.fromUserId;

        return (
         
              <div className="card card-side bg-base-200 shadow-sm p-5 items w-max" key={_id}>
            <figure className='w-30'>
              <img
                src={photoUrl}
                alt="Movie" />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{firstName + " " + lastName}</h2>
              <p>{about}</p>
              <div className="card-actions justify-center my-2">
              <button
                className="btn btn-primary mx-2"
                onClick={() => reviewRequest("rejected", request._id)}
              >
                Reject
              </button>
              <button
                className="btn btn-secondary mx-2"
                onClick={() => reviewRequest("accepted", request._id)}
              >
                Accept
              </button>
              </div>

            </div>
          </div> 
         
      
        );
      })}
       </div>
    </div>
  );
};
export default Requests;