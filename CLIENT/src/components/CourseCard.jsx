import { useNavigate } from "react-router-dom";

function CourseCard({ data }) {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate("/course/description",{state: {...data}})}
      className="text-white w-[20rem] h-[430px] shadow-lg rounded-lg cursor-pointer  group overflow-hidden bg-zinc-700"
    >
      <div className="overflow-hidden ">
        <img
          className="h-48 w-full rounded-tl-lg rounded-tr-lg group-hover:scale{1,2}  transition-all ease-out duration-300  "
          src={data?.thumbnail?.secure_url}
          alt="Course thumbnail"
        />
        <div className="p-3 space-y-1">
          <h2 className="text-xl font-bold text-yellow-500 line-clamp-2">
            {data.title}
          </h2>
          <p className="line-clamp-2">{data.description}</p>
          <p className="font-semibold">
            Category :{" "}
            <span className="font-bold text-yellow-500">{data.category}</span>
          </p>
          <p className="font-semibold">
            Intructor :{" "}
            <span className="font-bold text-yellow-500">{data.createdBy}</span>
          </p>
          <p className="font-semibold">
            Total lectures :{" "}
            <span className="font-bold text-yellow-500">
              {data.numberOfLectures}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
export default CourseCard;
