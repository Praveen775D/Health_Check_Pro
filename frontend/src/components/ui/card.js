export function Card({ children }) {
    return <div className="border p-4 shadow-md rounded-lg">{children}</div>;
  }
  
  export function CardContent({ children }) {
    return <div className="p-2">{children}</div>;
    
  }
export default Card;
