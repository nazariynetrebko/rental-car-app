import { ClipLoader } from "react-spinners";

export default function Loader({ size = 40, color = "#007bff" }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
      }}>
      <ClipLoader size={size} color={color} />
    </div>
  );
}
