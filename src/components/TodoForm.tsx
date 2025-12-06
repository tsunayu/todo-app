import { useState } from 'react';

interface TodoFormProps {
  onAdd: (title: string, category: string, dueDate?: string) => void;
}

export function TodoForm({ onAdd }: TodoFormProps) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('一般');
  const [dueDate, setDueDate] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      onAdd(title.trim(), category, dueDate || undefined);
      setTitle('');
      setCategory('一般');
      setDueDate('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="todo-form">
      <div className="form-group">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="新しいTODOを入力"
          className="form-input"
          required
        />
      </div>
      <div className="form-row">
        <div className="form-group">
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="カテゴリ"
            className="form-input"
          />
        </div>
        <div className="form-group">
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="form-input"
          />
        </div>
        <button type="submit" className="btn-add">追加</button>
      </div>
    </form>
  );
}
