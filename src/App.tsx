import "./App.css";
import { useState } from "react";
import ExpenseList from "./components/ExpenseList";
import ExpenseFilter from "./components/ExpenseFilter";
import ExpenseForm from "./components/ExpenseForm";
import categories from "./categories";

type Category = (typeof categories)[number];

interface Expense {
  id: number;
  description: string;
  amount: number;
  category: Category;
}

function App() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [expenses, setExpenses] = useState<Expense[]>([]);

  const handleDelete = (id: number) => {
    setExpenses(expenses.filter((expense) => expense.id !== id));
  };

  const visibleExpenses = selectedCategory
    ? expenses.filter((e) => e.category === selectedCategory)
    : expenses;

  const handleExpense = (expense: Expense) => {
    setExpenses([...expenses, { ...expense }]);
  };

  return (
    <>
      <div className="mb-5">
        <ExpenseForm onSubmit={(expense) => handleExpense(expense)} />
      </div>

      <div className="mb-3">
        <ExpenseFilter
          onSelectCategory={(category) => setSelectedCategory(category)}
        ></ExpenseFilter>
      </div>

      <ExpenseList
        expenses={visibleExpenses}
        onDelete={(id) => handleDelete(id)}
      ></ExpenseList>
    </>
  );
}

export default App;
