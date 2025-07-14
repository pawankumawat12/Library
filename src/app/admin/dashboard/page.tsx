import { BookTable } from "./components/book-table";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Book Management</h1>
        <p className="text-muted-foreground">
          Add, edit, and manage all the books in your library.
        </p>
      </div>
      <BookTable />
    </div>
  );
}
