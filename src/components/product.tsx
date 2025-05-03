import { Card, CardContent, CardTitle } from "@/components/ui/card";

interface ProductProps {
  name: string;
  onAction: () => void;
  isAdded?: boolean;
}

const Product = ({ name, onAction, isAdded = false }: ProductProps) => {
  return (
    <li>
      <Card
        onClick={onAction}
        className={`w-45 h-24 mt-2 cursor-pointer transition hover:bg-blue-100 ${
          isAdded ? "bg-gray-100" : ""
        }`}
      >
        <CardContent>
          <CardTitle className="text-base font-semibold">{name}</CardTitle>
        </CardContent>
      </Card>
    </li>
  );
};

export default Product;
