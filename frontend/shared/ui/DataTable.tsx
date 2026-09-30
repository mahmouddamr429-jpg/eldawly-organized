'use client';

interface DataTableProps {
  headers: string[];
  rows: (string | React.ReactNode)[][];
}

export default function DataTable({ headers, rows }: DataTableProps) {
  if (rows.length === 0) return <div className="p-8 text-center text-[#aaa]">مفيش بيانات</div>;
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead className="bg-[#fdf9f5] border-b border-[#e8ddd2]">
          <tr>{headers.map(h => <th key={h} className="text-right px-4 py-3 font-bold text-[#2d2017]">{h}</th>)}</tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-b border-[#f0ece8] hover:bg-[#fdf9f5]">
              {row.map((cell, j) => <td key={j} className="px-4 py-3">{cell}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
