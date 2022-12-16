export default function Snackbar({ message, color, display }) {
  return (
    <div
      className={`pa-4 border-radius-soft text-white-1 snackbar-default ma-8 ${
        color === "success" && "bg-green-1"
      } ${color === "failed" && "bg-red-1"} ${
        display ? "hover-shake" : "hide"
      }`}
    >
      {display && <p className="font-sm font-light">{message}</p>}
    </div>
  );
}
