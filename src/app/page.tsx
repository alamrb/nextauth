"use client"

import { useEffect, useState } from 'react';
import ItemForm from './components/ItemForm';
import ItemList from './components/ItemList';



type Item = {
  id: number;
  name: string;
  description: string;
};

export default function Home() {
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    const response = await fetch('/api/items');
    const data = await response.json();
    setItems(data);
  };

  const handleAddItem = async (item: { name: string; description: string }) => {
    await fetch('/api/items/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(item),
    });
    fetchItems();
  };

  const handleDeleteItem = async (id: number) => {
    await fetch(`/api/items/${id}`, { method: 'DELETE' });
    fetchItems();
  };

  const handleUpdateItem = async (id: number) => {
    const name = prompt('New name:');
    const description = prompt('New description:');
    if (name && description) {
      await fetch(`/api/items/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, description }),
      });
      fetchItems();
    }
  };

  return (
    <div className='flex flex-col w-full '>
      <h1>CRUD App with Prisma, MySQL, and TypeScript</h1>
      <div className='flex w-full justify-between'>
        <ItemForm onAddItem={handleAddItem} />
      </div>
      <ItemList items={items} onDeleteItem={handleDeleteItem} onUpdateItem={handleUpdateItem} />
    </div>
  );
}
