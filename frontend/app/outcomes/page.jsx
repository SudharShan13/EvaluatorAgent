import { Button } from "@/components/ui/button";
import { TableHead, TableRow, TableHeader, TableCell, TableBody, Table } from "@/components/ui/table";

export default function Outcomes() {
  return (
    <div className="container mx-auto p-4 bg-orange-500 text-white">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">My Standards</h1>
        <Button className="ml-4 bg-white text-orange-500 w-24">Add Standard</Button>
      </div>
      <div className="border-0 shadow-sm rounded-lg mt-6 bg-white text-black">
        <Table>
          <TableHeader className="bg-orange-500 text-white">
            <TableRow>
              <TableHead>Standard ID</TableHead>
              <TableHead>Learning Outcomes</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">AS91907</TableCell>
              <TableCell className="font-medium">
                <ul className="list-disc list-inside">
                  <li>Students should know what a loop is</li>
                  <li>Students should know what a variable is</li>
                  <li>Students should know what a conditional is</li>
                  <li>Students should know Decomposition, algorithms, and debugging</li>
                </ul>
              </TableCell>
              <TableCell aria-colindex="3" className="flex flex-col font-medium" role="cell">
                <Button className="bg-orange-500 text-white w-20">Edit</Button>
                <Button className="bg-red-500 text-white w-20">Delete</Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
