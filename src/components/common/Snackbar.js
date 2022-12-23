import { useSelector } from "react-redux";

export default function Snackbar() {
  const toggleMessageOptions = useSelector((state) => {
    return state.toggle;
  });
  return (
    <div
      className={`pa-4 border-radius-soft text-white-1 snackbar-default ma-8 ${
        toggleMessageOptions.color === "success" && "bg-green-1"
      } ${toggleMessageOptions.color === "failed" && "bg-red-1"} ${
        toggleMessageOptions.display ? "hover-shake" : "hide"
      }`}
    >
      {toggleMessageOptions.display && (
        <p className="font-sm font-light">{toggleMessageOptions.message}</p>
      )}
    </div>
  );
}
