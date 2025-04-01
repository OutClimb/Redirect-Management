import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { RedirectsResponse } from '@/types/redirect'
import { Button } from './ui/button'

export function RedirectsTable({
  data,
  onEdit,
  onDelete,
}: {
  data: RedirectsResponse
  onEdit: (id: number) => void
  onDelete: (id: number) => void
}) {
  const dateFormatter = new Intl.DateTimeFormat(undefined, {
    dateStyle: 'full',
    timeStyle: 'short',
  })

  const handleEdit = (id: number) => {
    return () => {
      onEdit(id)
    }
  }

  const handleDelete = (id: number) => {
    return () => {
      onDelete(id)
    }
  }

  return (
    <div>
      <div className="overflow-x-auto">
        {data.length === 0 && (
          <div className="flex items-center justify-center h-32">
            <p className="text-gray-500">No redirects yet.</p>
          </div>
        )}
        {data.length > 0 && (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>From</TableHead>
                <TableHead>To</TableHead>
                <TableHead>Starts On</TableHead>
                <TableHead>Ends On</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.fromPath}</TableCell>
                  <TableCell>{item.toUrl}</TableCell>
                  <TableCell>{item.startsOn === 0 ? '-' : dateFormatter.format(new Date(item.startsOn))}</TableCell>
                  <TableCell>{item.stopsOn === 0 ? '-' : dateFormatter.format(new Date(item.stopsOn))}</TableCell>
                  <TableCell>
                    <div className="flex justify-end gap-2">
                      <Button variant="secondary" onClick={handleEdit(item.id)}>
                        Edit
                      </Button>
                      <Button variant="destructive" onClick={handleDelete(item.id)}>
                        Delete
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  )
}
