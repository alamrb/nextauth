type Item = {
  id: number;
  name: string;
  description: string;
};

type ItemListProps = {
  items: Item[];
  onDeleteItem: (id: number) => Promise<void>;
  onUpdateItem: (id: number) => Promise<void>;
};


import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";



export default function ItemList({ items, onDeleteItem, onUpdateItem }: ItemListProps) {
  return (

    <div>

<Table>
  <TableHeader>
    <TableRow>
      <TableHead className="w-[100px]">ID</TableHead>
      <TableHead>Name</TableHead>
      <TableHead>Details</TableHead>
    </TableRow>
  </TableHeader>
        <TableBody>
          {
            items.map((item) => (
            <TableRow key={item.id}>
            <TableCell className="font-medium">{item.id}</TableCell>
            <TableCell>{item.name}</TableCell>
                <TableCell>{item.description}</TableCell>
              <TableCell><Button onClick={() => onUpdateItem(item.id)} variant="secondary">Update</Button> <Button onClick={() => onDeleteItem(item.id)} variant="destructive">Delete</Button>
          </TableCell>
          </TableRow>
            ))
          }
    
  </TableBody>
</Table>

       {/* <ul>
      {items.map((item) => (
        <li key={item.id}>
          <h3>{item.name}</h3>
          <p>{item.description}</p>
          <button onClick={() => onUpdateItem(item.id)}>Update</button>
          <button onClick={() => onDeleteItem(item.id)}>Delete</button>
        </li>
      ))}
    </ul> */}
    </div>
   
  );
}
